package com.conceiversolutions.hrsystem.engagement.rewardtrack;

import com.conceiversolutions.hrsystem.engagement.rewardtrack.RTRewardInstance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RTRewardInstanceRepository extends JpaRepository<RTRewardInstance, Long> {
}
