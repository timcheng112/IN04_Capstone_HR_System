package com.conceiversolutions.hrsystem.performance.review;

import java.time.LocalDate;

import javax.persistence.*;

@Entity
@Table(name = "reviews")
public class ManagerReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Long reviewId;
    private String year;
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

    public ManagerReview() {

    }

    public ManagerReview(String year, LocalDate startDate, LocalDate endDate,
                         String strengths, String weaknesses, Integer rating,
                         Boolean promotion, String promotionJustification, Boolean submitted) {
        this.year = year;
        this.startDate = startDate;
        this.endDate = endDate;
        this.strengths = strengths;
        this.weaknesses = weaknesses;
        this.rating = rating;
        this.promotion = promotion;
        this.promotionJustification = promotionJustification;
        this.submitted = submitted;
    }

    public Long getReviewId() {
        return reviewId;
    }

    public void setReviewId(Long reviewId) {
        this.reviewId = reviewId;
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

    @Override
    public String toString() {
        return "ManagerReview{" +
                "reviewId=" + reviewId +
                ", year='" + year + '\'' +
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
