package com.conceiversolutions.hrsystem.user.workexperience;

import com.conceiversolutions.hrsystem.user.qualificationinformation.QualificationInformation;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Setter
@Getter
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
