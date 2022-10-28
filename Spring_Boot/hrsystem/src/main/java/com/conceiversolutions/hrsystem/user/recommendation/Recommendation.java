package com.conceiversolutions.hrsystem.user.recommendation;

import com.conceiversolutions.hrsystem.user.qualificationinformation.QualificationInformation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
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
    public Recommendation() {
    }

    public Recommendation(String name, Integer phone, String email, String relationship) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.relationship = relationship;
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
