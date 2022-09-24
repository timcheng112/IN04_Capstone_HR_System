package com.conceiversolutions.hrsystem.engagement.rewardtrack;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RewardTrackRepository extends JpaRepository<RewardTrack,Long> {
}
