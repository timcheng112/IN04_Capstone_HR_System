package com.conceiversolutions.hrsystem.engagement.reward;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="rewards")
public class RewardController {

    private final RewardService rewardService;

    @Autowired
    public RewardController(RewardService rewardService) {
        this.rewardService = rewardService;
    }

    @GetMapping
    public List<Reward> getRewards() {
        return rewardService.getRewards();
    }

    @PostMapping
    public void createNewReward(@RequestBody Reward reward) {
        rewardService.createNewReward(reward);
    }

    @DeleteMapping(path = "{rewardId}")
    public void deleteReward(
            @PathVariable("rewardId") Long rewardId) {
        rewardService.deleteReward(rewardId);
    }
}
