package com.conceiversolutions.hrsystem.engagement.rewardtrack;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path="api/reward_tracks")
public class RewardTrackController {
    private final RewardTrackService rewardTrackService;

    @Autowired
    public RewardTrackController(RewardTrackService rewardTrackService) {
        this.rewardTrackService = rewardTrackService;
    }

    @GetMapping
    public List<RewardTrack> getRewardTracks() {
        return rewardTrackService.getRewardTracks();
    }
}
