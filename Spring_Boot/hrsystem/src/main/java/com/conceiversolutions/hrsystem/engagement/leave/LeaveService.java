package com.conceiversolutions.hrsystem.engagement.leave;

import com.conceiversolutions.hrsystem.administration.tasklistitem.TaskListItem;
import com.conceiversolutions.hrsystem.enums.StatusEnum;
import com.conceiversolutions.hrsystem.organizationstructure.team.Team;
import com.conceiversolutions.hrsystem.user.user.User;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class LeaveService {

    private final LeaveRepository leaveRepository;

//    @Autowired
//    public LeaveService(LeaveRepository leaveRepository) {
//        this.leaveRepository = leaveRepository;
//    }

    public List<Leave> getLeaves() {
        return leaveRepository.findAll();
    }

    public List<Leave> getAllPendingLeaves() {
        System.out.println("LeaveService.getAllPendingLeaves");

        List<Leave> pending = leaveRepository.findJobRequestsByStatus(StatusEnum.PENDING);
        System.out.println("Size of pending leaves list is " + pending.size());

        // settle user side cyclic dependency
        for (Leave l : pending) {
            User emp = l.getEmployee();

            for (Team t : emp.getTeams()) {
                t.setUsers(new ArrayList<>());
                t.setDepartment(null);
                t.setOutlet(null);
                t.setRoster(null);
                t.setTeamHead(null);
            }

            for (TaskListItem taskListItem : emp.getTaskListItems()) {
                taskListItem.setUser(null);
                taskListItem.getTask().setTaskListItems(new ArrayList<>());
                taskListItem.getTask().setCategory(null);
            }

            emp.setQualificationInformation(null);
            emp.setReactivationRequest(null);
            emp.setAttendances(new ArrayList<>());
            emp.setCurrentPayInformation(null);
            emp.setEmployeeAppraisals(new ArrayList<>());
            emp.setManagerAppraisals(new ArrayList<>());
            emp.setManagerReviews(new ArrayList<>());
            emp.setEmployeeReviews(new ArrayList<>());
            emp.setApplications(new ArrayList<>());
            emp.setGoals(new ArrayList<>());
            emp.setPositions(new ArrayList<>());
            emp.setJobRequests(new ArrayList<>());
            emp.setBlocks(new ArrayList<>());
            emp.setShiftListItems(new ArrayList<>());
            emp.setSwapRequestsReceived(new ArrayList<>());
            emp.setSwapRequestsRequested(new ArrayList<>());
            emp.setLeaves(new ArrayList<>());
        }


        return null;
    }
}
