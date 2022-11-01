package com.conceiversolutions.hrsystem.performance.goal;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.conceiversolutions.hrsystem.performance.achievement.Achievement;
import com.conceiversolutions.hrsystem.performance.achievement.AchievementRepository;
import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;

@Service
public class GoalService {

    @Autowired
    private final GoalRepository goalRepository;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final AchievementRepository achievementRepository;

    public GoalService(GoalRepository goalRepository, UserRepository userRepository,
            AchievementRepository achievementRepository) {
        this.goalRepository = goalRepository;
        this.userRepository = userRepository;
        this.achievementRepository = achievementRepository;
    }

    public List<Goal> getAllGoalsByYear(String year) {
        List<Goal> goals = goalRepository.findAllGoalsByYear(year);
        for (Goal g : goals) {
            g.setEmployee(null);
        }
        return goals;
    }

    public Long addGoal(String type, String description, Long userId) throws Exception {
        Optional<User> user = userRepository.findById(userId);

        if (user.isPresent()) {
            LocalDate now = LocalDate.now();
            Goal goal = new Goal();
            goal.setAchievements(new ArrayList<>());
            goal.setCreated(now);
            goal.setType(type);
            goal.setDescription(description);
            goal.setYear(now.getYear() + "");
            goal.setEmployee(user.get());
            Goal newGoal = goalRepository.save(goal);
            return newGoal.getGoalId();
        } else {
            throw new IllegalStateException("User does not exist");
        }
    }

    public List<Goal> getUserGoalsForPeriod(String year, String type, Long userId) {
        List<Goal> goals = goalRepository.findAllGoalsByYear(year);
        List<Goal> userGoals = new ArrayList<>();

        for (Goal g : goals) {
            if (g.getEmployee().getUserId() == userId && g.getType().equals(type)) {
                for (Achievement a : g.getAchievements()) {
                    a.setEmployeeGoal(null);
                }
                userGoals.add(g);
                g.setEmployee(null);
                System.out.println(g.getAchievements());
            }
        }

        System.out.println(userGoals);

        return userGoals;
    }

    public String deleteUserGoal(long goalId) throws Exception {
        Optional<Goal> optionalGoal = goalRepository.findById(goalId);
        if (optionalGoal.isPresent()) {
            Goal g = optionalGoal.get();
            String goalDescription = g.getDescription();
            goalRepository.deleteById(g.getGoalId());
            return goalDescription + " has been deleted";
        } else {
            throw new IllegalStateException("Goal does not exist");
        }
    }

    @Transactional
    public String updateUserGoal(long goalId, String description) {

        Optional<Goal> optionalGoal = goalRepository.findById(goalId);

        if (optionalGoal.isPresent()) {
            Goal g = optionalGoal.get();
            String goalDescription = g.getDescription();

            g.setDescription(description);

            return "" + goalDescription + " has been changed to " + description;
        } else {
            throw new IllegalStateException("Goal does not exist");
        }
    }

    public String addAchievement(long goalId, String achievement) {
        Optional<Goal> optionalGoal = goalRepository.findById(goalId);

        if (optionalGoal.isPresent()) {
            Goal g = optionalGoal.get();

            LocalDate now = LocalDate.now();

            Achievement a = new Achievement();
            a.setDescription(achievement);
            a.setCreated(now);
            a.setLastModified(now);
            a.setEmployeeGoal(g);

            g.getAchievements().add(a);

            achievementRepository.save(a);
            goalRepository.save(g);

            return "" + achievement + " added to " + g.getDescription();
        } else {
            throw new IllegalStateException("Goal does not exist");
        }
    }

    public Goal getGoalById(Long goalId) throws Exception {
        Optional<Goal> optionalGoal = goalRepository.findById(goalId);
        if (optionalGoal.isPresent()) {
            Goal g = optionalGoal.get();
            g.setEmployee(null);
            return g;
        } else {
            throw new IllegalStateException("Goal does not exist");
        }
    }

}
