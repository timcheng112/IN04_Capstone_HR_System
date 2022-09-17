package com.conceiversolutions.hrsystem.ClaimType;

import com.conceiversolutions.hrsystem.Claim.Claim;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table
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
    private int claimLimit;

    //relationships
    @OneToMany(mappedBy = "claimType")
    private List<Claim> claims;

    //constructors
    public ClaimType() {
        claims= new ArrayList<>();
    }

    public ClaimType(String description, int claimLimit) {
        this.description = description;
        this.claimLimit = claimLimit;
        claims = new ArrayList<>();
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

    public int getClaimLimit() {
        return claimLimit;
    }

    public void setClaimLimit(int claimLimit) {
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
