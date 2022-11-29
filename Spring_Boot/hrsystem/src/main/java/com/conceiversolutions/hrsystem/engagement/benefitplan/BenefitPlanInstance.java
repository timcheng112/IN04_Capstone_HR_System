package com.conceiversolutions.hrsystem.engagement.benefitplan;

import com.conceiversolutions.hrsystem.engagement.claim.Claim;
import com.conceiversolutions.hrsystem.user.user.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "benefit_plan_instances")
public class BenefitPlanInstance {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    @Column(name="benefit_plan_instance_id")
    private Long benefitPlanInstanceId;
    @Column(name = "remaining_amount")
    private BigDecimal remainingAmount;
    @Column(name = "is_active")
    private Boolean isActive;
    @Column(name = "enrol_date")
    private LocalDate enrolDate;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = BenefitPlan.class, optional = false)
    private BenefitPlan benefitPlan;
    @OneToMany(targetEntity = Claim.class, fetch = FetchType.LAZY, mappedBy = "benefitPlanInstance")
    private List<Claim> claims;
    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class, optional = false)
    private User planOwner;

    public BenefitPlanInstance() {
        this.claims = new ArrayList<>();
        this.enrolDate = LocalDate.now();
    }

    public BenefitPlanInstance(BigDecimal remainingAmount, BenefitPlan benefitPlan, User planOwner) {
        this();
        this.remainingAmount = remainingAmount;
        this.benefitPlan = benefitPlan;
        this.planOwner = planOwner;
        this.isActive = true;
    }

    @Override
    public String toString() {
        return "BenefitPlanInstance{" +
                "benefitPlanInstanceId=" + benefitPlanInstanceId +
                ", remainingAmount=" + remainingAmount +
                '}';
    }
}
