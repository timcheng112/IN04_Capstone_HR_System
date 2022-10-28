package com.conceiversolutions.hrsystem.jobmanagement.jobapplication;

import com.conceiversolutions.hrsystem.enums.JobStatusEnum;
import com.conceiversolutions.hrsystem.jobmanagement.jobposting.JobPosting;
import com.conceiversolutions.hrsystem.skillset.skillset.Skillset;
import com.conceiversolutions.hrsystem.skillset.userskillset.UserSkillset;
import com.conceiversolutions.hrsystem.user.user.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
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

    @ManyToMany(fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinTable(
            name = "job_applicants",
            joinColumns = @JoinColumn(name = "job_application_id"),
            inverseJoinColumns = @JoinColumn(name = "applicant_id")
    )
    private List<User> applicants;
    @OneToMany(fetch = FetchType.LAZY, targetEntity = UserSkillset.class)
    @JoinColumn(name = "application_id")
    private List<UserSkillset> userSkills;
    @OneToOne(targetEntity = JobPosting.class, fetch = FetchType.LAZY, optional = false)
    private JobPosting jobPosting;
    @Column(name = "available_start_date", nullable = false)
    private LocalDate availableStartDate;

    public JobApplication() {
        this.applicants = new ArrayList<>();
    }

    public JobApplication(LocalDate applyDate, JobStatusEnum status, List<UserSkillset> userSkills, JobPosting jobPosting, LocalDate availableStartDate) {
        this.applyDate = applyDate;
        this.status = status;
        this.userSkills = userSkills;
        this.jobPosting = jobPosting;
        this.availableStartDate = availableStartDate;
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
