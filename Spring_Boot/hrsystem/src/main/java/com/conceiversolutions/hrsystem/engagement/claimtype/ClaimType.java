package com.conceiversolutions.hrsystem.engagement.claimtype;

import javax.persistence.*;

@Entity
@Table(name="claim_type")
public class ClaimType {

    //attributes

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    @Column(name="claim_type_id")
    private Long claimTypeId;
    @Column(name="claim_type_desc")
    private String description;
    @Column(name="claim_limit")
    private Integer claimLimit;

    //relationships

    //constructors
    public ClaimType() {
    }

    public ClaimType(String description, Integer claimLimit) {
        this.description = description;
        this.claimLimit = claimLimit;
    }

    //getters and setters

    public Long getClaimTypeId() {
        return claimTypeId;
    }

    public void setClaimTypeId(Long claimTypeId) {
        this.claimTypeId = claimTypeId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getClaimLimit() {
        return claimLimit;
    }

    public void setClaimLimit(Integer claimLimit) {
        this.claimLimit = claimLimit;
    }

    @Override
    public String toString() {
        return "ClaimType{" +
                "claimTypeId=" + claimTypeId +
                ", description='" + description + '\'' +
                ", claimLimit=" + claimLimit +
                '}';
    }
}
