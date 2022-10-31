package com.conceiversolutions.hrsystem.performance.goalPeriod;

import java.time.LocalDate;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.conceiversolutions.hrsystem.performance.goal.GoalRepository;

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

    public GoalPeriod getGoalPeriodByYear(String year) {
        Optional<GoalPeriod> existingGPOptional = goalPeriodRepository.findGoalPeriodByYear(year);
        if (existingGPOptional.isPresent()) {
            GoalPeriod goalPeriod = existingGPOptional.get();
            System.out.println((goalPeriod.getStartDate().toString()));
            return goalPeriod;
        } else {
            throw new IllegalStateException("Goal period for year " + year + " does not exist");
        }
    }

    @Transactional
    public String updateGoalPeriod(String startDate, String endDate) throws Exception {
        System.out.println("year " + endDate.substring(0, 4));
        Optional<GoalPeriod> existingGPOptional = goalPeriodRepository.findGoalPeriodByYear(endDate.substring(0, 4));
        if (existingGPOptional.isPresent()) {
            GoalPeriod gp = existingGPOptional.get();
            System.out.println(startDate);
            gp.setStartDate(LocalDate.parse(startDate));
            gp.setEndDate(LocalDate.parse(endDate));
            return "Goal period for " + gp.getYear() + " has been changed";
        } else {
            throw new IllegalStateException("Goal period does not exist");
        }
    }

    public String deleteGoalPeriod(String year) throws Exception {
        GoalPeriod gp = getGoalPeriodByYear(year);
        goalPeriodRepository.deleteById(gp.getGoalPeriodId());
        return "Goal period for " + gp.getYear() + " has been deleted";
    }

}
