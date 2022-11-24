package com.conceiversolutions.hrsystem.engagement.rewardtrack;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path="api/rewards")
@CrossOrigin("*")
@AllArgsConstructor
public class RewardTrackController {
    private final RewardTrackService rewardTrackService;

    @GetMapping("/getRewardTracks")
    public List<RewardTrack> getRewardTracks() {
        return rewardTrackService.getRewardTracks();
    }
}
