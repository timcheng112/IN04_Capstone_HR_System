package com.conceiversolutions.hrsystem.engagement.rewardtrack;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RewardTrackService {

    private final RewardTrackRepository rewardTrackRepository;

    @Autowired
    public RewardTrackService(RewardTrackRepository rewardTrackRepository) {
        this.rewardTrackRepository = rewardTrackRepository;
    }

    public List<RewardTrack> getRewardTracks() {
        return rewardTrackRepository.findAll();
    }
}
