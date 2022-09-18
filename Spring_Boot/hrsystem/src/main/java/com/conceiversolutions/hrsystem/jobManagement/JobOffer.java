package com.conceiversolutions.hrsystem.jobManagement;

import com.conceiversolutions.hrsystem.user.Position;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name="jobOffers")
public class JobOffer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long offerId;
    @Column(nullable = false)
    private LocalDate offerDate;
    @Column(nullable = false)
    private BigDecimal payOffered;

    @OneToOne(fetch = FetchType.LAZY, optional = false, targetEntity = Position.class)
    private Position position;
    @OneToOne(fetch = FetchType.LAZY, optional = false, targetEntity = JobApplication.class)
    private JobApplication application;

    public JobOffer(Long offerId, LocalDate offerDate, BigDecimal payOffered, Position position, JobApplication application) {
        this.offerId = offerId;
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
