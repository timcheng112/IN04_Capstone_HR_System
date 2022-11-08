package com.conceiversolutions.hrsystem.performance.goal;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import com.conceiversolutions.hrsystem.notification.Notification;
import com.conceiversolutions.hrsystem.notification.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.conceiversolutions.hrsystem.organizationstructure.team.Team;
import com.conceiversolutions.hrsystem.organizationstructure.team.TeamRepository;
import com.conceiversolutions.hrsystem.performance.achievement.Achievement;
import com.conceiversolutions.hrsystem.performance.achievement.AchievementRepository;
import com.conceiversolutions.hrsystem.performance.appraisalPeriod.AppraisalPeriod;
import com.conceiversolutions.hrsystem.performance.appraisalPeriod.AppraisalPeriodService;
import com.conceiversolutions.hrsystem.performance.goalPeriod.GoalPeriodService;
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

    @Autowired
    private final TeamRepository teamRepository;

    @Autowired
    private final NotificationRepository notificationRepository;

    @Autowired
    private final GoalPeriodService goalPeriodService;

    public GoalService(GoalRepository goalRepository, UserRepository userRepository,
            AchievementRepository achievementRepository, TeamRepository teamRepository,
            NotificationRepository notificationRepository, GoalPeriodService goalPeriodService) {
        this.goalRepository = goalRepository;
        this.userRepository = userRepository;
        this.achievementRepository = achievementRepository;
        this.teamRepository = teamRepository;
        this.notificationRepository = notificationRepository;
        this.goalPeriodService = goalPeriodService;
    }

    public User breakRelationships(User user) {
        User u = new User();

        u.setUserId(user.getUserId());
        u.setFirstName(user.getFirstName());
        u.setLastName(user.getLastName());
        u.setWorkEmail(user.getWorkEmail());
        u.setUserRole(user.getUserRole());
        u.setProfilePic(user.getProfilePic());
        u.setIsBlackListed(user.getIsBlackListed());

        return u;
    }

    public List<Goal> getAllGoalsByYear(String year) {
        List<Goal> goals = goalRepository.findAllGoalsByYear(year);
        for (Goal g : goals) {
            g.setEmployee(null);
            g.setAchievements(new ArrayList<>());
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

            User u = breakRelationships(user.get());

            goal.setEmployee(u);

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
            if (g.getEmployee() != null && g.getEmployee().getUserId() == userId && g.getType().equals(type)) {
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

    public List<User> getAllUserGoals(String year) {

        List<Goal> allGoals = goalRepository.findAllGoalsByYear(year);

        List<User> users = new ArrayList<>();

        List<User> allUsers = userRepository.findAll();

        for (User u : allUsers) {

            if (!u.getWorkEmail().isEmpty()) {
                User user = new User();

                user.setUserId(u.getUserId());
                user.setFirstName(u.getFirstName());
                user.setLastName(u.getLastName());
                user.setWorkEmail(u.getWorkEmail());
                user.setUserRole(u.getUserRole());
                user.setIsBlackListed(u.getBlackListed());

                List<Goal> userGoals = new ArrayList<>();

                for (Goal g : allGoals) {
                    if (g.getEmployee() != null && g.getEmployee().getUserId() == u.getUserId()
                            && g.getYear().equals(year)) {
                        for (Achievement a : g.getAchievements()) {
                            a.setEmployeeGoal(null);
                        }
                        userGoals.add(g);
                        g.setEmployee(null);
                        // System.out.println(g.getAchievements());
                    }
                }

                user.setGoals(userGoals);

                System.out.println(user);
                users.add(user);
            }
        }

        return users;
    }

    public List<User> getTeamGoals(Long teamId, String year) {
        List<User> users = new ArrayList<>();

        Optional<Team> optionalTeam = teamRepository.findById(teamId);

        if (optionalTeam.isPresent()) {
            Team t = optionalTeam.get();

            for (User u : t.getUsers()) {

                if (!u.getWorkEmail().isEmpty()) {
                    User user = new User();

                    user.setUserId(u.getUserId());
                    user.setFirstName(u.getFirstName());
                    user.setLastName(u.getLastName());
                    user.setWorkEmail(u.getWorkEmail());
                    user.setUserRole(u.getUserRole());
                    user.setIsBlackListed(u.getBlackListed());

                    List<Goal> userGoals = new ArrayList<>();

                    List<Goal> financial = getUserGoalsForPeriod(year, "financial", user.getUserId());

                    for (Goal g : financial) {
                        for (Achievement a : g.getAchievements()) {
                            a.setEmployeeGoal(null);
                        }
                        g.setEmployee(null);
                        userGoals.add(g);
                    }

                    List<Goal> business = getUserGoalsForPeriod(year, "business", u.getUserId());

                    for (Goal g : business) {
                        for (Achievement a : g.getAchievements()) {
                            a.setEmployeeGoal(null);
                        }
                        g.setEmployee(null);
                        userGoals.add(g);
                    }

                    user.setGoals(userGoals);
                    users.add(user);

                }

            }

            return users;

        } else {
            throw new IllegalStateException("Team does not exist");
        }
    }

    public String addFinanceReminderToUser(Long userId) {
        User u1 = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException(
                        "User with id" + userId + "does not exist"));

        LocalDate endDate = goalPeriodService
                .getGoalPeriodByYear(LocalDate.now().getYear() + "").getEndDate();

        String title = "Reminder for Goals Setting";
        String description = "Please be reminded to fill in your Financial goals by the end of the goal period, "
                + endDate.getDayOfMonth() + "/" + endDate.getMonthValue() + "/" + endDate.getYear() + ".";

        Notification n = new Notification(LocalDateTime.now(), title, description);

        u1.getNotificationsUnread().add(n);
        System.out.println(u1.getNotificationsUnread());
        notificationRepository.saveAndFlush(n);
        userRepository.saveAndFlush(u1);
        System.out.println("unread");
        System.out.println(u1.getNotificationsUnread());
        System.out.println("read");
        System.out.println(u1.getNotificationsRead());
        return "Notification added successfully to: " + u1.getFirstName() + " " + u1.getLastName();

    }

    public String addBusinessReminderToUser(Long userId) {
        User u1 = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException(
                        "User with id" + userId + "does not exist"));

        LocalDate endDate = goalPeriodService
                .getGoalPeriodByYear(LocalDate.now().getYear() + "").getEndDate();

        String title = "Reminder for Goals Setting";
        String description = "Please be reminded to fill in your Business goals by the end of goal period, "
                + endDate.getDayOfMonth() + "/" + endDate.getMonthValue() + "/" + endDate.getYear() + ".";

        Notification n = new Notification(LocalDateTime.now(), title, description);

        u1.getNotificationsUnread().add(n);
        System.out.println(u1.getNotificationsUnread());
        notificationRepository.saveAndFlush(n);
        userRepository.saveAndFlush(u1);
        System.out.println("unread");
        System.out.println(u1.getNotificationsUnread());
        System.out.println("read");
        System.out.println(u1.getNotificationsRead());
        return "Notification added successfully to: " + u1.getFirstName() + " " + u1.getLastName();

    }

}
