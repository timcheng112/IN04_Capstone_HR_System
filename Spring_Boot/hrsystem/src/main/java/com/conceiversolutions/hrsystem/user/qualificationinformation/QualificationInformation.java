package com.conceiversolutions.hrsystem.user.qualificationinformation;

import com.conceiversolutions.hrsystem.enums.EducationEnum;
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
    @Column(name = "personal_statement",nullable = true)
    private String personalStatement;
    @Column(name = "languages_spoken", nullable = false)
    @ElementCollection(fetch = FetchType.LAZY, targetClass = String.class)
    private List<String> languagesSpoken;
    @Column(name = "bank_acc_no", nullable = true, length = 32)
    private String bankAccNo;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "qualificationInformation", targetEntity = WorkExperience.class)
    @Column(name = "work_experiences")
    private List<WorkExperience> workExperiences;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "qualificationInformation", targetEntity = Recommendation.class)
    @Column(name = "recommendations")
    private List<Recommendation> recommendations;
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "qualificationInformation")
    private User user;
    @OneToMany(fetch = FetchType.LAZY, targetEntity = UserSkillset.class)
    @JoinColumn(name = "info_id")
    private List<UserSkillset> userSkills;

    public QualificationInformation() {
    }

    public QualificationInformation(User user) {
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

    public String getBankAccNo() {
        return bankAccNo;
    }

    public void setBankAccNo(String bankAccNo) {
        this.bankAccNo = bankAccNo;
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

    @Override
    public String toString() {
        return "QualificationInformation{" +
                "infoId=" + infoId +
                ", personalStatement='" + personalStatement + '\'' +
                '}';
    }
}
