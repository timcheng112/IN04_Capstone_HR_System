package com.conceiversolutions.hrsystem.jobmanagement.jobapplication;

import com.conceiversolutions.hrsystem.user.user.User;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    @PostMapping("/createJobApplicationTempFix")
    public Long createJobApplicationTempFix(@RequestParam("postingId") Long postingId,
                                     @RequestParam("applicantId") Long applicantId,
                                     @RequestParam("availableStartDate") String availableStartDate,
                                        @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        return jobApplicationService.createJobApplicationTempFix(postingId, applicantId, LocalDate.parse(availableStartDate), file);
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

    @GetMapping("/getShortlistedApplicants")
    public List<User> getShortlistedApplicants(@RequestParam("postingId") Long postingId) {
        return jobApplicationService.getShortlistedApplicants(postingId);
    }

    @GetMapping("/getOfferedApplicants")
    public List<User> getOfferedApplicants(@RequestParam("postingId") Long postingId) {
        return jobApplicationService.getOfferedApplicants(postingId);
    }

    @GetMapping("/getRejectedApplicants")
    public List<User> getRejectedApplicants(@RequestParam("postingId") Long postingId) {
        return jobApplicationService.getRejectedApplicants(postingId);
    }
}
