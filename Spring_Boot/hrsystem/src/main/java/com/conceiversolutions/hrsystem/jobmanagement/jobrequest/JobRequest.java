package com.conceiversolutions.hrsystem.jobmanagement.jobrequest;

import com.conceiversolutions.hrsystem.enums.JobStatusEnum;
import com.conceiversolutions.hrsystem.skillset.jobskillset.JobSkillset;
import com.conceiversolutions.hrsystem.user.user.User;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name="job_requests")
public class JobRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id")
    private Long requestId;
    @Column(name = "job_title", nullable = false, length = 64)
    private String jobTitle;
    @Column(name = "job_description", nullable = false, length = 255)
    private String jobDescription;
    @Column(name = "reason", nullable = false, length = 255)
    private String reason;
    @Column(name = "request_date", nullable = false)
    private LocalDate requestDate;
    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private JobStatusEnum status;

    @ManyToOne(optional = false, targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User requestedBy;
    @OneToMany(fetch = FetchType.LAZY, targetEntity = JobSkillset.class)
    @JoinColumn(name = "request_id")
    private List<JobSkillset> jobRequirements;

//    TODO add department
//    private Department department;

    public JobRequest() {
    }

    public JobRequest(String jobTitle, String jobDescription, String reason, LocalDate requestDate, JobStatusEnum status, User requestedBy, List<JobSkillset> jobRequirements) {
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
