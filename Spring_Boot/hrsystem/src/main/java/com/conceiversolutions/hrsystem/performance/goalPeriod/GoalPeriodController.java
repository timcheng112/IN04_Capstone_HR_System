package com.conceiversolutions.hrsystem.performance.goalPeriod;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/goalPeriod")
public class GoalPeriodController {
    
    private final GoalPeriodService goalPeriodService;

    @Autowired
    public GoalPeriodController(GoalPeriodService goalPeriodService) {
        this.goalPeriodService = goalPeriodService;
    }

    @PostMapping
    public Long addGoalPeriod(@RequestBody GoalPeriod goalPeriod) throws Exception {
        return goalPeriodService.addGoalPeriod(goalPeriod);
    }

    @GetMapping(path = "{year}")
    public String getGoalPeriodByYear(@PathVariable("year") String year) {
        return goalPeriodService.getGoalPeriodByYear(year);
    }

}
