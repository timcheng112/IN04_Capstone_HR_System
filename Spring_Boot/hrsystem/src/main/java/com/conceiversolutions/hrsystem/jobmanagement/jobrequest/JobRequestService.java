package com.conceiversolutions.hrsystem.jobmanagement.jobrequest;

import com.conceiversolutions.hrsystem.enums.JobStatusEnum;
import com.conceiversolutions.hrsystem.enums.JobTypeEnum;
import com.conceiversolutions.hrsystem.enums.RoleEnum;
import com.conceiversolutions.hrsystem.enums.StatusEnum;
import com.conceiversolutions.hrsystem.jobmanagement.jobposting.JobPosting;
import com.conceiversolutions.hrsystem.jobmanagement.jobposting.JobPostingRepository;
import com.conceiversolutions.hrsystem.organizationstructure.department.Department;
import com.conceiversolutions.hrsystem.organizationstructure.department.DepartmentRepository;
import com.conceiversolutions.hrsystem.organizationstructure.team.Team;
import com.conceiversolutions.hrsystem.organizationstructure.team.TeamRepository;
import com.conceiversolutions.hrsystem.skillset.skillset.Skillset;
import com.conceiversolutions.hrsystem.skillset.skillset.SkillsetRepository;
import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class JobRequestService {
    private final JobRequestRepository jobRequestRepository;
    private final DepartmentRepository departmentRepository;
    private final UserRepository userRepository;
    private final TeamRepository teamRepository;
    private final SkillsetRepository skillsetRepository;
    private final JobPostingRepository jobPostingRepository;

    public List<JobRequest> getAllJobRequests() {
        System.out.println("JobRequestService.getAllJobRequests");

        List<JobRequest> jobRequests = jobRequestRepository.findAll();
        System.out.println("size of job request list is " + jobRequests.size());

        for (JobRequest jr : jobRequests) {
            jr.getDepartment().setDepartmentHead(null);
            jr.getDepartment().setOrganization(null);
            List<Team> teams = jr.getDepartment().getTeams();
            for (Team t : teams) {
                t.setTeamHead(null);
                t.setUsers(new ArrayList<>());
                t.setRoster(null);
                t.setDepartment(null);
                t.getOutlet().setAddress(null);
            }
            User approver = jr.getApprover();
            if (approver != null){
                approver.setTaskListItems(new ArrayList<>());
                approver.setTeams(new ArrayList<>());
                approver.setQualificationInformation(null);
                approver.setCurrentPosition(null);
                approver.setReactivationRequest(null);
                approver.setAttendances(new ArrayList<>());
                approver.setCurrentPayInformation(null);
                approver.setEmployeeAppraisals(new ArrayList<>());
                approver.setManagerAppraisals(new ArrayList<>());
                approver.setManagerReviews(new ArrayList<>());
                approver.setEmployeeReviews(new ArrayList<>());
                approver.setModules(new ArrayList<>());
                approver.setApplications(new ArrayList<>());
                approver.setGoals(new ArrayList<>());
                approver.setPositions(new ArrayList<>());
                approver.setJobRequests(new ArrayList<>());
            }

            User requestor = jr.getRequestedBy();
            if (requestor != null){
                requestor.setTaskListItems(new ArrayList<>());
                requestor.setTeams(new ArrayList<>());
                requestor.setQualificationInformation(null);
                requestor.setCurrentPosition(null);
                requestor.setReactivationRequest(null);
                requestor.setAttendances(new ArrayList<>());
                requestor.setCurrentPayInformation(null);
                requestor.setEmployeeAppraisals(new ArrayList<>());
                requestor.setManagerAppraisals(new ArrayList<>());
                requestor.setManagerReviews(new ArrayList<>());
                requestor.setEmployeeReviews(new ArrayList<>());
                requestor.setModules(new ArrayList<>());
                requestor.setApplications(new ArrayList<>());
                requestor.setGoals(new ArrayList<>());
                requestor.setPositions(new ArrayList<>());
                requestor.setJobRequests(new ArrayList<>());
            }

            jr.getJobRequirements().size();
            if (jr.getTeam() != null) {
                Team team = jr.getTeam();
                team.setTeamHead(null);
                team.setUsers(new ArrayList<>());
                team.setRoster(null);
                team.setDepartment(null);
                team.getOutlet().setAddress(null);
            }

            if (jr.getJobPosting() != null) {
                jr.getJobPosting().setJobRequest(null);
                jr.getJobPosting().setPostedBy(null);
                jr.getJobPosting().setJobRequirements(new ArrayList<>());
            }
        }

        return jobRequests;
    }

    public Long saveJobRequest(String jobTitle, String jobDescription, String justification, LocalDate preferredStartDate, JobTypeEnum jobTypeEnum, RoleEnum roleEnum, BigDecimal salary, List<Long> jobRequirements, Long departmentId, Long requestedById, Long teamId, Long jobRequestId) {
        System.out.println("JobRequestService.saveJobRequest");

        checkInput(jobTitle, jobDescription, justification, preferredStartDate, jobTypeEnum, roleEnum, salary, requestedById);
        if (departmentId == null) {
            throw new IllegalStateException("departmentId is null");
        }

        Department dept;

        if (departmentId.equals(0L)) {
            Optional<Department> d = departmentRepository.findDepartmentByEmployeeId(requestedById);
            if (d.isEmpty()) {
                throw new IllegalStateException("Department cannot be found, cannot proceed");
            }
            dept = d.get();
        } else {
            Optional<Department> d = departmentRepository.findById(departmentId);
            if (d.isEmpty()) {
                throw new IllegalStateException("Department cannot be found, cannot proceed");
            }
            dept = d.get();
        }

        Team team = null;
        if (!teamId.equals(0L)) {
            team = teamRepository.findById(teamId).get();
        }

        Optional<User> r = userRepository.findById(requestedById);
        if (r.isEmpty()) {
            throw new IllegalStateException("Requestor cannot be found, cannot proceed");
        }
        User requestor = r.get();

        List<Skillset> skillsets = new ArrayList<>();
        if (!jobRequirements.isEmpty()) {
            skillsets = skillsetRepository.findAllById(jobRequirements);
        }

        if (!jobRequestId.equals(0L)) {
            System.out.println("Job Request already exists, now is editing");
            Optional<JobRequest> jobRequest = jobRequestRepository.findById(jobRequestId);

            JobRequest jr = jobRequest.get();

            jr.setJobTitle(jobTitle);
            jr.setJobDescription(jobDescription);
            jr.setJustification(justification);
            jr.setPreferredStartDate(preferredStartDate);
            jr.setJobType(jobTypeEnum);
            jr.setJobRole(roleEnum);
            jr.setSalary(salary);
            jr.setJobRequirements(skillsets);
            jr.setDepartment(dept);
            jr.setTeam(team);
            jr.setStatus(JobStatusEnum.PENDING);
            jr.setLastEditedDate(LocalDateTime.now());

            JobRequest done = jobRequestRepository.saveAndFlush(jr);
            return done.getRequestId();
        } else {
            System.out.println("Job Request doesnt exists, will create a new one");
            JobRequest jr = new JobRequest(jobTitle, jobDescription, justification, preferredStartDate, jobTypeEnum, salary, skillsets, dept, team, requestor, roleEnum);
            jr.setStatus(JobStatusEnum.PENDING);
            jr.setLastEditedDate(LocalDateTime.now());
            JobRequest done = jobRequestRepository.saveAndFlush(jr);

            List<JobRequest> temp = requestor.getJobRequests();
            temp.add(done);
            requestor.setJobRequests(temp);
            userRepository.save(requestor);
            return done.getRequestId();
        }
    }

    public Long submitJobRequest(String jobTitle, String jobDescription, String justification, LocalDate preferredStartDate, JobTypeEnum jobTypeEnum, RoleEnum roleEnum, BigDecimal salary, List<Skillset> jobRequirements, Long departmentId, Long requestedById, Long teamId, Long jobRequestId) {
        System.out.println("JobRequestService.saveJobRequest");

        checkInput(jobTitle, jobDescription, justification, preferredStartDate, jobTypeEnum, roleEnum, salary, requestedById);
        if (departmentId == null) {
            throw new IllegalStateException("departmentId is null");
        }

        Department dept;

        if (departmentId.equals(0L)) {
            Optional<Department> d = departmentRepository.findDepartmentByEmployeeId(requestedById);
            if (d.isEmpty()) {
                throw new IllegalStateException("Department cannot be found, cannot proceed");
            }
            dept = d.get();
        } else {
            Optional<Department> d = departmentRepository.findById(departmentId);
            if (d.isEmpty()) {
                throw new IllegalStateException("Department cannot be found, cannot proceed");
            }
            dept = d.get();
        }

        Team team = null;
        if (!teamId.equals(0L)) {
            team = teamRepository.findById(teamId).get();
        }

        Optional<User> r = userRepository.findById(requestedById);
        if (r.isEmpty()) {
            throw new IllegalStateException("Requestor cannot be found, cannot proceed");
        }
        User requestor = r.get();

        if (!jobRequestId.equals(0L)) {
            System.out.println("Job Request already exists, now is editing");
            Optional<JobRequest> jobRequest = jobRequestRepository.findById(jobRequestId);

            JobRequest jr = jobRequest.get();

            jr.setJobTitle(jobTitle);
            jr.setJobDescription(jobDescription);
            jr.setJustification(justification);
            jr.setPreferredStartDate(preferredStartDate);
            jr.setJobType(jobTypeEnum);
            jr.setJobRole(roleEnum);
            jr.setSalary(salary);
            jr.setJobRequirements(jobRequirements);
            jr.setDepartment(dept);
            jr.setTeam(team);
            jr.setStatus(JobStatusEnum.CREATED);
            jr.setLastEditedDate(LocalDateTime.now());

            JobRequest done = jobRequestRepository.saveAndFlush(jr);
            return done.getRequestId();
        } else {
            System.out.println("Job Request doesnt exists, will create a new one");
            JobRequest jr = new JobRequest(jobTitle, jobDescription, justification, preferredStartDate, jobTypeEnum, salary, jobRequirements, dept, team, requestor, roleEnum);
            jr.setStatus(JobStatusEnum.CREATED);
            jr.setLastEditedDate(LocalDateTime.now());
            JobRequest done = jobRequestRepository.saveAndFlush(jr);

            List<JobRequest> temp = requestor.getJobRequests();
            temp.add(done);
            requestor.setJobRequests(temp);
            userRepository.save(requestor);
            return done.getRequestId();
        }
    }

    private void checkInput(String jobTitle, String jobDescription, String justification, LocalDate preferredStartDate, JobTypeEnum jobTypeEnum, RoleEnum roleEnum, BigDecimal salary, Long requestedById) {
        System.out.println("JobRequestService.checkInput");
        if (jobTitle.equals("")) {
            throw new IllegalStateException("jobTitle is missing");
        } else if (jobDescription.equals("")) {
            throw new IllegalStateException("jobDescription is missing");
        } else if (justification.equals("")) {
            throw new IllegalStateException("justification is missing");
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
        } else if (salary == null) {
            throw new IllegalStateException("salary is missing");
        } else if (salary.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalStateException("salary is invalid");
        } else if (requestedById == null || requestedById.compareTo(0L) < 0) {
            throw new IllegalStateException("requestedById is invalid");
        }
    }


    public JobRequest getJobRequestById(Long jobRequestId) {
        System.out.println("JobRequestService.getJobRequestById");

        Optional<JobRequest> j = jobRequestRepository.findById(jobRequestId);
        if (j.isPresent()) {
            JobRequest jr = j.get();

            jr.getDepartment().setDepartmentHead(null);
            jr.getDepartment().setOrganization(null);
            List<Team> teams = jr.getDepartment().getTeams();
            for (Team t : teams) {
                t.setTeamHead(null);
                t.setUsers(new ArrayList<>());
                t.setRoster(null);
                t.setDepartment(null);
                t.getOutlet().setAddress(null);
            }
            User approver = jr.getApprover();
            if (approver != null){
                approver.setTaskListItems(new ArrayList<>());
                approver.setTeams(new ArrayList<>());
                approver.setQualificationInformation(null);
                approver.setCurrentPosition(null);
                approver.setReactivationRequest(null);
                approver.setAttendances(new ArrayList<>());
                approver.setCurrentPayInformation(null);
                approver.setEmployeeAppraisals(new ArrayList<>());
                approver.setManagerAppraisals(new ArrayList<>());
                approver.setManagerReviews(new ArrayList<>());
                approver.setEmployeeReviews(new ArrayList<>());
                approver.setModules(new ArrayList<>());
                approver.setApplications(new ArrayList<>());
                approver.setGoals(new ArrayList<>());
                approver.setPositions(new ArrayList<>());
                approver.setJobRequests(new ArrayList<>());
            }

            User requestor = jr.getRequestedBy();
            if (requestor != null){
                requestor.setTaskListItems(new ArrayList<>());
                requestor.setTeams(new ArrayList<>());
                requestor.setQualificationInformation(null);
                requestor.setCurrentPosition(null);
                requestor.setReactivationRequest(null);
                requestor.setAttendances(new ArrayList<>());
                requestor.setCurrentPayInformation(null);
                requestor.setEmployeeAppraisals(new ArrayList<>());
                requestor.setManagerAppraisals(new ArrayList<>());
                requestor.setManagerReviews(new ArrayList<>());
                requestor.setEmployeeReviews(new ArrayList<>());
                requestor.setModules(new ArrayList<>());
                requestor.setApplications(new ArrayList<>());
                requestor.setGoals(new ArrayList<>());
                requestor.setPositions(new ArrayList<>());
                requestor.setJobRequests(new ArrayList<>());
            }

            jr.getJobRequirements().size();
            if (jr.getTeam() != null) {
                Team team = jr.getTeam();
                team.setTeamHead(null);
                team.setUsers(new ArrayList<>());
                team.setRoster(null);
                team.setDepartment(null);
                team.getOutlet().setAddress(null);
            }

            if (jr.getJobPosting() != null) {
                jr.getJobPosting().setJobRequest(null);
                jr.getJobPosting().setPostedBy(null);
                jr.getJobPosting().setJobRequirements(new ArrayList<>());
            }
            return jr;
        } else {
            throw new IllegalStateException("Job Request does not exist");
        }
    }

    public String deleteJobRequest(Long jobRequestId) {
        System.out.println("JobRequestService.deleteJobRequest");
        Optional<JobRequest> j = jobRequestRepository.findById(jobRequestId);
        if (j.isEmpty()) {
            throw new IllegalStateException("Job Request cannot be found, cannot proceed");
        }
        JobRequest jr = j.get();

        if (jr.getStatus().equals(JobStatusEnum.APPROVED)) {
            throw new IllegalStateException("Job Request is already approved, cannot delete");
        } else if (jr.getStatus().equals(JobStatusEnum.CANCELLED)) {
            throw new IllegalStateException("Job Request is already cancelled, cannot delete");
        } else if (jr.getStatus().equals(JobStatusEnum.CLOSED)) {
            throw new IllegalStateException("Job Request is already closed, cannot delete");
        }

        User requestor = jr.getRequestedBy();
        List<JobRequest> jobRequests = requestor.getJobRequests();
        jobRequests.remove(jr);
        requestor.setJobRequests(jobRequests);
        userRepository.save(requestor);

        System.out.println("Job Request has been successfully deleted");
        return "Job Request has been successfully deleted";
    }

//    public List<JobRequest> getJobRequestsByIncludeTitle(String title) {
//        System.out.println("JobRequestService.findJobRequestsByIncludeTitle");
//        List<JobRequest> jobRequests = jobRequestRepository.findJobRequestsByIncludeTitle(title);
//
//        for (JobRequest jr : jobRequests) {
//            jr.getDepartment().setDepartmentHead(null);
//            jr.getDepartment().setOrganization(null);
//            List<Team> teams = jr.getDepartment().getTeams();
//            for (Team t : teams) {
//                t.setTeamHead(null);
//                t.setUsers(new ArrayList<>());
//                t.setRoster(null);
//                t.setDepartment(null);
//                t.getOutlet().setAddress(null);
//            }
//            User approver = jr.getApprover();
//            if (approver != null){
//                approver.setTaskListItems(new ArrayList<>());
//                approver.setTeams(new ArrayList<>());
//                approver.setQualificationInformation(null);
//                approver.setCurrentPosition(null);
//                approver.setReactivationRequest(null);
//                approver.setAttendances(new ArrayList<>());
//                approver.setCurrentPayInformation(null);
//                approver.setEmployeeAppraisals(new ArrayList<>());
//                approver.setManagerAppraisals(new ArrayList<>());
//                approver.setManagerReviews(new ArrayList<>());
//                approver.setEmployeeReviews(new ArrayList<>());
//                approver.setModules(new ArrayList<>());
//                approver.setApplications(new ArrayList<>());
//                approver.setGoals(new ArrayList<>());
//                approver.setPositions(new ArrayList<>());
//                approver.setJobRequests(new ArrayList<>());
//            }
//
//            User requestor = jr.getRequestedBy();
//            if (requestor != null){
//                requestor.setTaskListItems(new ArrayList<>());
//                requestor.setTeams(new ArrayList<>());
//                requestor.setQualificationInformation(null);
//                requestor.setCurrentPosition(null);
//                requestor.setReactivationRequest(null);
//                requestor.setAttendances(new ArrayList<>());
//                requestor.setCurrentPayInformation(null);
//                requestor.setEmployeeAppraisals(new ArrayList<>());
//                requestor.setManagerAppraisals(new ArrayList<>());
//                requestor.setManagerReviews(new ArrayList<>());
//                requestor.setEmployeeReviews(new ArrayList<>());
//                requestor.setModules(new ArrayList<>());
//                requestor.setApplications(new ArrayList<>());
//                requestor.setGoals(new ArrayList<>());
//                requestor.setPositions(new ArrayList<>());
//                requestor.setJobRequests(new ArrayList<>());
//            }
//
//            jr.getJobRequirements().size();
//            if (jr.getTeam() != null) {
//                Team team = jr.getTeam();
//                team.setTeamHead(null);
//                team.setUsers(new ArrayList<>());
//                team.setRoster(null);
//                team.setDepartment(null);
//                team.getOutlet().setAddress(null);
//            }
//
//            if (jr.getJobPosting() != null) {
//                jr.getJobPosting().setJobRequest(null);
//                jr.getJobPosting().setPostedBy(null);
//                jr.getJobPosting().setJobRequirements(new ArrayList<>());
//            }
//        }
//        return jobRequests;
//    }
//
//    public List<JobRequest> getJobRequestsByIncludeDescription(String description) {
//        System.out.println("JobRequestService.findJobRequestsByIncludeDescription");
//        List<JobRequest> jobRequests = jobRequestRepository.findJobRequestsByIncludeDescription(description);
//
//        for (JobRequest jr : jobRequests) {
//            jr.getDepartment().setDepartmentHead(null);
//            jr.getDepartment().setOrganization(null);
//            List<Team> teams = jr.getDepartment().getTeams();
//            for (Team t : teams) {
//                t.setTeamHead(null);
//                t.setUsers(new ArrayList<>());
//                t.setRoster(null);
//                t.setDepartment(null);
//                t.getOutlet().setAddress(null);
//            }
//            User approver = jr.getApprover();
//            if (approver != null){
//                approver.setTaskListItems(new ArrayList<>());
//                approver.setTeams(new ArrayList<>());
//                approver.setQualificationInformation(null);
//                approver.setCurrentPosition(null);
//                approver.setReactivationRequest(null);
//                approver.setAttendances(new ArrayList<>());
//                approver.setCurrentPayInformation(null);
//                approver.setEmployeeAppraisals(new ArrayList<>());
//                approver.setManagerAppraisals(new ArrayList<>());
//                approver.setManagerReviews(new ArrayList<>());
//                approver.setEmployeeReviews(new ArrayList<>());
//                approver.setModules(new ArrayList<>());
//                approver.setApplications(new ArrayList<>());
//                approver.setGoals(new ArrayList<>());
//                approver.setPositions(new ArrayList<>());
//                approver.setJobRequests(new ArrayList<>());
//            }
//
//            User requestor = jr.getRequestedBy();
//            if (requestor != null){
//                requestor.setTaskListItems(new ArrayList<>());
//                requestor.setTeams(new ArrayList<>());
//                requestor.setQualificationInformation(null);
//                requestor.setCurrentPosition(null);
//                requestor.setReactivationRequest(null);
//                requestor.setAttendances(new ArrayList<>());
//                requestor.setCurrentPayInformation(null);
//                requestor.setEmployeeAppraisals(new ArrayList<>());
//                requestor.setManagerAppraisals(new ArrayList<>());
//                requestor.setManagerReviews(new ArrayList<>());
//                requestor.setEmployeeReviews(new ArrayList<>());
//                requestor.setModules(new ArrayList<>());
//                requestor.setApplications(new ArrayList<>());
//                requestor.setGoals(new ArrayList<>());
//                requestor.setPositions(new ArrayList<>());
//                requestor.setJobRequests(new ArrayList<>());
//            }
//
//            jr.getJobRequirements().size();
//            if (jr.getTeam() != null) {
//                Team team = jr.getTeam();
//                team.setTeamHead(null);
//                team.setUsers(new ArrayList<>());
//                team.setRoster(null);
//                team.setDepartment(null);
//                team.getOutlet().setAddress(null);
//            }
//
//            if (jr.getJobPosting() != null) {
//                jr.getJobPosting().setJobRequest(null);
//                jr.getJobPosting().setPostedBy(null);
//                jr.getJobPosting().setJobRequirements(new ArrayList<>());
//            }
//        }
//        return jobRequests;
//    }
//
//    public List<JobRequest> getJobRequestsByDepartmentId(Long departmentId) {
//        System.out.println("JobRequestService.findJobRequestsByDepartmentId");
//        List<JobRequest> jobRequests = jobRequestRepository.findJobRequestsByDepartmentId(departmentId);
//
//        for (JobRequest jr : jobRequests) {
//            jr.getDepartment().setDepartmentHead(null);
//            jr.getDepartment().setOrganization(null);
//            List<Team> teams = jr.getDepartment().getTeams();
//            for (Team t : teams) {
//                t.setTeamHead(null);
//                t.setUsers(new ArrayList<>());
//                t.setRoster(null);
//                t.setDepartment(null);
//                t.getOutlet().setAddress(null);
//            }
//            User approver = jr.getApprover();
//            if (approver != null){
//                approver.setTaskListItems(new ArrayList<>());
//                approver.setTeams(new ArrayList<>());
//                approver.setQualificationInformation(null);
//                approver.setCurrentPosition(null);
//                approver.setReactivationRequest(null);
//                approver.setAttendances(new ArrayList<>());
//                approver.setCurrentPayInformation(null);
//                approver.setEmployeeAppraisals(new ArrayList<>());
//                approver.setManagerAppraisals(new ArrayList<>());
//                approver.setManagerReviews(new ArrayList<>());
//                approver.setEmployeeReviews(new ArrayList<>());
//                approver.setModules(new ArrayList<>());
//                approver.setApplications(new ArrayList<>());
//                approver.setGoals(new ArrayList<>());
//                approver.setPositions(new ArrayList<>());
//                approver.setJobRequests(new ArrayList<>());
//            }
//
//            User requestor = jr.getRequestedBy();
//            if (requestor != null){
//                requestor.setTaskListItems(new ArrayList<>());
//                requestor.setTeams(new ArrayList<>());
//                requestor.setQualificationInformation(null);
//                requestor.setCurrentPosition(null);
//                requestor.setReactivationRequest(null);
//                requestor.setAttendances(new ArrayList<>());
//                requestor.setCurrentPayInformation(null);
//                requestor.setEmployeeAppraisals(new ArrayList<>());
//                requestor.setManagerAppraisals(new ArrayList<>());
//                requestor.setManagerReviews(new ArrayList<>());
//                requestor.setEmployeeReviews(new ArrayList<>());
//                requestor.setModules(new ArrayList<>());
//                requestor.setApplications(new ArrayList<>());
//                requestor.setGoals(new ArrayList<>());
//                requestor.setPositions(new ArrayList<>());
//                requestor.setJobRequests(new ArrayList<>());
//            }
//
//            jr.getJobRequirements().size();
//            if (jr.getTeam() != null) {
//                Team team = jr.getTeam();
//                team.setTeamHead(null);
//                team.setUsers(new ArrayList<>());
//                team.setRoster(null);
//                team.setDepartment(null);
//                team.getOutlet().setAddress(null);
//            }
//
//            if (jr.getJobPosting() != null) {
//                jr.getJobPosting().setJobRequest(null);
//                jr.getJobPosting().setPostedBy(null);
//                jr.getJobPosting().setJobRequirements(new ArrayList<>());
//            }
//        }
//        return jobRequests;
//    }
//
    public List<JobRequest> getJobRequestsByRequestorId(Long requestorId) {
        System.out.println("JobRequestService.findJobRequestsByRequestorId");
        List<JobRequest> jobRequests = jobRequestRepository.findJobRequestsByRequestorId(requestorId);

        for (JobRequest jr : jobRequests) {
            jr.setJobPosting(null);
            jr.setRequestedBy(null);
            jr.getDepartment().setDepartmentHead(null);
            jr.getDepartment().setOrganization(null);
            List<Team> teams = jr.getDepartment().getTeams();
            for (Team t : teams) {
                t.setTeamHead(null);
                t.setUsers(new ArrayList<>());
                t.setRoster(null);
                t.setDepartment(null);
                t.getOutlet().setAddress(null);
            }
            User approver = jr.getApprover();
            if (approver != null){
                approver.setTaskListItems(new ArrayList<>());
                approver.setTeams(new ArrayList<>());
                approver.setQualificationInformation(null);
                approver.setCurrentPosition(null);
                approver.setReactivationRequest(null);
                approver.setAttendances(new ArrayList<>());
                approver.setCurrentPayInformation(null);
                approver.setEmployeeAppraisals(new ArrayList<>());
                approver.setManagerAppraisals(new ArrayList<>());
                approver.setManagerReviews(new ArrayList<>());
                approver.setEmployeeReviews(new ArrayList<>());
                approver.setModules(new ArrayList<>());
                approver.setApplications(new ArrayList<>());
                approver.setGoals(new ArrayList<>());
                approver.setPositions(new ArrayList<>());
                approver.setJobRequests(new ArrayList<>());
            }

//            User requestor = jr.getRequestedBy();
//            if (requestor != null){
//                requestor.setTaskListItems(new ArrayList<>());
//                requestor.setTeams(new ArrayList<>());
//                requestor.setQualificationInformation(null);
//                requestor.setCurrentPosition(null);
//                requestor.setReactivationRequest(null);
//                requestor.setAttendances(new ArrayList<>());
//                requestor.setCurrentPayInformation(null);
//                requestor.setEmployeeAppraisals(new ArrayList<>());
//                requestor.setManagerAppraisals(new ArrayList<>());
//                requestor.setManagerReviews(new ArrayList<>());
//                requestor.setEmployeeReviews(new ArrayList<>());
//                requestor.setModules(new ArrayList<>());
//                requestor.setApplications(new ArrayList<>());
//                requestor.setGoals(new ArrayList<>());
//                requestor.setPositions(new ArrayList<>());
//                requestor.setJobRequests(new ArrayList<>());
//            }

            jr.getJobRequirements().size();
            if (jr.getTeam() != null) {
                Team team = jr.getTeam();
                team.setTeamHead(null);
                team.setUsers(new ArrayList<>());
                team.setRoster(null);
                team.setDepartment(null);
                team.getOutlet().setAddress(null);
            }

            if (jr.getJobPosting() != null) {
                jr.getJobPosting().setJobRequest(null);
                jr.getJobPosting().setPostedBy(null);
                jr.getJobPosting().setJobRequirements(new ArrayList<>());
            }
        }
        return jobRequests;
    }

    public Boolean approveJobRequestById(Long jobRequestId, Long approverId) {
        System.out.println("JobRequestService.approveJobRequestById");
        System.out.println("jobRequestId = " + jobRequestId);

        // get job request
        JobRequest jr = jobRequestRepository.findById(jobRequestId).get();
        User approver = userRepository.findById(approverId).get();

        // create job posting
        JobPosting newJP = new JobPosting(jr.getJobTitle(), jr.getJobDescription(), jr.getPreferredStartDate()
                , jr.getJobType(), jr.getJobRole(), jr.getStatus(), jr.getSalary(), LocalDate.now(), true, approver, jr, jr.getJobRequirements());

        JobPosting savedJP = jobPostingRepository.saveAndFlush(newJP);
        System.out.println("Job Posting Id " + savedJP.getPostingId() + " is created");

        // set job request as approved
        jr.setApprover(approver);
        jr.setStatus(JobStatusEnum.APPROVED);
        jobRequestRepository.save(jr);

        return true;
    }

    public Boolean rejectJobRequestById(Long jobRequestId, Long approverId, String reason) {
        System.out.println("JobRequestService.rejectJobRequestById");
        System.out.println("jobRequestId = " + jobRequestId + ", approverId = " + approverId);

        JobRequest jr = jobRequestRepository.findById(jobRequestId).get();
        User approver = userRepository.findById(approverId).get();

        jr.setStatus(JobStatusEnum.REJECTED);
        jr.setApprover(approver);

        jobRequestRepository.save(jr);

        //TODO: Send notification for reason of rejecting.

        return true;
    }
//
//    public List<JobRequest> getJobRequestsByApproverId(Long approverId) {
//        System.out.println("JobRequestService.findJobRequestsByApproverId");
//        List<JobRequest> jobRequests = jobRequestRepository.findJobRequestsByApproverId(approverId);
//
//        for (JobRequest jr : jobRequests) {
//            jr.getDepartment().setDepartmentHead(null);
//            jr.getDepartment().setOrganization(null);
//            List<Team> teams = jr.getDepartment().getTeams();
//            for (Team t : teams) {
//                t.setTeamHead(null);
//                t.setUsers(new ArrayList<>());
//                t.setRoster(null);
//                t.setDepartment(null);
//                t.getOutlet().setAddress(null);
//            }
//            User approver = jr.getApprover();
//            if (approver != null){
//                approver.setTaskListItems(new ArrayList<>());
//                approver.setTeams(new ArrayList<>());
//                approver.setQualificationInformation(null);
//                approver.setCurrentPosition(null);
//                approver.setReactivationRequest(null);
//                approver.setAttendances(new ArrayList<>());
//                approver.setCurrentPayInformation(null);
//                approver.setEmployeeAppraisals(new ArrayList<>());
//                approver.setManagerAppraisals(new ArrayList<>());
//                approver.setManagerReviews(new ArrayList<>());
//                approver.setEmployeeReviews(new ArrayList<>());
//                approver.setModules(new ArrayList<>());
//                approver.setApplications(new ArrayList<>());
//                approver.setGoals(new ArrayList<>());
//                approver.setPositions(new ArrayList<>());
//                approver.setJobRequests(new ArrayList<>());
//            }
//
//            User requestor = jr.getRequestedBy();
//            if (requestor != null){
//                requestor.setTaskListItems(new ArrayList<>());
//                requestor.setTeams(new ArrayList<>());
//                requestor.setQualificationInformation(null);
//                requestor.setCurrentPosition(null);
//                requestor.setReactivationRequest(null);
//                requestor.setAttendances(new ArrayList<>());
//                requestor.setCurrentPayInformation(null);
//                requestor.setEmployeeAppraisals(new ArrayList<>());
//                requestor.setManagerAppraisals(new ArrayList<>());
//                requestor.setManagerReviews(new ArrayList<>());
//                requestor.setEmployeeReviews(new ArrayList<>());
//                requestor.setModules(new ArrayList<>());
//                requestor.setApplications(new ArrayList<>());
//                requestor.setGoals(new ArrayList<>());
//                requestor.setPositions(new ArrayList<>());
//                requestor.setJobRequests(new ArrayList<>());
//            }
//
//            jr.getJobRequirements().size();
//            if (jr.getTeam() != null) {
//                Team team = jr.getTeam();
//                team.setTeamHead(null);
//                team.setUsers(new ArrayList<>());
//                team.setRoster(null);
//                team.setDepartment(null);
//                team.getOutlet().setAddress(null);
//            }
//
//            if (jr.getJobPosting() != null) {
//                jr.getJobPosting().setJobRequest(null);
//                jr.getJobPosting().setPostedBy(null);
//                jr.getJobPosting().setJobRequirements(new ArrayList<>());
//            }
//        }
//        return jobRequests;
//    }

//    public Long approveJobRequest(Long jobRequestId) {
//        System.out.println("JobRequestService.approveJobRequest");
//    }
}
