package com.conceiversolutions.hrsystem.user;

import com.conceiversolutions.hrsystem.enums.EducationEnum;
import com.conceiversolutions.hrsystem.skillset.UserSkillset;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name= "qualification_information")
public class QualificationInformation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long infoId;
    @Column(length = 1000)
    private Byte[] cv;
    @Column(nullable = true)
    @Enumerated(EnumType.STRING)
    private EducationEnum highestEducation;
    @Column(nullable = true)
    private String personalStatement;
    @Column(nullable = false)
    @ElementCollection(fetch = FetchType.LAZY, targetClass = String.class)
    private List<String> languagesSpoken;
    @Column(nullable = true, length = 32)
    private String bankAccNo;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "qualificationInformation", targetEntity = WorkExperience.class)
    private List<WorkExperience> workExperiences;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "qualificationInformation", targetEntity = Recommendation.class)
    private List<Recommendation> recommendations;
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "qualificationInformation")
    private User user;
    @OneToMany(fetch = FetchType.LAZY, targetEntity = UserSkillset.class)
    @JoinColumn(name = "userSkillsetId", referencedColumnName = "infoId")
    private List<UserSkillset> userSkills;

    public QualificationInformation() {
        this.languagesSpoken = new ArrayList<String>();
        this.workExperiences = new ArrayList<>();
        this.recommendations = new ArrayList<>();
    }


    public Long getInfoId() {
        return infoId;
    }

    public void setInfoId(Long infoId) {
        this.infoId = infoId;
    }

    public Byte[] getCv() {
        return cv;
    }

    public void setCv(Byte[] cv) {
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

    @Override
    public String toString() {
        return "QualificationInformation{" +
                "infoId=" + infoId +
                ", personalStatement='" + personalStatement + '\'' +
                '}';
    }
}
