package com.conceiversolutions.hrsystem.pay.allowanceTemplate;

import com.conceiversolutions.hrsystem.enums.AllowanceTypeEnum;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name="allowanceTemplate")
public class AllowanceTemplate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "allowance_template_id", nullable = false)
    private Long allowanceTemplateId;

    @Column(name="allowance_name", nullable = false)
    private String allowanceName;

    @Column(nullable = false)
    private BigDecimal amount;

    @Column(nullable = false)
    private Boolean isFlatAmount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name="allowance_type")
    private AllowanceTypeEnum allowanceType;

    @Column(nullable = false, name="is_recurring")
    private Boolean isRecurring;

    public AllowanceTemplate() {
    }

    public AllowanceTemplate(String allowanceName, BigDecimal amount, Boolean isFlatAmount, AllowanceTypeEnum allowanceType, Boolean isRecurring) {
        this.allowanceName = allowanceName;
        this.amount = amount;
        this.isFlatAmount = isFlatAmount;
        this.allowanceType = allowanceType;
        this.isRecurring = isRecurring;
    }

    public Long getAllowanceTemplateId() {
        return allowanceTemplateId;
    }

    public void setAllowanceTemplateId(Long allowanceTemplateId) {
        this.allowanceTemplateId = allowanceTemplateId;
    }

    public String getAllowanceName() {
        return allowanceName;
    }

    public void setAllowanceName(String allowanceName) {
        this.allowanceName = allowanceName;
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


    public AllowanceTypeEnum getAllowanceType() {
        return allowanceType;
    }

    public void setAllowanceType(AllowanceTypeEnum allowanceType) {
        this.allowanceType = allowanceType;
    }

    @Override
    public String toString() {
        return "AllowanceTemplate{" +
                "allowanceTemplateId=" + allowanceTemplateId +
                ", allowanceName='" + allowanceName + '\'' +
                ", amount=" + amount +
                ", isFlatAmount=" + isFlatAmount +
                ", allowanceType=" + allowanceType +
                ", isRecurring=" + isRecurring +
                '}';
    }
}
