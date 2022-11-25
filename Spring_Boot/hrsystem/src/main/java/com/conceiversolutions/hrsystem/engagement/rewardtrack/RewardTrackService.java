package com.conceiversolutions.hrsystem.engagement.rewardtrack;

import com.conceiversolutions.hrsystem.organizationstructure.department.Department;
import com.conceiversolutions.hrsystem.organizationstructure.department.DepartmentRepository;
import com.conceiversolutions.hrsystem.organizationstructure.team.Team;
import com.conceiversolutions.hrsystem.user.user.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class RewardTrackService {

    private final RewardTrackRepository rewardTrackRepository;
    private final DepartmentRepository departmentRepository;

    public List<RewardTrack> getAllRewardTracks() {
        System.out.println("RewardTrackService.getAllRewardTracks");
        return rewardTrackRepository.findAll();
    }

    public RewardTrack getRewardTrack(Long rtId) {
        System.out.println("RewardTrackService.getRewardTrack");
        System.out.println("rtId = " + rtId);

        Optional<RewardTrack> rtOpt = rewardTrackRepository.findById(rtId);
        if (rtOpt.isEmpty()) {
            throw new IllegalStateException("Reward Track not found");
        }
        return rtOpt.get();
    }

    public Long saveRewardTrack(String name, LocalDate startDate, LocalDate endDate, Long departmentId, Double pointsRatio, Long rewardTrackId) {
        System.out.println("RewardTrackService.saveRewardTrack");
        System.out.println("name = " + name + ", startDate = " + startDate + ", endDate = " + endDate + ", departmentId = " + departmentId + ", pointsRatio = " + pointsRatio + ", rewardTrackId = " + rewardTrackId);

        checkDates(startDate, endDate);
        Department dept = departmentRepository.findById(departmentId).get();
        RewardTrack rt;
        if (rewardTrackId != null) {
            rt = getRewardTrack(rewardTrackId);

            rt.setName(name);
            rt.setStartDate(startDate);
            rt.setEndDate(endDate);
            rt.setPointsRatio(pointsRatio);
        } else {
            rt = new RewardTrack(name, startDate, endDate, dept, pointsRatio);
        }

        rt = rewardTrackRepository.saveAndFlush(rt);

        return rt.getRewardTrackId();
    }


    public void checkDates(LocalDate start, LocalDate end) {
        System.out.println("RewardTrackService.checkDates");
        System.out.println("start = " + start + ", end = " + end);
        if (start.compareTo(end) >= 0) {
            throw new IllegalStateException("Start Date cannot be after End Date");
        } else if (end.isBefore(LocalDate.now())) {
            throw new IllegalStateException("Past plans cannot be edited");
        }
    }

    public String publishRewardTrack(Long rewardTrackId) {
        System.out.println("RewardTrackService.publishRewardTrack");
        System.out.println("rewardTrackId = " + rewardTrackId);

        RewardTrack rt = getRewardTrack(rewardTrackId);
        checkDates(rt.getStartDate(), rt.getEndDate());
        rt.setIsActive(true);
        rewardTrackRepository.save(rt);
        return "Reward Track " + rt.getName() + " has been published";
    }

    public RewardTrack getRewardTrackByDepartment(Long deptId) {
        System.out.println("RewardTrackService.getRewardTrackByDepartment");
        System.out.println("deptId = " + deptId);

        List<RewardTrack> rt = rewardTrackRepository.findActiveByDepartmentId(deptId);
        if (rt.isEmpty()) {
            throw new IllegalStateException("No Active reward tracks for this department");
        } else if (rt.size() > 1) {
            throw new IllegalStateException("More than 1 active reward tracks identified. Please ensure only one is active");
        }
        return rt.get(0);
    }
}
