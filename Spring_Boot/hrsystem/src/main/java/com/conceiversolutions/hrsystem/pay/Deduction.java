package com.conceiversolutions.hrsystem.pay;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
public class Deduction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long  deductionId;
    private String deductionName;
    private BigDecimal amount;
    private String remarks;
    @ManyToOne
    private PayInformation payinfo;

    public Deduction(Long deductionId, String deductionName, BigDecimal amount, String remarks, PayInformation payinfo) {
        this.deductionId = deductionId;
        this.deductionName = deductionName;
        this.amount = amount;
        this.remarks = remarks;
        this.payinfo = payinfo;
    }

    public Deduction() {
    }

    public Deduction(String deductionName, BigDecimal amount, String remarks, PayInformation payinfo) {
        this.deductionName = deductionName;
        this.amount = amount;
        this.remarks = remarks;
        this.payinfo = payinfo;
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

    public PayInformation getPayinfo() {
        return payinfo;
    }

    public void setPayinfo(PayInformation payinfo) {
        this.payinfo = payinfo;
    }

    @Override
    public String toString() {
        return "Deduction{" +
                "deductionId=" + deductionId +
                ", deductionName='" + deductionName + '\'' +
                ", amount=" + amount +
                ", remarks='" + remarks + '\'' +
                ", payinfo=" + payinfo +
                '}';
    }
}
