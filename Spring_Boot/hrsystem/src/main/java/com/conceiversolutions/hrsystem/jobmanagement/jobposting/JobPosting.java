package com.conceiversolutions.hrsystem.jobmanagement.jobposting;

import com.conceiversolutions.hrsystem.enums.JobStatusEnum;
import com.conceiversolutions.hrsystem.enums.JobTypeEnum;
import com.conceiversolutions.hrsystem.enums.RoleEnum;
import com.conceiversolutions.hrsystem.jobmanagement.jobrequest.JobRequest;
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
@Table(name="job_postings")
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class JobPosting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "posting_id")
    private Long postingId;
    @Column(name = "job_title", nullable = false, length = 64)
    private String jobTitle;
    @Column(name = "job_description", nullable = false, length = 255)
    private String jobDescription;
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
    @Column(name = "salary", nullable = true, length = 64)
    private BigDecimal salary;
    @Column(name = "salary_min", nullable = true)
    private BigDecimal salaryMin;
    @Column(name = "salary_max", nullable = true)
    private BigDecimal salaryMax;
    @Column(name = "post_date", nullable = false)
    private LocalDate postDate;
    @Column(name = "is_active", nullable = false)
    private Boolean isActive;
    // this is the admin that approved the job request
    @ManyToOne(optional = false, targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "poster")
    private User postedBy;
    @OneToOne(targetEntity = JobRequest.class, fetch = FetchType.LAZY, optional = false, mappedBy = "jobPosting")
    private JobRequest jobRequest;
    @ManyToMany(fetch = FetchType.LAZY, targetEntity = Skillset.class)
    @JoinTable(
            name = "job_post_requirements",
            joinColumns = @JoinColumn(name = "job_posting_id"),
            inverseJoinColumns = @JoinColumn(name = "posting_requirement_id")
    )
    private List<Skillset> jobPostRequirements;

    public JobPosting() {
    }

    public JobPosting(String jobTitle, String jobDescription, LocalDate preferredStartDate, JobTypeEnum jobType, RoleEnum jobRole, JobStatusEnum status, BigDecimal salary, LocalDate postDate, Boolean isActive, User postedBy, JobRequest jobRequest, List<Skillset> jobRequirements) {
        this.jobTitle = jobTitle;
        this.jobDescription = jobDescription;
        this.preferredStartDate = preferredStartDate;
        this.jobType = jobType;
        this.jobRole = jobRole;
        this.status = status;
        this.salary = salary;
        this.postDate = postDate;
        this.isActive = isActive;
        this.postedBy = postedBy;
        this.jobRequest = jobRequest;
        this.jobPostRequirements = jobRequirements;
    }

    public JobPosting(String jobTitle, String jobDescription, LocalDate preferredStartDate, JobTypeEnum jobType, RoleEnum jobRole, JobStatusEnum status, LocalDate postDate, Boolean isActive, User postedBy, JobRequest jobRequest, List<Skillset> jobRequirements, BigDecimal salaryMin, BigDecimal salaryMax) {
        this.jobTitle = jobTitle;
        this.jobDescription = jobDescription;
        this.preferredStartDate = preferredStartDate;
        this.jobType = jobType;
        this.jobRole = jobRole;
        this.status = status;
        this.postDate = postDate;
        this.isActive = isActive;
        this.postedBy = postedBy;
        this.jobRequest = jobRequest;
        this.jobPostRequirements = jobRequirements;
        this.salaryMin = salaryMin;
        this.salaryMax = salaryMax;
    }
}
