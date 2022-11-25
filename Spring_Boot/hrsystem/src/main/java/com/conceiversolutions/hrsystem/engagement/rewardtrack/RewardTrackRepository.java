package com.conceiversolutions.hrsystem.engagement.rewardtrack;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RewardTrackRepository extends JpaRepository<RewardTrack,Long> {
    @Query("SELECT rt FROM RewardTrack rt WHERE rt.department.departmentName =?1 AND rt.isActive = TRUE")
    List<RewardTrack> findActiveByDepartmentName(String deptName);
}
