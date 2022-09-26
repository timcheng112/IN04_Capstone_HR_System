package com.conceiversolutions.hrsystem.pay.deduction;

import com.conceiversolutions.hrsystem.pay.payinformation.PayInformation;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name= "deduction")
public class Deduction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "deduction_id", nullable = false)
    private Long  deductionId;
    @Column(name= "deduction_name", nullable = false)
    private String deductionName;
    @Column(nullable = false)
    private BigDecimal amount;
    @Column(nullable = false)
    private String remarks;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="pay_information_id")
    private PayInformation payInfo;

    public Deduction(Long deductionId, String deductionName, BigDecimal amount, String remarks, PayInformation payInfo) {
        this.deductionId = deductionId;
        this.deductionName = deductionName;
        this.amount = amount;
        this.remarks = remarks;
        this.payInfo = payInfo;
    }

    public Deduction() {
    }

    public Deduction(String deductionName, BigDecimal amount, String remarks) {
        this.deductionName = deductionName;
        this.amount = amount;
        this.remarks = remarks;
    }

    public Deduction(String deductionName, BigDecimal amount, String remarks, PayInformation payInfo) {
        this.deductionName = deductionName;
        this.amount = amount;
        this.remarks = remarks;
        this.payInfo = payInfo;
    }

    public Long getDeductionId() {
        return deductionId;
    }

    public void setDeductionId(Long deductionId) {
        this.deductionId = deductionId;
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

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public PayInformation getPayInfo() {
        return payInfo;
    }

    public void setPayInfo(PayInformation payInfo) {
        this.payInfo = payInfo;
    }

    @Override
    public String toString() {
        return "Deduction{" +
                "deductionId=" + deductionId +
                ", deductionName='" + deductionName + '\'' +
                ", amount=" + amount +
                ", remarks='" + remarks + '\'' +
                ", payInfo=" + payInfo +
                '}';
    }
}
