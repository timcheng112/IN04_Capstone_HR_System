package com.conceiversolutions.hrsystem.engagement.points;

import com.conceiversolutions.hrsystem.engagement.rewardtrack.RewardTrack;
import com.conceiversolutions.hrsystem.engagement.rewardtrack.RewardTrackRepository;
import com.conceiversolutions.hrsystem.organizationstructure.department.Department;
import com.conceiversolutions.hrsystem.organizationstructure.department.DepartmentRepository;
import com.conceiversolutions.hrsystem.organizationstructure.team.Team;
import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;
import java.util.logging.Logger;

@Service
@AllArgsConstructor
public class DummyData {
    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final RewardTrackRepository rewardTrackRepository;

    static final Logger LOGGER =
            Logger.getLogger(DummyData.class.getName());
    static Boolean toggle = false;

    @Scheduled(fixedRate = 60000)
    @Async
    public void simulateSales() {
        if (toggle) {
            DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

            LOGGER.info("Simulating Sales every minute at " +
                    LocalDateTime.now().format(dateTimeFormatter));

            Department dept = departmentRepository.findByDepartmentName("Sales").get();
            Set<User> salesEmployees = new HashSet<User>();
            for (Team t : dept.getTeams()) {
                salesEmployees.addAll(t.getUsers());
                salesEmployees.add(t.getTeamHead());
            }
            salesEmployees.add(dept.getDepartmentHead());

            List<User> employees = salesEmployees.stream().toList();
            List<RewardTrack> rt = rewardTrackRepository.findActiveByDepartmentName("Sales");
            if (rt.isEmpty()) {
                throw new IllegalStateException("No Active reward tracks for this department");
            } else if (rt.size() > 1) {
                throw new IllegalStateException("More than 1 active reward tracks identified. Please ensure only one is active");
            }

            for (User employee : employees) {
                simulateSale(employee, rt.get(0));
            }

            LOGGER.info("Simulated Sales Successfully");
        }
    }

    private void simulateSale(User employee, RewardTrack rt) {
        System.out.println("DummyData.simulateSale");
        System.out.println("employee id = " + employee.getUserId() + ", rt = " + rt.getName());

        Random random = new Random();
        int salesAmt = random.nextInt(1, 31); // generate a sale amount between $1 and $40
        double pointsToReward = salesAmt * rt.getPointsRatio();
        System.out.println("Awarding " + (int) pointsToReward + " points");
        employee.setRewardPoints(employee.getRewardPoints() + (int) pointsToReward);
        userRepository.save(employee);
        System.out.println("Employee has " + employee.getRewardPoints() + " points");
    }

    public String toggleDummyData() {
        System.out.println("DummyData.toggleDummyData");
        toggle = !toggle;
        System.out.println("Toggle has been set to " + toggle.toString());
        return "Toggle has been set to " + toggle.toString();
    }
}
