package com.conceiversolutions.hrsystem.performance.appraisalPeriod;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "appraisal_period")
public class AppraisalPeriod {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "appraisal_period_id")
    private Long appraisalPeriodId;
    private String year;
    @Column(name = "start_date")
    private LocalDate startDate;
    @Column(name = "end_date")
    private LocalDate endDate;

    public AppraisalPeriod() {

    }

    public AppraisalPeriod(String year, LocalDate startDate, LocalDate endDate) {
        this.year = year;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Long getAppraisalPeriodId() {
        return appraisalPeriodId;
    }

    public void setAppraisalPeriodId(Long appraisalPeriodId) {
        this.appraisalPeriodId = appraisalPeriodId;
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
        return "AppraisalPeriod{" +
                "appraisalPeriodId=" + appraisalPeriodId +
                ", year='" + year + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                '}';
    }
}
