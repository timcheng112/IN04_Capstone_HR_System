package com.conceiversolutions.hrsystem.user.workexperience;

import com.conceiversolutions.hrsystem.user.qualificationinformation.QualificationInformation;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "work_experiences")
public class WorkExperience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "experience_id")
    private Long experienceId;
    @Column(name = "position_name", nullable = false, length = 64)
    private String positionName;
    @Column(name = "company_name", nullable = false, length = 64)
    private String companyName;
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;
    @Column(name = "end_date", nullable = true)
    private LocalDate endDate;
    @Column(name = "currently_working", nullable = false)
    private Boolean currentlyWorking;
    @Column(name = "description", nullable = false)
    private String description;
    @ManyToOne(optional = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "qualification_information")
    private QualificationInformation qualificationInformation;

    public WorkExperience() {
    }

    public WorkExperience(String positionName, String companyName, LocalDate startDate, LocalDate endDate, Boolean currentlyWorking, String description) {
        this.positionName = positionName;
        this.companyName = companyName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.currentlyWorking = currentlyWorking;
        this.description = description;
    }

    public WorkExperience(Long experienceId, String positionName, String companyName, LocalDate startDate, LocalDate endDate, Boolean currentlyWorking, String description) {
        this.experienceId = experienceId;
        this.positionName = positionName;
        this.companyName = companyName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.currentlyWorking = currentlyWorking;
        this.description = description;
    }

    public Long getExperienceId() {
        return experienceId;
    }

    public void setExperienceId(Long experienceId) {
        this.experienceId = experienceId;
    }

    public String getPositionName() {
        return positionName;
    }

    public void setPositionName(String positionName) {
        this.positionName = positionName;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Boolean getCurrentlyWorking() {
        return currentlyWorking;
    }

    public void setCurrentlyWorking(Boolean currentlyWorking) {
        this.currentlyWorking = currentlyWorking;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public QualificationInformation getQualificationInformation() {
        return qualificationInformation;
    }

    public void setQualificationInformation(QualificationInformation qualificationInformation) {
        this.qualificationInformation = qualificationInformation;
    }

    @Override
    public String toString() {
        return "WorkExperience{" +
                "experienceId=" + experienceId +
                ", positionName='" + positionName + '\'' +
                ", companyName='" + companyName + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", currentlyWorking=" + currentlyWorking +
                ", description='" + description + '\'' +
                '}';
    }
}