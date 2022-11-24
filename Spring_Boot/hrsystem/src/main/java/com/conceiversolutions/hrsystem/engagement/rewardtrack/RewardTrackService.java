package com.conceiversolutions.hrsystem.engagement.rewardtrack;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@AllArgsConstructor
public class RewardTrackService {

    private final RewardTrackRepository rewardTrackRepository;

    public List<RewardTrack> getRewardTracks() {
        return rewardTrackRepository.findAll();
    }
}
