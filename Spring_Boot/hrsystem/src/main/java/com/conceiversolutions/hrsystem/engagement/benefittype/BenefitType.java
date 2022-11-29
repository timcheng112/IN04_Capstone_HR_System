package com.conceiversolutions.hrsystem.engagement.benefittype;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name="benefit_types")
public class BenefitType {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    @Column(name= "benefit_type_id")
    private Long benefitTypeId;
    @Column(name = "name")
    private String name;

    public BenefitType() {
    }

    public BenefitType(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "BenefitType{" +
                "benefitTypeId=" + benefitTypeId +
                ", name='" + name + '\'' +
                '}';
    }
}
