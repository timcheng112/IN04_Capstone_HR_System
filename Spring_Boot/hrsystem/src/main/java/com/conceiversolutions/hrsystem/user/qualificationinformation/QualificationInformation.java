package com.conceiversolutions.hrsystem.user.qualificationinformation;

import com.conceiversolutions.hrsystem.enums.EducationEnum;
import com.conceiversolutions.hrsystem.jobmanagement.jobposting.JobPosting;
import com.conceiversolutions.hrsystem.skillset.userskillset.UserSkillset;
import com.conceiversolutions.hrsystem.user.docdata.DocData;
import com.conceiversolutions.hrsystem.user.recommendation.Recommendation;
import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.workexperience.WorkExperience;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name= "qualification_information")
public class QualificationInformation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "info_id")
    private Long infoId;
    @OneToOne(fetch = FetchType.LAZY, targetEntity = DocData.class)
    @JoinColumn(name = "cv")
    private DocData cv;
    @Column(name = "highest_education",nullable = true)
    @Enumerated(EnumType.STRING)
    private EducationEnum highestEducation;
    @Column(name = "school_name", nullable = true, length = 100)
    private String schoolName;
    @Column(name = "school_grad_year", nullable = true)
    private Integer schoolGradYear;
    @Column(name = "personal_statement",nullable = true)
    private String personalStatement;
    @Column(name = "languages_spoken", nullable = false)
    @ElementCollection(fetch = FetchType.LAZY, targetClass = String.class)
    private List<String> languagesSpoken;

    @OneToMany(fetch = FetchType.LAZY, targetEntity = WorkExperience.class)
    @JoinColumn(name = "work_experience_id")
    private List<WorkExperience> workExperiences;
    @OneToMany(fetch = FetchType.LAZY, targetEntity = Recommendation.class)
    @JoinColumn(name = "recommendation_list_id")
    private List<Recommendation> recommendations;
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "qualificationInformation")
    private User user;
    @OneToMany(fetch = FetchType.LAZY, targetEntity = UserSkillset.class)
    @JoinColumn(name = "info_id")
    private List<UserSkillset> userSkills;
    @OneToOne(fetch = FetchType.LAZY, targetEntity = DocData.class)
    @JoinColumn(name = "cover_letter")
    private DocData coverLetter;
    @OneToOne(fetch = FetchType.LAZY, targetEntity = DocData.class)
    @JoinColumn(name = "transcript")
    private DocData transcript;
    @OneToMany(fetch = FetchType.LAZY, targetEntity = JobPosting.class)
    @JoinColumn(name = "bookmarked_posting_id")
    private List<JobPosting> bookmarks;

    public QualificationInformation() {
        this.languagesSpoken = new ArrayList<>();
        this.recommendations = new ArrayList<>();
        this.workExperiences = new ArrayList<>();
        this.userSkills = new ArrayList<>();
        this.bookmarks = new ArrayList<>();
    }

    public QualificationInformation(User user) {
        this();
        this.user = user;
        this.languagesSpoken = new ArrayList<>();
        this.workExperiences = new ArrayList<>();
        this.recommendations = new ArrayList<>();
        this.userSkills = new ArrayList<>();
    }

    public Long getInfoId() {
        return infoId;
    }

    public void setInfoId(Long infoId) {
        this.infoId = infoId;
    }

    public DocData getCv() {
        return cv;
    }

    public void setCv(DocData cv) {
        this.cv = cv;
    }

    public EducationEnum getHighestEducation() {
        return highestEducation;
    }

    public void setHighestEducation(EducationEnum highestEducation) {
        this.highestEducation = highestEducation;
    }

    public String getPersonalStatement() {
        return personalStatement;
    }

    public void setPersonalStatement(String personalStatement) {
        this.personalStatement = personalStatement;
    }

    public List<String> getLanguagesSpoken() {
        return languagesSpoken;
    }

    public void setLanguagesSpoken(List<String> languagesSpoken) {
        this.languagesSpoken = languagesSpoken;
    }

    public List<WorkExperience> getWorkExperiences() {
        return workExperiences;
    }

    public void setWorkExperiences(List<WorkExperience> workExperiences) {
        this.workExperiences = workExperiences;
    }

    public List<Recommendation> getRecommendations() {
        return recommendations;
    }

    public void setRecommendations(List<Recommendation> recommendations) {
        this.recommendations = recommendations;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<UserSkillset> getUserSkills() {
        return userSkills;
    }

    public void setUserSkills(List<UserSkillset> userSkills) {
        this.userSkills = userSkills;
    }

    public DocData getCoverLetter() {
        return coverLetter;
    }

    public void setCoverLetter(DocData coverLetter) {
        this.coverLetter = coverLetter;
    }

    public DocData getTranscript() {
        return transcript;
    }

    public void setTranscript(DocData transcript) {
        this.transcript = transcript;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }

    public Integer getSchoolGradYear() {
        return schoolGradYear;
    }

    public void setSchoolGradYear(Integer schoolGradYear) {
        this.schoolGradYear = schoolGradYear;
    }

    public List<JobPosting> getBookmarks() {
        return bookmarks;
    }

    public void setBookmarks(List<JobPosting> bookmarks) {
        this.bookmarks = bookmarks;
    }

    public List<JobPosting> addBookmark(JobPosting newBookmark) {
        this.bookmarks.add(newBookmark);
        return this.bookmarks;
    }

    public List<JobPosting> removeBookmark(JobPosting oldBookmark) {
        this.bookmarks.remove(oldBookmark);
        return this.bookmarks;
    }

    @Override
    public String toString() {
        return "QualificationInformation{" +
                "infoId=" + infoId +
                ", personalStatement='" + personalStatement + '\'' +
                '}';
    }
}
