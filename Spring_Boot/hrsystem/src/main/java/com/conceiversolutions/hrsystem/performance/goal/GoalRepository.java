package com.conceiversolutions.hrsystem.performance.goal;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {
    
    @Query("SELECT g FROM Goal g Where g.year = ?1")
    List<Goal> findAllGoalsByYear(String year);

}
