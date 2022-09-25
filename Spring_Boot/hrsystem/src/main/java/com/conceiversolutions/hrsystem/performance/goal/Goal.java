package com.conceiversolutions.hrsystem.performance.goal;

import java.time.LocalDate;

import javax.persistence.*;

import com.conceiversolutions.hrsystem.user.user.User;

@Entity
@Table(name = "goals")
public class Goal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "goal_id")
    private Long goalId;
    private String type;
    private String year;
    private String achievements;
    @Column(name = "last_modified")
    private LocalDate lastModified;
    private LocalDate created;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "employee")
    private User employee;

    public Goal() {

    }

    public Goal(String type, String year, String achievements, LocalDate lastModified, LocalDate created, User employee) {
        this.type = type;
        this.year = year;
        this.achievements = achievements;
        this.lastModified = lastModified;
        this.created = created;
        this.employee = employee;
    }

    public Long getGoalId() {
        return goalId;
    }

    public void setGoalId(Long goalId) {
        this.goalId = goalId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getAchievements() {
        return achievements;
    }

    public void setAchievements(String achievements) {
        this.achievements = achievements;
    }

    public LocalDate getLastModified() {
        return lastModified;
    }

    public void setLastModified(LocalDate lastModified) {
        this.lastModified = lastModified;
    }

    public LocalDate getCreated() {
        return created;
    }

    public void setCreated(LocalDate created) {
        this.created = created;
    }

    public User getEmployee() {
        return employee;
    }

    public void setEmployee(User employee) {
        this.employee = employee;
    }

    @Override
    public String toString() {
        return "Goal{" +
                "goalId=" + goalId +
                ", type='" + type + '\'' +
                ", year='" + year + '\'' +
                ", achievements='" + achievements + '\'' +
                ", lastModified=" + lastModified +
                ", created=" + created +
                ", employee=" + employee +
                '}';
    }
}