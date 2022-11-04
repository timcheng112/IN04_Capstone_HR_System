package com.conceiversolutions.hrsystem.performance.appraisal;

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

import com.conceiversolutions.hrsystem.user.user.User;

@Entity
@Table(name = "appraisals")
public class Appraisal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "appraisal_id")
    private Long appraisalId;
    @Column(name = "appraisal_year")
    private String appraisalYear;
    @Column(name = "start_date")
    private LocalDate startDate;
    @Column(name = "end_date")
    private LocalDate endDate;
    private String strengths;
    private String weaknesses;
    private Integer rating;
    private Boolean promotion;
    @Column(name = "promotion_justification")
    private String promotionJustification;
    private Boolean submitted;

    //i think we need to store it either in teams or user. 

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "employee")
    private User employee;
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "managerAppraising")
    private User managerAppraising;

    public Appraisal() {

    }

    public Appraisal(String appraisalYear, LocalDate startDate, LocalDate endDate, String strengths, String weaknesses,
                     Integer rating, Boolean promotion, String promotionJustification, Boolean submitted, User employee,
                     User managerAppraising) {
        this.appraisalYear = appraisalYear;
        this.startDate = startDate;
        this.endDate = endDate;
        this.strengths = strengths;
        this.weaknesses = weaknesses;
        this.rating = rating;
        this.promotion = promotion;
        this.promotionJustification = promotionJustification;
        this.submitted = submitted;
        this.employee = employee;
        this.managerAppraising = managerAppraising;
    }

    public Long getAppraisalId() {
        return appraisalId;
    }

    public void setAppraisalId(Long appraisalId) {
        this.appraisalId = appraisalId;
    }

    public String getAppraisalYear() {
        return appraisalYear;
    }

    public void setAppraisalYear(String appraisalYear) {
        this.appraisalYear = appraisalYear;
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

    public String getStrengths() {
        return strengths;
    }

    public void setStrengths(String strengths) {
        this.strengths = strengths;
    }

    public String getWeaknesses() {
        return weaknesses;
    }

    public void setWeaknesses(String weaknesses) {
        this.weaknesses = weaknesses;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public Boolean getPromotion() {
        return promotion;
    }

    public void setPromotion(Boolean promotion) {
        this.promotion = promotion;
    }

    public String getPromotionJustification() {
        return promotionJustification;
    }

    public void setPromotionJustification(String promotionJustification) {
        this.promotionJustification = promotionJustification;
    }

    public Boolean getSubmitted() {
        return submitted;
    }

    public void setSubmitted(Boolean submitted) {
        this.submitted = submitted;
    }

    public User getEmployee() {
        return employee;
    }

    public void setEmployee(User employee) {
        this.employee = employee;
    }

    public User getManagerAppraising() {
        return managerAppraising;
    }

    public void setManagerAppraising(User managerAppraising) {
        this.managerAppraising = managerAppraising;
    }

    @Override
    public String toString() {
        return "Appraisal{" +
                "appraisalId=" + appraisalId +
                ", appraisalYear='" + appraisalYear + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", strengths='" + strengths + '\'' +
                ", weaknesses='" + weaknesses + '\'' +
                ", rating=" + rating +
                ", promotion=" + promotion +
                ", promotionJustification='" + promotionJustification + '\'' +
                ", submitted=" + submitted +
                '}';
    }
}