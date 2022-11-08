package com.conceiversolutions.hrsystem.performance.achievement;

import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.conceiversolutions.hrsystem.performance.goal.Goal;

@Entity
@Table(name = "achievements")
public class Achievement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "achievement_id")
    private Long achievementId;
    private LocalDate created;
    @Column(name = "last_modified")
    private LocalDate lastModified;
    private String description;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = Goal.class)
    @JoinColumn(name = "goal")
    private Goal employeeGoal;

    public Achievement() {

    }

    public Achievement(LocalDate created, LocalDate lastModified, String description, Goal employeeGoal) {
        this.created = created;
        this.lastModified = lastModified;
        this.description = description;
        this.employeeGoal = employeeGoal;
    }

    public Long getAchievementId() {
        return achievementId;
    }

    public void setAchievementId(Long achievementId) {
        this.achievementId = achievementId;
    }

    public LocalDate getCreated() {
        return created;
    }

    public void setCreated(LocalDate created) {
        this.created = created;
    }

    public LocalDate getLastModified() {
        return lastModified;
    }

    public void setLastModified(LocalDate lastModified) {
        this.lastModified = lastModified;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Goal getEmployeeGoal() {
        return employeeGoal;
    }

    public void setEmployeeGoal(Goal employeeGoal) {
        this.employeeGoal = employeeGoal;
    }

    @java.lang.Override
    public java.lang.String toString() {
        return "Achievement{" +
                "achievementId=" + achievementId +
                ", created=" + created +
                ", lastModified=" + lastModified +
                ", description='" + description + '\'' +
                ", employeeGoal=" + employeeGoal +
                '}';
    }
}
