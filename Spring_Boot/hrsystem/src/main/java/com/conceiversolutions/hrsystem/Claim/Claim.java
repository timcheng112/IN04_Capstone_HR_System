package com.conceiversolutions.hrsystem.Claim;

import com.conceiversolutions.hrsystem.ClaimType.ClaimType;
import com.conceiversolutions.hrsystem.Enums.ApprovalStatus;

import javax.persistence.*;
import java.sql.Blob;
import java.time.LocalDate;

@Entity
@Table
public class Claim {

    //note: when creating a claim, need to ensure the new claim doesn't break the claim limit.

    //attributes
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    @Column(name="claim id")
    private Long claimId;
    @Column(name="claim_date")
    private LocalDate claimDate;
    @Column(name="claim_description")
    private String description;
    @Column(name="claim_remarks")
    private String remarks;
    @Column(name="claim_supporting_docs")
    private Blob supportingDocs;
    @Column(name="approval_status")
    private ApprovalStatus approvalStatus;
    @Column(name="approval_remarks")
    private String approvalRemarks;

    //relationships
    @ManyToOne
    @JoinColumn(name="claim_type")
    private ClaimType claimType;

    //constructors

    public Claim() {
    }

    public Claim(LocalDate claimDate, String description, String remarks, Blob supportingDocs, ApprovalStatus approvalStatus, String approvalRemarks) {
        this.claimDate = claimDate;
        this.description = description;
        this.remarks = remarks;
        this.supportingDocs = supportingDocs;
        this.approvalStatus = approvalStatus;
        this.approvalRemarks = approvalRemarks;
    }

    public Claim(LocalDate claimDate, String description, String remarks, Blob supportingDocs) {
        this.claimDate = claimDate;
        this.description = description;
        this.remarks = remarks;
        this.supportingDocs = supportingDocs;
    }

    //getters and setters

    public Long getClaimId() {
        return claimId;
    }

    public void setClaimId(Long claimId) {
        this.claimId = claimId;
    }

    public LocalDate getClaimDate() {
        return claimDate;
    }

    public void setClaimDate(LocalDate claimDate) {
        this.claimDate = claimDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public Blob getSupportingDocs() {
        return supportingDocs;
    }

    public void setSupportingDocs(Blob supportingDocs) {
        this.supportingDocs = supportingDocs;
    }

    public ApprovalStatus getClaimStatus() {
        return approvalStatus;
    }

    public void setClaimStatus(ApprovalStatus approvalStatus) {
        this.approvalStatus = approvalStatus;
    }

    public String getApprovalRemarks() {
        return approvalRemarks;
    }

    public void setApprovalRemarks(String approvalRemarks) {
        this.approvalRemarks = approvalRemarks;
    }

    @Override
    public String toString() {
        return "Claim{" +
                "claimId=" + claimId +
                ", claimDate=" + claimDate +
                ", description='" + description + '\'' +
                ", remarks='" + remarks + '\'' +
                ", supportingDocs=" + supportingDocs +
                ", claimStatus=" + approvalStatus +
                ", approvalRemarks='" + approvalRemarks + '\'' +
                '}';
    }
}
