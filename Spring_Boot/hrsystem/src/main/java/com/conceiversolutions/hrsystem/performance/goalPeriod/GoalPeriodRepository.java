package com.conceiversolutions.hrsystem.performance.goalPeriod;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface GoalPeriodRepository extends JpaRepository<GoalPeriod, Long> {
    @Query("SELECT g FROM GoalPeriod g WHERE g.year = ?1")
    Optional<GoalPeriod> findGoalPeriodByYear(String year);
}
