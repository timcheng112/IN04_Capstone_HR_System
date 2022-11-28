package com.conceiversolutions.hrsystem.engagement.reward;

import com.conceiversolutions.hrsystem.engagement.rewardtrack.RewardTrack;
import com.conceiversolutions.hrsystem.engagement.rewardtrack.RewardTrackRepository;
import com.conceiversolutions.hrsystem.engagement.rewardtrack.RewardTrackService;
import com.conceiversolutions.hrsystem.user.docdata.DocData;
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

        if (expiryDate.isBefore(LocalDate.now())) {
            throw new IllegalStateException("Expiry Date has past");
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

    public Long editReward(String name, String description, Integer pointsRequired, LocalDate expiryDate, Long rewardId) {
        System.out.println("RewardService.editReward");
        System.out.println("name = " + name + ", description = " + description + ", pointsRequired = " + pointsRequired + ", expiryDate = " + expiryDate + ", rewardId = " + rewardId);

        if (expiryDate.isBefore(LocalDate.now())) {
            throw new IllegalStateException("Expiry Date has past");
        }

        Reward reward = getReward(rewardId);
        RewardTrack rt = reward.getRewardTrack();

        for (Reward r : rt.getRewards()) {
            if (Objects.equals(r.getPointsRequired(), pointsRequired)) {
                throw new IllegalStateException("A reward with the same Points Required already exists. Please de-conflict");
            }
        }

        reward.setName(name);
        reward.setDescription(description);
        reward.setPointsRequired(pointsRequired);
        reward.setExpiryDate(expiryDate);
//        reward.setImage(image);

        rewardRepository.save(reward);
        return null;
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
}