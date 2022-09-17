package com.conceiversolutions.hrsystem.jobManagement;

import com.conceiversolutions.hrsystem.enums.JobStatusEnum;
import com.conceiversolutions.hrsystem.skillset.JobSkillset;
import com.conceiversolutions.hrsystem.user.User;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name="jobRequests")
public class JobRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long requestId;
    @Column(nullable = false, length = 64)
    private String jobTitle;
    @Column(nullable = false, length = 255)
    private String jobDescription;
    @Column(nullable = false, length = 255)
    private String reason;
    @Column(nullable = false)
    private LocalDate requestDate;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private JobStatusEnum status;

    @ManyToOne(optional = false, targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "requestorId")
    private User requestedBy;
    @OneToMany(fetch = FetchType.LAZY, targetEntity = JobSkillset.class)
    @JoinColumn(name = "jobSkillsetId", referencedColumnName = "requestId")
    private List<JobSkillset> jobRequirements;

//    TODO
//    private Department department;

    public JobRequest() {
    }

    public JobRequest(Long requestId, String jobTitle, String jobDescription, String reason, LocalDate requestDate, JobStatusEnum status, User requestedBy, List<JobSkillset> jobRequirements) {
        this.requestId = requestId;
        this.jobTitle = jobTitle;
        this.jobDescription = jobDescription;
        this.reason = reason;
        this.requestDate = requestDate;
        this.status = status;
        this.requestedBy = requestedBy;
        this.jobRequirements = jobRequirements;
    }

    public Long getRequestId() {
        return requestId;
    }

    public void setRequestId(Long requestId) {
        this.requestId = requestId;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getJobDescription() {
        return jobDescription;
    }

    public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public LocalDate getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(LocalDate requestDate) {
        this.requestDate = requestDate;
    }

    public JobStatusEnum getStatus() {
        return status;
    }

    public void setStatus(JobStatusEnum status) {
        this.status = status;
    }

    public User getRequestedBy() {
        return requestedBy;
    }

    public void setRequestedBy(User requestedBy) {
        this.requestedBy = requestedBy;
    }

    public List<JobSkillset> getJobRequirements() {
        return jobRequirements;
    }

    public void setJobRequirements(List<JobSkillset> jobRequirements) {
        this.jobRequirements = jobRequirements;
    }

    @Override
    public String toString() {
        return "JobRequest{" +
                "requestId=" + requestId +
                ", jobTitle='" + jobTitle + '\'' +
                ", jobDescription='" + jobDescription + '\'' +
                ", requestedBy=" + requestedBy +
                '}';
    }
}
