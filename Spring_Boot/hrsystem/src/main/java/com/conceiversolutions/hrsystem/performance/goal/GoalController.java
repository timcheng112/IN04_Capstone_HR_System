package com.conceiversolutions.hrsystem.performance.goal;

import java.util.List;

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
@RequestMapping(path = "api/goal")
public class GoalController {

    private final GoalService goalService;
    
    @Autowired
    public GoalController(GoalService goalService) {
        this.goalService = goalService;
    }

    @GetMapping(path = "all/{year}")
    public List<Goal> getAllGoalsByYear(@PathVariable("year") String year) throws Exception {
        return goalService.getAllGoalsByYear(year);
    }

    @PostMapping
    public Long addGoal(@RequestBody Goal goal) throws Exception {
        return goalService.addGoal(goal);
    }
    
}
