package com.conceiversolutions.hrsystem.user.user;

import com.conceiversolutions.hrsystem.administration.task.Task;
import com.conceiversolutions.hrsystem.administration.task.TaskRepository;
import com.conceiversolutions.hrsystem.administration.tasklistitem.TaskListItem;
import com.conceiversolutions.hrsystem.administration.tasklistitem.TaskListItemRepository;
import com.conceiversolutions.hrsystem.administration.tasklistitem.TaskListItemService;
import com.conceiversolutions.hrsystem.emailhandler.EmailSender;
import com.conceiversolutions.hrsystem.engagement.leave.Leave;
import com.conceiversolutions.hrsystem.engagement.leavequota.LeaveQuota;
import com.conceiversolutions.hrsystem.engagement.leavequota.LeaveQuotaRepository;
import com.conceiversolutions.hrsystem.engagement.leave.LeaveRepository;
import com.conceiversolutions.hrsystem.enums.CitizenshipEnum;
import com.conceiversolutions.hrsystem.enums.EducationEnum;
import com.conceiversolutions.hrsystem.enums.GenderEnum;
import com.conceiversolutions.hrsystem.enums.JobTypeEnum;
import com.conceiversolutions.hrsystem.enums.RaceEnum;
import com.conceiversolutions.hrsystem.enums.RoleEnum;
import com.conceiversolutions.hrsystem.organizationstructure.department.Department;
import com.conceiversolutions.hrsystem.organizationstructure.department.DepartmentRepository;
import com.conceiversolutions.hrsystem.organizationstructure.team.Team;
import com.conceiversolutions.hrsystem.organizationstructure.team.TeamRepository;
import com.conceiversolutions.hrsystem.pay.allowance.Allowance;
import com.conceiversolutions.hrsystem.pay.allowance.AllowanceRepository;
import com.conceiversolutions.hrsystem.pay.allowanceTemplate.AllowanceTemplate;
import com.conceiversolutions.hrsystem.pay.allowanceTemplate.AllowanceTemplateRepository;
import com.conceiversolutions.hrsystem.pay.deduction.Deduction;
import com.conceiversolutions.hrsystem.pay.deduction.DeductionRepository;
import com.conceiversolutions.hrsystem.pay.deductionTemplate.DeductionTemplate;
import com.conceiversolutions.hrsystem.pay.deductionTemplate.DeductionTemplateRepository;
import com.conceiversolutions.hrsystem.pay.payinformation.PayInformation;
import com.conceiversolutions.hrsystem.pay.payinformation.PayInformationRepository;
import com.conceiversolutions.hrsystem.pay.payslip.Payslip;
import com.conceiversolutions.hrsystem.pay.payslip.PayslipRepository;
import com.conceiversolutions.hrsystem.rostering.roster.Roster;
import com.conceiversolutions.hrsystem.rostering.roster.RosterRepository;
import com.conceiversolutions.hrsystem.rostering.shift.Shift;
import com.conceiversolutions.hrsystem.rostering.swaprequest.SwapRequest;
import com.conceiversolutions.hrsystem.rostering.shiftlistitem.ShiftListItem;
import com.conceiversolutions.hrsystem.rostering.shiftlistitem.ShiftListItemRepository;
import com.conceiversolutions.hrsystem.rostering.shiftlistitem.ShiftListItemService;
import com.conceiversolutions.hrsystem.user.position.Position;
import com.conceiversolutions.hrsystem.user.position.PositionRepository;
import com.conceiversolutions.hrsystem.user.qualificationinformation.QualificationService;
import com.conceiversolutions.hrsystem.user.reactivationrequest.ReactivationRequest;
import com.conceiversolutions.hrsystem.user.reactivationrequest.ReactivationRequestRepository;
import com.conceiversolutions.hrsystem.user.registration.EmailValidator;
import com.conceiversolutions.hrsystem.user.registration.token.ConfirmationToken;
import com.conceiversolutions.hrsystem.user.registration.token.ConfirmationTokenRepository;
import com.conceiversolutions.hrsystem.user.registration.token.ConfirmationTokenService;
import lombok.AllArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.CriteriaBuilder;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final static String USER_NOT_FOUND_MSG = "User with email %s not found";
    private final EmailValidator emailValidator;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ConfirmationTokenService confirmationTokenService;
    private final EmailSender emailSender;
    private final ConfirmationTokenRepository confirmationTokenRepository;
    private final ReactivationRequestRepository reactivationRequestRepository;
    private final DepartmentRepository departmentRepository;
    private final TeamRepository teamRepository;
    private final PositionRepository positionRepository;
    private final LeaveQuotaRepository leaveQuotaRepository;
    private final ShiftListItemService shiftListItemService;
    private final RosterRepository rosterRepository;
    private final QualificationService qualificationService;
    private final PayInformationRepository payInformationRepository;
    private final AllowanceRepository allowanceRepository;
    private final DeductionRepository deductionRepository;
    private final AllowanceTemplateRepository allowanceTemplateRepository;
    private final DeductionTemplateRepository deductionTemplateRepository;
    private final PayslipRepository payslipRepository;
    private final TaskRepository taskRepository;
    private final TaskListItemService taskListItemService;
    private final TaskListItemRepository taskListItemRepository;

    // @Autowired
    // public UserService(UserRepository userRepository, EmailValidator
    // emailValidator, BCryptPasswordEncoder bCryptPasswordEncoder,
    // ConfirmationTokenService confirmationTokenService, EmailSender emailSender,
    // ConfirmationTokenRepository confirmationTokenRepository,
    // ReactivationRequestRepository reactivationRequestRepository) {
    // this.userRepository = userRepository;
    // this.emailValidator = emailValidator;
    // this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    // this.confirmationTokenService = confirmationTokenService;
    // this.emailSender = emailSender;
    // this.confirmationTokenRepository = confirmationTokenRepository;
    // this.reactivationRequestRepository = reactivationRequestRepository;
    // }

    // public List<User> getTestUsers() {
    // return List.of(
    // new User("Janice",
    // "Sim",
    // "password",
    // 93823503,
    // "janicesim@gmail.com",
    // LocalDate.of(2000,2,28),
    // GenderEnum.FEMALE,
    // RoleEnum.APPLICANT,
    // false,
    // false,
    // null
    // )
    // );
    // }

    public List<User> getAllUsers() {
        System.out.println("UserService.getAllUsers");

        List<User> users = userRepository.findAll();
        System.out.println("size of user list is " + users.size());
        for (User u : users) {
            List<Team> teams = u.getTeams();
            for (Team t : teams) {
                t.setTeamHead(null);
                t.setUsers(new ArrayList<>());
                t.setDepartment(null);
                t.setOutlet(null);
                t.setRoster(null);
            }
            // u.setTaskListItems(null);
            for (TaskListItem taskListItem : u.getTaskListItems()) {
                taskListItem.setUser(null);
                taskListItem.getTask().setTaskListItems(new ArrayList<>());
                taskListItem.getTask().setCategory(null);
            }
            u.setQualificationInformation(null);
            u.setBlocks(new ArrayList<>());
            u.setShiftListItems(new ArrayList<>());
            u.setSwapRequestsReceived(new ArrayList<>());
            u.setSwapRequestsRequested(new ArrayList<>());
            u.setReactivationRequest(null);
            u.setAttendances(new ArrayList<>());
            u.setCurrentPayInformation(null);
            u.setEmployeeAppraisals(new ArrayList<>());
            u.setManagerAppraisals(new ArrayList<>());
            u.setManagerReviews(new ArrayList<>());
            u.setEmployeeReviews(new ArrayList<>());
            u.setApplications(new ArrayList<>());
            u.setGoals(new ArrayList<>());
            u.setPositions(new ArrayList<>());
            u.setJobRequests(new ArrayList<>());
            u.setLeaves(new ArrayList<>());
            u.setLeaveQuotas(new ArrayList<>());
            u.setBenefitPlanInstances(new ArrayList<>());
            if (u.getCurrentLeaveQuota() != null) { // first layer
                if (u.getCurrentLeaveQuota().getPreviousLeaveQuota() != null) { // second layer
                    u.getCurrentLeaveQuota().getPreviousLeaveQuota().setPreviousLeaveQuota(null); // third layer don't
                                                                                                  // need
                }
            }
        }

        return users;
    }

    public User getUser(Long id) {
        System.out.println("UserService.getUser");
        System.out.println("id = " + id);
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            System.out.println("User found");
            System.out.println(user.get());

            User u = user.get();

            List<Team> teams = u.getTeams();
            for (Team t : teams) {
                t.setTeamHead(null);
                t.setUsers(new ArrayList<>());
                t.setDepartment(null);
                t.setOutlet(null);
                t.setRoster(null);
            }
            // u.setTaskListItems(null);
            for (TaskListItem taskListItem : u.getTaskListItems()) {
                taskListItem.setUser(null);
                taskListItem.getTask().setTaskListItems(new ArrayList<>());
                taskListItem.getTask().setCategory(null);
            }
            u.setQualificationInformation(null);
            u.setBlocks(new ArrayList<>());
            u.setShiftListItems(new ArrayList<>());
            u.setSwapRequestsReceived(new ArrayList<>());
            u.setSwapRequestsRequested(new ArrayList<>());
            u.setReactivationRequest(null);
            u.setAttendances(new ArrayList<>());
            u.setCurrentPayInformation(null);
            u.setEmployeeAppraisals(new ArrayList<>());
            u.setManagerAppraisals(new ArrayList<>());
            u.setManagerReviews(new ArrayList<>());
            u.setEmployeeReviews(new ArrayList<>());
            u.setApplications(new ArrayList<>());
            u.setGoals(new ArrayList<>());
            u.setPositions(new ArrayList<>());
            u.setJobRequests(new ArrayList<>());
            u.setLeaves(new ArrayList<>());
            u.setLeaveQuotas(new ArrayList<>());
            u.setCurrentLeaveQuota(null);
            u.setPreferredDates(null);
            u.setBenefitPlanInstances(new ArrayList<>());

            return u;
        } else {
            throw new IllegalStateException("User does not exist.");
        }

    }

    public User getUser(String email) {
        System.out.println("UserService.getUser");
        System.out.println("email = " + email);
        Optional<User> user = userRepository.findUserByEmail(email);
        if (user.isPresent()) {
            System.out.println("User found");
            System.out.println(user.get());

            User u = user.get();

            List<Team> teams = u.getTeams();
            for (Team t : teams) {
                t.setTeamHead(null);
                t.setUsers(new ArrayList<>());
                t.setDepartment(null);
                t.setOutlet(null);
                t.setRoster(null);
            }
            // u.setTaskListItems(null);
            for (TaskListItem taskListItem : u.getTaskListItems()) {
                taskListItem.setUser(null);
                taskListItem.getTask().setTaskListItems(new ArrayList<>());
                taskListItem.getTask().setCategory(null);
            }
            u.setQualificationInformation(null);
            u.setBlocks(new ArrayList<>());
            u.setShiftListItems(new ArrayList<>());
            u.setSwapRequestsReceived(new ArrayList<>());
            u.setSwapRequestsRequested(new ArrayList<>());
            u.setReactivationRequest(null);
            u.setAttendances(new ArrayList<>());
            u.setCurrentPayInformation(null);
            u.setEmployeeAppraisals(new ArrayList<>());
            u.setManagerAppraisals(new ArrayList<>());
            u.setManagerReviews(new ArrayList<>());
            u.setEmployeeReviews(new ArrayList<>());
            u.setApplications(new ArrayList<>());
            u.setGoals(new ArrayList<>());
            u.setPositions(new ArrayList<>());
            u.setJobRequests(new ArrayList<>());
            u.setLeaves(new ArrayList<>());
            u.setLeaveQuotas(new ArrayList<>());
            u.setCurrentLeaveQuota(null);
            u.setBenefitPlanInstances(new ArrayList<>());
            return u;
        } else {
            throw new IllegalStateException("User does not exist.");
        }
    }

    public User getEmployee(String workEmail) {
        System.out.println("UserService.getEmployee");
        System.out.println("email = " + workEmail);
        Optional<User> user = userRepository.findUserByWorkEmail(workEmail);
        if (user.isPresent()) {
            System.out.println("Employee found");
            System.out.println(user.get());

            User u = user.get();

            List<Team> teams = u.getTeams();
            for (Team t : teams) {
                t.setTeamHead(null);
                t.setUsers(new ArrayList<>());
                t.setDepartment(null);
                t.setOutlet(null);
                t.setRoster(null);
            }
            // u.setTaskListItems(null);
            for (TaskListItem taskListItem : u.getTaskListItems()) {
                taskListItem.setUser(null);
                taskListItem.getTask().setTaskListItems(new ArrayList<>());
                taskListItem.getTask().setCategory(null);
            }
            u.setQualificationInformation(null);
            u.setBlocks(new ArrayList<>());
            u.setShiftListItems(new ArrayList<>());
            u.setSwapRequestsReceived(new ArrayList<>());
            u.setSwapRequestsRequested(new ArrayList<>());
            u.setReactivationRequest(null);
            u.setAttendances(new ArrayList<>());
            u.setCurrentPayInformation(null);
            u.setEmployeeAppraisals(new ArrayList<>());
            u.setManagerAppraisals(new ArrayList<>());
            u.setManagerReviews(new ArrayList<>());
            u.setEmployeeReviews(new ArrayList<>());
            u.setApplications(new ArrayList<>());
            u.setGoals(new ArrayList<>());
            u.setPositions(new ArrayList<>());
            u.setJobRequests(new ArrayList<>());
            u.setLeaves(new ArrayList<>());
            u.setLeaveQuotas(new ArrayList<>());
            u.setCurrentLeaveQuota(null);
            u.setBenefitPlanInstances(new ArrayList<>());
            return u;
        } else {
            throw new IllegalStateException("Employee does not exist.");
        }
    }

    public List<User> getEmployeesWithoutTask(Long taskId) {
        List<User> employees = userRepository.findEmployeesWithoutTask(taskId, RoleEnum.ADMINISTRATOR,
                RoleEnum.APPLICANT);
        for (User employee : employees) {
            employee.setTaskListItems(new ArrayList<>());
            // for (TaskListItem taskListItem : employee.getTaskListItems()) {
            // taskListItem.setUser(null);
            // taskListItem.getTask().setTaskListItems(new ArrayList<>());
            // taskListItem.getTask().setCategory(null);
            // }
            List<Team> teams = employee.getTeams();
            for (Team t : teams) {
                t.setTeamHead(null);
                t.setUsers(new ArrayList<>());
                // t.setDepartment(null);
                t.setRoster(null);
                t.setTeamHead(null);
                t.getDepartment().setTeams(new ArrayList<>());
                t.getDepartment().setOrganization(null);
                t.getDepartment().setDepartmentHead(null);
            }
            employee.setBlocks(new ArrayList<>());
            employee.setShiftListItems(new ArrayList<>());
            employee.setSwapRequestsReceived(new ArrayList<>());
            employee.setSwapRequestsRequested(new ArrayList<>());
            employee.setReactivationRequest(null);
            employee.setAttendances(new ArrayList<>());
            employee.setCurrentPayInformation(null);
            employee.setEmployeeAppraisals(new ArrayList<>());
            employee.setManagerAppraisals(new ArrayList<>());
            employee.setManagerReviews(new ArrayList<>());
            employee.setEmployeeReviews(new ArrayList<>());
            employee.setApplications(new ArrayList<>());
            employee.setGoals(new ArrayList<>());
            employee.setPositions(new ArrayList<>());
            employee.setJobRequests(new ArrayList<>());
            employee.setLeaves(new ArrayList<>());
            employee.setLeaveQuotas(new ArrayList<>());
            employee.setCurrentLeaveQuota(null);
            employee.setQualificationInformation(null);

            // employee.setTeams(new ArrayList<>());

            // List<Team> teams = employee.getTeams();
            // for (Team t : teams) {
            // t.setTeamHead(null);
            // t.setUsers(new ArrayList<>());
            // t.setDepartment(null);
            // t.setOutlet(null);
            // t.setRoster(null);
            // }
        }
        return employees;
    }

    public List<User> getEmployeesWithTask(Long taskId) {
        List<User> employees = userRepository.findEmployeesWithTask(taskId, RoleEnum.ADMINISTRATOR, RoleEnum.APPLICANT);
        for (User employee : employees) {
            // employee.setTaskListItems(new ArrayList<>());
            for (TaskListItem taskListItem : employee.getTaskListItems()) {
                taskListItem.setUser(null);
                taskListItem.getTask().setTaskListItems(new ArrayList<>());
                taskListItem.getTask().setCategory(null);
            }
            employee.setBlocks(new ArrayList<>());
            employee.setShiftListItems(new ArrayList<>());
            employee.setSwapRequestsReceived(new ArrayList<>());
            employee.setSwapRequestsRequested(new ArrayList<>());
            employee.setReactivationRequest(null);
            employee.setAttendances(new ArrayList<>());
            employee.setCurrentPayInformation(null);
            employee.setEmployeeAppraisals(new ArrayList<>());
            employee.setManagerAppraisals(new ArrayList<>());
            employee.setManagerReviews(new ArrayList<>());
            employee.setEmployeeReviews(new ArrayList<>());
            employee.setApplications(new ArrayList<>());
            employee.setGoals(new ArrayList<>());
            employee.setPositions(new ArrayList<>());
            employee.setJobRequests(new ArrayList<>());
            employee.setLeaves(new ArrayList<>());
            employee.setLeaveQuotas(new ArrayList<>());
            employee.setCurrentLeaveQuota(null);
            employee.setQualificationInformation(null);
            employee.setBenefitPlanInstances(new ArrayList<>());
            // List<Team> teams = employee.getTeams();
            // employee.setTeams(new ArrayList<>());
            List<Team> teams = employee.getTeams();
            for (Team t : teams) {
                t.setTeamHead(null);
                t.setUsers(new ArrayList<>());
                // t.setDepartment(null);
                t.setRoster(null);
                t.setTeamHead(null);
                t.getDepartment().setTeams(new ArrayList<>());
                t.getDepartment().setOrganization(null);
                t.getDepartment().setDepartmentHead(null);
            }
            // for (Team t : teams) {
            // t.setTeamHead(null);
            // t.setUsers(new ArrayList<>());
            // t.setDepartment(null);
            // t.setOutlet(null);
            // t.setRoster(null);
            // }
        }

        return employees;
    }

    public Long addNewUser(User user) {
        System.out.println("UserService.addNewUser");
        // Check if email is valid
        boolean isValidEmail = emailValidator.test(user.getEmail());
        if (!isValidEmail) {
            throw new IllegalStateException("Email address is not valid");
        }

        // Check if email is already used
        if (user.getUserRole().equals(RoleEnum.APPLICANT)) {
            Optional<User> userByEmail = userRepository.findUserByEmail(user.getEmail());
            if (userByEmail.isPresent()) {
                System.out.println("Email already in use.");
                throw new IllegalStateException("User's email is already in use");
            }
        } else {
            System.out.println("work email " + user.getWorkEmail());
            String workEmailToCheck = user.getWorkEmail();
            boolean isValidWorkEmail = emailValidator.test(workEmailToCheck);
            if (!isValidWorkEmail) {
                throw new IllegalStateException("Work email address is not valid");
            }
            Optional<User> employeeByWorkEmail1 = userRepository.findUserByEmail(user.getEmail());

            Optional<User> employeeByWorkEmail2 = userRepository.findUserByWorkEmail(user.getWorkEmail());
            if (employeeByWorkEmail1.isPresent() || employeeByWorkEmail2.isPresent()) {
                System.out.println("Email(s) already in use.");
                throw new IllegalStateException("User's emails are already in use");
            }

        }

        String encodedPassword = "";
        if (user.getUserRole().equals(RoleEnum.APPLICANT)) {
            encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
        } else {
            encodedPassword = bCryptPasswordEncoder.encode(user.getWorkEmail());
        }
        user.setPassword(encodedPassword);

        // Add Leave Quota for staff
        if (!user.getUserRole().equals(RoleEnum.APPLICANT)) {
            // fulltime gets all
            if (user.getCurrentPosition().getJobType().equals(JobTypeEnum.FULLTIME)) {
                LeaveQuota lq = new LeaveQuota();
                lq = lq.populateFullTime(user.getCurrentPosition().getStartDate());
                LeaveQuota savedLQ = leaveQuotaRepository.saveAndFlush(lq);

                user.setCurrentLeaveQuota(savedLQ);
                user.setLeaveQuotas(List.of(savedLQ));
            }
            // TODO : deal with contract
        }

        // List<Position> newPositions = user.getPositions();
        // positionRepository.saveAll(newPositions);

        User newUser = userRepository.saveAndFlush(user);

        // Add auto assigned tasks
        if (!newUser.getUserRole().equals(RoleEnum.APPLICANT)) {
            List<Task> tasks = taskRepository.findTaskByAutoAssign(true);
            for (Task task : tasks) {
                TaskListItem taskListItem = new TaskListItem(false);
                taskListItem.setUser(newUser);
                taskListItem.setTask(task);
                TaskListItem savedTaskListItem = taskListItemRepository.saveAndFlush(taskListItem);

                task.addTaskListItem(savedTaskListItem);
                taskRepository.save(task);

                newUser.addTaskListItem(savedTaskListItem);
            }
        }

        // userRepository.save(newUser);

        // Sending confirmation TOKEN to set user's isEnabled
        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token, LocalDateTime.now(), LocalDateTime.now().plusHours(1), newUser);

        confirmationTokenService.saveConfirmationToken(confirmationToken);
        String link = "";
        if (newUser.getUserRole().equals(RoleEnum.APPLICANT)) {
            link = "http://localhost:3000/verify/" + token;
            emailSender.send(
                    newUser.getEmail(), buildJMPConfirmationEmail(newUser.getFirstName(), link));
        } else {
            link = "http://localhost:3001/verify/" + token;
            emailSender.send(
                    newUser.getWorkEmail(),
                    buildHRMSConfirmationEmail(newUser.getFirstName(), link, newUser.getPassword()));
        }

        System.out.println("New user successfully created with User Id : " + newUser.getUserId());
        return newUser.getUserId();
    }

    public String loginUserJMP(String email, String password) throws Exception {
        System.out.println("UserService.loginUserJMP");
        System.out.println("email = " + email + ", password = " + password);
        Optional<User> user = userRepository.findUserByEmail(email);
        if (user.isPresent()) {
            User userRecord = user.get();

            if (userRecord.getBlackListed()) {
                throw new IllegalStateException("User account is not accessible, please request to be reactivated");
            } else if (!userRecord.isEnabled()) {
                throw new IllegalStateException(
                        "User account is not activated yet, please check your email or request to be activated");
            } else if (!user.get().getUserRole().equals(RoleEnum.APPLICANT)) {
                throw new IllegalStateException("User account is not an applicant");
            }

            if (bCryptPasswordEncoder.matches(password, userRecord.getPassword())) {
                System.out.println("User found and password matches. User Id is : " + userRecord.getUserId());
                return userRecord.getUserId().toString();
            } else {
                throw new IllegalStateException("User password does not match the record.");
            }
        } else {
            throw new IllegalStateException("User does not exist.");
        }
    }

    public String loginUserHRMS(String workEmail, String password) throws Exception {
        System.out.println("UserService.loginUserHRMS");
        System.out.println("workEmail = " + workEmail + ", password = " + password);
        Optional<User> user = userRepository.findUserByWorkEmail(workEmail);
        if (user.isPresent()) {
            System.out.println("Employee exists");
            User userRecord = user.get();

            if (!userRecord.isEnabled()) {
                System.out.println(
                        "Employee account is not activated yet, please check your work email or request to be activated");
                throw new Exception(
                        "Employee account is not activated yet, please check your work email or request to be activated");
            }

            if (bCryptPasswordEncoder.matches(password, userRecord.getPassword())) {
                System.out.println("Employee found and password matches. User Id is : " + userRecord.getUserId());
                return userRecord.getUserId().toString();
            } else {
                throw new IllegalStateException("User password does not match the record.");
            }
        } else {
            System.out.println("Employee does not exist");
            throw new IllegalStateException("User does not exist.");
        }
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        String[] split = email.split("@");
        if (split[1].startsWith("libro")) {
            return userRepository.findUserByWorkEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG, email)));
        } else {
            return userRepository.findUserByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG, email)));
        }
    }

    @Transactional
    public String confirmToken(String token) throws Exception {
        System.out.println("UserService.confirmToken");
        System.out.println("token = " + token);
        ConfirmationToken confirmationToken = confirmationTokenService
                .getToken(token)
                .orElseThrow(() -> new IllegalStateException("Token is not found"));

        if (confirmationToken.getConfirmedAt() != null) {
            System.out.println("Email is already verified");
            throw new IllegalStateException("Email has already confirmed");
        }

        LocalDateTime expiredAt = confirmationToken.getExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            System.out.println("Token has already expired");
            throw new IllegalStateException("Token has already expired");
        }

        confirmationTokenService.setConfirmedAt(token);

        Optional<User> optionalUser = userRepository.findUserByToken(token);

        if (optionalUser.isPresent()) {
            User confirmedUser = optionalUser.get();
            // System.out.println("Confirmed User Work Email = " +
            // confirmedUser.getWorkEmail());
            if (confirmedUser.getWorkEmail().isEmpty()) {
                System.out.println("User about to be enabled " + getUserFromToken(token));
                enableUser(getUserFromToken(token));
            }
        }

        return "Token has been confirmed.";
    }

    public int enableUser(String email) {
        System.out.println("UserService.enableUser");
        System.out.println("email = " + email);
        return userRepository.enableUser(email);
    }

    public int disableUser(String email) {
        System.out.println("UserService.disableUser");
        System.out.println("email = " + email);
        return userRepository.disableUser(email);
    }

    public String getUserFromToken(String token) {
        System.out.println("UserService.getUserFromToken");
        Optional<User> user = userRepository.findUserByToken(token);
        if (user.isPresent()) {
            return user.get().getEmail();
        } else {
            throw new IllegalStateException("User does not exist");
        }
    }

    public String getEmployeeFromToken(String token) {
        System.out.println("UserService.getEmployeeFromToken");
        Optional<User> employee = userRepository.findUserByToken(token);
        if (employee.isPresent()) {
            return employee.get().getWorkEmail();
        } else {
            throw new IllegalStateException("Employee does not exist");
        }
    }

    public Long forgotPasswordHRMS(String email) {
        System.out.println("UserService.forgotPassword");
        User tempUser = getEmployee(email);

        if (tempUser == null) {
            throw new IllegalStateException("User does not exist.");
        }

        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token, LocalDateTime.now(), LocalDateTime.now().plusHours(1), tempUser);

        confirmationTokenService.saveConfirmationToken(confirmationToken);

        String link = "http://localhost:3001/forgot/" + token;
        emailSender.send(email, buildForgotPasswordEmail(tempUser.getFirstName(), link));
        return tempUser.getUserId();
    }

    public Long forgotPasswordJMP(String email) {
        System.out.println("UserService.forgotPassword");
        User tempUser = getUser(email);

        if (tempUser == null) {
            throw new IllegalStateException("User does not exist.");
        }

        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token, LocalDateTime.now(), LocalDateTime.now().plusHours(1), tempUser);

        confirmationTokenService.saveConfirmationToken(confirmationToken);

        String link = "http://localhost:3000/forgot/" + token;
        emailSender.send(email, buildForgotPasswordEmail(tempUser.getFirstName(), link));
        return tempUser.getUserId();
    }

    private String buildJMPConfirmationEmail(String name, String link) {
        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
                "\n" +
                "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
                "\n" +
                "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n"
                +
                "    <tbody><tr>\n" +
                "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
                "        \n" +
                "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n"
                +
                "          <tbody><tr>\n" +
                "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
                "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n"
                +
                "                  <tbody><tr>\n" +
                "                    <td style=\"padding-left:10px\">\n" +
                "                  \n" +
                "                    </td>\n" +
                "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n"
                +
                "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Confirm your email</span>\n"
                +
                "                    </td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "              </a>\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "        </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n"
                +
                "    <tbody><tr>\n" +
                "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
                "      <td>\n" +
                "        \n" +
                "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n"
                +
                "                  <tbody><tr>\n" +
                "                    <td bgcolor=\"#1D70B8\" width=\"100%\" height=\"10\"></td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "\n" +
                "\n" +
                "\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n"
                +
                "    <tbody><tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n"
                +
                "        \n" +
                "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Hi " + name
                + ",</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> Thank you for registering an account with Libro. Please click on the below link to activate your account: </p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> <a href=\""
                + link + "\">Activate Now</a> </p></blockquote>\n Link will expire in 1 Hour. <p>Grow with Libro</p>" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
                "\n" +
                "</div></div>";
    }

    private String buildHRMSConfirmationEmail(String name, String link, String tempPassword) {
        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
                "\n" +
                "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
                "\n" +
                "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n"
                +
                "    <tbody><tr>\n" +
                "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
                "        \n" +
                "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n"
                +
                "          <tbody><tr>\n" +
                "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
                "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n"
                +
                "                  <tbody><tr>\n" +
                "                    <td style=\"padding-left:10px\">\n" +
                "                  \n" +
                "                    </td>\n" +
                "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n"
                +
                "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Confirm your email</span>\n"
                +
                "                    </td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "              </a>\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "        </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n"
                +
                "    <tbody><tr>\n" +
                "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
                "      <td>\n" +
                "        \n" +
                "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n"
                +
                "                  <tbody><tr>\n" +
                "                    <td bgcolor=\"#1D70B8\" width=\"100%\" height=\"10\"></td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "\n" +
                "\n" +
                "\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n"
                +
                "    <tbody><tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n"
                +
                "        \n" +
                "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Hi " + name
                + ",</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> Thank you for registering an account with Libro. Please enter the following temporary password in the link below to activate your account: </p> <p>"
                + tempPassword
                + "</p>\n \n <blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> <a href=\""
                + link + "\">Activate Now</a> </p></blockquote>\n Link will expire in 1 Hour. <p>Grow with Libro</p>" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
                "\n" +
                "</div></div>";
    }

    private String buildResetPasswordEmail(String name) {
        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
                "\n" +
                "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
                "\n" +
                "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n"
                +
                "    <tbody><tr>\n" +
                "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
                "        \n" +
                "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n"
                +
                "          <tbody><tr>\n" +
                "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
                "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n"
                +
                "                  <tbody><tr>\n" +
                "                    <td style=\"padding-left:10px\">\n" +
                "                  \n" +
                "                    </td>\n" +
                "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n"
                +
                "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Change your password</span>\n"
                +
                "                    </td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "              </a>\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "        </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n"
                +
                "    <tbody><tr>\n" +
                "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
                "      <td>\n" +
                "        \n" +
                "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n"
                +
                "                  <tbody><tr>\n" +
                "                    <td bgcolor=\"#1D70B8\" width=\"100%\" height=\"10\"></td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "\n" +
                "\n" +
                "\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n"
                +
                "    <tbody><tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n"
                +
                "        \n" +
                "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Hi " + name
                + ",</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> You have successfully reset your account password. If you did not request for the password reset, please contact us at : </p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> <p>in04.capstoner.2022@gmail.com</p></blockquote>\n  <p>Grow with Libro</p>"
                +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
                "\n" +
                "</div></div>";
    }

    private String buildForgotPasswordEmail(String name, String link) {
        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
                "\n" +
                "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
                "\n" +
                "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n"
                +
                "    <tbody><tr>\n" +
                "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
                "        \n" +
                "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n"
                +
                "          <tbody><tr>\n" +
                "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
                "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n"
                +
                "                  <tbody><tr>\n" +
                "                    <td style=\"padding-left:10px\">\n" +
                "                  \n" +
                "                    </td>\n" +
                "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n"
                +
                "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Reset your password</span>\n"
                +
                "                    </td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "              </a>\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "        </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n"
                +
                "    <tbody><tr>\n" +
                "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
                "      <td>\n" +
                "        \n" +
                "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n"
                +
                "                  <tbody><tr>\n" +
                "                    <td bgcolor=\"#1D70B8\" width=\"100%\" height=\"10\"></td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "\n" +
                "\n" +
                "\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n"
                +
                "    <tbody><tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n"
                +
                "        \n" +
                "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Hi " + name
                + ",</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> Please click on the link below to change your password. If you did not request for the password reset, please contact us at : </p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> <p>in04.capstoner.2022@gmail.com</p></blockquote>\n</p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> <a href=\""
                + link + "\">Change Now</a> </p></blockquote>\n Link will expire in 1 Hour. <p>Grow with Libro</p>" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
                "\n" +
                "</div></div>";
    }

    public Boolean testEmailRegex(String email) {
        System.out.println("UserService.testEmailRegex");
        Boolean result = emailValidator.test(email);
        System.out.println("result is " + result);
        return result;
    }

    public String resetPasswordJMP(String email, String oldPassword, String newPassword) {
        System.out.println("UserService.resetPasswordJMP");
        System.out.println("email = " + email + ", oldPassword = " + oldPassword + ", newPassword = " + newPassword);

        User user = getUser(email);
        if (bCryptPasswordEncoder.matches(oldPassword, user.getPassword())) {
            user.setPassword(bCryptPasswordEncoder.encode(newPassword));
        } else {
            throw new IllegalStateException("User's current password does not match the record.");
        }

        userRepository.saveAndFlush(user);
        System.out.println("User password has been changed");

        emailSender.send(
                email, buildResetPasswordEmail(user.getFirstName()));

        return "Password successfully changed for " + email;
    }

    public String resetPasswordHRMS(String workEmail, String oldPassword, String newPassword) {
        System.out.println("UserService.resetPasswordJMP");
        System.out.println(
                "workEmail = " + workEmail + ", oldPassword = " + oldPassword + ", newPassword = " + newPassword);

        User employee = getEmployee(workEmail);
        if (bCryptPasswordEncoder.matches(oldPassword, employee.getPassword())) {
            employee.setPassword(bCryptPasswordEncoder.encode(newPassword));
        } else {
            throw new IllegalStateException("User's current password does not match the record.");
        }

        userRepository.saveAndFlush(employee);
        System.out.println("User password has been changed");

        emailSender.send(
                workEmail, buildResetPasswordEmail(employee.getFirstName()));

        return "Password successfully changed for " + workEmail;
    }

    public String changePasswordJMP(String email, String password) {
        System.out.println("UserService.changePasswordJMP");
        System.out.println(
                "email = " + email + "," + "newPassword = " + password);

        User user = getUser(email);

        user.setPassword(bCryptPasswordEncoder.encode(password));

        userRepository.saveAndFlush(user);
        System.out.println("User password has been changed");

        emailSender.send(email, buildResetPasswordEmail(user.getFirstName()));

        return "Password successfully changed for " + email;
    }

    public String changePasswordHRMS(String workEmail, String password) {
        System.out.println("UserService.changePasswordHRMS");
        System.out.println(
                "workEmail = " + workEmail + "," + "newPassword = " + password);

        User employee = getEmployee(workEmail);

        employee.setPassword(bCryptPasswordEncoder.encode(password));

        userRepository.saveAndFlush(employee);
        System.out.println("Employee password has been changed");

        emailSender.send(workEmail, buildResetPasswordEmail(employee.getFirstName()));

        return "Password successfully changed for " + workEmail;
    }

    public String resendConfirmationEmail(String email, Integer platform) {
        System.out.println("UserService.resendConfirmationEmail");
        System.out.println("email = " + email + ", platform = " + platform);
        if (platform.equals(1)) { // JMP
            System.out.println("JMP Platform");
            User tempUser = getUser(email);

            System.out.println("User Id is : " + tempUser.getUserId());

            ConfirmationToken ct = confirmationTokenService.findUnconfirmedTokenByUserId(tempUser.getUserId());
            System.out.println("JMP Unconfirmed token identified");
            System.out.println("Confirmation Token is : " + ct.toString());

            ct.setExpiresAt(LocalDateTime.now().plusHours(1));
            confirmationTokenRepository.saveAndFlush(ct);

            String link = "http://localhost:3000/verify/" + ct.getToken();
            emailSender.send(
                    tempUser.getEmail(), buildJMPConfirmationEmail(tempUser.getFirstName(), link));
        } else { // HRMS/ESS
            System.out.println("HRMS/ESS Platform");
            User tempUser = getEmployee(email);

            System.out.println("User Id is : " + tempUser.getUserId());

            ConfirmationToken ct = confirmationTokenService.findUnconfirmedTokenByUserId(tempUser.getUserId());
            System.out.println("HRMS/ESS Unconfirmed token identified");
            System.out.println("Confirmation Token is : " + ct.toString());

            ct.setExpiresAt(LocalDateTime.now().plusHours(1));
            confirmationTokenRepository.saveAndFlush(ct);

            String link = "http://localhost:3001/verify/" + ct.getToken();
            emailSender.send(
                    tempUser.getWorkEmail(),
                    buildHRMSConfirmationEmail(tempUser.getFirstName(), link, tempUser.getPassword()));
        }
        return "Confirmation email resent";
    }

    public String requestAccountReactivation(String email, String reason) {
        System.out.println("UserService.requestAccountReactivation");
        User applicant = getUser(email);

        if (!applicant.getBlackListed() && applicant.isEnabled()) {
            throw new IllegalStateException("User account does not need reactivation");
        } else {
            ReactivationRequest req = new ReactivationRequest(LocalDateTime.now(), reason, applicant);
            ReactivationRequest savedReq = reactivationRequestRepository.saveAndFlush(req);
            applicant.setReactivationRequest(savedReq);
            userRepository.saveAndFlush(applicant);
            return "Reactivation Request has been recorded";
        }
    }

    @Transactional
    public String updateUser(Long userId, GenderEnum gender, String email, Integer phone) {
        System.out.println("UserService.updateUser");
        // System.out.println(.getUserRole());

        User user = getUser(userId);

        user.setPhone(phone);
        user.setEmail(email);
        user.setGender(gender);

        return "Update of user was successful";
    }

    public Long getUserFromEmail(String email) {
        System.out.println("UserService.getUserFromEmail");
        Optional<User> user = userRepository.findUserByEmail(email);
        if (user.isPresent()) {
            return user.get().getUserId();
        } else {
            throw new IllegalStateException("User not found");
        }
    }

    public Long getUserFromWorkEmail(String workEmail) {
        System.out.println("UserService.getUserFromWorkEmail");
        Optional<User> user = userRepository.findUserByWorkEmail(workEmail);
        if (user.isPresent()) {
            return user.get().getUserId();
        } else {
            throw new IllegalStateException("User not found");
        }
    }

    @Transactional
    public String updateUser(User newUser, Long id) {
        System.out.println("UserService.updateUser");

        User user = getUser(id);

        user.setFirstName(newUser.getFirstName());
        user.setLastName(newUser.getLastName());
        user.setPhone(newUser.getPhone());
        user.setEmail(newUser.getEmail());
        user.setDob(newUser.getDob());
        user.setGender(newUser.getGender());
        user.setProfilePic(newUser.getProfilePic());

        return "Update of user was successful";
    }

    public List<User> getAllManagers() {
        List<User> managers = userRepository.findAllByRole(RoleEnum.MANAGER);
        System.out.println("size of managers list is " + managers.size());
        for (User u : managers) {
            List<Team> teams = u.getTeams();
            for (Team t : teams) {
                t.setTeamHead(null);
                t.setUsers(new ArrayList<>());
                t.setDepartment(null);
                t.setRoster(null);
                t.setTeamHead(null);
            }
            // u.setTaskListItems(null);
            for (TaskListItem taskListItem : u.getTaskListItems()) {
                taskListItem.setUser(null);
                taskListItem.getTask().setTaskListItems(new ArrayList<>());
                taskListItem.getTask().setCategory(null);
            }
            u.setQualificationInformation(null);
            u.setBlocks(new ArrayList<>());
            u.setShiftListItems(new ArrayList<>());
            u.setSwapRequestsReceived(new ArrayList<>());
            u.setSwapRequestsRequested(new ArrayList<>());
            u.setReactivationRequest(null);
            u.setAttendances(new ArrayList<>());
            u.setCurrentPayInformation(null);
            u.setEmployeeAppraisals(new ArrayList<>());
            u.setManagerAppraisals(new ArrayList<>());
            u.setManagerReviews(new ArrayList<>());
            u.setEmployeeReviews(new ArrayList<>());
            u.setApplications(new ArrayList<>());
            u.setGoals(new ArrayList<>());
            u.setPositions(new ArrayList<>());
            u.setJobRequests(new ArrayList<>());
            u.setLeaves(new ArrayList<>());
            u.setLeaveQuotas(new ArrayList<>());
            u.setCurrentLeaveQuota(null);
            u.setBenefitPlanInstances(new ArrayList<>());
        }

        return managers;
    }

    public List<User> getAllEmployees() {
        List<User> employees = userRepository.findAllByRole(RoleEnum.EMPLOYEE);
        employees.addAll(userRepository.findAllByRole(RoleEnum.MANAGER));
        System.out.println("size of employees list is " + employees.size());
        for (User u : employees) {
            List<Team> teams = u.getTeams();
            for (Team t : teams) {
                t.setTeamHead(null);
                t.setUsers(new ArrayList<>());
                // t.setDepartment(null);
                t.setRoster(null);
                t.setTeamHead(null);
                t.getDepartment().setTeams(new ArrayList<>());
                t.getDepartment().setOrganization(null);
                t.getDepartment().setDepartmentHead(null);
            }

            List<TaskListItem> taskListItems = u.getTaskListItems();
            // u.setTaskListItems(null);
            for (TaskListItem taskListItem : taskListItems) {
                taskListItem.setUser(null);
                taskListItem.getTask().setTaskListItems(new ArrayList<>());
                taskListItem.getTask().setCategory(null);
            }

            // nullify other side for pay information, allowance & deduction
            PayInformation tempPayInformation = null;
            if (u.getCurrentPayInformation() != null) {
                tempPayInformation = u.getCurrentPayInformation();
                tempPayInformation.setUser(null);
            }

            Position tempPosition = null;
            if (u.getCurrentPosition() != null) {
                tempPosition = u.getCurrentPosition();
            }

            List<Payslip> tempPayslips = new ArrayList<>();
            if (u.getPayslips() != null) {
                tempPayslips = u.getPayslips();
                for (Payslip payslip : tempPayslips) {
                    payslip.setPayInformation(null);
                    payslip.setEmployee(null);
                }
            }

            List<ShiftListItem> tempShiftListItems = new ArrayList<>();
            if (u.getShiftListItems() != null) {
                tempShiftListItems = u.getShiftListItems();
                for (ShiftListItem shiftListItem : tempShiftListItems) {
                    shiftListItem.setUser(null);
                    shiftListItem.getShift().setRoster(null);
                    shiftListItem.getShift().setShiftListItems(new ArrayList<>());
                }
            }

            u.nullify();
            u.setTeams(teams);
            u.setTaskListItems(taskListItems);
            u.setCurrentPayInformation(tempPayInformation);
            u.setCurrentPosition(tempPosition);
            u.setPayslips(tempPayslips);
            u.setShiftListItems(tempShiftListItems);
        }
        return employees;
    }

    public List<User> getAllEmployeesInclLeaveQuotas() {
        System.out.println("UserService.getAllEmployeesInclLeaveQuotas");
        List<User> employees = userRepository.findAllByRole(RoleEnum.EMPLOYEE);
        employees.addAll(userRepository.findAllByRole(RoleEnum.MANAGER));
        System.out.println("size of employees list is " + employees.size());
        for (User u : employees) {
            List<Team> teams = u.getTeams();
            for (Team t : teams) {
                t.setTeamHead(null);
                t.setUsers(new ArrayList<>());
                t.setDepartment(null);
                t.setRoster(null);
                t.setTeamHead(null);
            }
            // u.setTaskListItems(null);
            for (TaskListItem taskListItem : u.getTaskListItems()) {
                taskListItem.setUser(null);
                taskListItem.getTask().setTaskListItems(new ArrayList<>());
                taskListItem.getTask().setCategory(null);
            }
            u.setQualificationInformation(null);
            u.setBlocks(new ArrayList<>());
            u.setShiftListItems(new ArrayList<>());
            u.setSwapRequestsReceived(new ArrayList<>());
            u.setSwapRequestsRequested(new ArrayList<>());
            u.setReactivationRequest(null);
            u.setAttendances(new ArrayList<>());
            u.setCurrentPayInformation(null);
            u.setEmployeeAppraisals(new ArrayList<>());
            u.setManagerAppraisals(new ArrayList<>());
            u.setManagerReviews(new ArrayList<>());
            u.setEmployeeReviews(new ArrayList<>());
            // u.setModules(new ArrayList<>());
            u.setApplications(new ArrayList<>());
            u.setGoals(new ArrayList<>());
            u.setPositions(new ArrayList<>());
            u.setJobRequests(new ArrayList<>());
            u.setLeaves(new ArrayList<>());
            u.setLeaveQuotas(new ArrayList<>());
            u.setBenefitPlanInstances(new ArrayList<>());
            for (LeaveQuota lq : u.getLeaveQuotas()) {
                u.getCurrentLeaveQuota().setPreviousLeaveQuota(null);
            }
            if (u.getCurrentLeaveQuota() != null) {
                if (u.getCurrentLeaveQuota().getPreviousLeaveQuota() != null) {
                    u.getCurrentLeaveQuota().getPreviousLeaveQuota().setPreviousLeaveQuota(null);
                }
            }

        }
        return employees;
    }

    public List<User> getAllStaff() {
        List<User> employees = userRepository.findAllStaff(RoleEnum.MANAGER, RoleEnum.EMPLOYEE);
        System.out.println("size of employee list is " + employees.size());
        for (User u : employees) {
            List<Team> teams = u.getTeams();
            for (Team t : teams) {
                t.setTeamHead(null);
                t.setUsers(new ArrayList<>());
                t.setDepartment(null);
                t.setRoster(null);
                t.setTeamHead(null);
            }
            // u.setTaskListItems(null);
            for (TaskListItem taskListItem : u.getTaskListItems()) {
                taskListItem.setUser(null);
                taskListItem.getTask().setTaskListItems(new ArrayList<>());
                taskListItem.getTask().setCategory(null);
            }
            u.setQualificationInformation(null);
            u.setBlocks(new ArrayList<>());
            u.setShiftListItems(new ArrayList<>());
            u.setSwapRequestsReceived(new ArrayList<>());
            u.setSwapRequestsRequested(new ArrayList<>());
            u.setReactivationRequest(null);
            u.setAttendances(new ArrayList<>());
            u.setCurrentPayInformation(null);
            u.setEmployeeAppraisals(new ArrayList<>());
            u.setManagerAppraisals(new ArrayList<>());
            u.setManagerReviews(new ArrayList<>());
            u.setEmployeeReviews(new ArrayList<>());
            u.setApplications(new ArrayList<>());
            u.setGoals(new ArrayList<>());
            u.setPositions(new ArrayList<>());
            u.setJobRequests(new ArrayList<>());
            u.setLeaves(new ArrayList<>());
            u.setLeaveQuotas(new ArrayList<>());
            u.setCurrentLeaveQuota(null);
            u.setBenefitPlanInstances(new ArrayList<>());
        }

        return employees;
    }

    public List<User> getAllApplicants() {
        List<User> applicants = userRepository.findAllApplicants(RoleEnum.APPLICANT);
        System.out.println("size of applicant " + applicants.size());
        for (User u : applicants) {
            List<Team> teams = u.getTeams();
            for (Team t : teams) {
                t.setTeamHead(null);
                t.setUsers(new ArrayList<>());
                t.setDepartment(null);
                t.setRoster(null);
                t.setTeamHead(null);
            }
            // u.setTaskListItems(null);
            for (TaskListItem taskListItem : u.getTaskListItems()) {
                taskListItem.setUser(null);
                taskListItem.getTask().setTaskListItems(new ArrayList<>());
                taskListItem.getTask().setCategory(null);
            }
            u.setQualificationInformation(null);
            u.setBlocks(new ArrayList<>());
            u.setShiftListItems(new ArrayList<>());
            u.setSwapRequestsReceived(new ArrayList<>());
            u.setSwapRequestsRequested(new ArrayList<>());
            u.setReactivationRequest(null);
            u.setAttendances(new ArrayList<>());
            u.setCurrentPayInformation(null);
            u.setEmployeeAppraisals(new ArrayList<>());
            u.setManagerAppraisals(new ArrayList<>());
            u.setManagerReviews(new ArrayList<>());
            u.setEmployeeReviews(new ArrayList<>());
            u.setApplications(new ArrayList<>());
            u.setGoals(new ArrayList<>());
            u.setPositions(new ArrayList<>());
            u.setJobRequests(new ArrayList<>());
            u.setLeaves(new ArrayList<>());
            u.setLeaveQuotas(new ArrayList<>());
            u.setCurrentLeaveQuota(null);
            u.setBenefitPlanInstances(new ArrayList<>());
        }

        return applicants;
    }

    public Long initAdmin(User user) {
        System.out.println("UserService.initAdmin");
        boolean isValidEmail = emailValidator.test(user.getEmail());
        if (!isValidEmail) {
            throw new IllegalStateException("Email address is not valid");
        }
        System.out.println("work email " + user.getWorkEmail());
        String workEmailToCheck = user.getWorkEmail();
        boolean isValidWorkEmail = emailValidator.test(workEmailToCheck);
        if (!isValidWorkEmail) {
            throw new IllegalStateException("Work email address is not valid");
        }
        Optional<User> employeeByWorkEmail1 = userRepository.findUserByEmail(user.getEmail());

        Optional<User> employeeByWorkEmail2 = userRepository.findUserByWorkEmail(user.getWorkEmail());
        if (employeeByWorkEmail1.isPresent() || employeeByWorkEmail2.isPresent()) {
            System.out.println("Email(s) already in use.");
            throw new IllegalStateException("User's emails are already in use");
        }

        // Add Leave Quota for staff
        if (!user.getUserRole().equals(RoleEnum.APPLICANT)) {
            // fulltime gets all
            if (!user.getIsPartTimer()) {
                LeaveQuota lq = new LeaveQuota();
                lq = lq.populateFullTime(LocalDate.now());
                LeaveQuota savedLQ = leaveQuotaRepository.saveAndFlush(lq);

                user.setCurrentLeaveQuota(savedLQ);
                user.setLeaveQuotas(List.of(savedLQ));
            }
        }

        String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        positionRepository.save(user.getCurrentPosition());
        payInformationRepository.save(user.getCurrentPayInformation());
        for (Payslip payslip : user.getPayslips()) {
            payslipRepository.save(payslip);
        }
        User newUser = userRepository.saveAndFlush(user);
        return newUser.getUserId();
    }

    public Long initApplicant(User user) {
        System.out.println("UserService.initAdmin");
        boolean isValidEmail = emailValidator.test(user.getEmail());
        if (!isValidEmail) {
            throw new IllegalStateException("Email address is not valid");
        }

        Optional<User> employeeByEmail = userRepository.findUserByEmail(user.getEmail());

        if (employeeByEmail.isPresent()) {
            System.out.println("Email already in use.");
            throw new IllegalStateException("User's email is already in use");
        }

        String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        User newUser = userRepository.saveAndFlush(user);
        return newUser.getUserId();
    }

    public List<User> getAllAvailManagers() {
        List<Department> departments = departmentRepository.findAll();
        List<Long> deptHeadIds = new ArrayList<>();
        for (Department d : departments) {
            deptHeadIds.add(d.getDepartmentHead().getUserId());
        }

        List<Team> allTeams = teamRepository.findAll();
        List<Long> teamHeadIds = new ArrayList<>();
        for (Team t : allTeams) {
            teamHeadIds.add(t.getTeamHead().getUserId());
        }

        List<User> managers = userRepository.findAllByRole(RoleEnum.MANAGER);
        System.out.println("size of managers list is " + managers.size());
        List<User> availManagers = new ArrayList<>();
        for (User u : managers) {
            if (!deptHeadIds.contains(u.getUserId()) && !teamHeadIds.contains(u.getUserId())) {
                List<Team> teams = u.getTeams();
                for (Team t : teams) {
                    t.setTeamHead(null);
                    t.setUsers(new ArrayList<>());
                    t.setDepartment(null);
                    t.setRoster(null);
                    t.setTeamHead(null);
                }
                // u.setTaskListItems(null);
                for (TaskListItem taskListItem : u.getTaskListItems()) {
                    taskListItem.setUser(null);
                    taskListItem.getTask().setTaskListItems(new ArrayList<>());
                    taskListItem.getTask().setCategory(null);
                }
                u.setQualificationInformation(null);
                u.setBlocks(new ArrayList<>());
                u.setShiftListItems(new ArrayList<>());
                u.setSwapRequestsReceived(new ArrayList<>());
                u.setSwapRequestsRequested(new ArrayList<>());
                u.setReactivationRequest(null);
                u.setAttendances(new ArrayList<>());
                u.setCurrentPayInformation(null);
                u.setEmployeeAppraisals(new ArrayList<>());
                u.setManagerAppraisals(new ArrayList<>());
                u.setManagerReviews(new ArrayList<>());
                u.setEmployeeReviews(new ArrayList<>());
                u.setApplications(new ArrayList<>());
                u.setGoals(new ArrayList<>());
                u.setPositions(new ArrayList<>());
                u.setJobRequests(new ArrayList<>());
                u.setLeaves(new ArrayList<>());
                u.setLeaveQuotas(new ArrayList<>());
                u.setCurrentLeaveQuota(null);
                u.setBenefitPlanInstances(new ArrayList<>());
                availManagers.add(u);
            }
        }

        return availManagers;
    }

    public List<User> getEmployeesNotInGivenTeam(Integer teamId) {
        System.out.println("UserService.getEmployeesNotInGivenTeam");
        System.out.println("teamId = " + teamId);

        List<User> employees = userRepository.getEmployeesNotInGivenTeam(RoleEnum.MANAGER, RoleEnum.EMPLOYEE,
                Long.valueOf(teamId));

        System.out.println("EMPLOYEES NOT IN GIVEN TEAM: " + employees);

        if (employees.isEmpty()) {
            throw new IllegalStateException("Employees not found.");
        }

        for (User e : employees) {
            List<Team> teams = e.getTeams();
            for (Team t : teams) {
                t.setUsers(new ArrayList<>());
                t.setDepartment(null);
                t.setOutlet(null);
                t.setTeamHead(null);
                t.setRoster(null);
            }
            // u.setTaskListItems(null);
            for (TaskListItem taskListItem : e.getTaskListItems()) {
                taskListItem.setUser(null);
                taskListItem.getTask().setTaskListItems(new ArrayList<>());
                taskListItem.getTask().setCategory(null);
            }
            e.setQualificationInformation(null);
            e.setBlocks(new ArrayList<>());
            e.setShiftListItems(new ArrayList<>());
            e.setSwapRequestsReceived(new ArrayList<>());
            e.setSwapRequestsRequested(new ArrayList<>());
            e.setReactivationRequest(null);
            e.setAttendances(new ArrayList<>());
            e.setCurrentPayInformation(null);
            e.setEmployeeAppraisals(new ArrayList<>());
            e.setManagerAppraisals(new ArrayList<>());
            e.setManagerReviews(new ArrayList<>());
            e.setEmployeeReviews(new ArrayList<>());
            e.setApplications(new ArrayList<>());
            e.setGoals(new ArrayList<>());
            e.setPositions(new ArrayList<>());
            e.setJobRequests(new ArrayList<>());
            e.setLeaves(new ArrayList<>());
            e.setLeaveQuotas(new ArrayList<>());
            e.setCurrentLeaveQuota(null);
            e.setBenefitPlanInstances(new ArrayList<>());

        }

        return employees;
    }

    public String verifyTempPassword(String workEmail, String tempPassword) {
        String currentPassword = getEmployee(workEmail).getPassword();
        if (tempPassword.equals(currentPassword)) {
            return "Temporary password verified";
        }
        throw new IllegalStateException("Invalid temporary password");
    }

    @Transactional
    public String setFirstPassword(String workEmail, String password) {
        // User user = getEmployee(workEmail);
        User user = userRepository.findUserByWorkEmail(workEmail).get();
        String encodedPassword = bCryptPasswordEncoder.encode(password);
        user.setPassword(encodedPassword);
        enableUser(user.getEmail());
        userRepository.saveAndFlush(user);
        return "Successfully set password";
    }

    @Transactional
    public String setUserStatus(String email) {
        User user = userRepository.findUserByWorkEmail(email).get();
        if (user.getIsEnabled()) {
            disableUser(user.getEmail());
        } else {
            enableUser(user.getEmail());
        }

        userRepository.saveAndFlush(user);
        return "Successfully disabled/enabled ";
    }

    // need to figure out how it looks on front end first
    // check if today, they have any attendance first
    // and on shift, if yes then add
    // need to tally
    // check if need to use ZonedDateTime
    // paid lunch break

    // FULL-TIME
    // Allowance
    // Basic Monthly Rate, Overtime Hourly Pay
    // Deduction
    // Self Help Group Contribution Type

    // PART-TIME
    // Allowance
    // Basic Hourly Rate, Weekend Hourly Rate, Overtime Hourly Rate, PH/Event Hourly
    // Rate
    // Deduction
    // Self Help Group Contribution Type

    // INTERN
    // Allowance
    // Basic Monthly Rate, Overtime Hourly Pay

    // CONTRACT
    // Allowance
    // PH/Event Hourly Rate

    // full timer + intern // just that pay will deduct differently. intern is also
    // full timer
    public HashMap<String, Integer> attendanceFullTimeMonthly(Long userId) {
        // int totalHours = 0;
        // cumulative
        Integer ot = 0;
        int shiftAttended = 0;

        // Basic Monthly Rate, Overtime Hourly Pay
        HashMap<String, Integer> attendance = new HashMap<String, Integer>();
        if (attendance.get("clockedMonth") == null) {
            // means never had it before
            // int clockedMonth = 0;
            attendance.put("clockedMonth", 0);
        }
        int clockedMonth = attendance.get("clockedMonth");

        User u1 = getUser(userId);
        List<ShiftListItem> sli = u1.getShiftListItems();
        Integer absent = 0;
        if (!sli.isEmpty()) {

            for (ShiftListItem i : sli) {
                // want totalHours to renew every shift
                int totalHours = 0;
                // tim said even if they are absent, they will still have sli...
                // so i have to check if check in time is there
                if (!i.getCheckInTiming().equals(null)) {
                    shiftAttended += 1;
                    LocalDateTime dt1 = i.getCheckInTiming();
                    LocalDateTime dt2 = i.getCheckOutTiming();

                    // LocalDateTime timeWorked = dt2 - dt1;
                    // Chronos hours return Long
                    // lunch break included
                    // https://stackoverflow.com/questions/25747499/java-8-difference-between-two-localdatetime-in-multiple-units
                    // https://docs.oracle.com/javase/tutorial/datetime/iso/period.html
                    // dont use minus(). gives u back 1 LDT and u have to translate again :(

                    Long hours = ChronoUnit.HOURS.between(dt1, dt2);
                    // Integer clocked = hours.intValue() - 1;
                    totalHours = hours.intValue();
                    // need to check with shift which kind of shift is it. event or normal for
                    // payroll.
                    // normal employee so monthly. no need to care.
                    // if (totalHours > 8) {
                    // ot = totalHours - 8;
                    // }

                    // count for days in month
                    String monthOfName = "";
                    int year = 0;

                    ShiftListItem s = sli.get(0);
                    LocalDateTime localDateTime = s.getCheckInTiming();
                    Month month = localDateTime.getMonth();
                    // month.toString().getClass().getSimpleName();
                    monthOfName = month.toString().toUpperCase();
                    year = localDateTime.getYear();
                    int days = daysInMonth(monthOfName, year);

                    // currently no leave mechanism set
                    // one shift perday
                    int daysWorked = sli.size();
                    // int leaves = days - sli.size();

                    // check relationship with matthew
                    //

                    // int clocked = ((totalHours - ot) * daysWorked) + (ot* daysWorked)
                    // this is for 1 shift so we are calculating for month. totalHours is for 1 day
                    // Integer forOneMonth = (totalHours * daysWorked);
                    // clockedMonth += forOneMonth;
                    clockedMonth += totalHours;

                    // attendance.put("OT", ot);
                    // attendance.put("totalHours", totalHours);

                } else {
                    // absent so total hours =0
                    absent += 1;
                    // Integer totalHoursinInteger = totalHours;
                    // attendance.put("totalHours", totalHoursinInteger);

                }

            }

            Integer attended = shiftAttended;
            attendance.put("shiftsAttended", attended);

            // ot hours start after 44th hour.
            if (clockedMonth > 44) {
                ot = clockedMonth - 44;
                attendance.put("OT", ot);
            } else {
                // 0
                attendance.put("OT", ot);
            }

            // every sli should still have it
            attendance.put("absent", absent);
            attendance.put("clockedMonth", clockedMonth);
        }

        return attendance;
    }

    // part timer
    public HashMap<String, Integer> attendancePartTimeMonthly(Long userId) {

        // int totalHours = 0;
        int weekend = 0;
        int event = 0;
        Integer ot = 0;
        int absent = 0;
        int shiftAttended = 0;
        // Basic Hourly Rate, Weekend Hourly Rate, Overtime Hourly Rate, PH/Event Hourly
        // Rate
        HashMap<String, Integer> attendance = new HashMap<String, Integer>();
        if (attendance.get("clockedMonth") == null) {
            // means never had it before
            // int clockedMonth = 0;
            attendance.put("clockedMonth", 0);
        }
        int clockedMonth = attendance.get("clockedMonth");

        User u1 = getUser(userId);

        // need to check if leaves renew every month
        // List<Leave> l = u1.getLeaves();
        // int numOfLeaves = l.size();

        List<ShiftListItem> sli = u1.getShiftListItems();
        // count no. of shifts
        if (!sli.isEmpty()) {

            // if (!i.getCheckInTiming().equals(null)) {
            for (ShiftListItem i : sli) {
                int totalHours = 0;
                if (!i.getCheckInTiming().equals(null)) {
                    shiftAttended += 1;
                    LocalDateTime dt1 = i.getCheckInTiming();
                    LocalDateTime dt2 = i.getCheckOutTiming();

                    // LocalDateTime timeWorked = dt2 - dt1;
                    // Chronos hours return Long
                    // lunch break included

                    Long hours = ChronoUnit.HOURS.between(dt1, dt2);
                    // Integer clocked = hours.intValue() - 1;
                    totalHours = hours.intValue();

                    // calculate OT at end of the month. not now -- refer to prof tan's comment on
                    // OT
                    // if (totalHours > 8) {
                    // ot = totalHours - 8;
                    // }

                    // count for days in month
                    String monthOfName = "";
                    int year = 0;

                    ShiftListItem s = sli.get(0);
                    LocalDateTime localDateTime = s.getCheckInTiming();
                    Month month = localDateTime.getMonth();
                    // month.toString().getClass().getSimpleName();
                    monthOfName = month.toString().toUpperCase();
                    year = localDateTime.getYear();
                    int days = daysInMonth(monthOfName, year);

                    // currently no leave mechanism set
                    int daysWorked = days - sli.size();

                    if (i.getIsWeekend()) {
                        weekend += totalHours;

                    }
                    if (i.getIsPhEvent()) {
                        event += totalHours;
                    }

                    // clockedMonth = clockedMonth + (totalHours * daysWorked);
                    clockedMonth += totalHours;

                    if (attendance.get("PhEvent") == null) {
                        attendance.put("PhEvent", event);
                    } else {
                        int currentEvent = attendance.get("PhEvent");
                        currentEvent += event;
                        attendance.put("PhEvent", currentEvent);
                    }

                    if (attendance.get("weekend") == null) {
                        attendance.put("weekend", weekend);
                    } else {
                        int currentWeekend = attendance.get("weekend");
                        currentWeekend += weekend;
                        attendance.put("weekend", currentWeekend);
                    }

                    // attendance.put("OT", ot);
                    // attendance.put("totalHours", totalHours);
                } else {
                    // absent so total hours =0
                    absent += 1;
                    clockedMonth += 0;
                    // Integer totalHoursinInteger = totalHours;
                    // attendance.put("totalHours", totalHoursinInteger);
                }
            }
            Integer attended = shiftAttended;
            attendance.put("shiftsAttended", attended);

            // ot hours start after 44th hour.
            if (clockedMonth > 44) {
                ot = clockedMonth - 44;
                attendance.put("OT", ot);
            } else {
                // 0
                attendance.put("OT", ot);
            }
            attendance.put("absent", absent);
            attendance.put("currentClocked", clockedMonth);
        }
        return attendance;
    }

    // count for days in month
    private int daysInMonth(String monthOfName, int year) {

        int daysInOneMonth = 0;
        switch (monthOfName) {
            case "JANUARY":
                daysInOneMonth = 31;
                break;
            case "FEBRUARY":
                if ((year % 400 == 0) || ((year % 4 == 0) && (year % 100 != 0))) {
                    daysInOneMonth = 29;
                } else {
                    daysInOneMonth = 28;
                }
                break;
            case "MARCH":
                daysInOneMonth = 31;
                break;
            case "APRIL":
                daysInOneMonth = 30;
                break;
            case "MAY":
                daysInOneMonth = 31;
                break;
            case "JUNE":
                daysInOneMonth = 30;
                break;
            case "JULY":
                daysInOneMonth = 31;
                break;
            case "AUGUST":
                daysInOneMonth = 31;
                break;
            case "SEPTEMBER":
                daysInOneMonth = 30;
                break;
            case "OCTOBER":
                daysInOneMonth = 31;
                break;
            case "NOVEMBER":
                daysInOneMonth = 30;
                break;
            case "DECEMBER":
                daysInOneMonth = 31;
        }
        return daysInOneMonth;
    }

    // contract
    public HashMap<String, Integer> attendanceContractMonthly(Long userId) {
        // int totalHours = 0;
        Integer ot = 0;
        int event = 0;
        int shiftAttended = 0;

        // PH/Event Hourly Rate
        HashMap<String, Integer> attendance = new HashMap<String, Integer>();
        if (attendance.get("clockedMonth") == null) {
            // means never had it before
            // int clockedMonth = 0;
            attendance.put("clockedMonth", 0);
        }
        int clockedMonth = attendance.get("clockedMonth");

        User u1 = getUser(userId);
        List<ShiftListItem> sli = u1.getShiftListItems();
        if (!sli.isEmpty()) {

            for (ShiftListItem i : sli) {
                int totalHours = 0;
                // tim said even if they are absent, they will still have sli...
                // so i have to check if check in time is there
                if (!i.getCheckInTiming().equals(null)) {
                    shiftAttended += 1;
                    LocalDateTime dt1 = i.getCheckInTiming();
                    LocalDateTime dt2 = i.getCheckOutTiming();

                    // LocalDateTime timeWorked = dt2 - dt1;
                    // Chronos hours return Long
                    // lunch break included

                    Long hours = ChronoUnit.HOURS.between(dt1, dt2);
                    // Integer clocked = hours.intValue() - 1;
                    totalHours = hours.intValue();
                    // need to check with shift which kind of shift is it. event or normal for
                    // payroll.

                    // count for days in month
                    String monthOfName = "";
                    int year = 0;

                    ShiftListItem s = sli.get(0);
                    LocalDateTime localDateTime = s.getCheckInTiming();
                    Month month = localDateTime.getMonth();
                    // month.toString().getClass().getSimpleName();
                    monthOfName = month.toString().toUpperCase();
                    year = localDateTime.getYear();
                    int days = daysInMonth(monthOfName, year);

                    int daysWorked = sli.size();

                    if (attendance.get("PhEvent") == null) {
                        attendance.put("PhEvent", event);
                    } else {
                        int currentEvent = attendance.get("PhEvent");
                        currentEvent += event;
                        attendance.put("PhEvent", currentEvent);
                    }
                    // int clocked = ((totalHours - ot) * daysWorked) + (ot* daysWorked)
                    // this is for 1 shift so we are calculating for month. totalHours is for 1 day
                    // Integer forOneMonth = (totalHours * daysWorked);
                    clockedMonth += totalHours;

                    attendance.put("PHevent", event);
                    attendance.put("totalHours", totalHours);

                } else {
                    // absent so total hours =0
                    Integer totalHoursinInteger = totalHours;
                    attendance.put("totalHours", totalHoursinInteger);

                }

            }

            Integer attended = shiftAttended;
            attendance.put("shiftsAttended", attended);

            // ot hours start after 44th hour.
            // first and last time calculating ot
            if (clockedMonth > 44) {
                ot = clockedMonth - 44;
                attendance.put("OT", ot);
            } else {
                // 0
                attendance.put("OT", ot);
            }
            // every sli should still have it
            attendance.put("clockedMonth", clockedMonth);
        }

        return attendance;
    }

    public User getEmployeeInclLeaveQuotas(Long employeeId) {
        System.out.println("UserService.getEmployeeInclLeaveQuotas");
        System.out.println("employeeId = " + employeeId);

        User u = userRepository.findById(employeeId).get();
        List<Team> teams = u.getTeams();
        for (Team t : teams) {
            t.setTeamHead(null);
            t.setUsers(new ArrayList<>());
            t.setDepartment(null);
            t.setRoster(null);
            t.setTeamHead(null);
        }
        // u.setTaskListItems(null);
        for (TaskListItem taskListItem : u.getTaskListItems()) {
            taskListItem.setUser(null);
            taskListItem.getTask().setTaskListItems(new ArrayList<>());
            taskListItem.getTask().setCategory(null);
        }
        u.setQualificationInformation(null);
        u.setBlocks(new ArrayList<>());
        u.setShiftListItems(new ArrayList<>());
        u.setSwapRequestsReceived(new ArrayList<>());
        u.setSwapRequestsRequested(new ArrayList<>());
        u.setReactivationRequest(null);
        u.setAttendances(new ArrayList<>());
        u.setCurrentPayInformation(null);
        u.setEmployeeAppraisals(new ArrayList<>());
        u.setManagerAppraisals(new ArrayList<>());
        u.setManagerReviews(new ArrayList<>());
        u.setEmployeeReviews(new ArrayList<>());
        // u.setModules(new ArrayList<>());
        u.setApplications(new ArrayList<>());
        u.setGoals(new ArrayList<>());
        u.setPositions(new ArrayList<>());
        u.setJobRequests(new ArrayList<>());
        u.setLeaves(new ArrayList<>());
        u.setLeaveQuotas(new ArrayList<>());
        u.setBenefitPlanInstances(new ArrayList<>());
        for (LeaveQuota lq : u.getLeaveQuotas()) {
            u.getCurrentLeaveQuota().setPreviousLeaveQuota(null);
        }
        if (u.getCurrentLeaveQuota() != null) {
            if (u.getCurrentLeaveQuota().getPreviousLeaveQuota() != null) {
                u.getCurrentLeaveQuota().getPreviousLeaveQuota().setPreviousLeaveQuota(null);
            }
        }

        return u;
    }

    // contract
    // public void countAttendanceForToday(Long userId){
    //
    //// User u1 = userRepository.findById(attendance.getUser().getUserId()).get();
    // User u1 = getUser(attendance.getUser().getUserId());
    // //will have user
    //
    // //Check time for today
    // //find
    // LocalDateTime dt1 = attendance.getPeriodStart();
    // LocalDateTime dt2 = attendance.getPeriodEnd();
    // //https://stackoverflow.com/questions/25747499/java-8-difference-between-two-localdatetime-in-multiple-units
    // //https://docs.oracle.com/javase/tutorial/datetime/iso/period.html
    // //dont use minus(). gives u back 1 LDT and u have to translate again BOO
    //
    //// test -ve for between
    //// LocalDateTime localDT1 = LocalDateTime.parse("1979-12-09T09:00:25");
    //// LocalDateTime localDT2 = LocalDateTime.parse("1979-12-09T18:00:24");
    //// Long hours = ChronoUnit.HOURS.between(localDT1,localDT2);
    //// System.out.println(hours);
    // if(dt2.isAfter(dt1)){
    //// LocalDateTime timeWorked = dt2. dt1;
    // //Chronos hours return Long
    // //minus 1 cos lunch break
    // Long hours = ChronoUnit.HOURS.between(dt1,dt2);
    // Integer clocked = hours.intValue() - 1;
    //
    // //need to check with shift which kind of shift is it. event or normal for
    // payroll
    // if(clocked > 8){
    // Integer ot = clocked -8;
    // attendance.setPhEventHoursWorked(ot.longValue());
    // attendance.setTotalCount(attendance.getTotalCount() + clocked + ot);
    // }else{
    // attendance.setTotalCount(attendance.getTotalCount() + clocked);
    // }
    //
    // }
    // //they need to pass this info to payroll. need to check if today is weekday,
    // weekend or event for pay
    // attendanceRepository.saveAndFlush(attendance);
    //
    // }
    // intern

    // contract
    // public void countAttendanceForToday(Long userId){
    //
    //// User u1 = userRepository.findById(attendance.getUser().getUserId()).get();
    // User u1 = getUser(attendance.getUser().getUserId());
    // //will have user
    //
    // //Check time for today
    // //find
    // LocalDateTime dt1 = attendance.getPeriodStart();
    // LocalDateTime dt2 = attendance.getPeriodEnd();
    // //https://stackoverflow.com/questions/25747499/java-8-difference-between-two-localdatetime-in-multiple-units
    // //https://docs.oracle.com/javase/tutorial/datetime/iso/period.html
    // //dont use minus(). gives u back 1 LDT and u have to translate again BOO
    //
    //// test -ve for between
    //// LocalDateTime localDT1 = LocalDateTime.parse("1979-12-09T09:00:25");
    //// LocalDateTime localDT2 = LocalDateTime.parse("1979-12-09T18:00:24");
    //// Long hours = ChronoUnit.HOURS.between(localDT1,localDT2);
    //// System.out.println(hours);
    // if(dt2.isAfter(dt1)){
    //// LocalDateTime timeWorked = dt2. dt1;
    // //Chronos hours return Long
    // //minus 1 cos lunch break
    // Long hours = ChronoUnit.HOURS.between(dt1,dt2);
    // Integer clocked = hours.intValue() - 1;
    //
    // //need to check with shift which kind of shift is it. event or normal for
    // payroll
    // if(clocked > 8){
    // Integer ot = clocked -8;
    // attendance.setPhEventHoursWorked(ot.longValue());
    // attendance.setTotalCount(attendance.getTotalCount() + clocked + ot);
    // }else{
    // attendance.setTotalCount(attendance.getTotalCount() + clocked);
    // }
    //
    // }
    // //they need to pass this info to payroll. need to check if today is weekday,
    // weekend or event for pay
    // attendanceRepository.saveAndFlush(attendance);
    //
    // }
    public List<ShiftListItem> getMyShiftList(Long userId) {

        User u1 = getUser(userId);

        List<ShiftListItem> lst = u1.getShiftListItems();
        for (ShiftListItem shiftListItem : lst) {
            shiftListItem.getShift().setRoster(null);
            shiftListItem.setUser(null);
        }
        // lst.stream().filter().
        // latest infront. so flatlist on ess will just get list?
        Collections.reverse(lst);
        // start from latest which is added latest
        return lst;

    }

    public List<Integer> getMyAttendanceToday(Long userId) {
        // HashMap<String, Integer> daily = new HashMap<String, Integer>();
        List<Integer> today = new ArrayList<>();

        User u1 = getUser(userId);
        // //assuming they reset every month
        // List lst = u1.getShiftListItems();
        // return lst;
        // UPDATE: user's shifts do not get reset till next year

        // multiple positions but only 1 current pos
        int size = u1.getPositions().size();
        Position p = u1.getPositions().get(size - 1);

        List<Integer> info = new ArrayList<>();
        String job = String.valueOf(p.getJobType());
        System.out.println(job);

        List<ShiftListItem> lst = u1.getShiftListItems();
        for (ShiftListItem shiftListItem : lst) {
            shiftListItem.getShift().setRoster(null);
            shiftListItem.setUser(null);
        }
        // Integer totalShifts = lst.size();
        // today.add(totalShifts);
        // Month dt = LocalDate
        // Calendar c = Calendar.getInstance()

        // getting shift cos shiftlistitem is not guaranteed a check in time and date
        for (ShiftListItem s : lst) {
            Shift s1 = s.getShift();
            s1.getRoster().setShifts(new ArrayList<>());
            s1.getRoster().setBlocks(new ArrayList<>());
            s1.getRoster().setTeam(null);
            for (ShiftListItem shiftListItem : s1.getShiftListItems()) {
                shiftListItem.setShift(null);
                shiftListItem.setUser(null);
            }

            LocalDateTime ldt1 = s.getShift().getStartTime();

            LocalDate d = ldt1.toLocalDate();
            LocalDate d2 = LocalDate.now();

            if (d.isEqual(d2)) {
                // today.add(s.getShift());
                if (job == "FULLTIME" || job == "INTERN") {
                    HashMap<String, Integer> current = attendanceFullTimeMonthly(u1.getUserId());
                    Integer i = current.get("currentClocked");
                    Integer absent = current.get("absent");
                    Integer shifts = current.get("shiftsAttended");
                    today.add(i);
                    today.add(absent);
                    today.add(shifts);

                } else if (job == "PARTTIME") {
                    HashMap<String, Integer> current = attendancePartTimeMonthly(u1.getUserId());
                    Integer i = current.get("currentClocked");
                    Integer absent = current.get("absent");
                    Integer shifts = current.get("shiftsAttended");
                    today.add(i);
                    today.add(absent);
                    today.add(shifts);
                } else {
                    // contract
                    HashMap<String, Integer> current = attendanceContractMonthly(u1.getUserId());
                    Integer i = current.get("currentClocked");
                    Integer absent = current.get("absent");
                    Integer shifts = current.get("shiftsAttended");
                    today.add(i);
                    today.add(absent);
                    today.add(shifts);
                }
            } else {
                // no shifts today
                return today;
            }
        }

        return today;
    }

    // strip down for overall
    public List<Integer> getOverallAttendance(Long shiftListItemId, Long userId) {
        // List<Integer> lst = new ArrayList<Integer>();
        List<Integer> lst = new ArrayList<>();
        int attended = 0;
        int absent = 0;
        User u1 = getUser(userId);
        List<ShiftListItem> listItems = u1.getShiftListItems();

        for (ShiftListItem s : listItems) {
            // shift and user rostering
            s.setShift(null);
            s.setUser(null);

            // eg 2022-10-16T09:00:25
            if (s.getCheckInTiming() != null) {
                attended++;
            } else {
                absent++;
            }

        }
        Integer totalShifts = listItems.size();
        Integer a = attended;
        Integer abs = absent;
        lst.add(totalShifts);
        lst.add(a);
        lst.add(abs);

        return lst;
    }

    // strip it down to try with fewer dependency. for sql error
    public List<Integer> getAttendanceToday(Long shiftListItemId, Long userId) {
        // List<Integer> lst = new ArrayList<Integer>();
        List<Integer> lst = new ArrayList<>();
        int attended = 0;
        int absent = 0;
        Integer totalDaysInMonth = 0;
        User u1 = getUser(userId);
        List<ShiftListItem> listItems = u1.getShiftListItems();

        for (ShiftListItem s : listItems) {

            // shift and user rostering
            s.setShift(null);
            s.setUser(null);

            if (!listItems.isEmpty()) {
                int shifts = listItems.size();

                if (listItems.get(shiftListItemId.intValue()).equals(null)) {
                    throw new NullPointerException("This shift does not exist for user");
                }

                if (shiftListItemId.equals(s.getShiftListItemId())) {
                    String m = s.getCheckInTiming().getMonth().toString();
                    int y = s.getCheckInTiming().getYear();
                    int days = daysInMonth(m, y);
                    totalDaysInMonth = days;

                }

                // eg 2022-10-16T09:00:25
                if (s.getCheckInTiming() != null) {
                    attended++;
                } else {
                    absent++;
                }
            }
        }
        Integer totalShifts = listItems.size();
        Integer a = attended;
        Integer abs = absent;
        lst.add(totalShifts);
        lst.add(a);
        lst.add(abs);
        lst.add(totalDaysInMonth);

        return lst;
    }

    // try returning list of sli first, then final list
    public List<ShiftListItem> getSLIByMonth() {
        // come back to this after notif + roster
        List<ShiftListItem> lst = new ArrayList<>();
        return lst;
    }

    public List<User> getEmployeesByDepartment(Long departmentId) {
        List<User> users = userRepository.getEmployeesByDepartment(departmentId);
        for (User user : users) {
            user.setTeams(new ArrayList<>());
            user.setQualificationInformation(null);
            user.setBlocks(new ArrayList<>());
            user.setShiftListItems(new ArrayList<>());
            user.setSwapRequestsReceived(new ArrayList<>());

            user.setSwapRequestsRequested(new ArrayList<>());
            user.setReactivationRequest(null);
            user.setAttendances(new ArrayList<>());
            user.setCurrentPayInformation(null);
            user.setEmployeeAppraisals(new ArrayList<>());

            user.setManagerAppraisals(new ArrayList<>());
            user.setManagerReviews(new ArrayList<>());
            user.setEmployeeReviews(new ArrayList<>());
            user.setApplications(new ArrayList<>());
            user.setPositions(new ArrayList<>());

            user.setJobRequests(new ArrayList<>());
            user.setLeaves(new ArrayList<>());
            user.setLeaveQuotas(new ArrayList<>());
            user.setCurrentLeaveQuota(null);
            user.setTaskListItems(new ArrayList<>());
        }
        return users;
    }

    public List<User> getEmployeesByTeam(Long teamId) {
        List<User> users = userRepository.getEmployeesByTeam(teamId);
        for (User user : users) {
            // user.setTeams(new ArrayList<>());
            // user.setQualificationInformation(null);
            // user.setBlocks(new ArrayList<>());
            // user.setShiftListItems(new ArrayList<>());
            // user.setSwapRequestsReceived(new ArrayList<>());

            // user.setSwapRequestsRequested(new ArrayList<>());
            // user.setReactivationRequest(null);
            // user.setAttendances(new ArrayList<>());
            // user.setCurrentPayInformation(null);
            // user.setEmployeeAppraisals(new ArrayList<>());

            // user.setManagerAppraisals(new ArrayList<>());
            // user.setManagerReviews(new ArrayList<>());
            // user.setEmployeeReviews(new ArrayList<>());
            // user.setApplications(new ArrayList<>());
            // user.setPositions(new ArrayList<>());

            // user.setJobRequests(new ArrayList<>());
            // user.setLeaves(new ArrayList<>());
            // user.setLeaveQuotas(new ArrayList<>());
            // user.setCurrentLeaveQuota(null);
            // user.setTaskListItems(new ArrayList<>());
            user.nullify();
        }
        return users;
    }

    public List<User> getEmployeesByRosterAndDate(Long rosterId, LocalDate localDate) {
        Roster roster = rosterRepository.findById(rosterId)
                .orElseThrow(() -> new IllegalStateException("Roster with ID: " + rosterId + " does not exist!"));
        List<User> employees = getEmployeesByTeam(roster.getTeam().getTeamId());
        List<User> filteredEmployees = new ArrayList<>();
        for (User employee : employees) {
            try {
                shiftListItemService.getShiftListItemByDateAndUserId(localDate, employee.getUserId());
            } catch (Exception e) {
                filteredEmployees.add(employee);
            }
        }
        for (User employee : filteredEmployees) {
            employee.setProfilePic(null);
            employee.setPositions(new ArrayList<>());
            employee.setCurrentPosition(null);
            employee.setQualificationInformation(null);
            employee.setApplications(new ArrayList<>());
            employee.setJobRequests(new ArrayList<>());
            employee.setPayslips(new ArrayList<>());
            employee.setAttendances(new ArrayList<>());
            employee.setEmployeeAppraisals(new ArrayList<>());
            employee.setManagerAppraisals(new ArrayList<>());
            employee.setManagerReviews(new ArrayList<>());
            employee.setEmployeeReviews(new ArrayList<>());
            employee.setGoals(new ArrayList<>());
            employee.setTaskListItems(new ArrayList<>());
            employee.setTeams(new ArrayList<>());
            employee.setCurrentPayInformation(null);
            employee.setReactivationRequest(null);
            employee.setPreferredDates(null);
            employee.setBlocks(new ArrayList<>());
            employee.setShiftListItems(new ArrayList<>());
            employee.setSwapRequestsReceived(new ArrayList<>());
            employee.setSwapRequestsRequested(new ArrayList<>());
            employee.setLeaves(new ArrayList<>());
            employee.setLeaveQuotas(new ArrayList<>());
            employee.setCurrentLeaveQuota(null);
        }
        return filteredEmployees;
    }

    public String updateUserDetails(Long userId, String firstName, String lastName, String aboutMe,
            String educationLevel, String schoolName, Integer gradYear, String citizenship, String race,
            List<String> languages) {
        System.out.println("UserService.updateUserDetails");
        System.out.println("userId = " + userId + ", firstName = " + firstName + ", lastName = " + lastName
                + ", aboutMe = " + aboutMe + ", educationLevel = " + educationLevel + ", schoolName = " + schoolName
                + ", gradYear = " + gradYear + ", languages = " + languages);

        RaceEnum r = RaceEnum.valueOf(race.toUpperCase());
        CitizenshipEnum c = CitizenshipEnum.valueOf(citizenship.toUpperCase());

        User user = userRepository.findById(userId).get();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setRace(r);
        user.setCitizenship(c);

        EducationEnum education = getEduEnum(educationLevel.toUpperCase());

        User updatedUser = qualificationService.updateApplicantProfileDetails(user, aboutMe, education, schoolName,
                gradYear, languages);

        return "User details updated successfully";
    }

    private EducationEnum getEduEnum(String educationLevel) {
        System.out.println("UserService.getEduEnum");
        System.out.println("educationLevel = " + educationLevel);
        EducationEnum edu = switch (educationLevel) {
            case "O LEVEL" -> EducationEnum.O;
            case "N LEVEL" -> EducationEnum.N;
            case "A LEVEL" -> EducationEnum.A;
            default -> EducationEnum.valueOf(educationLevel);
        };

        System.out.println("education level is " + edu);
        return edu;
    }

    public void sendPayslipEmails(List<String> emails, String payslipMonth) {
        for (String email : emails) {
            User tempUser = getEmployee(email);

            if (tempUser == null) {
                throw new IllegalStateException("User does not exist.");
            }

            emailSender.send(email, buildPayslipEmail(tempUser.getFirstName(), payslipMonth));
        }
    }

    public String buildPayslipEmail(String name, String payslipMonth) {
        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
                "\n" +
                "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
                "\n" +
                "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n"
                +
                "    <tbody><tr>\n" +
                "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
                "        \n" +
                "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n"
                +
                "          <tbody><tr>\n" +
                "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
                "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n"
                +
                "                  <tbody><tr>\n" +
                "                    <td style=\"padding-left:10px\">\n" +
                "                  \n" +
                "                    </td>\n" +
                "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n"
                +
                "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Hi "
                + name + ", your payslip for " + payslipMonth + " has been issued!</span>\n"
                +
                "                    </td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "              </a>\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "        </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n"
                +
                "    <tbody><tr>\n" +
                "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
                "      <td>\n" +
                "        \n" +
                "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n"
                +
                "                  <tbody><tr>\n" +
                "                    <td bgcolor=\"#1D70B8\" width=\"100%\" height=\"10\"></td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "\n" +
                "\n" +
                "\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n"
                +
                "    <tbody><tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n"
                +
                "        \n" +
                "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Hi " + name
                + ",</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">You can view your payslip on Libro's HRMS or ESS portals! If there are any discrepancies, please inform the HR department.<p>Grow with Libro</p>"
                +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
                "\n" +
                "</div></div>";
    }

    public void editUserPayrollInformation(Long userId, String bankName, String bankAccNo,
            List<Allowance> allowances,
            List<Deduction> deductions) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("User with ID: " + userId + " does not exist!"));
        if (user.getBankName() != bankName) {
            user.setBankName(bankName);
        }
        if (user.getBankAccNo() != bankAccNo) {
            user.setBankAccNo(bankAccNo);
        }

        // for (AllowanceTemplate allowance : allowances) {
        // AllowanceTemplate savedAllowance =
        // allowanceTemplateRepository.saveAndFlush(allowance);
        // user.getCurrentPayInformation().addAllowanceTemplate(savedAllowance);
        // }
        // for (DeductionTemplate deduction : deductions) {
        // DeductionTemplate savedDeduction =
        // deductionTemplateRepository.saveAndFlush(deduction);
        // user.getCurrentPayInformation().addDeductionTemplate(savedDeduction);
        // }
        System.out.println("*******ALLOWANCES: " + allowances + " *******");
        System.out.println("*******DEDUCTIONS: " + deductions + " *******");
        for (Allowance allowance : allowances) {
            System.out.println("*******ALLOWANCE: " + allowance + " *******");
            AllowanceTemplate savedAllowanceTemplate = allowanceTemplateRepository
                    .saveAndFlush(allowance.getTemplate());
            Allowance savedAllowance = allowanceRepository.saveAndFlush(allowance);
            user.getCurrentPayInformation().addAllowance(savedAllowance);
            user.getCurrentPayInformation().addAllowanceTemplate(savedAllowanceTemplate);
        }

        for (Deduction deduction : deductions) {
            System.out.println("*******DEDUCTION: " + deduction + " *******");
            DeductionTemplate savedDeductionTemplate = deductionTemplateRepository
                    .saveAndFlush(deduction.getTemplate());
            Deduction savedDeduction = deductionRepository.saveAndFlush(deduction);
            user.getCurrentPayInformation().addDeduction(savedDeduction);
            user.getCurrentPayInformation().addDeductionTemplate(savedDeductionTemplate);
        }
        payInformationRepository.save(user.getCurrentPayInformation());
        user.getCurrentPayInformation().setInPayroll(true);
        userRepository.save(user);
    }
}
