package com.conceiversolutions.hrsystem.engagement.reward;

import com.conceiversolutions.hrsystem.emailhandler.EmailSender;
import com.conceiversolutions.hrsystem.engagement.leavequota.LeaveQuota;
import com.conceiversolutions.hrsystem.engagement.leavequota.LeaveQuotaRepository;
import com.conceiversolutions.hrsystem.engagement.rewardtrack.RewardTrack;
import com.conceiversolutions.hrsystem.engagement.rewardtrack.RewardTrackRepository;
import com.conceiversolutions.hrsystem.engagement.rewardtrack.RewardTrackService;
import com.conceiversolutions.hrsystem.organizationstructure.team.Team;
import com.conceiversolutions.hrsystem.user.docdata.DocData;
import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
public class RewardService {
    private final RewardRepository rewardRepository;
    private final RewardTrackRepository rewardTrackRepository;
    private final RewardTrackService rewardTrackService;
    private final UserRepository userRepository;
    private final RTRewardInstanceRepository rtRewardInstanceRepository;
    private final LeaveQuotaRepository leaveQuotaRepository;
    private final EmailSender emailSender;

    public List<Reward> getRewardTrackRewards(Long rewardTrackId) {
        System.out.println("RewardService.getRewardTrackRewards");
        System.out.println("rewardTrackId = " + rewardTrackId);

        RewardTrack rt = rewardTrackService.getRewardTrack(rewardTrackId);
        List<Reward> rewards = rt.getRewards();

        rewards.sort((r1, r2) -> {
            return r1.getPointsRequired() - r2.getPointsRequired();
        });

        return rewards;
    }

    public Long addNewReward(String name, String description, Integer pointsRequired, LocalDate expiryDate, Long rewardTrackId) {
        System.out.println("RewardService.addNewReward");
        System.out.println("name = " + name + ", description = " + description + ", pointsRequired = " + pointsRequired + ", expiryyDate = " + expiryDate + ", rewardTrackId = " + rewardTrackId);
        RewardTrack rt = rewardTrackService.getRewardTrack(rewardTrackId);

        if (expiryDate.isBefore(rt.getEndDate())) {
            throw new IllegalStateException("Can't add a reward that will expire before the end of the Reward Track");
        }

        for (Reward r : rt.getRewards()) {
            if (Objects.equals(r.getPointsRequired(), pointsRequired)) {
                throw new IllegalStateException("A reward with the same Points Required already exists. Please de-conflict");
            }
        }

        Reward newReward = new Reward(name, description, pointsRequired, expiryDate, rt);
        Reward savedReward = rewardRepository.saveAndFlush(newReward);

        return savedReward.getRewardId();
    }

    public Reward getReward(Long rewardId) {
        System.out.println("RewardService.getReward");
        System.out.println("rewardId = " + rewardId);

        Optional<Reward> reward = rewardRepository.findById(rewardId);
        if (reward.isEmpty()) {
            throw new IllegalStateException("Reward does not exist");
        }
        return reward.get();
    }

    public String editReward(String name, String description, Integer pointsRequired, LocalDate expiryDate, Long rewardId) {
        System.out.println("RewardService.editReward");
        System.out.println("name = " + name + ", description = " + description + ", pointsRequired = " + pointsRequired + ", expiryDate = " + expiryDate + ", rewardId = " + rewardId);

        Reward reward = getReward(rewardId);
        RewardTrack rt = reward.getRewardTrack();

        if (expiryDate.isBefore(rt.getEndDate())) {
            throw new IllegalStateException("Can't add a reward that will expire before the end of the Reward Track");
        }

        for (Reward r : rt.getRewards()) {
            if (Objects.equals(r.getPointsRequired(), pointsRequired) && !rewardId.equals(r.getRewardId())) {
                throw new IllegalStateException("A reward with the same Points Required already exists. Please de-conflict");
            }
        }

        reward.setName(name);
        reward.setDescription(description);
        reward.setPointsRequired(pointsRequired);
        reward.setExpiryDate(expiryDate);
//        reward.setImage(image);

        rewardRepository.save(reward);
        return reward.getName() + " " + reward.getDescription() + " saved";
    }

    public String deleteReward(Long rewardId) {
        System.out.println("RewardService.deleteReward");
        System.out.println("rewardId = " + rewardId);

        Reward reward = getReward(rewardId);

        if (!reward.getRewardInstances().isEmpty()) {
            throw new IllegalStateException("Reward has already been claimed once, cannot be deleted");
        }

        RewardTrack rt = reward.getRewardTrack();
        rt.getRewards().remove(reward);
        rewardTrackRepository.save(rt);
        rewardRepository.deleteById(reward.getRewardId());
        return "Reward has been deleted successfully";
    }

    public String redeemReward(Long employeeId, Long rewardId) {
        System.out.println("RewardService.redeemReward");
        System.out.println("employeeId = " + employeeId + ", rewardId = " + rewardId);

        User employee = userRepository.findById(employeeId).get();
        Reward reward = getReward(rewardId);

        for (RTRewardInstance instances : reward.getRewardInstances()) {
            if (instances.getRecipient().getUserId().equals(employeeId)) {
                System.out.println("Employee already redeemed before");
                throw new IllegalStateException("Employee has redeemed this before");
            }
        }

        if (employee.getRewardPoints() < reward.getPointsRequired()) {
            System.out.println("Points not enough");
            throw new IllegalStateException("Employee does not have the sufficient amount of reward points required");
        }

        RTRewardInstance rewardInstance = new RTRewardInstance(reward, employee);
        System.out.println("Reward name is " + reward.getName());
        String output = "";
        // award reward
        if (reward.getName().contains("Leave")) { // leave
            // get user leave quota and add
            LeaveQuota lq = employee.getCurrentLeaveQuota();
            int current = lq.getANL();
            lq.setANL(current + 1);
            leaveQuotaRepository.save(lq);
            System.out.println("Leave credited from " + current + " to " + lq.getANL());
            output ="Leave credited from " + current + " to " + lq.getANL();
        } else { // voucher
            // send an email to ask them to take it from there
            System.out.println(reward.getDescription() + " sent to email");
            output = reward.getDescription() + " has been sent to email";
            emailSender.send(employee.getWorkEmail(), buildVoucherEmail(employee.getFirstName(), reward), "Reward Redemption");
        }

        // save
        RTRewardInstance savedInstance = rtRewardInstanceRepository.saveAndFlush(rewardInstance);
        List<RTRewardInstance> instances = reward.getRewardInstances();
        instances.add(savedInstance);
        reward.setRewardInstances(instances);
        rewardRepository.save(reward);
        return output;
    }

    private String buildVoucherEmail(String name, Reward reward) {
        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
                "\n" +
                "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
                "\n" +
                "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n"
                +
                "    <tbody><tr>\n" +
                "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
                "        \n" +
                "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n"
                +
                "          <tbody><tr>\n" +
                "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
                "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n"
                +
                "                  <tbody><tr>\n" +
                "                    <td style=\"padding-left:10px\">\n" +
                "                  \n" +
                "                    </td>\n" +
                "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n"
                +
                "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Reward Redemption</span>\n"
                +
                "                    </td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "              </a>\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "        </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n"
                +
                "    <tbody><tr>\n" +
                "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
                "      <td>\n" +
                "        \n" +
                "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n"
                +
                "                  <tbody><tr>\n" +
                "                    <td bgcolor=\"#1D70B8\" width=\"100%\" height=\"10\"></td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "\n" +
                "\n" +
                "\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n"
                +
                "    <tbody><tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n"
                +
                "        \n" +
                "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Hi " + name
                + ",</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> You have redeemed the reward : </p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> " + reward.getDescription()+"</p></blockquote>\n Please show this email to your Manager to obtain the physical voucher. <p>Grow with Libro</p>" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
                "\n" +
                "</div></div>";
    }
}