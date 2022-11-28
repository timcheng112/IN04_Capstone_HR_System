package com.conceiversolutions.hrsystem.engagement.reward;

import com.conceiversolutions.hrsystem.user.docdata.DocData;
import com.conceiversolutions.hrsystem.user.docdata.DocDataService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path="api/rewards")
@CrossOrigin("*")
@AllArgsConstructor
public class RewardController {

    private final RewardService rewardService;
    private final DocDataService docDataService;

    @GetMapping("getRewardTrackRewards")
    public List<Reward> getRewardTrackRewards(@RequestParam("rewardTrackId") Long rewardTrackId) {
        List<Reward> rewards = rewardService.getRewardTrackRewards(rewardTrackId);
        for (Reward reward : rewards) {
            reward.setRewardInstances(new ArrayList<>());
//            if (reward.getImage() != null) {
//                reward.getImage().setDocData(new byte[0]);
//            }
            reward.setRewardTrack(null);
        }
        return rewards;
    }

    @PostMapping("addNewReward")
    public Long addNewReward(@RequestParam("name") String name,
                             @RequestParam("description") String description,
                             @RequestParam("pointsRequired") Integer pointsRequired,
                             @RequestParam("expiryDate") String expiryDate,
                             @RequestParam("rewardTrackId") Long rewardTrackId
//                             @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
                                ) throws IOException {
//        DocData image = docDataService.uploadDoc(file);
        return rewardService.addNewReward(name, description, pointsRequired, LocalDate.parse(expiryDate), rewardTrackId);
    }

    @PutMapping("editReward")
    public Long editReward(@RequestParam("name") String name,
                             @RequestParam("description") String description,
                             @RequestParam("pointsRequired") Integer pointsRequired,
                             @RequestParam("expiryDate") String expiryDate,
                             @RequestParam("rewardId") Long rewardId
//                             @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
                                ) throws IOException {

//            DocData image = docDataService.uploadDoc(file);
        return rewardService.editReward(name, description, pointsRequired, LocalDate.parse(expiryDate), rewardId);
    }

    @DeleteMapping("deleteReward")
    public String deleteReward(@RequestParam("rewardId") Long rewardId) {
        return rewardService.deleteReward(rewardId);
    }

    @GetMapping("getReward")
    public Reward getReward(@RequestParam("rewardId") Long rewardId) {
        Reward reward = rewardService.getReward(rewardId);
//        reward.getImage().setDocData(new byte[0]);
        reward.setRewardTrack(null);
        List<RTRewardInstance> instances = reward.getRewardInstances();
        for (RTRewardInstance instance : instances) {
            instance.getRecipient().nullify();
            instance.setReward(null);
        }
        return reward;
    }
}
