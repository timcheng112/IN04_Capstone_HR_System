package com.conceiversolutions.hrsystem.user.user;

import com.conceiversolutions.hrsystem.administration.tasklistitem.TaskListItem;
import com.conceiversolutions.hrsystem.engagement.benefitplan.BenefitPlanInstance;
import com.conceiversolutions.hrsystem.engagement.leave.Leave;
import com.conceiversolutions.hrsystem.engagement.leavequota.LeaveQuota;
import com.conceiversolutions.hrsystem.enums.CitizenshipEnum;
import com.conceiversolutions.hrsystem.enums.GenderEnum;
import com.conceiversolutions.hrsystem.enums.RaceEnum;
import com.conceiversolutions.hrsystem.enums.RoleEnum;
import com.conceiversolutions.hrsystem.jobmanagement.jobapplication.JobApplication;
import com.conceiversolutions.hrsystem.jobmanagement.jobrequest.JobRequest;
import com.conceiversolutions.hrsystem.notification.Notification;
import com.conceiversolutions.hrsystem.organizationstructure.team.Team;
import com.conceiversolutions.hrsystem.pay.attendance.Attendance;
import com.conceiversolutions.hrsystem.pay.payinformation.PayInformation;
import com.conceiversolutions.hrsystem.pay.payslip.Payslip;
import com.conceiversolutions.hrsystem.performance.appraisal.Appraisal;
import com.conceiversolutions.hrsystem.performance.goal.Goal;
import com.conceiversolutions.hrsystem.performance.review.Review;
import com.conceiversolutions.hrsystem.rostering.block.Block;
import com.conceiversolutions.hrsystem.rostering.preferreddates.PreferredDates;
import com.conceiversolutions.hrsystem.rostering.shiftlistitem.ShiftListItem;
import com.conceiversolutions.hrsystem.rostering.swaprequest.SwapRequest;
import com.conceiversolutions.hrsystem.user.docdata.DocData;
import com.conceiversolutions.hrsystem.user.position.Position;
import com.conceiversolutions.hrsystem.user.qualificationinformation.QualificationInformation;
import com.conceiversolutions.hrsystem.user.reactivationrequest.ReactivationRequest;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Entity
@Table(name = "users")
// @EqualsAndHashCode
@Getter
@Setter
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;
    @Column(name = "first_name", nullable = false, length = 64)
    private String firstName;
    @Column(name = "last_name", nullable = false, length = 64)
    private String lastName;
    @Column(name = "password", nullable = false, length = 64)
    private String password;
    @Column(name = "phone", nullable = false, length = 16)
    private Integer phone;
    @Column(name = "email", nullable = false, unique = true)
    private String email;
    @Column(name = "work_email", nullable = true)
    private String workEmail;
    @Column(name = "dob", nullable = false)
    private LocalDate dob;
    @Column(name = "gender", nullable = false)
    @Enumerated(EnumType.STRING)
    private GenderEnum gender;
    @Column(name = "race", nullable = false)
    @Enumerated(EnumType.STRING)
    private RaceEnum race;
    @Column(name = "citizenship", nullable = false)
    @Enumerated(EnumType.STRING)
    private CitizenshipEnum citizenship;

    @Column(name = "user_role", nullable = false)
    @Enumerated(EnumType.STRING)
    private RoleEnum userRole;
    @Column(name = "is_partTimer", nullable = false)
    private Boolean isPartTimer;
    @Column(name = "is_hrEmployee", nullable = false)
    private Boolean isHrEmployee;

    @Column(name = "is_blackListed", nullable = false)
    private Boolean isBlackListed;
    @Column(name = "is_enabled", nullable = false)
    private Boolean isEnabled;
    @Column(name = "is_disabled", nullable = false)
    private Boolean isDisabled;
    @Column(name = "date_joined", nullable = false)
    private LocalDate dateJoined;

    @OneToOne(targetEntity = DocData.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_pic")
    private DocData profilePic;
    @OneToMany(fetch = FetchType.LAZY, targetEntity = Position.class)
    @JoinColumn(name = "positions")
    private List<Position> positions;
    @OneToOne(fetch = FetchType.LAZY, targetEntity = Position.class, optional = true)
    @JoinColumn(name = "current_position_id")
    private Position currentPosition;
    @OneToOne(targetEntity = QualificationInformation.class, fetch = FetchType.LAZY)
    private QualificationInformation qualificationInformation;

    @OneToMany(fetch = FetchType.LAZY, targetEntity = JobApplication.class, mappedBy = "applicant")
    private List<JobApplication> applications;
    @OneToMany(fetch = FetchType.LAZY, targetEntity = JobRequest.class, mappedBy = "requestedBy")
    @Column(name = "job_requests")
    private List<JobRequest> jobRequests;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "payslipId")
    private List<Payslip> payslips;
    //
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "attendanceId")
    private List<Attendance> attendances;

    @OneToMany(fetch = FetchType.LAZY, targetEntity = Appraisal.class, mappedBy = "employee")
    @Column(name = "employee_appraisals")
    private List<Appraisal> employeeAppraisals;
    @OneToMany(fetch = FetchType.LAZY, targetEntity = Appraisal.class, mappedBy = "managerAppraising")
    @Column(name = "appraised_by")
    private List<Appraisal> managerAppraisals;
    @OneToMany(fetch = FetchType.LAZY, targetEntity = Review.class, mappedBy = "manager")
    @Column(name = "manager_reviews")
    private List<Review> managerReviews;
    @OneToMany(fetch = FetchType.LAZY, targetEntity = Review.class, mappedBy = "employeeReviewing")
    @Column(name = "reviewed_by")
    private List<Review> employeeReviews;
    @OneToMany(fetch = FetchType.LAZY, targetEntity = Goal.class, mappedBy = "employee")
    @Column(name = "goals")
    private List<Goal> goals;
    //
    @OneToMany(fetch = FetchType.LAZY, targetEntity = TaskListItem.class, mappedBy = "user")
    @Column(name = "task_list_items")
    private List<TaskListItem> taskListItems;
    @ManyToMany(fetch = FetchType.LAZY, targetEntity = Team.class, mappedBy = "users")
    private List<Team> teams;
    @OneToOne(fetch = FetchType.LAZY, targetEntity = PayInformation.class, mappedBy = "user")
    private PayInformation currentPayInformation;
    @OneToOne(fetch = FetchType.LAZY, targetEntity = ReactivationRequest.class, optional = true)
    @JoinColumn(name = "reactivation_request_id")
    private ReactivationRequest reactivationRequest;
    @OneToOne(fetch = FetchType.LAZY, targetEntity = PreferredDates.class, mappedBy = "user")
    private PreferredDates preferredDates;
    @OneToMany(fetch = FetchType.LAZY, targetEntity = Block.class, mappedBy = "employee")
    @Column(name = "blocks")
    private List<Block> blocks;
    @OneToMany(fetch = FetchType.LAZY, targetEntity = ShiftListItem.class, mappedBy = "user")
    @Column(name = "shift_list_items")
    private List<ShiftListItem> shiftListItems;
    @OneToMany(fetch = FetchType.LAZY, targetEntity = SwapRequest.class, mappedBy = "requestor")
    private List<SwapRequest> swapRequestsRequested;
    @OneToMany(fetch = FetchType.LAZY, targetEntity = SwapRequest.class, mappedBy = "receiver")
    private List<SwapRequest> swapRequestsReceived;

    @OneToOne(optional = true, targetEntity = LeaveQuota.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "current_leave_quota")
    private LeaveQuota currentLeaveQuota;
    @OneToMany(fetch = FetchType.LAZY, targetEntity = LeaveQuota.class)
    @JoinColumn(name = "leave_quotas")
    private List<LeaveQuota> leaveQuotas;

    @OneToMany(fetch = FetchType.LAZY, targetEntity = Leave.class, mappedBy = "employee")
    private List<Leave> leaves;

    @Column(name = "bank_acc_no", nullable = true)
    private String bankAccNo;

    @Column(name = "bank_name", nullable = true)
    private String bankName;

    @OneToMany
    @JoinColumn(name = "unread_notifications")
    private List<Notification> notificationsUnread;

    @OneToMany
    @JoinColumn(name = "read_notifications")
    private List<Notification> notificationsRead;

    @Column(name = "reward_points")
    private Integer rewardPoints;
    @OneToMany(fetch = FetchType.LAZY, targetEntity = BenefitPlanInstance.class, mappedBy = "planOwner")
    private List<BenefitPlanInstance> benefitPlanInstances;

    @Column(name="card_UUID")
    private String cardUUID;
    // TODO add on other relationships to other classes

    public User() {
        this.positions = new ArrayList<>();
        this.applications = new ArrayList<>();
        this.jobRequests = new ArrayList<>();
        this.payslips = new ArrayList<>();
        this.attendances = new ArrayList<>();
        this.employeeAppraisals = new ArrayList<>();
        this.managerAppraisals = new ArrayList<>();
        this.managerReviews = new ArrayList<>();
        this.employeeReviews = new ArrayList<>();
        this.goals = new ArrayList<>();
        this.taskListItems = new ArrayList<>();
        this.teams = new ArrayList<>();
        this.blocks = new ArrayList<>();
        this.shiftListItems = new ArrayList<>();
        this.leaveQuotas = new ArrayList<>();
        this.leaves = new ArrayList<>();
        this.swapRequestsRequested = new ArrayList<>();
        this.swapRequestsReceived = new ArrayList<>();
        this.preferredDates = null;
        this.notificationsRead = new ArrayList<>();
        this.notificationsUnread = new ArrayList<>();
        this.isDisabled = false;
        this.rewardPoints = 0;
        this.benefitPlanInstances = new ArrayList<>();
    }

    public User(String firstName, String lastName, String password, Integer phone, String email, String workEmail, LocalDate dob, GenderEnum gender, RaceEnum race, CitizenshipEnum citizenship, RoleEnum userRole, Boolean isPartTimer, Boolean isHrEmployee, Boolean isBlackListed, Boolean isEnabled, Boolean isDisabled, LocalDate dateJoined, DocData profilePic, List<Position> positions, Position currentPosition, QualificationInformation qualificationInformation, List<JobApplication> applications, List<JobRequest> jobRequests, List<Payslip> payslips, List<Attendance> attendances, List<Appraisal> employeeAppraisals, List<Appraisal> managerAppraisals, List<Review> managerReviews, List<Review> employeeReviews, List<Goal> goals, List<TaskListItem> taskListItems, List<Team> teams, PayInformation currentPayInformation, ReactivationRequest reactivationRequest, PreferredDates preferredDates, List<Block> blocks, List<ShiftListItem> shiftListItems, List<SwapRequest> swapRequestsRequested, List<SwapRequest> swapRequestsReceived, LeaveQuota currentLeaveQuota, List<LeaveQuota> leaveQuotas, List<Leave> leaves, String bankAccNo, String bankName, List<Notification> notificationsUnread, List<Notification> notificationsRead, String cardId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.phone = phone;
        this.email = email;
        this.workEmail = workEmail;
        this.dob = dob;
        this.gender = gender;
        this.race = race;
        this.citizenship = citizenship;
        this.userRole = userRole;
        this.isPartTimer = isPartTimer;
        this.isHrEmployee = isHrEmployee;
        this.isBlackListed = isBlackListed;
        this.isEnabled = isEnabled;
        this.isDisabled = isDisabled;
        this.dateJoined = dateJoined;
        this.profilePic = profilePic;
        this.positions = positions;
        this.currentPosition = currentPosition;
        this.qualificationInformation = qualificationInformation;
        this.applications = applications;
        this.jobRequests = jobRequests;
        this.payslips = payslips;
        this.attendances = attendances;
        this.employeeAppraisals = employeeAppraisals;
        this.managerAppraisals = managerAppraisals;
        this.managerReviews = managerReviews;
        this.employeeReviews = employeeReviews;
        this.goals = goals;
        this.taskListItems = taskListItems;
        this.teams = teams;
        this.currentPayInformation = currentPayInformation;
        this.reactivationRequest = reactivationRequest;
        this.preferredDates = preferredDates;
        this.blocks = blocks;
        this.shiftListItems = shiftListItems;
        this.swapRequestsRequested = swapRequestsRequested;
        this.swapRequestsReceived = swapRequestsReceived;
        this.currentLeaveQuota = currentLeaveQuota;
        this.leaveQuotas = leaveQuotas;
        this.leaves = leaves;
        this.bankAccNo = bankAccNo;
        this.bankName = bankName;
        this.notificationsUnread = notificationsUnread;
        this.notificationsRead = notificationsRead;
        this.cardId = cardId;
    }



    // this should be for making a new applicant's account
    // public User(String firstName, String lastName, String password, Integer
    // phone, String email, LocalDate dob,
    // GenderEnum gender, RoleEnum userRole, Boolean isPartTimer, Boolean
    // isHrEmployee,
    // PayInformation currentPayInformation) {
    // this();
    // this.firstName = firstName;
    // this.lastName = lastName;
    // this.password = password;
    // this.phone = phone;
    // this.email = email;
    // this.workEmail = "";
    // this.dob = dob;
    // this.gender = gender;
    // this.userRole = userRole;
    // this.isPartTimer = isPartTimer;
    // this.isHrEmployee = isHrEmployee;
    // this.isBlackListed = false;
    // this.isEnabled = false; // only change to true after email is confirmed
    // this.dateJoined = LocalDate.now();
    // this.profilePic = null;
    // this.currentPosition = null;
    // this.qualificationInformation = null;
    // this.applications = new ArrayList<>();
    // this.jobRequests = new ArrayList<>();
    // this.payslips = new ArrayList<>();
    // this.attendances = new ArrayList<>();
    // this.employeeAppraisals = new ArrayList<>();
    // this.managerAppraisals = new ArrayList<>();
    // this.managerReviews = new ArrayList<>();
    // this.employeeReviews = new ArrayList<>();
    // this.goals = new ArrayList<>();
    // this.teams = new ArrayList<>();
    // this.taskListItems = new ArrayList<>();
    // this.currentPayInformation = currentPayInformation;
    // }

    // this should be for making a new applicant's account (duplicate with race +
    // citizenship)
    public User(String firstName, String lastName, String password, Integer phone, String email, LocalDate dob,
            GenderEnum gender, RaceEnum race, CitizenshipEnum citizenship, RoleEnum userRole, Boolean isPartTimer,
            Boolean isHrEmployee,
            PayInformation currentPayInformation) {
        this();
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.phone = phone;
        this.email = email;
        this.workEmail = "";
        this.dob = dob;
        this.gender = gender;
        this.race = race;
        this.citizenship = citizenship;
        this.userRole = userRole;
        this.isPartTimer = isPartTimer;
        this.isHrEmployee = isHrEmployee;
        this.isBlackListed = false;
        this.isEnabled = false; // only change to true after email is confirmed
        this.dateJoined = LocalDate.now();
        this.profilePic = null;
        this.currentPosition = null;
        this.qualificationInformation = null;
        this.applications = new ArrayList<>();
        this.jobRequests = new ArrayList<>();
        this.payslips = new ArrayList<>();
        this.attendances = new ArrayList<>();
        this.employeeAppraisals = new ArrayList<>();
        this.managerAppraisals = new ArrayList<>();
        this.managerReviews = new ArrayList<>();
        this.employeeReviews = new ArrayList<>();
        this.goals = new ArrayList<>();
        this.teams = new ArrayList<>();
        this.taskListItems = new ArrayList<>();
        this.currentPayInformation = currentPayInformation;
    }

    //this should be for making an employee's account
    // public User(String firstName, String lastName, Integer phone, String email, String workEmail,
    //         LocalDate dob, GenderEnum gender, RoleEnum userRole, Boolean isPartTimer, Boolean isHrEmployee,
    //         LocalDate dateJoined, PayInformation currentPayInformation) {
    //     this();
    //     this.firstName = firstName;
    //     this.lastName = lastName;
    //     this.phone = phone;
    //     this.email = email;
    //     this.workEmail = workEmail;
    //     this.dob = dob;
    //     this.gender = gender;
    //     this.userRole = userRole;
    //     this.isPartTimer = isPartTimer;
    //     this.isHrEmployee = isHrEmployee;
    //     this.dateJoined = dateJoined;
    //     this.currentPayInformation = currentPayInformation;
    //     this.isBlackListed = false;
    //     this.isEnabled = false; // only change to true after email is confirmed
    //     this.profilePic = null;
    //     this.currentPosition = null;
    //     this.qualificationInformation = null;
    // }

    // this should be for making an employee's account (duplicate with race +
    // citizenship)
    public User(String firstName, String lastName, Integer phone, String email, String workEmail,
            LocalDate dob, GenderEnum gender, RaceEnum race, CitizenshipEnum citizenship, RoleEnum userRole,
            Boolean isPartTimer, Boolean isHrEmployee,
            LocalDate dateJoined, PayInformation currentPayInformation) {
        this();
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.workEmail = workEmail;
        this.dob = dob;
        this.gender = gender;
        this.race = race;
        this.citizenship = citizenship;
        this.userRole = userRole;
        this.isPartTimer = isPartTimer;
        this.isHrEmployee = isHrEmployee;
        this.dateJoined = dateJoined;
        this.currentPayInformation = currentPayInformation;
        this.isBlackListed = false;
        this.isEnabled = false; // only change to true after email is confirmed
        this.profilePic = null;
        this.currentPosition = null;
        this.qualificationInformation = null;
    }

    // public User(String firstName, String lastName, String password, Integer
    // phone, String email, String workEmail,
    // LocalDate dob, GenderEnum gender, RoleEnum userRole, Boolean isPartTimer,
    // Boolean isHrEmployee,
    // Boolean isBlackListed,
    // Boolean isEnabled, LocalDate dateJoined, DocData profilePic, List<Position>
    // positions,
    // Position currentPosition,
    // QualificationInformation qualificationInformation,
    // List<JobApplication> applications, List<JobRequest> jobRequests,
    // List<Payslip> payslips,
    // List<Attendance> attendances, PayInformation currentPayInformation) {
    // this();
    // this.firstName = firstName;
    // this.lastName = lastName;
    // this.password = password;
    // this.phone = phone;
    // this.email = email;
    // this.workEmail = workEmail;
    // this.dob = dob;
    // this.gender = gender;
    // this.userRole = userRole;
    // this.isPartTimer = isPartTimer;
    // this.isHrEmployee = isHrEmployee;
    // this.isBlackListed = isBlackListed;
    // this.isEnabled = isEnabled;
    // this.dateJoined = dateJoined;
    // this.profilePic = profilePic;
    // this.positions = positions;
    // this.currentPosition = currentPosition;
    // this.qualificationInformation = qualificationInformation;
    // this.applications = applications;
    // this.jobRequests = jobRequests;
    // this.payslips = payslips;
    // this.attendances = attendances;
    // this.employeeAppraisals = new ArrayList<>();
    // this.managerAppraisals = new ArrayList<>();
    // this.managerReviews = new ArrayList<>();
    // this.employeeReviews = new ArrayList<>();
    // this.goals = new ArrayList<>();
    // this.teams = new ArrayList<>();
    // this.taskListItems = new ArrayList<>();
    // this.currentPayInformation = currentPayInformation;
    // }

    // duplicate with race + citizenship
    public User(String firstName, String lastName, String password, Integer phone, String email, String workEmail,
            LocalDate dob, GenderEnum gender, RaceEnum race, CitizenshipEnum citizenship, RoleEnum userRole,
            Boolean isPartTimer, Boolean isHrEmployee,
            Boolean isBlackListed,
            Boolean isEnabled, LocalDate dateJoined, DocData profilePic, List<Position> positions,
            Position currentPosition,
            QualificationInformation qualificationInformation,
            List<JobApplication> applications, List<JobRequest> jobRequests, List<Payslip> payslips,
            List<Attendance> attendances, PayInformation currentPayInformation) {
        this();
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.phone = phone;
        this.email = email;
        this.workEmail = workEmail;
        this.dob = dob;
        this.gender = gender;
        this.race = race;
        this.citizenship = citizenship;
        this.userRole = userRole;
        this.isPartTimer = isPartTimer;
        this.isHrEmployee = isHrEmployee;
        this.isBlackListed = isBlackListed;
        this.isEnabled = isEnabled;
        this.dateJoined = dateJoined;
        this.profilePic = profilePic;
        this.positions = positions;
        this.currentPosition = currentPosition;
        this.qualificationInformation = qualificationInformation;
        this.applications = applications;
        this.jobRequests = jobRequests;
        this.payslips = payslips;
        this.attendances = attendances;
        this.employeeAppraisals = new ArrayList<>();
        this.managerAppraisals = new ArrayList<>();
        this.managerReviews = new ArrayList<>();
        this.employeeReviews = new ArrayList<>();
        this.goals = new ArrayList<>();
        this.teams = new ArrayList<>();
        this.taskListItems = new ArrayList<>();
        this.currentPayInformation = currentPayInformation;
    }

    // this should be for making an employee's account
    // public User(String firstName, String lastName, Integer phone, String email, String workEmail,
    //         LocalDate dob, GenderEnum gender, RoleEnum userRole, Boolean isPartTimer, Boolean isHrEmployee,
    //         LocalDate dateJoined, PayInformation currentPayInformation, Position currentPosition) {
    //     this();
    //     this.firstName = firstName;
    //     this.lastName = lastName;
    //     this.phone = phone;
    //     this.email = email;
    //     this.workEmail = workEmail;
    //     this.dob = dob;
    //     this.gender = gender;
    //     this.userRole = userRole;
    //     this.isPartTimer = isPartTimer;
    //     this.isHrEmployee = isHrEmployee;
    //     this.dateJoined = dateJoined;
    //     this.currentPayInformation = currentPayInformation;
    //     this.isBlackListed = false;
    //     this.isEnabled = false; // only change to true after email is confirmed
    //     this.profilePic = null;
    //     this.qualificationInformation = null;
    //     this.currentPosition = currentPosition;
    //     this.positions.add(currentPosition);
    // }

    // this should be for making an employee's account (duplicate with race +
    // citizenship)
    public User(String firstName, String lastName, Integer phone, String email, String workEmail,
            LocalDate dob, GenderEnum gender, RaceEnum race, CitizenshipEnum citizenship, RoleEnum userRole,
            Boolean isPartTimer, Boolean isHrEmployee,
            LocalDate dateJoined, PayInformation currentPayInformation, Position currentPosition) {
        this();
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.workEmail = workEmail;
        this.dob = dob;
        this.gender = gender;
        this.race = race;
        this.citizenship = citizenship;
        this.userRole = userRole;
        this.isPartTimer = isPartTimer;
        this.isHrEmployee = isHrEmployee;
        this.dateJoined = dateJoined;
        this.currentPayInformation = currentPayInformation;
        this.isBlackListed = false;
        this.isEnabled = false; // only change to true after email is confirmed
        this.profilePic = null;
        this.qualificationInformation = null;
        this.currentPosition = currentPosition;
        this.positions.add(currentPosition);
    }

    // public User(String firstName, String lastName, String password, Integer phone, String email, String workEmail,
    //         LocalDate dob, GenderEnum gender, RoleEnum userRole, Boolean isPartTimer, Boolean isHrEmployee,
    //         Boolean isBlackListed, Boolean isEnabled, LocalDate dateJoined, DocData profilePic,
    //         List<Position> positions, Position currentPosition, QualificationInformation qualificationInformation,
    //         List<JobApplication> applications, List<JobRequest> jobRequests, List<Payslip> payslips,
    //         List<Attendance> attendances, List<Appraisal> employeeAppraisals, List<Appraisal> managerAppraisals,
    //         List<ManagerReview> managerReviews, List<ManagerReview> employeeReviews, List<Module> modules,
    //         List<Goal> goals, List<TaskListItem> taskListItems, List<Team> teams, PayInformation currentPayInformation,
    //         ReactivationRequest reactivationRequest, PreferredDates preferredDates, List<Block> blocks,
    //         List<ShiftListItem> shiftListItems, List<SwapRequest> swapRequestsRequested,
    //         List<SwapRequest> swapRequestsReceived, LeaveQuota currentLeaveQuota, List<LeaveQuota> leaveQuotas,
    //         List<Leave> leaves, List<Notification> notificationsUnread, List<Notification> notificationsRead) {
    //     this();
    //     this.firstName = firstName;
    //     this.lastName = lastName;
    //     this.password = password;
    //     this.phone = phone;
    //     this.email = email;
    //     this.workEmail = workEmail;
    //     this.dob = dob;
    //     this.gender = gender;
    //     this.userRole = userRole;
    //     this.isPartTimer = isPartTimer;
    //     this.isHrEmployee = isHrEmployee;
    //     this.isBlackListed = isBlackListed;
    //     this.isEnabled = isEnabled;
    //     this.dateJoined = dateJoined;
    //     this.profilePic = profilePic;
    //     this.positions = positions;
    //     this.currentPosition = currentPosition;
    //     this.qualificationInformation = qualificationInformation;
    //     this.applications = applications;
    //     this.jobRequests = jobRequests;
    //     this.payslips = payslips;
    //     this.attendances = attendances;
    //     this.employeeAppraisals = employeeAppraisals;
    //     this.managerAppraisals = managerAppraisals;
    //     this.managerReviews = managerReviews;
    //     this.employeeReviews = employeeReviews;
    //     this.goals = goals;
    //     this.taskListItems = taskListItems;
    //     this.teams = teams;
    //     this.currentPayInformation = currentPayInformation;
    //     this.reactivationRequest = reactivationRequest;
    //     this.preferredDates = preferredDates;
    //     this.blocks = blocks;
    //     this.shiftListItems = shiftListItems;
    //     this.swapRequestsRequested = swapRequestsRequested;
    //     this.swapRequestsReceived = swapRequestsReceived;
    //     this.currentLeaveQuota = currentLeaveQuota;
    //     this.leaveQuotas = leaveQuotas;
    //     this.leaves = leaves;
    //     this.notificationsUnread = new ArrayList<>();
    //     this.notificationsRead = new ArrayList<>();
    // }

    // duplicate with race + citizenship
    public User(String firstName, String lastName, String password, Integer phone, String email, String workEmail,
            LocalDate dob, GenderEnum gender, RaceEnum race, CitizenshipEnum citizenship, RoleEnum userRole,
            Boolean isPartTimer, Boolean isHrEmployee, Boolean isBlackListed, Boolean isEnabled, LocalDate dateJoined,
            DocData profilePic, List<Position> positions, Position currentPosition,
            QualificationInformation qualificationInformation, List<JobApplication> applications,
            List<JobRequest> jobRequests, List<Payslip> payslips, List<Attendance> attendances,
            List<Appraisal> employeeAppraisals, List<Appraisal> managerAppraisals, List<Review> managerReviews,
            List<Review> employeeReviews, List<Module> modules, List<Goal> goals,
            List<TaskListItem> taskListItems, List<Team> teams, PayInformation currentPayInformation,
            ReactivationRequest reactivationRequest, PreferredDates preferredDates, List<Block> blocks,
            List<ShiftListItem> shiftListItems, List<SwapRequest> swapRequestsRequested,
            List<SwapRequest> swapRequestsReceived, LeaveQuota currentLeaveQuota, List<LeaveQuota> leaveQuotas,
            List<Leave> leaves, List<Notification> notificationsUnread, List<Notification> notificationsRead) {
        this();
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.phone = phone;
        this.email = email;
        this.workEmail = workEmail;
        this.dob = dob;
        this.gender = gender;
        this.race = race;
        this.citizenship = citizenship;
        this.userRole = userRole;
        this.isPartTimer = isPartTimer;
        this.isHrEmployee = isHrEmployee;
        this.isBlackListed = isBlackListed;
        this.isEnabled = isEnabled;
        this.dateJoined = dateJoined;
        this.profilePic = profilePic;
        this.positions = positions;
        this.currentPosition = currentPosition;
        this.qualificationInformation = qualificationInformation;
        this.applications = applications;
        this.jobRequests = jobRequests;
        this.payslips = payslips;
        this.attendances = attendances;
        this.employeeAppraisals = employeeAppraisals;
        this.managerAppraisals = managerAppraisals;
        this.managerReviews = managerReviews;
        this.employeeReviews = employeeReviews;
        this.goals = goals;
        this.taskListItems = taskListItems;
        this.teams = teams;
        this.currentPayInformation = currentPayInformation;
        this.reactivationRequest = reactivationRequest;
        this.preferredDates = preferredDates;
        this.blocks = blocks;
        this.shiftListItems = shiftListItems;
        this.swapRequestsRequested = swapRequestsRequested;
        this.swapRequestsReceived = swapRequestsReceived;
        this.currentLeaveQuota = currentLeaveQuota;
        this.leaveQuotas = leaveQuotas;
        this.leaves = leaves;
        // this.notificationsUnread = new ArrayList<>();
        // this.notificationsRead = new ArrayList<>();
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                '}';
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(this.userRole.name());

        return Collections.singletonList(authority);
    }

    @Override
    public String getUsername() {
        if (userRole.equals(RoleEnum.APPLICANT)) {
            return this.email;
        } else {
            return this.workEmail;
        }
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !this.isBlackListed;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.isEnabled;
    }

    public List<TaskListItem> addTaskListItem(TaskListItem item) {
        this.taskListItems.add(item);
        return this.taskListItems;
    }

    public PreferredDates getPreferredDates() {
        return preferredDates;
    }

    public void setPreferredDates(PreferredDates preferredDates) {
        this.preferredDates = preferredDates;
    }

    public List<Block> getBlocks() {
        return blocks;
    }

    public void setBlocks(List<Block> blocks) {
        this.blocks = blocks;
    }

    public List<Block> addBlock(Block block) {
        this.blocks.add(block);
        return this.blocks;
    }

    public List<Block> removeBlock(Block block) {
        this.blocks.remove(block);
        return this.blocks;
    }

    public List<ShiftListItem> getShiftListItems() {
        return shiftListItems;
    }

    public void setShiftListItems(List<ShiftListItem> shiftListItems) {
        this.shiftListItems = shiftListItems;
    }

    public List<ShiftListItem> addShiftListItems(ShiftListItem shiftListItem) {
        this.shiftListItems.add(shiftListItem);
        return this.shiftListItems;
    }

    public List<ShiftListItem> removeShiftListItems(ShiftListItem shiftListItem) {
        this.shiftListItems.remove(shiftListItem);
        return this.shiftListItems;
    }

    public List<SwapRequest> addSwapRequestsRequested(SwapRequest swapRequest) {
        this.swapRequestsRequested.add(swapRequest);
        return this.swapRequestsRequested;
    }

    public List<SwapRequest> removeSwapRequestsRequested(SwapRequest swapRequest) {
        this.swapRequestsRequested.remove(swapRequest);
        return this.swapRequestsRequested;
    }

    public List<SwapRequest> addSwapRequestsReceived(SwapRequest swapRequest) {
        this.swapRequestsReceived.add(swapRequest);
        return this.swapRequestsReceived;
    }

    public List<SwapRequest> removeSwapRequestsReceived(SwapRequest swapRequest) {
        this.swapRequestsReceived.remove(swapRequest);
        return this.swapRequestsReceived;
    }

    public Boolean getPartTimer() {
        return isPartTimer;
    }

    public void setPartTimer(Boolean partTimer) {
        isPartTimer = partTimer;
    }

    public String getPassword() {
        return this.password;
    }

    public PayInformation getCurrentPayInformation() {
        return currentPayInformation;
    }

    public void setCurrentPayInformation(PayInformation currentPayInformation) {
        this.currentPayInformation = currentPayInformation;
    }

    public List<Payslip> addPayslip(Payslip payslip) {
        this.payslips.add(payslip);
        return this.payslips;
    }

    public List<Payslip> removePayslip(Payslip payslip) {
        this.payslips.remove(payslip);
        return this.payslips;
    }

    public ReactivationRequest getReactivationRequest() {
        return reactivationRequest;
    }

    public void setReactivationRequest(ReactivationRequest reactivationRequest) {
        this.reactivationRequest = reactivationRequest;
    }

    public List<TaskListItem> getTaskListItems() {
        return taskListItems;
    }

    public void setTaskListItems(List<TaskListItem> taskListItems) {
        this.taskListItems = taskListItems;
    }

    public Boolean getHrEmployee() {
        return isHrEmployee;
    }

    public void setHrEmployee(Boolean hrEmployee) {
        isHrEmployee = hrEmployee;
    }

    public Boolean getBlackListed() {
        return isBlackListed;
    }

    public void setBlackListed(Boolean blackListed) {
        isBlackListed = blackListed;
    }

    public Boolean getEnabled() {
        return isEnabled;
    }

    public void setEnabled(Boolean enabled) {
        isEnabled = enabled;
    }

    public Boolean getDisabled() {
        return isDisabled;
    }

    public void setDisabled(Boolean disabled) {
        isDisabled = disabled;
    }

    public User nullify() {
        System.out.println("Nullifying user relationships");
        this.setProfilePic(null);
        this.setPositions(new ArrayList<>());
        this.setCurrentPosition(null);
        this.setQualificationInformation(null);
        this.setApplications(new ArrayList<>());
        this.setJobRequests(new ArrayList<>());
        this.setPayslips(new ArrayList<>());
        this.setAttendances(new ArrayList<>());
        this.setEmployeeAppraisals(new ArrayList<>());
        this.setManagerAppraisals(new ArrayList<>());
        this.setManagerReviews(new ArrayList<>());
        this.setEmployeeReviews(new ArrayList<>());
        this.setGoals(new ArrayList<>());
        this.setTaskListItems(new ArrayList<>());
        this.setTeams(new ArrayList<>());
        this.setCurrentPayInformation(null);
        this.setReactivationRequest(null);
        this.setPreferredDates(null);
        this.setBlocks(new ArrayList<>());
        this.setShiftListItems(new ArrayList<>());
        this.setSwapRequestsReceived(new ArrayList<>());
        this.setSwapRequestsRequested(new ArrayList<>());
        this.setLeaves(new ArrayList<>());
        this.setLeaveQuotas(new ArrayList<>());
        this.setCurrentLeaveQuota(null);
        this.setBenefitPlanInstances(new ArrayList<>());
        return this;
    }
}
