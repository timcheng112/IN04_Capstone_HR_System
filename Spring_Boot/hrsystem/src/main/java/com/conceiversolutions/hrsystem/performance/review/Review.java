package com.conceiversolutions.hrsystem.performance.review;

import java.time.LocalDate;

import javax.persistence.*;

import com.conceiversolutions.hrsystem.user.user.User;

@Entity
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Long reviewId;
    @Column(name = "review_year")
    private String reviewYear;
    //INCOMPLETE -> IN PROGRESS -> COMPLETED
    private String status;
    private String strengths;
    private String weaknesses;
    private Integer rating;
    private Boolean submitted;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "employeeReviewing")
    private User employeeReviewing;
    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "manager")
    private User manager;

    public Review() {

    }

    public Review(String reviewYear, String status, String strengths, String weaknesses, Integer rating, Boolean submitted, User employeeReviewing, User manager) {
        this.reviewYear = reviewYear;
        this.status = status;
        this.strengths = strengths;
        this.weaknesses = weaknesses;
        this.rating = rating;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @java.lang.Override
    public java.lang.String toString() {
        return "Review{" +
                "reviewId=" + reviewId +
                ", reviewYear='" + reviewYear + '\'' +
                ", status='" + status + '\'' +
                ", strengths='" + strengths + '\'' +
                ", weaknesses='" + weaknesses + '\'' +
                ", rating=" + rating +
                ", submitted=" + submitted +
                ", employeeReviewing=" + employeeReviewing +
                ", manager=" + manager +
                '}';
    }
}