package com.conceiversolutions.hrsystem.performance.reviewPeriod;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "review_period")
public class ReviewPeriod {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_period_id")
    private Long reviewPeriodId;
    private String year;
    @Column(name = "start_date")
    private LocalDate startDate;
    @Column(name = "end_date")
    private LocalDate endDate;

    public ReviewPeriod() {

    }

    public ReviewPeriod(String year, LocalDate startDate, LocalDate endDate) {
        this.year = year;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Long getReviewPeriodId() {
        return reviewPeriodId;
    }

    public void setReviewPeriodId(Long reviewPeriodId) {
        this.reviewPeriodId = reviewPeriodId;
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
        return "ReviewPeriod{" +
                "reviewPeriodId=" + reviewPeriodId +
                ", year='" + year + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                '}';
    }
}
