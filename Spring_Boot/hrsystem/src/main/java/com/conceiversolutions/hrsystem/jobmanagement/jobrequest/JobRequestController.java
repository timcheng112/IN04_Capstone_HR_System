package com.conceiversolutions.hrsystem.jobmanagement.jobrequest;

import com.conceiversolutions.hrsystem.enums.JobTypeEnum;
import com.conceiversolutions.hrsystem.enums.RoleEnum;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/jobrequest")
@AllArgsConstructor
public class JobRequestController {
    private final JobRequestService jobRequestService;

    @GetMapping(path = "/getAllJobRequests")
    public List<JobRequest> getAllJobRequests() {
        return jobRequestService.getAllJobRequests();
    }

    @PostMapping(path = "/saveJobRequest")
    public Long saveJobRequest(@RequestParam("jobTitle") String jobTitle,
                               @RequestParam("jobDescription") String jobDescription,
                               @RequestParam("justification") String justification,
                               @RequestParam("preferredStartDate") String preferredStartDate,
                               @RequestParam("jobType") String jobType,
                               @RequestParam("jobRole") String jobRole,
                               @RequestParam("salary") BigDecimal salary,
                               @RequestParam("jobRequirementIds") List<Long> jobRequirementIds,
                               @RequestParam("departmentId") Long departmentId,
                               @RequestParam("teamId") Long teamId,
                               @RequestParam("requestedById") Long requestedById,
                               @RequestParam("jobRequestId") Long jobRequestId) {
        JobTypeEnum jobT = null;
        if (jobType.equals("Contract") || jobType.equals("Intern")) {
            jobT = JobTypeEnum.valueOf(jobType);
        } else if (jobType.equals("Full Time")) {
            jobT = JobTypeEnum.FULLTIME;
        } else {
            jobT = JobTypeEnum.PARTTIME;
        }

        return jobRequestService.saveJobRequest(jobTitle, jobDescription, justification, LocalDate.parse(preferredStartDate),
                jobT, RoleEnum.valueOf(jobRole), salary, jobRequirementIds, departmentId, requestedById, teamId, jobRequestId);
    }

    @PutMapping(path = "/submitJobRequest")
    public Long submitJobRequest(@RequestParam("jobTitle") String jobTitle,
                               @RequestParam("jobDescription") String jobDescription,
                               @RequestParam("justification") String justification,
                               @RequestParam("preferredStartDate") String preferredStartDate,
                               @RequestParam("jobType") String jobType,
                               @RequestParam("jobRole") String jobRole,
                               @RequestParam("salary") BigDecimal salary,
                               @RequestParam("jobRequirementIds") List<Long> jobRequirementIds,
                               @RequestParam("departmentId") Long departmentId,
                               @RequestParam("teamId") Long teamId,
                               @RequestParam("requestedById") Long requestedById,
                               @RequestParam("jobRequestId") Long jobRequestId) {
        JobTypeEnum jobT = null;
        if (jobType.equals("Contract") || jobType.equals("Intern")) {
            jobT = JobTypeEnum.valueOf(jobType);
        } else if (jobType.equals("Full Time")) {
            jobT = JobTypeEnum.FULLTIME;
        } else {
            jobT = JobTypeEnum.PARTTIME;
        }

        return jobRequestService.submitJobRequest(jobTitle, jobDescription, justification, LocalDate.parse(preferredStartDate),
                jobT, RoleEnum.valueOf(jobRole), salary, jobRequirementIds, departmentId, requestedById, teamId, jobRequestId);
    }

    @GetMapping(path = "/getJobRequestById")
    public JobRequest getJobRequestById(@RequestParam("jobRequestId") Long jobRequestId) {
        return jobRequestService.getJobRequestById(jobRequestId);
    }

    @DeleteMapping(path = "/deleteJobRequest")
    public String deleteJobRequest(Long jobRequestId) {
        return jobRequestService.deleteJobRequest(jobRequestId);
    }

//    @GetMapping(path = "getJobRequestsByIncludeTitle")
//    public List<JobRequest> getJobRequestsByIncludeTitle(@RequestParam("title") String title) {
//        return jobRequestService.getJobRequestsByIncludeTitle(title);
//    }
//
//    @GetMapping(path = "getJobRequestsByIncludeDescription")
//    public List<JobRequest> getJobRequestsByIncludeDescription(@RequestParam("description") String desc) {
//        return jobRequestService.getJobRequestsByIncludeDescription(desc);
//    }
//
//    @GetMapping(path = "getJobRequestsByDepartmentId")
//    public List<JobRequest> getJobRequestsByDepartmentId(@RequestParam("departmentId") Long id) {
//        return jobRequestService.getJobRequestsByDepartmentId(id);
//    }
//
    @GetMapping(path = "/getJobRequestsByRequestorId")
    public List<JobRequest> getJobRequestsByRequestorId(@RequestParam("requestorId") Long id) {
        return jobRequestService.getJobRequestsByRequestorId(id);
    }
//
//    @GetMapping(path = "getJobRequestsByApproverId")
//    public List<JobRequest> getJobRequestsByApproverId(@RequestParam("approverId") Long id) {
//        return jobRequestService.getJobRequestsByApproverId(id);
//    }
}
