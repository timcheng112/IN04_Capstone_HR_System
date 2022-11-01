package com.conceiversolutions.hrsystem.performance.goalPeriod;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/goalPeriod")
public class GoalPeriodController {

    private final GoalPeriodService goalPeriodService;

    public GoalPeriodController(GoalPeriodService goalPeriodService) {
        this.goalPeriodService = goalPeriodService;
    }

    @GetMapping
    public List<GoalPeriod> getGoalPeriods() {
        return goalPeriodService.getGoalPeriods();
    }
    
    @PostMapping
    public Long addGoalPeriod(@RequestBody GoalPeriod goalPeriod) throws Exception {
        return goalPeriodService.addGoalPeriod(goalPeriod);
    }

    @GetMapping(path = "{year}")
    public GoalPeriod getGoalPeriodByYear(@PathVariable("year") String year) {
        return goalPeriodService.getGoalPeriodByYear(year);
    }

    @PutMapping(path = "/start/{startDate}/end/{endDate}")
    public String updateGoalPeriod(@PathVariable("startDate") String startDate,
            @PathVariable("endDate") String endDate) throws Exception {
        return goalPeriodService.updateGoalPeriod(startDate, endDate);
    }

    @DeleteMapping(path = "{year}")
    public String deleteGoalPeriod(@PathVariable("year") String year) throws Exception {
        return goalPeriodService.deleteGoalPeriod(year);
    }

}
