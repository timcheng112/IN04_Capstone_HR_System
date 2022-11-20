package com.conceiversolutions.hrsystem.pay.deductionTemplate;

import com.conceiversolutions.hrsystem.enums.DeductionTypeEnum;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "deductionTemplate")
public class DeductionTemplate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "deduction_template_id", nullable = false)
    private Long deductionTemplateId;

    @Column(name="deduction_name", nullable = false)
    private String deductionName;

    @Column(nullable = false)
    private BigDecimal amount;

    @Column(nullable = false)
    private Boolean isFlatAmount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name="deduction_type")
    private DeductionTypeEnum deductionType;

    @Column(nullable=false, name = "is_recurring")
    private Boolean isRecurring;

    public DeductionTemplate() {
    }

    public DeductionTemplate(String deductionName, BigDecimal amount, Boolean isFlatAmount, DeductionTypeEnum deductionType, Boolean isRecurring) {
        this.deductionName = deductionName;
        this.amount = amount;
        this.isFlatAmount = isFlatAmount;
        this.deductionType = deductionType;
        this.isRecurring = isRecurring;
    }

    public Long getDeductionTemplateId() {
        return deductionTemplateId;
    }

    public void setDeductionTemplateId(Long deductionTemplateId) {
        this.deductionTemplateId = deductionTemplateId;
    }

    public String getDeductionName() {
        return deductionName;
    }

    public void setDeductionName(String deductionName) {
        this.deductionName = deductionName;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Boolean getIsFlatAmount() {
        return isFlatAmount;
    }

    public void setIsFlatAmount(Boolean isFlatAmount) {
        this.isFlatAmount = isFlatAmount;
    }

    public Boolean getIsRecurring() {
        return isRecurring;
    }

    public void setIsRecurring(Boolean isRecurring) {
        this.isRecurring = isRecurring;
    }

    public DeductionTypeEnum getDeductionType() {
        return deductionType;
    }

    public void setDeductionType(DeductionTypeEnum deductionType) {
        this.deductionType = deductionType;
    }

    @Override
    public String toString() {
        return "DeductionTemplate{" +
                "deductionTemplateId=" + deductionTemplateId +
                ", deductionName='" + deductionName + '\'' +
                ", amount=" + amount +
                ", isFlatAmount=" + isFlatAmount +
                ", deductionType=" + deductionType +
                ", isRecurring=" + isRecurring +
                '}';
    }
}
