package com.conceiversolutions.hrsystem.jobmanagement.jobapplication;

import com.conceiversolutions.hrsystem.enums.JobStatusEnum;
import com.conceiversolutions.hrsystem.jobmanagement.jobposting.JobPosting;
import com.conceiversolutions.hrsystem.skillset.skillset.Skillset;
import com.conceiversolutions.hrsystem.skillset.userskillset.UserSkillset;
import com.conceiversolutions.hrsystem.user.docdata.DocData;
import com.conceiversolutions.hrsystem.user.user.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name="job_applications")
public class JobApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "application_id")
    private Long applicationId;
    @Column(name = "apply_date", nullable = false)
    private LocalDate applyDate;
    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private JobStatusEnum status;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class, optional = false)
    private User applicant;
    @OneToMany(fetch = FetchType.LAZY, targetEntity = UserSkillset.class)
    @JoinColumn(name = "application_id")
    private List<UserSkillset> userSkills;
    @ManyToOne(targetEntity = JobPosting.class, fetch = FetchType.LAZY, optional = false)
    private JobPosting jobPosting;
    @Column(name = "available_start_date", nullable = false)
    private LocalDate availableStartDate;
    @Column(name = "start_date")
    private LocalDate startDate;
    @Column(name = "last_update_at", nullable = false)
    private LocalDateTime lastUpdatedAt;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = DocData.class, optional = true)
    private DocData CV;
    @ManyToOne(fetch = FetchType.LAZY, targetEntity = DocData.class, optional = true)
    private DocData coverLetter;
    @ManyToOne(fetch = FetchType.LAZY, targetEntity = DocData.class, optional = true)
    private DocData transcript;

    public JobApplication() {
    }

    public JobApplication(JobPosting jobPosting, LocalDate applyDate, JobStatusEnum status, User applicant, List<UserSkillset> userSkills, LocalDate availableStartDate) {
        this.applyDate = applyDate;
        this.status = status;
        this.userSkills = userSkills;
        this.jobPosting = jobPosting;
        this.availableStartDate = availableStartDate;
        this.applicant = applicant;
        this.lastUpdatedAt = LocalDateTime.now();
    }

    @Override
    public String toString() {
        return "JobApplication{" +
                "applicationId=" + applicationId +
                ", applyDate=" + applyDate +
                ", status=" + status +
                '}';
    }
}
