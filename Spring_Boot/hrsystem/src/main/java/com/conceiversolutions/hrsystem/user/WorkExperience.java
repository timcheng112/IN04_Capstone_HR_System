package com.conceiversolutions.hrsystem.user;

import java.time.LocalDate;

public class WorkExperience {
    private Long experienceId;
    private String positionName;
    private String companyName;
    private LocalDate startDate;
    private LocalDate endDate;
    private Boolean currentlyWorking;
    private String description;

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
