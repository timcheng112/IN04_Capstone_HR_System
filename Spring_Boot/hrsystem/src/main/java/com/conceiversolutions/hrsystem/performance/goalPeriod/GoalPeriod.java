package com.conceiversolutions.hrsystem.performance.goalPeriod;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "goal_periods")
public class GoalPeriod {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "goal_period_id")
    private Long goalPeriodId;
    private String year;
    @Column(name = "start_date")
    private LocalDate startDate;
    @Column(name = "end_date")
    private LocalDate endDate;

    public GoalPeriod() {

    }

    public GoalPeriod(Long goalPeriodId, String year, LocalDate startDate, LocalDate endDate) {
        this.goalPeriodId = goalPeriodId;
        this.year = year;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Long getGoalPeriodId() {
        return goalPeriodId;
    }

    public void setGoalPeriodId(Long goalPeriodId) {
        this.goalPeriodId = goalPeriodId;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
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

    @java.lang.Override
    public java.lang.String toString() {
        return "GoalPeriod{" +
                "goalPeriodId=" + goalPeriodId +
                ", year='" + year + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                '}';
    }
}
