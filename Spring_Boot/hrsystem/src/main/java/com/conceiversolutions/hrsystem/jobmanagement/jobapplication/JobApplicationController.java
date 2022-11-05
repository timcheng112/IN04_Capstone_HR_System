package com.conceiversolutions.hrsystem.jobmanagement.jobapplication;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/jobapplications")
@AllArgsConstructor
public class JobApplicationController {
    private final JobApplicationService jobApplicationService;

    @GetMapping("/findApplicationsByPostingId")
    public List<JobApplication> findApplicationsByPostingId(@RequestParam("postingId") Long postingId) {
        return jobApplicationService.findApplicationsByPostingId(postingId);
    }

    @GetMapping("/getApplicantApplications")
    public List<JobApplication> getApplicantApplications(@RequestParam("applicantId") Long applicantId) {
        return jobApplicationService.getApplicantApplications(applicantId);
    }

    @PostMapping("/createJobApplication")
    public Long createJobApplication(@RequestParam("postingId") Long postingId,
                                     @RequestParam("applicantId") Long applicantId,
                                     @RequestParam("userSkillIds") List<Long> userSkillIds,
                                     @RequestParam("availableStartDate") String availableStartDate) {
        return jobApplicationService.createJobApplication(postingId, applicantId, userSkillIds, LocalDate.parse(availableStartDate));
    }

    @DeleteMapping("/cancelJobApplication")
    public String cancelJobApplication(@RequestParam("applicationId") Long applicationId,
                                       @RequestParam("applicantId") Long applicantId) {
        return jobApplicationService.cancelJobApplication(applicationId, applicantId);
    }

    @PutMapping("/editJobApplication")
    public String editJobApplication(@RequestParam("postingId") Long postingId,
                                   @RequestParam("userSkillIds") List<Long> userSkillIds,
                                   @RequestParam("availableStartDate") String availableStartDate) {
        return jobApplicationService.editJobApplication(postingId, userSkillIds, LocalDate.parse(availableStartDate));
    }
}
