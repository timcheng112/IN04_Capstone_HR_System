package com.conceiversolutions.hrsystem.user.position;

import com.conceiversolutions.hrsystem.enums.JobTypeEnum;
import com.conceiversolutions.hrsystem.enums.PositionTypeEnum;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "positions")
public class Position {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "position_id")
    private Long positionId;
    @Column(name = "position_name", nullable = false, length = 64)
    private String positionName;
    @Column(name = "description", nullable = false)
    private String description;
    @Column(name = "start_date", nullable = true)
    private LocalDate startDate;
    @Column(name = "end_date", nullable = true)
    private LocalDate endDate;
    @Enumerated(EnumType.STRING)
    @Column(name = "job_type", nullable = false)
    private JobTypeEnum jobType;

    @Enumerated(EnumType.STRING)
    @Column(name = "pos_type", nullable = false)
    private PositionTypeEnum posType;

    public Position() {
    }

    public Position(String positionName, String description, JobTypeEnum jobType, PositionTypeEnum posType) {
        this.positionName = positionName;
        this.description = description;
        this.jobType = jobType;
        this.posType = posType;
    }

    public Position(String positionName, String description, LocalDate startDate, JobTypeEnum jobType) {
        this.positionName = positionName;
        this.description = description;
        this.startDate = startDate;
        this.jobType = jobType;
    }

    public Position(String positionName, String description, LocalDate startDate, JobTypeEnum jobType,
            PositionTypeEnum posType) {
        this.positionName = positionName;
        this.description = description;
        this.startDate = startDate;
        this.jobType = jobType;
        this.posType = posType;
    }

    public Position(String positionName, String description, LocalDate startDate, LocalDate endDate,
            JobTypeEnum jobType, PositionTypeEnum posType) {
        this.positionName = positionName;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.jobType = jobType;
        this.posType = posType;
    }

    public PositionTypeEnum getPosType() {
        return posType;
    }

    public void setPosType(PositionTypeEnum posType) {
        this.posType = posType;
    }

    public Long getPositionId() {
        return positionId;
    }

    public void setPositionId(Long positionId) {
        this.positionId = positionId;
    }

    public String getPositionName() {
        return positionName;
    }

    public void setPositionName(String positionName) {
        this.positionName = positionName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public JobTypeEnum getJobType() {
        return jobType;
    }

    public void setJobType(JobTypeEnum jobType) {
        this.jobType = jobType;
    }

    @Override
    public String toString() {
        return "Position{" +
                "positionId=" + positionId +
                ", positionName='" + positionName + '\'' +
                ", description='" + description + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", jobType=" + jobType +
                ", posType=" + posType +
                '}';
    }
}
