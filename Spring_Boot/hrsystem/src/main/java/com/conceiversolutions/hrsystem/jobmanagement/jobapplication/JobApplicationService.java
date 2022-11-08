package com.conceiversolutions.hrsystem.jobmanagement.jobapplication;

import com.conceiversolutions.hrsystem.enums.JobStatusEnum;
import com.conceiversolutions.hrsystem.jobmanagement.jobposting.JobPosting;
import com.conceiversolutions.hrsystem.jobmanagement.jobposting.JobPostingRepository;
import com.conceiversolutions.hrsystem.skillset.skillset.Skillset;
import com.conceiversolutions.hrsystem.skillset.userskillset.UserSkillset;
import com.conceiversolutions.hrsystem.skillset.userskillset.UserSkillsetRepositoy;
import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class JobApplicationService {
    private final JobApplicationRepository jobApplicationRepository;
    private final JobPostingRepository jobPostingRepository;
    private final UserRepository userRepository;
    private final UserSkillsetRepositoy userSkillsetRepositoy;


    public List<JobApplication> findApplicationsByPostingId(Long postingId) {
        System.out.println("JobApplicationService.findApplicationsByPostingId");
        System.out.println("postingId = " + postingId);

        List<JobApplication> applications = jobApplicationRepository.findApplicationsByPostingId(postingId);
        System.out.println("size of application list is " + applications.size());

        for (JobApplication ja : applications) {
            User applicant = ja.getApplicant();
            applicant.setProfilePic(null);
            applicant.setPositions(new ArrayList<>());
            applicant.setCurrentPosition(null);
            applicant.setQualificationInformation(null);
            applicant.setApplications(new ArrayList<>());
            applicant.setJobRequests(new ArrayList<>());
            applicant.setPayslips(new ArrayList<>());
            applicant.setAttendances(new ArrayList<>());
            applicant.setEmployeeAppraisals(new ArrayList<>());
            applicant.setManagerAppraisals(new ArrayList<>());
            applicant.setManagerReviews(new ArrayList<>());
            applicant.setEmployeeReviews(new ArrayList<>());
            applicant.setGoals(new ArrayList<>());
            applicant.setTaskListItems(new ArrayList<>());
            applicant.setTeams(new ArrayList<>());
            applicant.setCurrentPayInformation(null);
            applicant.setReactivationRequest(null);
            applicant.setPreferredDates(null);
            applicant.setBlocks(new ArrayList<>());
            applicant.setShiftListItems(new ArrayList<>());
            applicant.setSwapRequestsReceived(new ArrayList<>());
            applicant.setSwapRequestsRequested(new ArrayList<>());
            applicant.setLeaves(new ArrayList<>());
            applicant.setLeaveQuotas(new ArrayList<>());
            applicant.setCurrentLeaveQuota(null);

            JobPosting jp = ja.getJobPosting();
            if (jp.getJobPostRequirements().size() != 0) {
                for (Skillset sk : jp.getJobPostRequirements()) {
                    sk.setJobRequests(new ArrayList<>());
                    sk.setJobPostings(new ArrayList<>());
                }
            }
            jp.setPostedBy(null);
            jp.setJobRequest(null);

            for (UserSkillset sk : ja.getUserSkills()) {
                sk.getSkillset().setJobRequests(new ArrayList<>());
                sk.getSkillset().setJobPostings(new ArrayList<>());
            }
        }
        return applications;
    }

    public List<JobApplication> getApplicantApplications(Long applicantId) {
        System.out.println("JobApplicationService.getApplicantApplications");
        System.out.println("applicantId = " + applicantId);

        List<JobApplication> applications = jobApplicationRepository.findApplicationsByApplicantId(applicantId);
        System.out.println("size of application list is " + applications.size());

        for (JobApplication ja : applications) {
            ja.setApplicant(null);

            JobPosting jp = ja.getJobPosting();
            if (jp.getJobPostRequirements().size() != 0) {
                for (Skillset sk : jp.getJobPostRequirements()) {
                    sk.setJobRequests(new ArrayList<>());
                    sk.setJobPostings(new ArrayList<>());
                }
            }
            jp.setPostedBy(null);
            jp.setJobRequest(null);

            for (UserSkillset sk : ja.getUserSkills()) {
                sk.getSkillset().setJobRequests(new ArrayList<>());
                sk.getSkillset().setJobPostings(new ArrayList<>());
            }
        }
        return applications;
    }

    public Long createJobApplication(Long postingId, Long applicantId, List<Long> userSkillIds, LocalDate availableStartDate) {
        System.out.println("JobApplicationService.createJobApplication");
        System.out.println("postingId = " + postingId + ", applicantId = " + applicantId + ", userSkillIds = " + userSkillIds + ", availableStartDate = " + availableStartDate);

        if (availableStartDate.isBefore(LocalDate.now().plusDays(1))) {
            throw new IllegalStateException("Unable to set available date so close");
        }

        Optional<User> applicantOptional = userRepository.findById(applicantId);
        if (applicantOptional.isEmpty()) {
            throw new IllegalStateException("Applicant cannot be found, cannot proceed");
        }
        User applicant = applicantOptional.get();

        List<UserSkillset> userSkills = new ArrayList<>();
        if (!userSkillIds.isEmpty()) {
            userSkills = userSkillsetRepositoy.findAllById(userSkillIds);
        }

        Optional<JobPosting> jobPostOptional = jobPostingRepository.getValidPosting(postingId, JobStatusEnum.CREATED);
        if (jobPostOptional.isEmpty()) {
            throw new IllegalStateException("Job Posting is not valid for applying, cannot proceed");
        }
        JobPosting jobPosting = jobPostOptional.get();

        JobApplication newApplication = new JobApplication(jobPosting, LocalDate.now(), JobStatusEnum.PENDING, applicant, userSkills, availableStartDate);
        JobApplication savedApplication = jobApplicationRepository.saveAndFlush(newApplication);

        return savedApplication.getApplicationId();
    }

    public String cancelJobApplication(Long applicationId, Long applicantId) {
        System.out.println("JobApplicationService.cancelJobApplication");
        System.out.println("applicationId = " + applicationId + ", applicantId = " + applicantId);

        Optional<JobApplication> applicationOptional = jobApplicationRepository.findById(applicationId);
        if (applicationOptional.isEmpty()) {
            throw new IllegalStateException("Application cannot be found, cannot proceed");
        }
        JobApplication jobApplication = applicationOptional.get();

        if (!jobApplication.getApplicant().getUserId().equals(applicantId)) {
            throw new IllegalStateException("Unable to cancel this application as it does not belong to the applicant");
        }

        jobApplication.setStatus(JobStatusEnum.CANCELLED);
        jobApplication.setLastUpdatedAt(LocalDateTime.now());
        jobApplicationRepository.save(jobApplication);
        return "Job Application cancelled successfully";
    }

    public String editJobApplication(Long postingId, List<Long> userSkillIds, LocalDate availableStartDate) {
        System.out.println("JobApplicationService.editJobApplication");
        System.out.println("postingId = " + postingId + ", userSkillIds = " + userSkillIds + ", availableStartDate = " + availableStartDate);

        if (availableStartDate.isBefore(LocalDate.now().plusDays(1))) {
            throw new IllegalStateException("Unable to set available date so close");
        }

        Optional<JobPosting> jobPostOptional = jobPostingRepository.getValidPosting(postingId, JobStatusEnum.CREATED);
        if (jobPostOptional.isEmpty()) {
            throw new IllegalStateException("Valid Job Posting cannot be found, cannot proceed");
        }
        JobPosting jobPosting = jobPostOptional.get();

        List<UserSkillset> userSkills = new ArrayList<>();
        if (!userSkillIds.isEmpty()) {
            userSkills = userSkillsetRepositoy.findAllById(userSkillIds);
        }

        JobApplication application = jobApplicationRepository.findById(postingId).get();
        application.setAvailableStartDate(availableStartDate);
        application.setUserSkills(userSkills);
        application.setLastUpdatedAt(LocalDateTime.now());

        return "Job Application succssfully updated";
    }
}
