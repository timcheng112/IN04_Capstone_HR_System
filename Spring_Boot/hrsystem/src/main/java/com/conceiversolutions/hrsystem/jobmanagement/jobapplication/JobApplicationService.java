package com.conceiversolutions.hrsystem.jobmanagement.jobapplication;

import com.conceiversolutions.hrsystem.enums.JobStatusEnum;
import com.conceiversolutions.hrsystem.enums.JobTypeEnum;
import com.conceiversolutions.hrsystem.enums.PositionTypeEnum;
import com.conceiversolutions.hrsystem.jobmanagement.jobposting.JobPosting;
import com.conceiversolutions.hrsystem.jobmanagement.jobposting.JobPostingRepository;
import com.conceiversolutions.hrsystem.skillset.skillset.Skillset;
import com.conceiversolutions.hrsystem.skillset.userskillset.UserSkillset;
import com.conceiversolutions.hrsystem.skillset.userskillset.UserSkillsetRepositoy;
import com.conceiversolutions.hrsystem.user.docdata.DocData;
import com.conceiversolutions.hrsystem.user.docdata.DocDataRepository;
import com.conceiversolutions.hrsystem.user.docdata.DocDataService;
import com.conceiversolutions.hrsystem.user.position.Position;
import com.conceiversolutions.hrsystem.user.position.PositionRepository;
import com.conceiversolutions.hrsystem.user.qualificationinformation.QualificationInformation;
import com.conceiversolutions.hrsystem.user.qualificationinformation.QualificationService;
import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
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
    private final QualificationService qualificationService;
    private final DocDataRepository docDataRepository;
    private final DocDataService docDataService;
    private final PositionRepository positionRepository;


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
            applicant.setBenefitPlanInstances(new ArrayList<>());

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

    public Long createJobApplicationTempFix(Long postingId, Long applicantId, LocalDate availableStartDate, MultipartFile file) throws IOException {
        System.out.println("JobApplicationService.createJobApplicationTempFix");
        System.out.println("postingId = " + postingId + ", applicantId = " + applicantId + ", availableStartDate = " + availableStartDate);
        User a = userRepository.findById(applicantId).get();
        User applicant = qualificationService.checkQIExists(a);

        if (availableStartDate.isBefore(LocalDate.now().plusDays(1))) {
            throw new IllegalStateException("Unable to set available date so close");
        }

//        List<UserSkillset> userSkills = new ArrayList<>();
//        if (!userSkillIds.isEmpty()) {
//            userSkills = userSkillsetRepositoy.findAllById(userSkillIds);
//        }
        System.out.println("AAAAAAAAAAAAAAAAAAAAAAAAAA");

        Optional<JobPosting> jobPostOptional = jobPostingRepository.findById(postingId);
        if (jobPostOptional.isEmpty()) {
            throw new IllegalStateException("Job Posting cannot be found, cannot proceed");
        } else if (!jobPostOptional.get().getStatus().equals(JobStatusEnum.CREATED)) {
            throw new IllegalStateException("Job Posting is not valid for applying, cannot proceed");
        }

//        Optional<JobPosting> jobPostOptional = jobPostingRepository.getValidPosting(postingId, JobStatusEnum.CREATED);
//        if (jobPostOptional.isEmpty()) {
//            throw new IllegalStateException("Job Posting is not valid for applying, cannot proceed");
//        }
        JobPosting jobPosting = jobPostOptional.get();
        System.out.println("BBBBBBBBBBBBBBBBBBBBBB");

        JobApplication newApplication = new JobApplication(jobPosting, LocalDate.now(), JobStatusEnum.PENDING, applicant, new ArrayList<>(), availableStartDate);

        QualificationInformation qi = applicant.getQualificationInformation();
        if (qi.getCv() != null) {
            DocData cv = docDataRepository.findById(qi.getCv().getDocId()).get();
            newApplication.setCV(cv);
        }
        if (null != file) {
            if (!file.isEmpty()) {
                DocData coverLetter = docDataService.uploadDoc(file);
                newApplication.setCoverLetter(coverLetter);
            }
        }
        if (qi.getTranscript() != null) {
            DocData transcript = docDataRepository.findById(qi.getTranscript().getDocId()).get();
            newApplication.setTranscript(transcript);
        }

        JobApplication savedApplication = jobApplicationRepository.saveAndFlush(newApplication);
        List<JobApplication> applications = applicant.getApplications();
        applications.add(savedApplication);
        applicant.setApplications(applications);
        userRepository.save(applicant);

        return savedApplication.getApplicationId();
    }

    public List<JobApplication> getPendingApplications(Long postingId) {
        System.out.println("JobApplicationService.getPendingApplications");
        System.out.println("postingId = " + postingId);

        Optional<JobPosting> jobPostingOptional = jobPostingRepository.findById(postingId);
        if (jobPostingOptional.isEmpty()) {
            throw new IllegalStateException("Job Posting not found");
        }

        List<JobApplication> applications = jobApplicationRepository.findApplicationsByPostingId(postingId);
        List<JobApplication> apps = new ArrayList<>();
        for (JobApplication ja : applications) {
            if (ja.getStatus().equals(JobStatusEnum.PENDING)) {
                JobPosting jp = ja.getJobPosting();
                jp.setJobRequest(null);
                for (Skillset ss : jp.getJobPostRequirements()) {
                    ss.setJobPostings(new ArrayList<>());
                    ss.setJobRequests(new ArrayList<>());
                }
                jp.getPostedBy().nullify();

                for (UserSkillset uss : ja.getUserSkills()) {
                    uss.getSkillset().setJobPostings(new ArrayList<>());
                    uss.getSkillset().setJobRequests(new ArrayList<>());
                }
                ja.getApplicant().nullify();
                apps.add(ja);
            }
        }

        System.out.println("size of pending applications list is " + apps.size());
        return apps;
    }

    public List<JobApplication> getShortlistedApplications(Long postingId) {
        System.out.println("JobApplicationService.getShortlistedApplications");
        System.out.println("postingId = " + postingId);

        Optional<JobPosting> jobPostingOptional = jobPostingRepository.findById(postingId);
        if (jobPostingOptional.isEmpty()) {
            throw new IllegalStateException("Job Posting not found");
        }

        List<JobApplication> applications = jobApplicationRepository.findApplicationsByPostingId(postingId);
        List<JobApplication> apps = new ArrayList<>();
        for (JobApplication ja : applications) {
            if (ja.getStatus().equals(JobStatusEnum.SHORTLISTED)) {
                JobPosting jp = ja.getJobPosting();
                jp.setJobRequest(null);
                for (Skillset ss : jp.getJobPostRequirements()) {
                    ss.setJobPostings(new ArrayList<>());
                    ss.setJobRequests(new ArrayList<>());
                }
                jp.getPostedBy().nullify();
                for (UserSkillset uss : ja.getUserSkills()) {
                    uss.getSkillset().setJobPostings(new ArrayList<>());
                    uss.getSkillset().setJobRequests(new ArrayList<>());
                }
                ja.getApplicant().nullify();
                apps.add(ja);
            }
        }

        System.out.println("size of shortlisted applications list is " + apps.size());
        return apps;
    }

    public List<JobApplication> getOfferedApplications(Long postingId) {
        System.out.println("JobApplicationService.getOfferedApplications");
        System.out.println("postingId = " + postingId);

        Optional<JobPosting> jobPostingOptional = jobPostingRepository.findById(postingId);
        if (jobPostingOptional.isEmpty()) {
            throw new IllegalStateException("Job Posting not found");
        }

        List<JobApplication> applications = jobApplicationRepository.findApplicationsByPostingId(postingId);
        List<JobApplication> apps = new ArrayList<>();
        for (JobApplication ja : applications) {
            if (ja.getStatus().equals(JobStatusEnum.OFFERED)) {
                JobPosting jp = ja.getJobPosting();
                jp.setJobRequest(null);
                for (Skillset ss : jp.getJobPostRequirements()) {
                    ss.setJobPostings(new ArrayList<>());
                    ss.setJobRequests(new ArrayList<>());
                }
                jp.getPostedBy().nullify();
                for (UserSkillset uss : ja.getUserSkills()) {
                    uss.getSkillset().setJobPostings(new ArrayList<>());
                    uss.getSkillset().setJobRequests(new ArrayList<>());
                }
                ja.getApplicant().nullify();
                apps.add(ja);
            }
        }

        System.out.println("size of offered applications list is " + apps.size());
        return apps;
    }

    public List<JobApplication> getRejectedApplications(Long postingId) {
        System.out.println("JobApplicationService.getRejectedApplications");
        System.out.println("postingId = " + postingId);

        Optional<JobPosting> jobPostingOptional = jobPostingRepository.findById(postingId);
        if (jobPostingOptional.isEmpty()) {
            throw new IllegalStateException("Job Posting not found");
        }

        List<JobApplication> applications = jobApplicationRepository.findApplicationsByPostingId(postingId);
        List<JobApplication> apps = new ArrayList<>();
        for (JobApplication ja : applications) {
            if (ja.getStatus().equals(JobStatusEnum.REJECTED)) {
                JobPosting jp = ja.getJobPosting();
                jp.setJobRequest(null);
                for (Skillset ss : jp.getJobPostRequirements()) {
                    ss.setJobPostings(new ArrayList<>());
                    ss.setJobRequests(new ArrayList<>());
                }
                jp.getPostedBy().nullify();
                for (UserSkillset uss : ja.getUserSkills()) {
                    uss.getSkillset().setJobPostings(new ArrayList<>());
                    uss.getSkillset().setJobRequests(new ArrayList<>());
                }
                ja.getApplicant().nullify();
                apps.add(ja);
            }
        }

        System.out.println("size of rejected applications list is " + apps.size());
        return apps;
    }


    public String shortlistApplicant(Long userId, Long postingId) {
        System.out.println("JobApplicationService.shortlistApplicant");
        System.out.println("userId = " + userId + ", postingId = " + postingId);

        Optional<User> uOptional = userRepository.findById(userId);
        User applicant = qualificationService.checkQIExists(uOptional.get());

        Optional<JobApplication> jobApplicationOptional = jobApplicationRepository.findApplicantApplication(postingId, userId);
        if (jobApplicationOptional.isEmpty()) {
            throw new IllegalStateException("Job Application not found");
        }

        JobApplication application = jobApplicationOptional.get();
        if (application.getStatus().equals(JobStatusEnum.REJECTED)) {
            throw new IllegalStateException("Only Not Rejected applications can be offered");
        }

        // shortlist
        application.setStatus(JobStatusEnum.SHORTLISTED);
        application.setLastUpdatedAt(LocalDateTime.now());
        jobApplicationRepository.save(application);

        return "Applicant Shortlisted Successfully";
    }


    public String rejectApplicant(Long userId, Long postingId) {
        System.out.println("JobApplicationService.rejectApplicant");
        System.out.println("userId = " + userId + ", postingId = " + postingId);

        Optional<User> uOptional = userRepository.findById(userId);
        User applicant = qualificationService.checkQIExists(uOptional.get());

        Optional<JobApplication> jobApplicationOptional = jobApplicationRepository.findApplicantApplication(postingId, userId);
        if (jobApplicationOptional.isEmpty()) {
            throw new IllegalStateException("Job Application not found");
        }

        JobApplication application = jobApplicationOptional.get();

        // reject
        application.setStatus(JobStatusEnum.REJECTED);
        application.setLastUpdatedAt(LocalDateTime.now());
        jobApplicationRepository.save(application);
        return "Applicant Rejected Successfully";
    }

    public String offerApplicant(Long userId, Long postingId, LocalDate startDate, BigDecimal salaryOffered) {
        System.out.println("JobApplicationService.offerApplicant");
        System.out.println("userId = " + userId + ", postingId = " + postingId + ", startDate = " + startDate + ", salaryOffered = " + salaryOffered);

        Optional<User> uOptional = userRepository.findById(userId);
        User applicant = qualificationService.checkQIExists(uOptional.get());

        Optional<JobApplication> jobApplicationOptional = jobApplicationRepository.findApplicantApplication(postingId, userId);
        if (jobApplicationOptional.isEmpty()) {
            throw new IllegalStateException("Job Application not found");
        }

        JobApplication application = jobApplicationOptional.get();
        if (!application.getStatus().equals(JobStatusEnum.SHORTLISTED)) {
            throw new IllegalStateException("Only Shortlisted applications can be offered");
        }

        // offer
        application.setStatus(JobStatusEnum.OFFERED);
        application.setLastUpdatedAt(LocalDateTime.now());
        application.setStartDate(startDate);
        jobApplicationRepository.save(application);

        if (application.getJobPosting().getJobType().equals(JobTypeEnum.FULLTIME) ||
                application.getJobPosting().getJobType().equals(JobTypeEnum.INTERN)) {
            application.getJobPosting().setSalary(salaryOffered);
            jobPostingRepository.save(application.getJobPosting());
        }

        return "Offer Made to Applicant";
    }

    public String rejectApplicantOffer(Long userId, Long postingId) {
        System.out.println("JobApplicationService.rejectApplicantOffer");
        System.out.println("userId = " + userId + ", postingId = " + postingId);

        Optional<User> uOptional = userRepository.findById(userId);
        User applicant = qualificationService.checkQIExists(uOptional.get());

        Optional<JobApplication> jobApplicationOptional = jobApplicationRepository.findApplicantApplication(postingId, userId);
        if (jobApplicationOptional.isEmpty()) {
            throw new IllegalStateException("Job Application not found");
        }

        JobApplication application = jobApplicationOptional.get();
        if (!application.getStatus().equals(JobStatusEnum.OFFERED)) {
            throw new IllegalStateException("Only Offered applications can be rejected by the Applicant");
        }
        // reject offer
        application.setStatus(JobStatusEnum.REJECTED);
        application.setLastUpdatedAt(LocalDateTime.now());
        jobApplicationRepository.save(application);
        return "Applicant Rejected Offer Successfully";
    }

    public String acceptApplicantOffer(Long userId, Long postingId) {
        System.out.println("JobApplicationService.acceptApplicantOffer");
        System.out.println("userId = " + userId + ", postingId = " + postingId);

        Optional<User> uOptional = userRepository.findById(userId);
        User applicant = qualificationService.checkQIExists(uOptional.get());

        Optional<JobApplication> jobApplicationOptional = jobApplicationRepository.findApplicantApplication(postingId, userId);
        if (jobApplicationOptional.isEmpty()) {
            throw new IllegalStateException("Job Application not found");
        }

        JobApplication application = jobApplicationOptional.get();
        if (!application.getStatus().equals(JobStatusEnum.OFFERED)) {
            throw new IllegalStateException("Only Offered applications can be accepted by the Applicant");
        }
        // accept offer
        application.setStatus(JobStatusEnum.ACCEPTED);
        application.setLastUpdatedAt(LocalDateTime.now());

        // create position
        Position newPos = new Position(application.getJobPosting().getJobTitle(), application.getJobPosting().getJobDescription(), application.getStartDate(), application.getJobPosting().getJobType());
        newPos.setPosType(application.getJobPosting().getPosType());
        Position savedPos = positionRepository.saveAndFlush(newPos);

        // change user to employee
        applicant.setCurrentPosition(savedPos);
        List<Position> positions = new ArrayList<>();
        positions.add(savedPos);
        applicant.setPositions(positions);


        // TODO: to continue
//        jobApplicationRepository.save(application);
        return "Applicant Rejected Offer Successfully";
    }
}
