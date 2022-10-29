package com.conceiversolutions.hrsystem.performance.goal;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GoalService {
    
    @Autowired
    private final GoalRepository goalRepository;

    public GoalService(GoalRepository goalRepository) {
        this.goalRepository = goalRepository;
    }

    public List<Goal> getAllGoalsByYear(String year) {
        List<Goal> goals = goalRepository.findAllGoalsByYear(year);
        for (Goal g : goals) {
            g.setEmployee(null);
        }
        return goals;
    }

    public Long addGoal(Goal goal) throws Exception {
        Goal newGoal = goalRepository.save(goal);
        return newGoal.getGoalId();
    }


}
