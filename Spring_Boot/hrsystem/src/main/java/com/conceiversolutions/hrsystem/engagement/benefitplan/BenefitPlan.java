package com.conceiversolutions.hrsystem.engagement.benefitplan;

import com.conceiversolutions.hrsystem.engagement.benefittype.BenefitType;
import com.conceiversolutions.hrsystem.enums.BenefitTypeEnum;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name = "benefit_plans")
public class BenefitPlan {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    @Column(name="benefit_plan_id")
    private Long benefitPlanId;
    @Column(name = "description")
    private String description;
    @Column(name = "plan_name")
    private String planName;
    @Column(name = "plan_amount")
    private BigDecimal planAmount;
    @Column(name = "start_date")
    private LocalDate startDate;
    @Column(name = "end_date")
    private LocalDate endDate;
    @Column(name = "is_active")
    private Boolean isActive;

//    @ManyToOne(optional = false, targetEntity = BenefitType.class, fetch = FetchType.LAZY)
//    private BenefitType planType;
    @Enumerated(EnumType.STRING)
    private BenefitTypeEnum planType;

    public BenefitPlan() {
    }

    public BenefitPlan(String description, String planName, BigDecimal planAmount, LocalDate startDate, LocalDate endDate, BenefitTypeEnum planType) {
        this.description = description;
        this.planName = planName;
        this.planAmount = planAmount;
        this.startDate = startDate;
        this.endDate = endDate;
        this.planType = planType;
        this.isActive = true;
    }
}
