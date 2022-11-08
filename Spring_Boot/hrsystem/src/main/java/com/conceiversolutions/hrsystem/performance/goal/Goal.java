package com.conceiversolutions.hrsystem.performance.goal;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.conceiversolutions.hrsystem.performance.achievement.Achievement;
import com.conceiversolutions.hrsystem.user.user.User;

@Entity
@Table(name = "goals")
public class Goal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "goal_id")
    private Long goalId;
    private String type;
    private LocalDate created;
    private String description;
    private String year;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "employee")
    private User employee;

    @OneToMany(fetch = FetchType.LAZY)
    private List<Achievement> achievements;

    public Goal() {

    }

    public Goal(String type, LocalDate created, String description, String year, User employee, List<Achievement> achievements) {
        this.type = type;
        this.created = created;
        this.description = description;
        this.year = year;
        this.employee = employee;
        this.achievements = achievements;
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

    public LocalDate getCreated() {
        return created;
    }

    public void setCreated(LocalDate created) {
        this.created = created;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public User getEmployee() {
        return employee;
    }

    public void setEmployee(User employee) {
        this.employee = employee;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Achievement> getAchievements() {
        return achievements;
    }

    public void setAchievements(List<Achievement> achievements) {
        this.achievements = achievements;
    }

    @java.lang.Override
    public java.lang.String toString() {
        return "Goal{" +
                "goalId=" + goalId +
                ", type='" + type + '\'' +
                ", created=" + created +
                ", description='" + description + '\'' +
                ", employee=" + employee +
                ", achievements=" + achievements +
                '}';
    }
}