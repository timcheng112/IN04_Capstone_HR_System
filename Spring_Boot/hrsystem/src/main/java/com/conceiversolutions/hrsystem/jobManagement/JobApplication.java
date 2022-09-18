package com.conceiversolutions.hrsystem.jobManagement;

import com.conceiversolutions.hrsystem.enums.JobStatusEnum;
import com.conceiversolutions.hrsystem.skillset.UserSkillset;
import com.conceiversolutions.hrsystem.user.User;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="jobApplications")
public class JobApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long applicationId;
    @Column(nullable = false)
    private LocalDate applyDate;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private JobStatusEnum status;

    @ManyToOne(optional = false, targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "applicantId")
    private User applicant;
    @OneToMany(fetch = FetchType.LAZY, targetEntity = UserSkillset.class)
    @JoinColumn(name = "userSkillsetId", referencedColumnName = "applicationId")
    private List<UserSkillset> userSkills;
    @OneToOne(targetEntity = JobPosting.class, fetch = FetchType.LAZY, optional = false)
    private JobPosting posting;

    public JobApplication() {
    }

    public JobApplication(Long applicationId, LocalDate applyDate, JobStatusEnum status, User applicant, JobPosting posting) {
        this.applicationId = applicationId;
        this.applyDate = applyDate;
        this.status = status;
        this.applicant = applicant;
        this.posting = posting;
        this.userSkills = new ArrayList<>();
    }

    public JobApplication(Long applicationId, LocalDate applyDate, JobStatusEnum status, User applicant, List<UserSkillset> userSkills, JobPosting posting) {
        this.applicationId = applicationId;
        this.applyDate = applyDate;
        this.status = status;
        this.applicant = applicant;
        this.userSkills = userSkills;
        this.posting = posting;
    }

    public Long getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(Long applicationId) {
        this.applicationId = applicationId;
    }

    public User getApplicant() {
        return applicant;
    }

    public void setApplicant(User applicant) {
        this.applicant = applicant;
    }

    public LocalDate getApplyDate() {
        return applyDate;
    }

    public void setApplyDate(LocalDate applyDate) {
        this.applyDate = applyDate;
    }

    public JobStatusEnum getStatus() {
        return status;
    }

    public void setStatus(JobStatusEnum status) {
        this.status = status;
    }

    public List<UserSkillset> getUserSkills() {
        return userSkills;
    }

    public void setUserSkills(List<UserSkillset> userSkills) {
        this.userSkills = userSkills;
    }

    public JobPosting getPosting() {
        return posting;
    }

    public void setPosting(JobPosting posting) {
        this.posting = posting;
    }

    @Override
    public String toString() {
        return "JobApplication{" +
                "applicationId=" + applicationId +
                ", applicant=" + applicant +
                ", applyDate=" + applyDate +
                ", status=" + status +
                '}';
    }
}
