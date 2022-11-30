package com.conceiversolutions.hrsystem.jobchange.promotionrequest;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import com.conceiversolutions.hrsystem.enums.RoleEnum;
import com.conceiversolutions.hrsystem.enums.StatusEnum;
import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDate;
import java.time.LocalDateTime;
import com.conceiversolutions.hrsystem.engagement.leavequota.LeaveQuota;
import com.conceiversolutions.hrsystem.organizationstructure.department.Department;
import com.conceiversolutions.hrsystem.organizationstructure.department.DepartmentRepository;
import com.conceiversolutions.hrsystem.organizationstructure.department.DepartmentService;
import com.conceiversolutions.hrsystem.organizationstructure.organization.OrganizationService;
import com.conceiversolutions.hrsystem.organizationstructure.outlet.Outlet;
import com.conceiversolutions.hrsystem.organizationstructure.outlet.OutletService;
import com.conceiversolutions.hrsystem.organizationstructure.team.Team;
import com.conceiversolutions.hrsystem.organizationstructure.team.TeamRepository;
import com.conceiversolutions.hrsystem.organizationstructure.team.TeamService;
import com.conceiversolutions.hrsystem.pay.payinformation.PayInformation;
import com.conceiversolutions.hrsystem.pay.payinformation.PayInformationService;
import com.conceiversolutions.hrsystem.performance.appraisal.Appraisal;
import com.conceiversolutions.hrsystem.performance.appraisal.AppraisalRepository;
import com.conceiversolutions.hrsystem.rostering.roster.Roster;
import com.conceiversolutions.hrsystem.rostering.roster.RosterRepository;
import com.conceiversolutions.hrsystem.user.position.Position;
import com.conceiversolutions.hrsystem.user.position.PositionRepository;

import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PromotionService {

    private final UserRepository userRepository;

    private final PositionRepository positionRepository;

    private final DepartmentService departmentService;

    private final TeamService teamService;

    private final OrganizationService organizationService;

    private final AppraisalRepository appraisalRepository;

    private final PayInformationService payInformationService;

    private final PromotionRepository promotionRepository;

    private final TeamRepository teamRepository;

    private final RosterRepository rosterRepository;

    private final DepartmentRepository departmentRepository;

    private final OutletService outletService;

    public User breakRelationships(User user) {
        User u = new User();

        u.setUserId(user.getUserId());
        u.setFirstName(user.getFirstName());
        u.setLastName(user.getLastName());
        u.setWorkEmail(user.getWorkEmail());
        u.setUserRole(user.getUserRole());
        u.setProfilePic(user.getProfilePic());
        u.setIsBlackListed(user.getIsBlackListed());
        u.setCitizenship(user.getCitizenship());
        u.setDateJoined(user.getDateJoined());
        u.setDob(user.getDob());
        u.setEmail(user.getEmail());
        u.setGender(user.getGender());
        u.setIsEnabled(user.getIsEnabled());
        u.setIsHrEmployee(user.getIsHrEmployee());
        u.setIsPartTimer(user.getIsPartTimer());
        u.setPassword(user.getPassword());
        u.setPhone(user.getPhone());
        u.setRace(user.getRace());
        u.setCurrentPosition(user.getCurrentPosition());
        u.setCurrentLeaveQuota(user.getCurrentLeaveQuota());

        return u;
    }

    // public List<PromotionRequest> getAllPromotionRequests() {
    // return promotionRepository.findAll();
    // }

    public String createPromotionRequest(LocalDate created, Long appraisalId, Long employeeId, Long managerId,
            String promotionJustification,
            String withdrawRemarks) throws Exception {

        System.out.println("PromotionService.createPromotionRequest");

        Optional<User> optionalEmployee = userRepository.findById(employeeId);
        Optional<User> optionalManager = userRepository.findById(managerId);
        Optional<Appraisal> optionalAppraisal = appraisalRepository.findById(appraisalId);

        if (optionalEmployee.isPresent() && optionalManager.isPresent() && optionalAppraisal.isPresent()) {

            User employee = breakRelationships(optionalEmployee.get());
            User manager = breakRelationships(optionalManager.get());
            Appraisal appraisal = optionalAppraisal.get();
            appraisal.setEmployee(breakRelationships(appraisal.getEmployee()));
            appraisal.setManagerAppraising(breakRelationships(appraisal.getManagerAppraising()));

            Optional<PromotionRequest> existingPromotionRequest = promotionRepository
                    .findExistingPromotionRequest(appraisalId, employeeId, managerId);

            if (!existingPromotionRequest.isPresent()) {

                Long interviewerId = Long.valueOf(-1);

                if (teamService.isEmployeeTeamHead(managerId) > -1) {
                    User departmentHead = departmentService.getDepartmentHeadByEmployee(employeeId);
                    interviewerId = departmentHead.getUserId();
                    // System.out.println("Department head is user with id " +
                    // departmentHead.getUserId());
                } else if (departmentService.isEmployeeDepartmentHead(managerId) > -1) {

                    User organizationHead = organizationService.getOrganizationHead();
                    System.out.println("organizationHead " + organizationHead);
                    interviewerId = organizationHead.getUserId();

                } else if (organizationService.isEmployeeOrganizationHead(managerId) > -1) {
                    interviewerId = managerId;
                }

                System.out.println("Interviewer is user " + interviewerId);

                Optional<User> optionalInterviewer = userRepository.findById(interviewerId);

                if (optionalInterviewer.isPresent()) {

                    User interviewer = breakRelationships(optionalInterviewer.get());

                    PromotionRequest promotionRequest = new PromotionRequest(created, appraisal, employee, manager,
                            interviewer, "Created", promotionJustification, "");

                    PromotionRequest pr = promotionRepository.save(promotionRequest);

                } else {
                    throw new IllegalStateException("Unable to find interviewer");
                }
                // System.out.println("Promotion Request id " + pr.getPromotionId());

                return "Promotion request for " + employee.getFirstName() + " " + employee.getLastName()
                        + " has been created";
            } else {

                return "Promotion request for " + employee.getFirstName() + " " + employee.getLastName()
                        + " has already been created";
            }

        } else {
            throw new IllegalStateException("Employee, manager or appraisal does not exist");
        }
    }

    public List<PromotionRequest> getUserActiveRequests(Long userId) {

        System.out.println("PromotionService.getUserActiveRequests");

        List<PromotionRequest> activeRequests = promotionRepository.findUserActiveRequests(userId);

        for (PromotionRequest pr : activeRequests) {
            pr.getAppraisal().setEmployee(breakRelationships(pr.getAppraisal().getEmployee()));
            pr.getAppraisal().setManagerAppraising(breakRelationships(pr.getAppraisal().getManagerAppraising()));

            pr.setEmployee(breakRelationships(pr.getEmployee()));
            pr.setManager(breakRelationships(pr.getManager()));
            pr.setInterviewer(breakRelationships(pr.getInterviewer()));

            if (pr.getProcessedBy() != null) {
                pr.setProcessedBy(breakRelationships(pr.getProcessedBy()));
            }

            if (pr.getNewDepartment() != null) {
                Department d = new Department();
                d.setDepartmentId(pr.getNewDepartment().getDepartmentId());
                d.setDepartmentName(pr.getNewDepartment().getDepartmentName());
                pr.setNewDepartment(d);
            }

            if (pr.getNewTeam() != null) {
                Team t = new Team();
                t.setTeamId(t.getTeamId());
                t.setTeamName(t.getTeamName());
                pr.setNewTeam(t);
            }

            // pr.getProcessedBy().nullify();
        }

        // System.out.print("Active requests ");
        // System.out.println(activeRequests);
        return activeRequests;
    }

    public PromotionRequest getPromotionRequest(Long promotionId) throws Exception {
        Optional<PromotionRequest> optionalPromotion = promotionRepository.findById(promotionId);
        if (optionalPromotion.isPresent()) {
            PromotionRequest promotionRequest = optionalPromotion.get();

            // promotionRequest.getAppraisal().getEmployee().nullify();
            // promotionRequest.getAppraisal().getManagerAppraising().nullify();

            // promotionRequest.getEmployee().nullify();
            // promotionRequest.getManager().nullify();

            promotionRequest.getAppraisal()
                    .setEmployee(breakRelationships(promotionRequest.getAppraisal().getEmployee()));
            promotionRequest.getAppraisal()
                    .setManagerAppraising(breakRelationships(promotionRequest.getAppraisal().getManagerAppraising()));

            promotionRequest.setEmployee(breakRelationships(promotionRequest.getEmployee()));
            promotionRequest.setManager(breakRelationships(promotionRequest.getManager()));

            if (promotionRequest.getInterviewer() != null) {
                promotionRequest.setInterviewer(breakRelationships(promotionRequest.getInterviewer()));
                // promotionRequest.getInterviewer().nullify();
            }

            if (promotionRequest.getProcessedBy() != null) {
                promotionRequest.setProcessedBy(breakRelationships(promotionRequest.getProcessedBy()));
            }

            if (promotionRequest.getNewDepartment() != null) {
                Department d = new Department();
                d.setDepartmentId(promotionRequest.getNewDepartment().getDepartmentId());
                d.setDepartmentName(promotionRequest.getNewDepartment().getDepartmentName());
                promotionRequest.setNewDepartment(d);

            }

            if (promotionRequest.getNewTeam() != null) {
                Team t = new Team();
                t.setTeamId(promotionRequest.getNewTeam().getTeamId());
                t.setTeamName(promotionRequest.getNewTeam().getTeamName());
                promotionRequest.setNewTeam(t);
            }

            return promotionRequest;
        } else {
            throw new IllegalStateException("Unable to find promotion request");
        }
    }

    @Transactional
    public String submitPromotionRequest(Long promotionId, String promotionJustification, Long positionId,
            String withdrawRemarks, String interviewDate) throws Exception {

        System.out.println("PromotionService.submitPromotionRequest");

        Optional<PromotionRequest> optionalRequest = promotionRepository.findById(promotionId);

        if (optionalRequest.isPresent()) {

            PromotionRequest promotionRequest = optionalRequest.get();

            Optional<Department> newDepartment = departmentRepository
                    .findDepartmentByEmployeeId(promotionRequest.getEmployee().getUserId());

            System.out.println("new dept " + newDepartment);

            if (newDepartment.isPresent()) {
                Department d = newDepartment.get();
                promotionRequest.setNewDepartment(d);
            }

            Long newTeamId = teamService.getTeamByEmployee(promotionRequest.getEmployee().getUserId());
            Optional<Team> optionalTeam = teamRepository.findById(newTeamId);
            if (optionalTeam.isPresent()) {
                Team newTeam = optionalTeam.get();
                promotionRequest.setNewTeam(newTeam);
            }

            if (withdrawRemarks.isEmpty()) {

                Optional<Position> optionalPosition = positionRepository.findById(positionId);

                if (optionalPosition.isPresent()) {

                    Position newPosition = optionalPosition.get();

                    promotionRequest.setPromotionJustification(promotionJustification);
                    promotionRequest.setNewPosition(newPosition);
                    promotionRequest.setInterviewDate(LocalDate.parse(interviewDate));

                    promotionRequest.setWithdrawRemarks("");
                    promotionRequest.setStatus("Submitted");

                    return "Promotion request for " + promotionRequest.getEmployee().getFirstName() + " "
                            + promotionRequest.getEmployee().getLastName() + " has been "
                            + promotionRequest.getStatus().toLowerCase();

                } else {
                    throw new IllegalStateException("Unable to find position");
                }

            } else {
                promotionRequest.setWithdrawRemarks(withdrawRemarks);
                promotionRequest.setStatus("Withdrawn");
                return "Promotion request for " + promotionRequest.getEmployee().getFirstName() + " "
                        + promotionRequest.getEmployee().getLastName() + " has been "
                        + promotionRequest.getStatus().toLowerCase();
            }

        } else {
            throw new IllegalStateException("Unable to find position or promotion request");
        }

    }

    public List<PromotionRequest> getUserRequestHistory(Long userId) {
        List<PromotionRequest> requests = promotionRepository.findUserRequestHistory(userId);
        for (PromotionRequest pr : requests) {

            pr.getAppraisal().setEmployee(breakRelationships(pr.getAppraisal().getEmployee()));
            pr.getAppraisal().setManagerAppraising(breakRelationships(pr.getAppraisal().getManagerAppraising()));

            User employee = pr.getEmployee();
            User manager = pr.getManager();

            pr.setEmployee(breakRelationships(employee));
            pr.setManager(breakRelationships(manager));

            // pr.getEmployee().nullify();
            // pr.getManager().nullify();
            if (pr.getInterviewer() != null) {
                User interviewer = pr.getInterviewer();
                pr.setInterviewer(breakRelationships(interviewer));
                // pr.getInterviewer().nullify();
            }

            if (pr.getProcessedBy() != null) {
                User processedBy = pr.getProcessedBy();
                pr.setProcessedBy(breakRelationships(processedBy));
            }

            if (pr.getNewDepartment() != null) {
                Department d = new Department();
                d.setDepartmentId(pr.getNewDepartment().getDepartmentId());
                d.setDepartmentName(pr.getNewDepartment().getDepartmentName());
                pr.setNewDepartment(d);
            }

            if (pr.getNewTeam() != null) {
                Team t = new Team();
                t.setTeamId(t.getTeamId());
                t.setTeamName(t.getTeamName());
                pr.setNewTeam(t);
            }
        }
        return requests;
    }

    @Transactional
    public String conductInterview(Long promotionId, String comments, String status) throws Exception {

        System.out.println("PromotionService.conductInterview");

        Optional<PromotionRequest> optionalRequest = promotionRepository.findById(promotionId);

        if (optionalRequest.isPresent()) {

            PromotionRequest request = optionalRequest.get();

            request.setInterviewRemarks(comments);
            request.setStatus(status);

            return "" + request.getEmployee().getFirstName() + " "
                    + request.getEmployee().getLastName() + " has "
                    + request.getStatus().toLowerCase() + " the promotion interview.";

        } else {
            throw new IllegalStateException("Unable to find promotion request");
        }

    }

    @Transactional
    public String processPromotionRequest(Long promotionId, String rejectRemarks,
            String basicSalary, String basicHourlyPay, String weekendHourlyPay, String eventPay,
            Long processedById, Boolean newTeam, String teamName, Long outletId, Boolean inOffice, Long departmentId)
            throws Exception {

        Optional<PromotionRequest> optionalRequest = promotionRepository.findById(promotionId);
        Optional<User> optionalProcessed = userRepository.findById(processedById);

        if (optionalRequest.isPresent() && optionalProcessed.isPresent()) {

            PromotionRequest pr = optionalRequest.get();

            Optional<User> optionalEmployee = userRepository.findById(pr.getEmployee().getUserId());
            Optional<Position> optionalPosition = positionRepository.findById(pr.getNewPosition().getPositionId());

            if (optionalEmployee.isPresent() && optionalPosition.isPresent()) {

                User employee = optionalEmployee.get();

                Position newPosition = optionalPosition.get();

                breakRelationships(employee).setCurrentPosition(newPosition);

                pr.setEmployee(employee);

                User processedBy = optionalProcessed.get();

                pr.setProcessedBy(breakRelationships(processedBy));

                PayInformation pi = payInformationService.getUserPayInformation(pr.getEmployee().getUserId());

                if (rejectRemarks.isEmpty()) {

                    if (!basicSalary.isEmpty()) {
                        pi.setBasicSalary(new BigDecimal(basicSalary));
                    } else {
                        pi.setBasicHourlyPay(new BigDecimal(basicHourlyPay));
                        pi.setWeekendHourlyPay(new BigDecimal(weekendHourlyPay));
                        pi.setEventPhHourlyPay(new BigDecimal(eventPay));
                    }

                    pr.setStatus("Approved");

                } else {
                    pr.setRejectRemarks(rejectRemarks);
                    pr.setStatus("Rejected");
                }

                pr.setEmployee(breakRelationships(pr.getEmployee()));
                pr.setManager(breakRelationships(pr.getManager()));
                pr.setInterviewer(breakRelationships(pr.getInterviewer()));

                if (newTeam) {
                    addNewTeamPromotion(teamName, employee.getUserId(), outletId, inOffice, departmentId);
                } else {
                    Long oldTeamId = teamService.getTeamByEmployee(employee.getUserId());

                    Optional<Team> oldTeamOptional = teamRepository.findById(oldTeamId);
                    Optional<User> optionalUser = userRepository.findById(employee.getUserId());

                    if (oldTeamOptional.isPresent()) {
                        Team oldTeam = oldTeamOptional.get();

                        if (optionalUser.isPresent()) {
                            User user = optionalUser.get();
                            oldTeam.getUsers().remove(user);

                            Team team = pr.getNewTeam();
                            team.setTeamHead(user);
                            team.getUsers().add(user);
                        }

                    } else {
                        throw new IllegalStateException("Unable to find old team");
                    }
                    
                }

                return "Promotion request for " + pr.getEmployee().getFirstName() + " " + pr.getEmployee().getLastName()
                        + " has been " + pr.getStatus().toLowerCase();

            } else {
                throw new IllegalStateException("Unable to find employee or new position");
            }

        } else {
            throw new IllegalStateException("Unable to find request or user");
        }

    }

    public List<PromotionRequest> getUserToInterviewRequests(Long userId) {
        List<PromotionRequest> toInterview = promotionRepository.findUserToInterviewRequests(userId);

        for (PromotionRequest p : toInterview) {
            p.getAppraisal().setEmployee(breakRelationships(p.getEmployee()));
            p.getAppraisal().setManagerAppraising(breakRelationships(p.getManager()));

            p.setEmployee(breakRelationships(p.getEmployee()));
            p.setManager(breakRelationships(p.getManager()));
            p.setInterviewer(breakRelationships(p.getInterviewer()));
            if (p.getProcessedBy() != null) {
                p.setProcessedBy(breakRelationships(p.getProcessedBy()));
            }

            if (p.getNewDepartment() != null) {
                Department d = new Department();
                d.setDepartmentId(p.getNewDepartment().getDepartmentId());
                d.setDepartmentName(p.getNewDepartment().getDepartmentName());
                p.setNewDepartment(d);
            }

            if (p.getNewTeam() != null) {
                Team t = new Team();
                t.setTeamId(t.getTeamId());
                t.setTeamName(t.getTeamName());
                p.setNewTeam(t);
            }

        }

        return toInterview;
    }

    public List<PromotionRequest> getUserToApproveRequests(Long userId) {
        List<PromotionRequest> promotionRequests = promotionRepository.findUserToApproveRequests(userId);
        for (PromotionRequest p : promotionRequests) {
            p.getAppraisal().setEmployee(breakRelationships(p.getEmployee()));
            p.getAppraisal().setManagerAppraising(breakRelationships(p.getManager()));

            p.setEmployee(breakRelationships(p.getEmployee()));
            p.setManager(breakRelationships(p.getManager()));
            p.setInterviewer(breakRelationships(p.getInterviewer()));
            if (p.getProcessedBy() != null) {
                p.setProcessedBy(breakRelationships(p.getProcessedBy()));
            }

            if (p.getNewDepartment() != null) {
                Department d = new Department();
                d.setDepartmentId(p.getNewDepartment().getDepartmentId());
                d.setDepartmentName(p.getNewDepartment().getDepartmentName());
                p.setNewDepartment(d);
            }

            if (p.getNewTeam() != null) {
                Team t = new Team();
                t.setTeamId(t.getTeamId());
                t.setTeamName(t.getTeamName());
                p.setNewTeam(t);
            }

        }
        return promotionRequests;
    }

    public List<PromotionRequest> getAllPromotionRequests() {
        List<PromotionRequest> requests = promotionRepository.findAll();
        for (PromotionRequest pr : requests) {
            pr.setEmployee(breakRelationships(pr.getEmployee()));
            pr.setManager(breakRelationships(pr.getManager()));
            if (pr.getInterviewer() != null) {
                pr.setInterviewer(breakRelationships(pr.getInterviewer()));
            }

            if (pr.getProcessedBy() != null) {
                pr.setProcessedBy(breakRelationships(pr.getProcessedBy()));
            }

            pr.setNewTeam(null);
            pr.setNewDepartment(null);

        }
        return requests;
    }

    public String getPositionGroup(Long positionId) throws Exception {
        User user = userRepository.findUsersWithPosition(positionId).get(0);

        System.out.println("position group " + user.getUserId());
        List<User> managers = teamService.getManagers();
        for (User m : managers) {
            if (m.getUserId() == user.getUserId()) {
                return "Team";
            }
        }

        List<User> departmentHeads = departmentService.getDepartmentHeads();
        for (User d : departmentHeads) {
            if (d.getUserId() == user.getUserId()) {
                return "Department";
            }
        }

        throw new IllegalStateException("Unable to find position group");

    }

    public Long addNewTeamPromotion(String teamName, Long teamHeadId, Long outletId, Boolean isOffice,
            Long deptId) throws Exception {
        System.out.println("TeamService.addNewTeam");
        System.out.println("teamName = " + teamName + ", teamHeadId = " + teamHeadId + ", outletId = " + outletId
                + ", isOffice = " + isOffice + ", deptId = " + deptId);

        Long oldTeamId = teamService.getTeamByEmployee(teamHeadId);

        Optional<Team> oldTeamOptional = teamRepository.findById(oldTeamId);
        Optional<User> optionalUser = userRepository.findById(teamHeadId);

        if (oldTeamOptional.isPresent()) {
            Team oldTeam = oldTeamOptional.get();

            if (optionalUser.isPresent()) {
                User teamHead = optionalUser.get();
                teamHead.setUserRole(RoleEnum.MANAGER);
                oldTeam.getUsers().remove(teamHead);
            }

        } else {
            throw new IllegalStateException("Unable to find old team");
        }

        Outlet outlet = outletService.getOutletById(outletId);

        Optional<Department> d = departmentRepository.findById(deptId);
        if (d.isEmpty()) {
            throw new IllegalStateException("Department does not exist.");
        }

        Department dept = d.get();
        User teamHead = userRepository.findById(teamHeadId).get();
        // User teamHead = userService.getUser(Long.valueOf(teamHeadId));

        if (!teamHead.isEnabled()) {
            throw new IllegalStateException(
                    "Manager selected is not an active employee, please appoint an active employee instead");
        }

        List<User> teamMembers = List.of(teamHead);

        Roster tempRoster = new Roster("temp");
        Roster emptyRoster = rosterRepository.saveAndFlush(tempRoster);

        Team newTeam = new Team(teamName, outlet, isOffice, dept, emptyRoster, teamMembers, teamHead);

        Team savedTeam = teamRepository.saveAndFlush(newTeam);

        List<Team> tempTeams = teamHead.getTeams();
        tempTeams.add(savedTeam);
        teamHead.setTeams(tempTeams);
        userRepository.saveAndFlush(teamHead);

        dept.addTeam(savedTeam);
        departmentRepository.saveAndFlush(dept);

        emptyRoster.setTeam(savedTeam);
        rosterRepository.saveAndFlush(emptyRoster);

        return savedTeam.getTeamId();
    }

    public Team getNewTeamPromotion(Long userId) {
        return null;
    }

    public List<Team> getTeamEmptyHead(Long departmentId) {
        List<Team> teams = new ArrayList<>();

        List<Team> allTeams = teamRepository.findAll();

        for (Team t : allTeams) {
            System.out.println(" null team head " + t.getTeamHead());
            if (t.getTeamHead() != null) {

            } else {

                if (t.getDepartment().getDepartmentId() == departmentId) {
                    Team newTeam = new Team();
                    newTeam.setTeamId(t.getTeamId());
                    newTeam.setTeamName(t.getTeamName());

                    Outlet o = new Outlet();
                    o.setOutletId(t.getOutlet().getOutletId());
                    newTeam.setOutlet(o);

                    newTeam.setIsOffice(t.getIsOffice());

                    teams.add(newTeam);

                }
            }
        }
        return teams;
    }

    public PromotionRequest getPromotionRequestByEmployee(Long employeeId) throws Exception {
        Optional<PromotionRequest> optionalPr = promotionRepository.findRequestByEmployee(employeeId);

        if (optionalPr.isPresent()) {
            PromotionRequest promotionRequest = optionalPr.get();

            promotionRequest.getAppraisal()
                    .setEmployee(breakRelationships(promotionRequest.getAppraisal().getEmployee()));
            promotionRequest.getAppraisal()
                    .setManagerAppraising(breakRelationships(promotionRequest.getAppraisal().getManagerAppraising()));

            promotionRequest.setEmployee(breakRelationships(promotionRequest.getEmployee()));
            promotionRequest.setManager(breakRelationships(promotionRequest.getManager()));

            if (promotionRequest.getInterviewer() != null) {
                promotionRequest.setInterviewer(breakRelationships(promotionRequest.getInterviewer()));
                // promotionRequest.getInterviewer().nullify();
            }

            if (promotionRequest.getProcessedBy() != null) {
                promotionRequest.setProcessedBy(breakRelationships(promotionRequest.getProcessedBy()));
            }

            if (promotionRequest.getNewDepartment() != null) {
                Department d = new Department();
                d.setDepartmentId(promotionRequest.getNewDepartment().getDepartmentId());
                d.setDepartmentName(promotionRequest.getNewDepartment().getDepartmentName());
                promotionRequest.setNewDepartment(d);

            }

            if (promotionRequest.getNewTeam() != null) {
                Team t = new Team();
                t.setTeamId(promotionRequest.getNewTeam().getTeamId());
                t.setTeamName(promotionRequest.getNewTeam().getTeamName());
                promotionRequest.setNewTeam(t);
            }

            return promotionRequest;

        } else {
            throw new IllegalStateException("Unable to find promotion request");
        }
    }

    // public String addAPromotionRequest(Long employeeId, Long managerId, Long
    // departmentId, Long processedBy, String interviewComments ){

    // User employeePromotion = userRepository.findById(employeeId)
    // .orElseThrow(() -> new IllegalStateException("User with ID: " + employeeId +
    // " does not exist!"));

    // PromotionRequest p = new PromotionRequest(LocalDate.now(), employeeId,
    // managerId, null, null, interviewComments, null,departmentId,
    // processedBy,StatusEnum.PENDING, employeePromotion);
    // // promotion.setStatus(StatusEnum.PENDING);
    // // promotion.setCreated(LocalDate.now());
    // promotionRepository.saveAndFlush(p);
    // return "Promotion Request is successfully created for employee: " +
    // employeePromotion.getFirstName();
    // }

    // public String addAPromotionRequest(Long employeeId, Long managerId, Long
    // departmentId, Long processedBy, String interviewComments ){
    //
    // User employeePromotion = userRepository.findById(employeeId)
    // .orElseThrow(() -> new IllegalStateException("User with ID: " + employeeId +
    // " does not exist!"));
    //
    // PromotionRequest p = new PromotionRequest(LocalDate.now(), employeeId,
    // managerId, null, null, interviewComments, null,departmentId,
    // processedBy,StatusEnum.PENDING, employeePromotion);
    //// promotion.setStatus(StatusEnum.PENDING);
    //// promotion.setCreated(LocalDate.now());
    // promotionRepository.saveAndFlush(p);
    // return "Promotion Request is successfully created for employee: " +
    // employeePromotion.getFirstName();
    // }

}
