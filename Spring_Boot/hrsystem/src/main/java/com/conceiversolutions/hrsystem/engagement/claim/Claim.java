package com.conceiversolutions.hrsystem.engagement.claim;

import java.math.BigDecimal;
import java.sql.Blob;
import java.time.LocalDate;

import javax.persistence.*;

import com.conceiversolutions.hrsystem.engagement.benefitplan.BenefitPlanInstance;
import com.conceiversolutions.hrsystem.engagement.claimtype.ClaimType;
import com.conceiversolutions.hrsystem.enums.StatusEnum;
import com.conceiversolutions.hrsystem.user.docdata.DocData;
import com.conceiversolutions.hrsystem.user.user.User;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "claims")
public class Claim {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    @Column(name = "claim_id")
    private Long claimId;
    @Column(name = "claim_date")
    private LocalDate claimDate;
    @Column(name = "incident_date")
    private LocalDate incidentDate;
    @Column(name = "remarks")
    private String remarks;
    @Column(name = "last_updated")
    private LocalDate lastUpdated;
    @Column(name = "claim_status")
    @Enumerated(EnumType.STRING)
    private StatusEnum claimStatus;
    @Column(name = "claim_amount")
    private BigDecimal claimAmount;

    @OneToOne(targetEntity = DocData.class, fetch = FetchType.LAZY)
    private DocData supportingDocument;
    @ManyToOne(targetEntity = BenefitPlanInstance.class, optional = false, fetch = FetchType.LAZY)
    private BenefitPlanInstance benefitPlanInstance;

    public Claim() {
        this.lastUpdated = LocalDate.now();
        this.claimStatus = StatusEnum.PENDING;
    }

    public Claim(LocalDate claimDate, LocalDate incidentDate, String remarks, BigDecimal claimAmount, BenefitPlanInstance benefitPlanInstance) {
        this();
        this.claimDate = claimDate;
        this.incidentDate = incidentDate;
        this.remarks = remarks;
        this.claimAmount = claimAmount;
        this.benefitPlanInstance = benefitPlanInstance;
    }

    public Claim(LocalDate claimDate, LocalDate incidentDate, String remarks, BigDecimal claimAmount, BenefitPlanInstance benefitPlanInstance, DocData supportingDocument) {
        this(claimDate, incidentDate, remarks, claimAmount, benefitPlanInstance);
        this.supportingDocument = supportingDocument;
    }

    @Override
    public String toString() {
        return "Claim{" +
                "claimId=" + claimId +
                ", claimDate=" + claimDate +
                ", incidentDate=" + incidentDate +
                ", remarks='" + remarks + '\'' +
                ", lastUpdated=" + lastUpdated +
                ", claimStatus=" + claimStatus +
                ", claimAmount=" + claimAmount +
                '}';
    }
}