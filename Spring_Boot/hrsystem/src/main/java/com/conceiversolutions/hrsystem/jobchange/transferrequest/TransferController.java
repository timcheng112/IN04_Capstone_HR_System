package com.conceiversolutions.hrsystem.jobchange.transferrequest;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.conceiversolutions.hrsystem.organizationstructure.department.Department;
import com.conceiversolutions.hrsystem.organizationstructure.team.Team;
import com.conceiversolutions.hrsystem.user.position.Position;
import com.conceiversolutions.hrsystem.user.user.User;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/transfer")
@AllArgsConstructor
public class TransferController {

    private final TransferService transferService;

    public List<TransferRequest> getAllTransferRequests() {
        return transferService.getAllTransferRequests();
    }

    @GetMapping(path = "/{requestId}")
    public TransferRequest getTransferRequest(@PathVariable("requestId") Long requestId) throws Exception {
        return transferService.getTransferRequest(requestId);
    }

    @GetMapping(path = "/employees/{userId}")
    public List<User> getTransferrableEmployees(@PathVariable("userId") Long userId) throws Exception {
        return transferService.getTransferrableEmployees(userId);
    }

    @GetMapping(path = "/positions/{managerId}")
    public List<Position> getPositionsToTransfer(@PathVariable("managerId") Long managerId,
            @RequestParam("role") String role,
            @RequestParam("positionId") Long positionId) {
        return transferService.getPositionsToTransfer(managerId, role, positionId);
    }

    @GetMapping(path = "/department/{positionId}")
    public Department getNewDepartment(@PathVariable("positionId") Long positionId) throws Exception {
        return transferService.getNewDepartment(positionId);
    }

    @GetMapping(path = "/team/{userId}")
    public Team getNewTeam(@PathVariable("userId") Long userId) throws Exception {
        return transferService.getNewTeam(userId);
    }

    @PostMapping
    public Long createTransferRequest(@RequestParam("managerId") Long managerId,
            @RequestParam("employeeId") Long employeeId,
            @RequestParam("positionId") Long positionId,
            @RequestParam("departmentId") Long departmentId,
            @RequestParam("teamId") Long teamId,
            @RequestParam("interviewDate") String interviewDate) throws Exception {
        return transferService.createTransferRequest(managerId, employeeId, positionId, departmentId, teamId,
                interviewDate);
    }

    @PutMapping(path = "/interview/{transferId}")
    public String conductInterview(@PathVariable("transferId") Long transferId,
            @RequestParam("comments") String comments, @RequestParam("status") String status) throws Exception {
        return transferService.conductInterview(transferId, comments, status);
    }

    @PutMapping(path = "/process/{transferId}")
    public String processTransferRequest(@PathVariable("transferId") Long transferId,
            @RequestParam("rejectRemarks") String rejectRemarks,
            @RequestParam("basicSalary") String basicSalary,
            @RequestParam("basicHourlyPay") String basicHourlyPay,
            @RequestParam("weekendHourlyPay") String weekendHourlyPay,
            @RequestParam("eventPay") String eventPay,
            @RequestParam("processedBy") Long processedById)
            throws Exception {
        return transferService.processTransferRequest(transferId, rejectRemarks, basicSalary,
                basicHourlyPay, weekendHourlyPay, eventPay, processedById);
    }

    @GetMapping(path = "/active/{userId}")
    public List<TransferRequest> getActiveRequests(@PathVariable("userId") Long userId) throws Exception {
        return transferService.getActiveRequests(userId);
    }

    @GetMapping(path = "/interview/{userId}")
    public List<TransferRequest> getInterviewRequests(@PathVariable("userId") Long userId) throws Exception {
        return transferService.getInterviewRequests(userId);
    }

    @GetMapping(path = "/approve/{userId}")
    public List<TransferRequest> getApproveRequests(@PathVariable("userId") Long userId) throws Exception {
        return transferService.getApproveRequests(userId);
    }

    @GetMapping(path = "/history/{userId}")
    public List<TransferRequest> getRequestHistory(@PathVariable("userId") Long userId) throws Exception {
        return transferService.getRequestHistory(userId);
    }

    @GetMapping(path = "/team/department/{departmentId}")
    public List<Team> getPossibleTeams(@PathVariable("departmentId") Long departmentId) throws Exception {
        return transferService.getPossibleTeams(departmentId);
    }

    @GetMapping
    public List<TransferRequest> getAllRequests() throws Exception {
        return transferService.getAllRequests();
    }
}
