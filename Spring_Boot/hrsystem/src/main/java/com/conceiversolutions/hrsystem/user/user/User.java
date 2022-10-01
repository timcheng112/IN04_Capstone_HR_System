package com.conceiversolutions.hrsystem.user.user;

import com.conceiversolutions.hrsystem.administration.tasklistitem.TaskListItem;
import com.conceiversolutions.hrsystem.enums.GenderEnum;
import com.conceiversolutions.hrsystem.enums.RoleEnum;
import com.conceiversolutions.hrsystem.jobmanagement.jobapplication.JobApplication;
import com.conceiversolutions.hrsystem.jobmanagement.jobrequest.JobRequest;
import com.conceiversolutions.hrsystem.organizationstructure.team.Team;
import com.conceiversolutions.hrsystem.pay.attendance.Attendance;
import com.conceiversolutions.hrsystem.pay.payinformation.PayInformation;
import com.conceiversolutions.hrsystem.pay.payslip.Payslip;
import com.conceiversolutions.hrsystem.performance.appraisal.Appraisal;
import com.conceiversolutions.hrsystem.performance.goal.Goal;
import com.conceiversolutions.hrsystem.performance.review.ManagerReview;
import com.conceiversolutions.hrsystem.training.module.Module;
import com.conceiversolutions.hrsystem.user.docdata.DocData;
import com.conceiversolutions.hrsystem.user.position.Position;
import com.conceiversolutions.hrsystem.user.qualificationinformation.QualificationInformation;
import com.conceiversolutions.hrsystem.user.reactivationrequest.ReactivationRequest;
import lombok.EqualsAndHashCode;
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
@Table(name="users")
@EqualsAndHashCode
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
    @Column(name = "date_joined", nullable = false)
    private LocalDate dateJoined;

    @Column(name = "profile_pic", nullable = true)
    private DocData profilePic;
    @OneToMany(fetch = FetchType.LAZY, targetEntity = Position.class)
    @JoinColumn(name = "user_id")
    private List<Position> positions;
    @OneToOne(targetEntity = QualificationInformation.class, fetch = FetchType.LAZY)
    private QualificationInformation qualificationInformation;

    @OneToMany(fetch = FetchType.LAZY, targetEntity = JobApplication.class, mappedBy = "applicant")
    @Column(name = "applications")
    private List<JobApplication> applications;
    @OneToMany(fetch = FetchType.LAZY, targetEntity = JobRequest.class, mappedBy = "requestedBy")
    @Column(name = "job_requests")
    private List<JobRequest> jobRequests;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "payslipId")
    private List<Payslip> payslips;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "attendanceId")
    private List<Attendance> attendances;

    @OneToMany(fetch = FetchType.LAZY, targetEntity = Appraisal.class, mappedBy = "employee")
    @Column(name = "employee_appraisals")
    private List<Appraisal> employeeAppraisals;
    @OneToMany(fetch = FetchType.LAZY, targetEntity = Appraisal.class, mappedBy = "managerAppraising")
    @Column(name = "appraised_by")
    private List<Appraisal> managerAppraisals;
    @OneToMany(fetch = FetchType.LAZY, targetEntity = ManagerReview.class, mappedBy = "manager")
    @Column(name = "manager_reviews")
    private List<ManagerReview> managerReviews;
    @OneToMany(fetch = FetchType.LAZY, targetEntity = ManagerReview.class, mappedBy = "employeeReviewing")
    @Column(name = "reviewed_by")
    private List<ManagerReview> employeeReviews;
    @OneToMany(fetch = FetchType.LAZY, targetEntity = Module.class, mappedBy = "employee")
    @Column(name = "modules")
    private List<Module> modules;
    @OneToMany(fetch = FetchType.LAZY, targetEntity = Goal.class, mappedBy = "employee")
    @Column(name = "goals")
    private List<Goal> goals;
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

//    TODO add on other relationships to other classes

    public User() {
    }

    // this should be for making a new applicant's account
    public User(String firstName, String lastName, String password, Integer phone, String email, LocalDate dob,
            GenderEnum gender, RoleEnum userRole, Boolean isPartTimer, Boolean isHrEmployee,
            PayInformation currentPayInformation) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.phone = phone;
        this.email = email;
        this.workEmail = "";
        this.dob = dob;
        this.gender = gender;
        this.userRole = userRole;
        this.isPartTimer = isPartTimer;
        this.isHrEmployee = isHrEmployee;
        this.isBlackListed = false;
        this.isEnabled = false; // only change to true after email is confirmed
        this.dateJoined = LocalDate.now();
        this.profilePic = null;
        this.positions = new ArrayList<>();
        this.qualificationInformation = null;
        this.applications = new ArrayList<>();
        this.jobRequests = new ArrayList<>();
        this.payslips = new ArrayList<>();
        this.attendances = new ArrayList<>();
        this.employeeAppraisals = new ArrayList<>();
        this.managerAppraisals = new ArrayList<>();
        this.managerReviews = new ArrayList<>();
        this.employeeReviews = new ArrayList<>();
        this.modules = new ArrayList<>();
        this.goals = new ArrayList<>();
        this.teams = new ArrayList<>();
        this.taskListItems = new ArrayList<>();
        this.currentPayInformation = currentPayInformation;
    }

    // this should be for making an employee's account
    public User(String firstName, String lastName, String password, Integer phone, String email, String workEmail, LocalDate dob, GenderEnum gender, RoleEnum userRole, Boolean isPartTimer, Boolean isHrEmployee, LocalDate dateJoined, PayInformation currentPayInformation) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.phone = phone;
        this.email = email;
        this.workEmail = workEmail;
        this.dob = dob;
        this.gender = gender;
        this.userRole = userRole;
        this.isPartTimer = isPartTimer;
        this.isHrEmployee = isHrEmployee;
        this.dateJoined = dateJoined;
        this.currentPayInformation = currentPayInformation;
        this.isBlackListed = false;
        this.isEnabled = false; // only change to true after email is confirmed
        this.profilePic = null;
        this.positions = new ArrayList<>();
        this.qualificationInformation = null;
        this.applications = new ArrayList<>();
        this.jobRequests = new ArrayList<>();
        this.payslips = new ArrayList<>();
        this.attendances = new ArrayList<>();
        this.employeeAppraisals = new ArrayList<>();
        this.managerAppraisals = new ArrayList<>();
        this.managerReviews = new ArrayList<>();
        this.employeeReviews = new ArrayList<>();
        this.modules = new ArrayList<>();
        this.goals = new ArrayList<>();
        this.teams = new ArrayList<>();
    }

    public User(String firstName, String lastName, String password, Integer phone, String email, String workEmail,
            LocalDate dob, GenderEnum gender, RoleEnum userRole, Boolean isPartTimer, Boolean isHrEmployee,
            Boolean isBlackListed,
            Boolean isEnabled, LocalDate dateJoined, DocData profilePic, List<Position> positions,
            QualificationInformation qualificationInformation,
            List<JobApplication> applications, List<JobRequest> jobRequests, List<Payslip> payslips,
            List<Attendance> attendances, PayInformation currentPayInformation) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.phone = phone;
        this.email = email;
        this.workEmail = workEmail;
        this.dob = dob;
        this.gender = gender;
        this.userRole = userRole;
        this.isPartTimer = isPartTimer;
        this.isHrEmployee = isHrEmployee;
        this.isBlackListed = isBlackListed;
        this.isEnabled = isEnabled;
        this.dateJoined = dateJoined;
        this.profilePic = profilePic;
        this.positions = positions;
        this.qualificationInformation = qualificationInformation;
        this.applications = applications;
        this.jobRequests = jobRequests;
        this.payslips = payslips;
        this.attendances = attendances;
        this.employeeAppraisals = new ArrayList<>();
        this.managerAppraisals = new ArrayList<>();
        this.managerReviews = new ArrayList<>();
        this.employeeReviews = new ArrayList<>();
        this.modules = new ArrayList<>();
        this.goals = new ArrayList<>();
        this.teams = new ArrayList<>();
        this.taskListItems = new ArrayList<>();
        this.currentPayInformation = currentPayInformation;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getPhone() {
        return phone;
    }

    public void setPhone(Integer phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getWorkEmail() {
        return workEmail;
    }

    public void setWorkEmail(String workEmail) {
        this.workEmail = workEmail;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public GenderEnum getGender() {
        return gender;
    }

    public void setGender(GenderEnum gender) {
        this.gender = gender;
    }

    public RoleEnum getUserRole() {
        return userRole;
    }

    public void setUserRole(RoleEnum userRole) {
        this.userRole = userRole;
    }

    public Boolean getPartTimer() {
        return isPartTimer;
    }

    public void setPartTimer(Boolean partTimer) {
        isPartTimer = partTimer;
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

    public LocalDate getDateJoined() {
        return dateJoined;
    }

    public void setDateJoined(LocalDate dateJoined) {
        this.dateJoined = dateJoined;
    }

    public DocData getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(DocData profilePic) {
        this.profilePic = profilePic;
    }

    public List<Position> getPositions() {
        return positions;
    }

    public void setPositions(List<Position> positions) {
        this.positions = positions;
    }

    public QualificationInformation getQualificationInformation() {
        return qualificationInformation;
    }

    public void setQualificationInformation(QualificationInformation qualificationInformation) {
        this.qualificationInformation = qualificationInformation;
    }

    public List<JobApplication> getApplications() {
        return applications;
    }

    public void setApplications(List<JobApplication> applications) {
        this.applications = applications;
    }

    public List<JobRequest> getJobRequests() {
        return jobRequests;
    }

    public void setJobRequests(List<JobRequest> jobRequests) {
        this.jobRequests = jobRequests;
    }

    public List<Appraisal> getEmployeeAppraisals() {
        return employeeAppraisals;
    }

    public void setEmployeeAppraisals(List<Appraisal> employeeAppraisals) {
        this.employeeAppraisals = employeeAppraisals;
    }

    public List<Appraisal> getManagerAppraisals() {
        return managerAppraisals;
    }

    public void setManagerAppraisals(List<Appraisal> managerAppraisals) {
        this.managerAppraisals = managerAppraisals;
    }

    public List<ManagerReview> getManagerReviews() {
        return managerReviews;
    }

    public void setManagerReviews(List<ManagerReview> managerReviews) {
        this.managerReviews = managerReviews;
    }

    public List<ManagerReview> getEmployeeReviews() {
        return employeeReviews;
    }

    public void setEmployeeReviews(List<ManagerReview> employeeReviews) {
        this.employeeReviews = employeeReviews;
    }

    public List<Module> getModules() {
        return modules;
    }

    public void setModules(List<Module> modules) {
        this.modules = modules;
    }

    public List<Goal> getGoals() {
        return goals;
    }

    public void setGoals(List<Goal> goals) {
        this.goals = goals;
    }

    public List<Payslip> getPayslips() {
        return payslips;
    }

    public void setPayslips(List<Payslip> payslips) {
        this.payslips = payslips;
    }

    public List<Attendance> getAttendances() {
        return attendances;
    }

    public void setAttendances(List<Attendance> attendances) {
        this.attendances = attendances;
    }

    public List<Team> getTeams() {
        return teams;
    }

    public void setTeams(List<Team> teams) {
        this.teams = teams;
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
        SimpleGrantedAuthority authority =
                new SimpleGrantedAuthority(this.userRole.name());

        return Collections.singletonList(authority);
    }

    public String getPassword() {
        return this.password;
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

    public PayInformation getCurrentPayInformation() {
        return currentPayInformation;
    }

    public void setCurrentPayInformation(PayInformation currentPayInformation) {
        this.currentPayInformation = currentPayInformation;
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

    public List<TaskListItem> addTaskListItem(TaskListItem item) {
        this.taskListItems.add(item);
        return this.taskListItems;
    }
}
