package com.conceiversolutions.hrsystem.engagement.rewardtrack;

import com.conceiversolutions.hrsystem.engagement.points.DummyData;
import com.conceiversolutions.hrsystem.engagement.reward.RTRewardInstance;
import com.conceiversolutions.hrsystem.engagement.reward.Reward;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path="api/rewards")
@CrossOrigin("*")
@AllArgsConstructor
public class RewardTrackController {
    private final RewardTrackService rewardTrackService;
    private final DummyData dummyData;

    @GetMapping("/getAllRewardTracks")
    public List<RewardTrack> getAllRewardTracks() {
        List<RewardTrack> rewardTracks = rewardTrackService.getAllRewardTracks();
        for (RewardTrack rt : rewardTracks) {
            for (Reward reward : rt.getRewards()) {
                reward.setRewardInstances(new ArrayList<>());
//                if (reward.getImage() != null) {
//                    reward.getImage().setDocData(new byte[0]);
//                }
                reward.setRewardTrack(null);
            }
            rt.getRewards().sort((r1, r2) -> {
                return r1.getPointsRequired() - r2.getPointsRequired();
            });
            rt.getDepartment().setOrganization(null);
            rt.getDepartment().setDepartmentHead(null);
            rt.getDepartment().setTeams(new ArrayList<>());
        }
        return rewardTracks;
    }

    @GetMapping("/getRewardTrack")
    public RewardTrack getRewardTrack(@RequestParam("rewardTrackId") Long rewardTrackId) {
        RewardTrack rt = rewardTrackService.getRewardTrack(rewardTrackId);
        for (Reward reward : rt.getRewards()) {
            reward.setRewardInstances(new ArrayList<>());
//            if (reward.getImage() != null) {
//                reward.getImage().setDocData(new byte[0]);
//            }
            reward.setRewardTrack(null);
        }
        rt.getRewards().sort((r1, r2) -> {
            return r1.getPointsRequired() - r2.getPointsRequired();
        });
        rt.getDepartment().setOrganization(null);
        rt.getDepartment().setDepartmentHead(null);
        rt.getDepartment().setTeams(new ArrayList<>());
        return rt;
    }

    @PostMapping("saveRewardTrack")
    public Long saveRewardTrack(@RequestParam("name") String name,
                                @RequestParam("startDate") String startDate,
                                @RequestParam("endDate") String endDate,
                                @RequestParam("departmentId") Long departmentId,
                                @RequestParam("pointsRatio") Float pointsRatio,
                                @RequestParam(value = "rewardTrackId", required = false) Long rewardTrackId) {
        return rewardTrackService.saveRewardTrack(name, LocalDate.parse(startDate), LocalDate.parse(endDate),
                departmentId, Double.valueOf(pointsRatio), rewardTrackId);
    }

    @PutMapping("editRewardTrack")
    public Long editRewardTrack(@RequestParam("name") String name,
                                @RequestParam("startDate") String startDate,
                                @RequestParam("endDate") String endDate,
                                @RequestParam("pointsRatio") Float pointsRatio,
                                @RequestParam("rewardTrackId") Long rewardTrackId) {
        return rewardTrackService.saveRewardTrack(name, LocalDate.parse(startDate), LocalDate.parse(endDate),
                null, Double.valueOf(pointsRatio), rewardTrackId);
    }

    @PutMapping("publishRewardTrack")
    public String saveRewardTrack(@RequestParam("rewardTrackId") Long rewardTrackId) {
        return rewardTrackService.publishRewardTrack(rewardTrackId);
    }

    @PutMapping("toggleDummyData")
    public String toggleDummyData() {
        return dummyData.toggleDummyData();
    }

    @GetMapping("/getRewardTrackByDepartment")
    public RewardTrack getRewardTrackByDepartment(@RequestParam("departmentId") Long departmentId) {
        RewardTrack rt = rewardTrackService.getRewardTrackByDepartment(departmentId);
        for (Reward reward : rt.getRewards()) {
            reward.setRewardInstances(new ArrayList<>());
//            if (reward.getImage() != null) {
//                reward.getImage().setDocData(new byte[0]);
//            }
            reward.setRewardTrack(null);
        }
        rt.getRewards().sort((r1, r2) -> {
            return r1.getPointsRequired() - r2.getPointsRequired();
        });
        rt.getDepartment().setOrganization(null);
        rt.getDepartment().setDepartmentHead(null);
        rt.getDepartment().setTeams(new ArrayList<>());
        return rt;
    }

    @DeleteMapping("deleteRewardTrack")
    public String deleteRewardTrack(@RequestParam("rewardTrackId") Long rewardTrackId) {
        return rewardTrackService.deleteRewardTrack(rewardTrackId);
    }

    @GetMapping("/getRewardTrackByEmployee")
    public RewardTrack getRewardTrackByEmployee(@RequestParam("employeeId") Long employeeId) {
        RewardTrack rt = rewardTrackService.getRewardTrackByEmployee(employeeId);
        for (Reward reward : rt.getRewards()) {
//            reward.setRewardInstances(new ArrayList<>());
            for (RTRewardInstance instance : reward.getRewardInstances()) {
                instance.setReward(null);
                instance.getRecipient().nullify();
            }
//            if (reward.getImage() != null) {
//                reward.getImage().setDocData(new byte[0]);
//            }
            reward.setRewardTrack(null);
        }
        rt.getRewards().sort((r1, r2) -> {
            return r1.getPointsRequired() - r2.getPointsRequired();
        });
        rt.getDepartment().setOrganization(null);
        rt.getDepartment().setDepartmentHead(null);
        rt.getDepartment().setTeams(new ArrayList<>());
        return rt;
    }
}
