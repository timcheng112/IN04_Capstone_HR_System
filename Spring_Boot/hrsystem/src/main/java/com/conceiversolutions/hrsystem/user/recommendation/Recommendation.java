package com.conceiversolutions.hrsystem.user.recommendation;

import com.conceiversolutions.hrsystem.user.qualificationinformation.QualificationInformation;

import javax.persistence.*;

@Entity
@Table(name = "recommendations")
public class Recommendation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recommendation_id")
    private Long recommendationId;
    @Column(name = "name", nullable = false, length = 64)
    private String name;
    @Column(name = "phone", length = 16)
    private Integer phone;
    @Column(name = "email", nullable = false)
    private String email;
    @Column(name = "relationship", nullable = false, length = 64)
    private String relationship;
    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "qualification_information")
    private QualificationInformation qualificationInformation;

    public Recommendation() {
    }

    public Recommendation(String name, Integer phone, String email, String relationship) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.relationship = relationship;
    }

    public Recommendation(String name, Integer phone, String email, String relationship, QualificationInformation qualificationInformation) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.relationship = relationship;
        this.qualificationInformation = qualificationInformation;
    }

    public Long getRecommendationId() {
        return recommendationId;
    }

    public void setRecommendationId(Long recommendationId) {
        this.recommendationId = recommendationId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPhone() {
        return phone;
    }

    public void setPhone(Integer phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRelationship() {
        return relationship;
    }

    public void setRelationship(String relationship) {
        this.relationship = relationship;
    }

    public QualificationInformation getQualificationInformation() {
        return qualificationInformation;
    }

    public void setQualificationInformation(QualificationInformation qualificationInformation) {
        this.qualificationInformation = qualificationInformation;
    }

    @Override
    public String toString() {
        return "Recommendation{" +
                "recommendationId=" + recommendationId +
                ", name='" + name + '\'' +
                ", phone=" + phone +
                ", email='" + email + '\'' +
                ", relationship='" + relationship + '\'' +
                '}';
    }
}
