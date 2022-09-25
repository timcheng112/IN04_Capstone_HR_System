package com.conceiversolutions.hrsystem.performance.review;

import java.time.LocalDate;

import javax.persistence.*;

import com.conceiversolutions.hrsystem.user.user.User;

@Entity
@Table(name = "reviews")
public class ManagerReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Long reviewId;
    private String reviewYear;
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

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "employeeReviewing")
    private User employeeReviewing;
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "manager")
    private User manager;

    public ManagerReview() {

    }

    public ManagerReview(String reviewYear, LocalDate startDate, LocalDate endDate, String strengths, String weaknesses, Integer rating, Boolean promotion, String promotionJustification, Boolean submitted, User employeeReviewing, User manager) {
        this.reviewYear = reviewYear;
        this.startDate = startDate;
        this.endDate = endDate;
        this.strengths = strengths;
        this.weaknesses = weaknesses;
        this.rating = rating;
        this.promotion = promotion;
        this.promotionJustification = promotionJustification;
        this.submitted = submitted;
        this.employeeReviewing = employeeReviewing;
        this.manager = manager;
    }

    public Long getReviewId() {
        return reviewId;
    }

    public void setReviewId(Long reviewId) {
        this.reviewId = reviewId;
    }

    public String getReviewYear() {
        return reviewYear;
    }

    public void setReviewYear(String reviewYear) {
        this.reviewYear = reviewYear;
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

    public User getEmployeeReviewing() {
        return employeeReviewing;
    }

    public void setEmployeeReviewing(User employeeReviewing) {
        this.employeeReviewing = employeeReviewing;
    }

    public User getManager() {
        return manager;
    }

    public void setManager(User manager) {
        this.manager = manager;
    }

    @Override
    public String toString() {
        return "ManagerReview{" +
                "reviewId=" + reviewId +
                ", reviewYear='" + reviewYear + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", strengths='" + strengths + '\'' +
                ", weaknesses='" + weaknesses + '\'' +
                ", rating=" + rating +
                ", promotion=" + promotion +
                ", promotionJustification='" + promotionJustification + '\'' +
                ", submitted=" + submitted +
                ", employeeReviewing=" + employeeReviewing +
                ", manager=" + manager +
                '}';
    }
}