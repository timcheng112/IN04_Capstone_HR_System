package com.conceiversolutions.hrsystem.jobmanagement.jobposting;

import com.conceiversolutions.hrsystem.enums.JobStatusEnum;
import com.conceiversolutions.hrsystem.enums.JobTypeEnum;
import com.conceiversolutions.hrsystem.enums.PositionTypeEnum;
import com.conceiversolutions.hrsystem.enums.RoleEnum;
import com.conceiversolutions.hrsystem.jobmanagement.jobrequest.JobRequest;
import com.conceiversolutions.hrsystem.jobmanagement.jobrequest.JobRequestRepository;
import com.conceiversolutions.hrsystem.skillset.skillset.Skillset;
import com.conceiversolutions.hrsystem.skillset.skillset.SkillsetRepository;
import com.conceiversolutions.hrsystem.user.user.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class JobPostingService {
    private final JobPostingRepository jobPostingRepository;
    private final SkillsetRepository skillsetRepository;
    private final JobRequestRepository jobRequestRepository;

    public List<JobPosting> getAllJobPosts() {
        System.out.println("JobPostingService.getAllJobPosts");

        List<JobPosting> jobPosts = jobPostingRepository.findAll();
        System.out.println("size of job post list is " + jobPosts.size());

        for (JobPosting jp : jobPosts) {
            User poster = jp.getPostedBy();
            if (poster != null){
                poster.setProfilePic(null);
                poster.setPositions(new ArrayList<>());
                poster.setCurrentPosition(null);
                poster.setQualificationInformation(null);
                poster.setApplications(new ArrayList<>());
                poster.setJobRequests(new ArrayList<>());
                poster.setPayslips(new ArrayList<>());
                poster.setAttendances(new ArrayList<>());
                poster.setEmployeeAppraisals(new ArrayList<>());
                poster.setManagerAppraisals(new ArrayList<>());
                poster.setManagerReviews(new ArrayList<>());
                poster.setEmployeeReviews(new ArrayList<>());
                poster.setGoals(new ArrayList<>());
                poster.setTaskListItems(new ArrayList<>());
                poster.setTeams(new ArrayList<>());
                poster.setCurrentPayInformation(null);
                poster.setReactivationRequest(null);
                poster.setPreferredDates(null);
                poster.setBlocks(new ArrayList<>());
                poster.setShiftListItems(new ArrayList<>());
                poster.setSwapRequestsReceived(new ArrayList<>());
                poster.setSwapRequestsRequested(new ArrayList<>());
                poster.setLeaves(new ArrayList<>());
                poster.setLeaveQuotas(new ArrayList<>());
                poster.setCurrentLeaveQuota(null);
                poster.setBenefitPlanInstances(new ArrayList<>());
            }

            if (jp.getJobPostRequirements().size() != 0) {
                for (Skillset sk : jp.getJobPostRequirements()) {
                    sk.setJobRequests(new ArrayList<>());
                    sk.setJobPostings(new ArrayList<>());
                }
            }

            if (jp.getJobRequest() != null) {
                JobRequest jr = jp.getJobRequest();
                jr.setJobRequirements(new ArrayList<>());
                jr.setDepartment(null);
                jr.setTeam(null);
                jr.setRequestedBy(null);
                jr.setApprover(null);
                jr.setJobPosting(null);
            }
        }

        return jobPosts;
    }

    public boolean closeJobPost(Long jobPostingId) {
        System.out.println("JobPostingService.closeJobPost");
        System.out.println("jobPostingId = " + jobPostingId);

        Optional<JobPosting> jp = jobPostingRepository.findById(jobPostingId);
        if (jp.isEmpty()) {
            System.out.println("Job post don't exist");
            throw new IllegalStateException("Job Posting does not exist, cannot proceed");
        }

        JobPosting jobPost = jp.get();

        jobPost.setIsActive(false);
        jobPost.setStatus(JobStatusEnum.CLOSED);

        jobPostingRepository.save(jobPost);

        return true;
    }

    public Long editJobPost(Long jobPostingId, String jobTitle, String jobDescription, LocalDate preferredStartDate, JobTypeEnum jobTypeEnum, RoleEnum roleEnum, BigDecimal salaryMin, BigDecimal salaryMax, List<Long> jobRequirementIds, PositionTypeEnum posType) {
        System.out.println("JobPostingService.editJobPost");

        Optional<JobPosting> jp = jobPostingRepository.findById(jobPostingId);
        if (jp.isEmpty()) {
            System.out.println("Job post don't exist");
            throw new IllegalStateException("Job Posting does not exist, cannot proceed");
        }

        JobPosting jobPost = jp.get();

        checkInput(jobTitle, jobDescription, preferredStartDate, jobTypeEnum, roleEnum, salaryMin, salaryMax);

        jobPost.setJobTitle(jobTitle);
        jobPost.setJobDescription(jobDescription);
        jobPost.setPreferredStartDate(preferredStartDate);
        jobPost.setJobType(jobTypeEnum);
        jobPost.setJobRole(roleEnum);
        jobPost.setSalaryMin(salaryMin);
        jobPost.setSalaryMax(salaryMax);
        jobPost.setPosType(posType);

        List<Skillset> skillsets = new ArrayList<>();
        if (!jobRequirementIds.isEmpty()) {
            skillsets = skillsetRepository.findAllById(jobRequirementIds);
        }
        jobPost.setJobPostRequirements(skillsets);

        jobPostingRepository.save(jobPost);
        System.out.println("Job Posting edited and saved");
        return jobPostingId;
    }

    private void checkInput(String jobTitle, String jobDescription, LocalDate preferredStartDate, JobTypeEnum jobTypeEnum, RoleEnum roleEnum, BigDecimal salaryMin, BigDecimal salaryMax) {
        System.out.println("JobPostingService.checkInput");
        if (jobTitle.equals("")) {
            throw new IllegalStateException("jobTitle is missing");
        } else if (jobDescription.equals("")) {
            throw new IllegalStateException("jobDescription is missing");
        } else if (preferredStartDate == null) {
            throw new IllegalStateException("preferredStartDate is missing");
        } else if (preferredStartDate.isBefore(LocalDate.now())) {
            System.out.println(preferredStartDate);
            System.out.println(LocalDate.now());
            throw new IllegalStateException("preferredStartDate is invalid");
        } else if (jobTypeEnum == null) {
            throw new IllegalStateException("jobTypeEnum is missing");
        } else if (roleEnum == null) {
            throw new IllegalStateException("roleEnum is missing");
        } else if (salaryMin == null) {
            throw new IllegalStateException("salary is missing");
        } else if (salaryMin.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalStateException("salary is invalid");
        }else if (salaryMax == null) {
            throw new IllegalStateException("salary is missing");
        } else if (salaryMax.compareTo(salaryMin) <= 0) {
            throw new IllegalStateException("salary is invalid");
        }
    }

    public List<JobPosting> getAllOpenPosts() {
        System.out.println("JobPostingService.getAllOpenPosts");

        List<JobPosting> jobPosts = jobPostingRepository.findOpenPostings(JobStatusEnum.CREATED);
        System.out.println("size of open job post list is " + jobPosts.size());

        for (JobPosting jp : jobPosts) {
            User poster = jp.getPostedBy();
            if (poster != null){
                poster.setProfilePic(null);
                poster.setPositions(new ArrayList<>());
                poster.setCurrentPosition(null);
                poster.setQualificationInformation(null);
                poster.setApplications(new ArrayList<>());
                poster.setJobRequests(new ArrayList<>());
                poster.setPayslips(new ArrayList<>());
                poster.setAttendances(new ArrayList<>());
                poster.setEmployeeAppraisals(new ArrayList<>());
                poster.setManagerAppraisals(new ArrayList<>());
                poster.setManagerReviews(new ArrayList<>());
                poster.setEmployeeReviews(new ArrayList<>());
                poster.setGoals(new ArrayList<>());
                poster.setTaskListItems(new ArrayList<>());
                poster.setTeams(new ArrayList<>());
                poster.setCurrentPayInformation(null);
                poster.setReactivationRequest(null);
                poster.setPreferredDates(null);
                poster.setBlocks(new ArrayList<>());
                poster.setShiftListItems(new ArrayList<>());
                poster.setSwapRequestsReceived(new ArrayList<>());
                poster.setSwapRequestsRequested(new ArrayList<>());
                poster.setLeaves(new ArrayList<>());
                poster.setLeaveQuotas(new ArrayList<>());
                poster.setCurrentLeaveQuota(null);
                poster.setBenefitPlanInstances(new ArrayList<>());
            }

            if (jp.getJobPostRequirements().size() != 0) {
                for (Skillset sk : jp.getJobPostRequirements()) {
                    sk.setJobRequests(new ArrayList<>());
                    sk.setJobPostings(new ArrayList<>());
                }
            }

            if (jp.getJobRequest() != null) {
                JobRequest jr = jp.getJobRequest();
                jr.setJobRequirements(new ArrayList<>());
                jr.setDepartment(null);
                jr.setTeam(null);
                jr.setRequestedBy(null);
                jr.setApprover(null);
                jr.setJobPosting(null);
            }
        }

        return jobPosts;
    }

    public JobPosting getJobPostByRequest(Long requestId) {
        System.out.println("JobPostingService.getJobPostByRequest");
        System.out.println("requestId = " + requestId);

        Optional<JobRequest> jrOptional = jobRequestRepository.findById(requestId);
        if (jrOptional.isEmpty()) {
            throw new IllegalStateException("Job Request not found");
        }

        JobPosting jp = jrOptional.get().getJobPosting();
        jp.getPostedBy().nullify();

        if (jp.getJobRequest() != null) {
            JobRequest jr = jp.getJobRequest();
            jr.setJobRequirements(new ArrayList<>());
            jr.setDepartment(null);
            jr.setTeam(null);
            jr.setRequestedBy(null);
            jr.setApprover(null);
            jr.setJobPosting(null);
        }

        if (jp.getJobPostRequirements().size() != 0) {
            for (Skillset sk : jp.getJobPostRequirements()) {
                sk.setJobRequests(new ArrayList<>());
                sk.setJobPostings(new ArrayList<>());
            }
        }

        return jp;
    }
}
