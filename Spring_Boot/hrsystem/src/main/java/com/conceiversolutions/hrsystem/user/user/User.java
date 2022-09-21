package com.conceiversolutions.hrsystem.user.user;

import com.conceiversolutions.hrsystem.enums.GenderEnum;
import com.conceiversolutions.hrsystem.enums.RoleEnum;
import com.conceiversolutions.hrsystem.jobmanagement.jobapplication.JobApplication;
import com.conceiversolutions.hrsystem.jobmanagement.jobrequest.JobRequest;
import com.conceiversolutions.hrsystem.performance.appraisal.Appraisal;
import com.conceiversolutions.hrsystem.performance.goal.Goal;
import com.conceiversolutions.hrsystem.performance.review.ManagerReview;
import com.conceiversolutions.hrsystem.user.position.Position;
import com.conceiversolutions.hrsystem.user.qualificationinformation.QualificationInformation;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;
    @Column(name = "first_name", nullable = false, length = 64)
    private String firstName;
    @Column(name = "last_name",nullable = false, length = 64)
    private String lastName;
    @Column(name = "password",nullable = false, length = 64)
    private String password;
    @Column(name = "phone",nullable = false, length = 16)
    private Integer phone;
    @Column(name = "email",nullable = false, unique = true)
    private String email;
    @Column(name = "work_email",nullable = false)
    private String workEmail;
    @Column(name = "dob",nullable = false)
    private LocalDate dob;
    @Column(name = "gender",nullable = false)
    @Enumerated(EnumType.STRING)
    private GenderEnum gender;

    @Column(name = "user_role",nullable = false)
    @Enumerated(EnumType.STRING)
    private RoleEnum userRole;
    @Column(name = "is_partTimer",nullable = false)
    private Boolean isPartTimer;
    @Column(name = "is_hrEmployee",nullable = false)
    private Boolean isHrEmployee;

    @Column(name = "is_blackListed",nullable = false)
    private Boolean isBlackListed;
    @Column(name = "is_enabled",nullable = false)
    private Boolean isEnabled;
    @Column(name = "date_joined",nullable = false)
    private LocalDate dateJoined;

    @Column(name = "profile_pic",length = 1000, nullable = true)
    private Byte[] profilePic;
    @OneToMany(fetch = FetchType.LAZY, targetEntity = Position.class)
    @JoinColumn(name = "position_id", referencedColumnName = "user_id")
    private List<Position> positions;
    @OneToOne(targetEntity = QualificationInformation.class, fetch = FetchType.LAZY)
    private QualificationInformation qualificationInformation;
    @OneToMany(fetch = FetchType.LAZY, targetEntity = JobApplication.class, mappedBy = "applicant")
    @Column(name = "applications")
    private List<JobApplication> applications;
    @OneToMany(fetch = FetchType.LAZY, targetEntity = JobRequest.class, mappedBy = "requestedBy")
    @Column(name = "job_requests")
    private List<JobApplication> jobRequests;
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

//    TODO add on other relationships to other classes
//    TODO add hashing for password

    public User() {
    }

    /* Main Constructor without the optional fields */
    public User(String firstName, String lastName, String password, Integer phone, String email, LocalDate dob, GenderEnum gender, RoleEnum userRole, Boolean isPartTimer, Boolean isHrEmployee) {
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
        this.isEnabled = true;
        this.dateJoined = LocalDate.now();
        this.profilePic = null;
        this.positions = new ArrayList<>();
        this.qualificationInformation = null;
        this.applications = new ArrayList<>();
        this.jobRequests = new ArrayList<>();
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

    public String getPassword() {
        return password;
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

    public Byte[] getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(Byte[] profilePic) {
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

    public List<JobApplication> getJobRequests() {
        return jobRequests;
    }

    public void setJobRequests(List<JobApplication> jobRequests) {
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


    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
