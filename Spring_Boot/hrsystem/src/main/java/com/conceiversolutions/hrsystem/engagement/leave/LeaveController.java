package com.conceiversolutions.hrsystem.engagement.leave;

import com.conceiversolutions.hrsystem.enums.LeaveTypeEnum;
import com.conceiversolutions.hrsystem.user.docdata.DocData;
import com.conceiversolutions.hrsystem.user.docdata.DocDataService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path="api/leaves")
@AllArgsConstructor
public class LeaveController {
    private final DocDataService docDataService;
    private final LeaveService leaveService;
//
//    @Autowired
//    public LeaveController(LeaveService leaveService) {
//        this.leaveService = leaveService;
//    }

    @GetMapping
    public List<Leave> getLeaves() {
        return leaveService.getLeaves();
    }

    @GetMapping(path = "getAllPendingLeaves")
    public List<Leave> getAllPendingLeaves() {
        return leaveService.getAllPendingLeaves();
    }

    @GetMapping(path = "getLeaveById")
    public Leave getLeaveById(@RequestParam("leaveId") Long leaveId) {
        return leaveService.getLeaveById(leaveId);
    }

    @PostMapping(path = "createLeave")
    public Long createLeave(@RequestParam("employeeId") Long employeeId,
                            @RequestParam("leaveType") String leaveTypeEnum,
                            @RequestParam("startDate") String startDate,
                            @RequestParam("endDate") String endDate,
                            @RequestParam("remark") String remark,
                            @RequestParam("document") MultipartFile file) throws IOException {
        DocData doc = null;
        if (file != null) {
            doc = docDataService.uploadDoc(file);
        }

        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);

        if (end.isBefore(start)) {
            throw new IllegalStateException("End Date cannot be before Start Date");
        }

        return leaveService.createLeave(employeeId, LeaveTypeEnum.valueOf(leaveTypeEnum), start, end, remark, doc);
    }

    @GetMapping(path = "getEmployeeLeaves")
    public List<Leave> getEmployeeLeaves(@RequestParam("employeeId") Long employeeId) {
        return leaveService.getEmployeeLeaves(employeeId);
    }

    @PutMapping(path = "approveLeave")
    public String approveLeave(@RequestParam("leaveId") Long leaveId,
                               @RequestParam("approverRemarks") String approverRemarks) {
        return leaveService.approveLeave(leaveId, approverRemarks);
    }

    @PutMapping(path = "rejectLeave")
    public String rejectLeave(@RequestParam("leaveId") Long leaveId,
                               @RequestParam("approverRemarks") String approverRemarks) {
        return leaveService.rejectLeave(leaveId, approverRemarks);
    }
}
