package com.conceiversolutions.hrsystem.performance.goalPeriod;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GoalPeriodService {
    
    @Autowired
    private final GoalPeriodRepository goalPeriodRepository;

    public GoalPeriodService(GoalPeriodRepository goalPeriodRepository) {
        this.goalPeriodRepository = goalPeriodRepository;
    }
    
    public Long addGoalPeriod(GoalPeriod goalPeriod) throws Exception {
        Optional<GoalPeriod> existingGPOptional = goalPeriodRepository.findGoalPeriodByYear(goalPeriod.getYear());
        if (existingGPOptional.isPresent()) {
            throw new IllegalStateException("Goal period for year " + goalPeriod.getYear() + " already exists!");
        } else {
            GoalPeriod gp = goalPeriodRepository.save(goalPeriod);
            return gp.getGoalPeriodId();
        }
    }

    public String getGoalPeriodByYear(String year) {
        Optional<GoalPeriod> existingGPOptional = goalPeriodRepository.findGoalPeriodByYear(year);
        if (existingGPOptional.isPresent()) {
            GoalPeriod goalPeriod = existingGPOptional.get();
            System.out.println((goalPeriod.getStartDate().toString()));
            return "" + goalPeriod.getStartDate().toString() + " - " + goalPeriod.getEndDate().toString();
        } else {
            throw new IllegalStateException("Goal period for year " + year + " does not exist");
        }
    }

}
