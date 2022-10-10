package com.conceiversolutions.hrsystem.jobmanagement.jobposting;

import com.conceiversolutions.hrsystem.jobmanagement.jobrequest.JobRequest;
import com.conceiversolutions.hrsystem.skillset.jobskillset.JobSkillset;
import com.conceiversolutions.hrsystem.user.user.User;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name="job_postings")
public class JobPosting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "posting_id")
    private Long postingId;
    @Column(name = "job_title", nullable = false, length = 64)
    private String jobTitle;
    @Column(name = "job_description", nullable = false, length = 255)
    private String jobDescription;
    @Column(name = "remuneration", nullable = false, length = 64)
    private String remuneration;
    @Column(name = "post_date", nullable = false)
    private LocalDate postDate;
    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

    @OneToOne(targetEntity = User.class, optional = false, fetch = FetchType.LAZY)
    private User postedBy;
    @OneToOne(targetEntity = JobRequest.class, fetch = FetchType.LAZY, optional = false, mappedBy = "jobPosting")
    private JobRequest jobRequest;
    @OneToMany(fetch = FetchType.LAZY, targetEntity = JobSkillset.class)
    @JoinColumn(name = "posting_id")
    private List<JobSkillset> jobRequirements;

    public JobPosting() {
    }

    public JobPosting(String jobTitle, String jobDescription, String remuneration, LocalDate postDate, Boolean isActive, User postedBy, JobRequest jobRequest, List<JobSkillset> jobRequirements) {
        this.jobTitle = jobTitle;
        this.jobDescription = jobDescription;
        this.remuneration = remuneration;
        this.postDate = postDate;
        this.isActive = isActive;
        this.postedBy = postedBy;
        this.jobRequest = jobRequest;
        this.jobRequirements = jobRequirements;
    }

    public Long getPostingId() {
        return postingId;
    }

    public void setPostingId(Long postingId) {
        this.postingId = postingId;
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

    public String getRemuneration() {
        return remuneration;
    }

    public void setRemuneration(String remuneration) {
        this.remuneration = remuneration;
    }

    public LocalDate getPostDate() {
        return postDate;
    }

    public void setPostDate(LocalDate postDate) {
        this.postDate = postDate;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }

    public User getPostedBy() {
        return postedBy;
    }

    public void setPostedBy(User postedBy) {
        this.postedBy = postedBy;
    }

    public JobRequest getJobRequest() {
        return jobRequest;
    }

    public void setJobRequest(JobRequest jobRequest) {
        this.jobRequest = jobRequest;
    }

    public List<JobSkillset> getJobRequirements() {
        return jobRequirements;
    }

    public void setJobRequirements(List<JobSkillset> jobRequirements) {
        this.jobRequirements = jobRequirements;
    }

    @Override
    public String toString() {
        return "JobPosting{" +
                "postingId=" + postingId +
                ", jobTitle='" + jobTitle + '\'' +
                ", jobDescription='" + jobDescription + '\'' +
                ", remuneration='" + remuneration + '\'' +
                ", postDate=" + postDate +
                ", postedBy=" + postedBy +
                '}';
    }
}
