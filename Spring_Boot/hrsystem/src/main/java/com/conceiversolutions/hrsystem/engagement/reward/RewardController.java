package com.conceiversolutions.hrsystem.engagement.reward;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="api/rewards")
@CrossOrigin("*")
@AllArgsConstructor
public class RewardController {

    private final RewardService rewardService;

    @GetMapping("/getRewards")
    public List<Reward> getRewards() {
        return rewardService.getRewards();
    }

    @PostMapping("/createNewReward")
    public void createNewReward(@RequestBody Reward reward) {
        rewardService.createNewReward(reward);
    }

    @DeleteMapping(path = "{rewardId}")
    public void deleteReward(
            @PathVariable("rewardId") Long rewardId) {
        rewardService.deleteReward(rewardId);
    }
}
