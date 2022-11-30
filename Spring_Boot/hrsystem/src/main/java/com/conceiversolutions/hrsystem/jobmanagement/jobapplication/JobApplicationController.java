package com.conceiversolutions.hrsystem.jobmanagement.jobapplication;

import com.conceiversolutions.hrsystem.user.user.User;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
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

    @GetMapping("/getPendingApplications")
    public List<JobApplication> getPendingApplications(@RequestParam("postingId") Long postingId) {
        return jobApplicationService.getPendingApplications(postingId);
    }

    @GetMapping("/getShortlistedApplications")
    public List<JobApplication> getShortlistedApplications(@RequestParam("postingId") Long postingId) {
        return jobApplicationService.getShortlistedApplications(postingId);
    }

    @GetMapping("/getOfferedApplications")
    public List<JobApplication> getOfferedApplications(@RequestParam("postingId") Long postingId) {
        return jobApplicationService.getOfferedApplications(postingId);
    }

    @GetMapping("/getRejectedApplications")
    public List<JobApplication> getRejectedApplications(@RequestParam("postingId") Long postingId) {
        return jobApplicationService.getRejectedApplications(postingId);
    }

    @PutMapping("/shortlistApplicant")
    public String shortlistApplicant(@RequestParam("userId") Long userId,
                                     @RequestParam("postingId") Long postingId) {
        return jobApplicationService.shortlistApplicant(userId, postingId);
    }

    @PutMapping("/rejectApplicant")
    public String rejectApplicant(@RequestParam("userId") Long userId,
                                     @RequestParam("postingId") Long postingId) {
        return jobApplicationService.rejectApplicant(userId, postingId);
    }

    @PutMapping("/offerApplicant")
    public String offerApplicant(@RequestParam("userId") Long userId,
                                 @RequestParam("postingId") Long postingId,
                                 @RequestParam("startDate") String startDate,
                                 @RequestParam("salaryOffered") Float salaryOffered) {
        return jobApplicationService.offerApplicant(userId, postingId, LocalDate.parse(startDate), BigDecimal.valueOf(salaryOffered));
    }

    @PutMapping("/rejectOffer")
    public String rejectOffer(@RequestParam("userId") Long userId,
                              @RequestParam("postingId") Long postingId) {
        return jobApplicationService.rejectApplicantOffer(userId, postingId);
    }

    @PutMapping("/acceptOffer")
    public String acceptOffer(@RequestParam("userId") Long userId,
                              @RequestParam("postingId") Long postingId) {
        return jobApplicationService.acceptApplicantOffer(userId, postingId);
    }

    @GetMapping("/getJobOffersWithinAMonth")
    public List<JobApplication> getJobOffersWithinAMonth() {
        return jobApplicationService.getJobOffersWithinAMonth();
    }
}
