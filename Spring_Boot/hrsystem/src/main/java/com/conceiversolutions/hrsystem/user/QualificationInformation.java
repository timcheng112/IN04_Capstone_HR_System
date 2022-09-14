package com.conceiversolutions.hrsystem.user;

import com.conceiversolutions.hrsystem.enums.EducationEnum;

import java.util.List;

public class QualificationInformation {
    private Long infoId;
    private byte[] cv;
    private EducationEnum highestEducation;
    private String personalStatement;
    private List<String> languagesSpoken;
    private String bankAccNo;

    private List<WorkExperience> workExperiences;
    private List<Recommendation> recommendations;

    public QualificationInformation() {
    }

    public QualificationInformation(byte[] cv, EducationEnum highestEducation, String personalStatement, List<String> languagesSpoken, String bankAccNo, List<WorkExperience> workExperiences, List<Recommendation> recommendations) {
        this.cv = cv;
        this.highestEducation = highestEducation;
        this.personalStatement = personalStatement;
        this.languagesSpoken = languagesSpoken;
        this.bankAccNo = bankAccNo;
        this.workExperiences = workExperiences;
        this.recommendations = recommendations;
    }

    public QualificationInformation(Long infoId, byte[] cv, EducationEnum highestEducation, String personalStatement, List<String> languagesSpoken, String bankAccNo, List<WorkExperience> workExperiences, List<Recommendation> recommendations) {
        this.infoId = infoId;
        this.cv = cv;
        this.highestEducation = highestEducation;
        this.personalStatement = personalStatement;
        this.languagesSpoken = languagesSpoken;
        this.bankAccNo = bankAccNo;
        this.workExperiences = workExperiences;
        this.recommendations = recommendations;
    }

    public Long getInfoId() {
        return infoId;
    }

    public void setInfoId(Long infoId) {
        this.infoId = infoId;
    }

    public byte[] getCv() {
        return cv;
    }

    public void setCv(byte[] cv) {
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

    @Override
    public String toString() {
        return "QualificationInformation{" +
                "infoId=" + infoId +
                ", highestEducation=" + highestEducation +
                ", personalStatement='" + personalStatement + '\'' +
                '}';
    }
}
