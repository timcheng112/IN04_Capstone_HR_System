package com.conceiversolutions.hrsystem.jobmanagement.joboffer;

import com.conceiversolutions.hrsystem.jobmanagement.jobapplication.JobApplication;
import com.conceiversolutions.hrsystem.user.position.Position;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name="job_offers")
public class JobOffer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "offer_id")
    private Long offerId;
    @Column(name = "offer_date", nullable = false)
    private LocalDate offerDate;
    @Column(name = "pay_offered", nullable = false)
    private BigDecimal payOffered;

    @OneToOne(fetch = FetchType.LAZY, optional = false, targetEntity = Position.class)
    @Column(name = "position")
    private Position position;
    @OneToOne(fetch = FetchType.LAZY, optional = false, targetEntity = JobApplication.class)
    @Column(name = "application")
    private JobApplication application;

    public JobOffer(LocalDate offerDate, BigDecimal payOffered, Position position, JobApplication application) {
        this.offerDate = offerDate;
        this.payOffered = payOffered;
        this.position = position;
        this.application = application;
    }

    public Long getOfferId() {
        return offerId;
    }

    public void setOfferId(Long offerId) {
        this.offerId = offerId;
    }

    public LocalDate getOfferDate() {
        return offerDate;
    }

    public void setOfferDate(LocalDate offerDate) {
        this.offerDate = offerDate;
    }

    public BigDecimal getPayOffered() {
        return payOffered;
    }

    public void setPayOffered(BigDecimal payOffered) {
        this.payOffered = payOffered;
    }

    public Position getPosition() {
        return position;
    }

    public void setPosition(Position position) {
        this.position = position;
    }

    public JobApplication getApplication() {
        return application;
    }

    public void setApplication(JobApplication application) {
        this.application = application;
    }

    @Override
    public String toString() {
        return "JobOffer{" +
                "offerId=" + offerId +
                ", offerDate=" + offerDate +
                ", payOffered=" + payOffered +
                ", position=" + position +
                '}';
    }
}
