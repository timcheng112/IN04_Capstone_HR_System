package com.conceiversolutions.hrsystem.engagement.leave;

import com.conceiversolutions.hrsystem.administration.tasklistitem.TaskListItem;
import com.conceiversolutions.hrsystem.engagement.leavequota.LeaveQuota;
import com.conceiversolutions.hrsystem.engagement.leavequota.LeaveQuotaRepository;
import com.conceiversolutions.hrsystem.enums.LeaveTypeEnum;
import com.conceiversolutions.hrsystem.enums.StatusEnum;
import com.conceiversolutions.hrsystem.organizationstructure.team.Team;
import com.conceiversolutions.hrsystem.user.docdata.DocData;
import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class LeaveService {

    private final LeaveRepository leaveRepository;
    private final UserRepository userRepository;
    private final LeaveQuotaRepository leaveQuotaRepository;

//    @Autowired
//    public LeaveService(LeaveRepository leaveRepository) {
//        this.leaveRepository = leaveRepository;
//    }

    public List<Leave> getLeaves() {
        return leaveRepository.findAll();
    }

    public List<Leave> getAllLeaves() {
        System.out.println("LeaveService.getAllPendingLeaves");

        List<Leave> leaves = leaveRepository.findAll();
        System.out.println("Size of leaves list is " + leaves.size());

        // settle user side cyclic dependency
        for (Leave l : leaves) {
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

            // deal with user cyclic dependencies
            emp.setQualificationInformation(null);
            emp.setReactivationRequest(null);
            emp.setAttendances(new ArrayList<>());
            emp.setCurrentPayInformation(null);
            emp.setEmployeeAppraisals(new ArrayList<>());
            emp.setManagerAppraisals(new ArrayList<>());
            emp.setManagerReviews(new ArrayList<>());
            emp.setEmployeeReviews(new ArrayList<>());
            // emp.setModules(new ArrayList<>());
            emp.setApplications(new ArrayList<>());
            emp.setGoals(new ArrayList<>());
            emp.setPositions(new ArrayList<>());
            emp.setJobRequests(new ArrayList<>());
            emp.setBlocks(new ArrayList<>());
            emp.setShiftListItems(new ArrayList<>());
            emp.setSwapRequestsReceived(new ArrayList<>());
            emp.setSwapRequestsRequested(new ArrayList<>());
            emp.setLeaves(new ArrayList<>());

            if (l.getSupportingDocument() != null) {
                l.getSupportingDocument().setDocData(new byte[]{});
            }
        }

        return leaves;
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

            // deal with user cyclic dependencies
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

            if (l.getSupportingDocument() != null) {
                l.getSupportingDocument().setDocData(new byte[]{});
            }
        }

        return pending;
    }

    public Leave getLeaveById(Long leaveId) {
        System.out.println("LeaveService.getLeaveById");
        System.out.println("leaveId = " + leaveId);

        Optional<Leave> l = leaveRepository.findById(leaveId);
        if (l.isEmpty()) {
            System.out.println("cant find leave");
            throw new IllegalStateException("Leave does not exist");
        }

        Leave leave = l.get();
        leave.setEmployee(null);

        if (leave.getSupportingDocument() != null) {
            leave.getSupportingDocument().setDocData(new byte[]{});
        }

        return leave;
    }

    public Long createLeave(Long employeeId, LeaveTypeEnum leaveTypeEnum, LocalDate start, LocalDate end, String remark, DocData doc) {
        System.out.println("LeaveService.createLeave");

        User employee = userRepository.findById(employeeId).get();

        // check quota is enough
        if (employee.getCurrentLeaveQuota() == null) {
            throw new IllegalStateException("Employee has no current leave quota, cannot take leaves");
        }
        LeaveQuota lq = leaveQuotaRepository.findById(employee.getCurrentLeaveQuota().getLeaveQuotaId()).get();

        // count number of days
        int days = (int) ChronoUnit.DAYS.between(start, end);
        days++;

        // if no error, will carry on after this check
        checkQuota(leaveTypeEnum.name(), lq, days);

        // if enough, create leave object then deduct from quota
        Leave newLeave = new Leave(start, end, leaveTypeEnum, remark, employee, doc);
        System.out.println(newLeave);

        // save leave
        Leave savedLeave = leaveRepository.saveAndFlush(newLeave);

        // update quota
        // when approve then deduct
//        LeaveQuota updateQuota = updateQuota(leaveTypeEnum.name(), lq, days);
//        leaveQuotaRepository.save(updateQuota);

        // add leave to user's leaves list and save user
        List<Leave> employeeLeaves = employee.getLeaves();
        employeeLeaves.add(savedLeave);
        employee.setLeaves(employeeLeaves);
        userRepository.save(employee);

        return savedLeave.getLeaveId();
    }

    private void checkQuota(String leaveType, LeaveQuota lq, int days) {
        System.out.println("LeaveService.checkQuota");
        System.out.println("leaveType = " + leaveType + ", days = " + days);
        boolean checker = false;
        // Annual Leave ANL
        // checks from this year quota and last year's quota
        if (leaveType.equals(LeaveTypeEnum.ANL.name())) {
            checker = lq.getAvailableANL() < days;
        }
        // Medical Leave MCL
        if (leaveType.equals(LeaveTypeEnum.MCL.name())) {
            checker = lq.getMCL() < days;
        }

        //TODO: check other leave types

        if (checker) {
            throw new IllegalStateException("Insufficient number of " + leaveType + " leaves available");
        }
    }

    private LeaveQuota updateQuota(String leaveType, LeaveQuota lq, int days) {
        System.out.println("LeaveService.updateQuota");
        System.out.println("leaveType = " + leaveType + ", days = " + days);
        // Annual Leave ANL
        if (leaveType.equals(LeaveTypeEnum.ANL.name())) {
            // prioritize taking last year's ANL first.
            int left = days;
            // try to take from last year ANL
            if (lq.getPreviousLeaveQuota() != null) {
                if (lq.getPreviousLeaveQuota().getANL() > 0) {
                    int amtToDeduce = Math.min(lq.getPreviousLeaveQuota().getANL(), days);

                    left -= amtToDeduce;
                    lq.getPreviousLeaveQuota().setANL(lq.getPreviousLeaveQuota().getANL() - amtToDeduce);
                }
            }
            // deduct remainder from current quota
            if (left > 0) {
                lq.setANL(lq.getANL() - left);
            }
        }
        // Medical Leave MCL
        if (leaveType.equals(LeaveTypeEnum.MCL.name())) {
            lq.setMCL(lq.getMCL() - days);
        }
        //TODO: update other leave types

        return lq;
    }

    public List<Leave> getEmployeeLeaves(Long employeeId) {
        System.out.println("LeaveService.getEmployeeLeaves");
        System.out.println("employeeId = " + employeeId);

        List<Leave> leaves = leaveRepository.findLeavesByEmployeeId(employeeId);
        System.out.println("size of leaves list is " + leaves.size());

        for (Leave l : leaves) {
            l.setEmployee(null);
        }

        return leaves;
    }

    public String approveLeave(Long leaveId, String approverRemarks) {
        System.out.println("LeaveService.approveLeave");
        System.out.println("leaveId = " + leaveId + ", approverRemarks = " + approverRemarks);
        Optional<Leave> l = leaveRepository.findById(leaveId);
        if (l.isEmpty()) {
            System.out.println("cant find leave");
            throw new IllegalStateException("Leave does not exist");
        }
        Leave leave = l.get();

        User employee = userRepository.findById(leave.getEmployee().getUserId()).get();
        LeaveQuota lq = leaveQuotaRepository.findById(employee.getCurrentLeaveQuota().getLeaveQuotaId()).get();
        // count number of days
        int days = (int) ChronoUnit.DAYS.between(leave.getStartDate(), leave.getEndDate());
        days++;
        // check quota is enough
        // if no error, will carry on after this check
        checkQuota(leave.getLeaveType().name(), lq, days);
        // update quota
        // when apply will deduct. if rejected will refund
        LeaveQuota updateQuota = updateQuota(leave.getLeaveType().name(), lq, days);
        leaveQuotaRepository.save(updateQuota);

        leave.setApproverRemarks(approverRemarks);
        leave.setApprovalDate(LocalDate.now());
        leave.setStatus(StatusEnum.APPROVED);

        leaveRepository.save(leave);

        return "Leave has been approved successfully";
    }

    public String rejectLeave(Long leaveId, String approverRemarks) {
        System.out.println("LeaveService.rejectLeave");
        System.out.println("leaveId = " + leaveId + ", approverRemarks = " + approverRemarks);

        Optional<Leave> l = leaveRepository.findById(leaveId);
        if (l.isEmpty()) {
            System.out.println("cant find leave");
            throw new IllegalStateException("Leave does not exist");
        }

        Leave leave = l.get();

        leave.setApproverRemarks(approverRemarks);
        leave.setApprovalDate(LocalDate.now());
        leave.setStatus(StatusEnum.REJECTED);

        leaveRepository.save(leave);

        return "Leave has been rejected sadly";
    }

    public boolean cancelLeave(Long leaveId) {
        System.out.println("LeaveService.cancelLeave");
        System.out.println("leaveId = " + leaveId);

        Optional<Leave> l = leaveRepository.findById(leaveId);
        if (l.isEmpty()) {
            System.out.println("cant find leave");
            throw new IllegalStateException("Leave does not exist");
        }
        Leave leave = l.get();
        if (!leave.getStatus().equals(StatusEnum.PENDING)) {
            throw new IllegalStateException("Leave cannot be cancelled");
        }
        leave.setStatus(StatusEnum.CANCELLED);
        leaveRepository.save(leave);
        return true;
    }
}
