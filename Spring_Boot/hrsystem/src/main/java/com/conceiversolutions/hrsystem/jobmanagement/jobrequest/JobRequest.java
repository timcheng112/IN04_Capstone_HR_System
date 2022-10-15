package com.conceiversolutions.hrsystem.jobmanagement.jobrequest;

import com.conceiversolutions.hrsystem.enums.JobStatusEnum;
import com.conceiversolutions.hrsystem.enums.JobTypeEnum;
import com.conceiversolutions.hrsystem.enums.RoleEnum;
import com.conceiversolutions.hrsystem.jobmanagement.jobposting.JobPosting;
import com.conceiversolutions.hrsystem.organizationstructure.department.Department;
import com.conceiversolutions.hrsystem.organizationstructure.team.Team;
import com.conceiversolutions.hrsystem.skillset.skillset.Skillset;
import com.conceiversolutions.hrsystem.user.user.User;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name="job_requests")
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class JobRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id")
    private Long requestId;
    @Column(name = "job_title", nullable = false, length = 64)
    private String jobTitle;
    @Column(name = "job_description", nullable = false, length = 255)
    private String jobDescription;
    @Column(name = "justification", nullable = false, length = 255)
    private String justification;
    @Column(name = "request_date", nullable = false)
    private LocalDate requestDate;
    @Column(name = "preferred_start_date", nullable = false)
    private LocalDate preferredStartDate;
    @Enumerated(EnumType.STRING)
    @Column(name = "job_type", nullable = false)
    private JobTypeEnum jobType;
    @Enumerated(EnumType.STRING)
    @Column(name = "job_role", nullable = false)
    private RoleEnum jobRole;
    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private JobStatusEnum status;
    @Column(name = "salary", nullable = false)
    private BigDecimal salary;
    @ManyToMany(fetch = FetchType.LAZY, targetEntity = Skillset.class)
    @JoinTable(
            name = "job_request_requirements",
            joinColumns = @JoinColumn(name = "job_requeest_id"),
            inverseJoinColumns = @JoinColumn(name = "requirement_id")
    )
    private List<Skillset> jobRequirements;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = Department.class, optional = false)
    @JoinColumn(name = "department")
    private Department department;
    @ManyToOne(fetch = FetchType.LAZY, targetEntity = Team.class, optional = true)
    @JoinColumn(name = "team")
    private Team team;

    @ManyToOne(optional = false, targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "requestor")
    private User requestedBy;
    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class, optional = true)
    @JoinColumn(name = "approver")
    private User approver;
    @Column(name = "approved_date", nullable = true)
    private LocalDateTime approvedDate;
    @Column(name = "last_edited_date", nullable = false)
    private LocalDateTime lastEditedDate;
    @OneToOne(fetch = FetchType.LAZY, targetEntity = JobPosting.class)
    private JobPosting jobPosting;

    public JobRequest() {
    }

    public JobRequest(String jobTitle, String jobDescription, String justification, LocalDate preferredStartDate, JobTypeEnum jobType, BigDecimal salary, List<Skillset> jobRequirements, Department department, Team team, User requestedBy, RoleEnum jobRole) {
        this.jobTitle = jobTitle;
        this.jobDescription = jobDescription;
        this.justification = justification;
        this.preferredStartDate = preferredStartDate;
        this.jobType = jobType;
        this.salary = salary;
        this.jobRequirements = jobRequirements;
        this.department = department;
        this.team = team;
        this.requestedBy = requestedBy;
        this.jobRole = jobRole;
        this.requestDate = LocalDate.now();
        this.status = JobStatusEnum.PENDING;
        this.approver = null;
        this.approvedDate = null;
        this.lastEditedDate = LocalDateTime.now();
        this.jobPosting = null;
    }

    public void approveJobRequest() {
        this.status = JobStatusEnum.APPROVED;
        this.approvedDate = LocalDateTime.now();
    }
}
