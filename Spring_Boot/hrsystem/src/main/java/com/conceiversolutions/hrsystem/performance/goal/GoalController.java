package com.conceiversolutions.hrsystem.performance.goal;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.conceiversolutions.hrsystem.user.user.User;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/goal")
public class GoalController {

    @Autowired
    private final GoalService goalService;

    public GoalController(GoalService goalService) {
        this.goalService = goalService;
    }

    @GetMapping(path = "all/{year}")
    public List<Goal> getAllGoalsByYear(@PathVariable("year") String year) throws Exception {
        return goalService.getAllGoalsByYear(year);
    }

    @GetMapping(path = "{goalId}")
    public Goal getGoalById(@PathVariable("goalId") Long goalId) throws Exception {
        return goalService.getGoalById(goalId);
    }

    @PostMapping(path = "user/{userId}")
    public Long addGoal(@RequestParam("type") String type, @RequestParam("description") String description,
            @PathVariable("userId") Long userId) throws Exception {
        return goalService.addGoal(type, description, userId);
    }

    @GetMapping(path = "{year}/type/{type}/user/{userId}")
    public List<Goal> getUserGoalsForPeriod(@PathVariable("year") String year, @PathVariable("type") String type,
            @PathVariable("userId") Long userId)
            throws Exception {
        return goalService.getUserGoalsForPeriod(year, type, userId);
    }

    @DeleteMapping(path = "{goalId}")
    public String deleteUserGoal(@PathVariable("goalId") Long goalId) throws Exception {
        return goalService.deleteUserGoal(goalId);
    }

    @PutMapping(path = "{goalId}")
    public String updateUserGoal(@PathVariable("goalId") Long goalId, @RequestParam("description") String description) throws Exception {
        return goalService.updateUserGoal(goalId, description);
    }

    @PostMapping(path = "/{goalId}/achievement")
    public String addAchievement(@PathVariable("goalId") Long goalId, @RequestParam("description") String achievement) {
        return goalService.addAchievement(goalId, achievement);
    }

    @GetMapping(path = "/users/{year}")
    public List<User> getAllUserGoals(@PathVariable("year") String year) {
        return goalService.getAllUserGoals(year);
    }

    @GetMapping(path = "/team/{teamId}/{year}")
    public List<User> getTeamGoals(@PathVariable("teamId") Long teamId, @PathVariable("year") String year) {
        return goalService.getTeamGoals(teamId, year);
    }

    @GetMapping(path ="/financeReminder/{userId}")
    public String addFinanceReminderToUser(@PathVariable("userId") Long userId){
        return goalService.addFinanceReminderToUser(userId);
    }

    @GetMapping(path ="/businessReminder/{userId}")
    public String addBusinessReminderToUser(@PathVariable("userId") Long userId){
        return goalService.addBusinessReminderToUser(userId);
    }

    @GetMapping(path = "/employee/{userId}")
    public List<Goal> getUserGoals(@PathVariable("userId") Long userId) {
        return goalService.getUserGoals(userId);
    }

    @GetMapping
    public List<Goal> getAllGoals() {
        return goalService.getAllGoals();
    }

    @GetMapping(path = "/overdue")
    public List<Integer> getOverdueGoals() {
        return goalService.getOverdueGoals();
    }

    @GetMapping(path = "{year}/count")
    public List<Integer> getGoalCount(@PathVariable("year") String year) throws Exception {
        return goalService.getGoalCount(year);
    }
    
}
