package com.conceiversolutions.hrsystem.jobmanagement.jobposting;

import com.conceiversolutions.hrsystem.enums.JobTypeEnum;
import com.conceiversolutions.hrsystem.enums.RoleEnum;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/jobposting")
@AllArgsConstructor
public class JobPostingController {
    private final JobPostingService jobPostingService;

    @GetMapping(path = "/getAllJobPosts")
    public List<JobPosting> getAllJobPosts() {
        return jobPostingService.getAllJobPosts();
    }

    @PutMapping(path = "/closeJobPost")
    public boolean closeJobPost(@RequestParam("jobPostingId") Long jobPostingId) {
        return jobPostingService.closeJobPost(jobPostingId);
    }

    @PutMapping(path = "editJobPost")
    public Long editJobPost(@RequestParam("jobPostingId") Long jobPostingId,
                            @RequestParam("jobTitle") String jobTitle,
                            @RequestParam("jobDescription") String jobDescription,
                            @RequestParam("preferredStartDate") String preferredStartDate,
                            @RequestParam("jobType") String jobType,
                            @RequestParam("jobRole") String jobRole,
                            @RequestParam("salary") Float salary,
                            @RequestParam("jobRequirements") List<Long> jobRequirementIds) {
        JobTypeEnum jobT = null;
        if (jobType.equals("CONTRACT") || jobType.equals("INTERN")) {
            jobT = JobTypeEnum.valueOf(jobType);
        } else if (jobType.equals("FULL TIME")) {
            jobT = JobTypeEnum.FULLTIME;
        } else {
            jobT = JobTypeEnum.PARTTIME;
        }

        return jobPostingService.editJobPost(jobPostingId, jobTitle, jobDescription, LocalDate.parse(preferredStartDate),
                jobT, RoleEnum.valueOf(jobRole), BigDecimal.valueOf(salary), jobRequirementIds);
    }
}
