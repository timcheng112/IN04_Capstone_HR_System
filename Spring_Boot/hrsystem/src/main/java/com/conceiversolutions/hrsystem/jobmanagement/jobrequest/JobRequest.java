package com.conceiversolutions.hrsystem.jobmanagement.jobrequest;

import com.conceiversolutions.hrsystem.enums.JobStatusEnum;
import com.conceiversolutions.hrsystem.enums.JobTypeEnum;
import com.conceiversolutions.hrsystem.organizationstructure.department.Department;
import com.conceiversolutions.hrsystem.organizationstructure.team.Team;
import com.conceiversolutions.hrsystem.skillset.jobskillset.JobSkillset;
import com.conceiversolutions.hrsystem.user.user.User;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
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
    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private JobStatusEnum status;
    @Column(name = "salary_min", nullable = false)
    private BigDecimal salaryMin;
    @Column(name = "salary_max", nullable = false)
    private BigDecimal salaryMax;
    @OneToMany(fetch = FetchType.LAZY, targetEntity = JobSkillset.class)
    @JoinColumn(name = "requirements")
    private List<JobSkillset> jobRequirements;

    @OneToOne(fetch = FetchType.LAZY, targetEntity = Department.class, optional = false)
    @JoinColumn(name = "department")
    private Department department;
    @OneToOne(fetch = FetchType.LAZY, targetEntity = Team.class, optional = true)
    @JoinColumn(name = "team")
    private Team team;

    @ManyToOne(optional = false, targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "requestor")
    private User requestedBy;
    @OneToOne(fetch = FetchType.LAZY, targetEntity = User.class, optional = true)
    @JoinColumn(name = "approver")
    private User approver;

    public JobRequest() {
    }

    public JobRequest(String jobTitle, String jobDescription, String justification, LocalDate preferredStartDate, JobTypeEnum jobType, BigDecimal salaryMin, BigDecimal salaryMax, List<JobSkillset> jobRequirements, Department department, Team team, User requestedBy) {
        this.jobTitle = jobTitle;
        this.jobDescription = jobDescription;
        this.justification = justification;
        this.preferredStartDate = preferredStartDate;
        this.jobType = jobType;
        this.salaryMin = salaryMin;
        this.salaryMax = salaryMax;
        this.jobRequirements = jobRequirements;
        this.department = department;
        this.team = team;
        this.requestedBy = requestedBy;
        this.requestDate = LocalDate.now();
        this.status = JobStatusEnum.CREATED;
        this.approver = null;
    }
}
