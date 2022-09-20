package com.conceiversolutions.hrsystem.pay;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
public class Allowance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long allowanceId;
    private String allowanceName;
    private BigDecimal amount;
    private String remarks;
    @ManyToOne
    private PayInformation payinfo;

    public Allowance() {
    }

    public Allowance(Long allowanceId, String allowanceName, BigDecimal amount, String remarks) {
        this.allowanceId = allowanceId;
        this.allowanceName = allowanceName;
        this.amount = amount;
        this.remarks = remarks;
    }

    public Allowance(String allowanceName, BigDecimal amount, String remarks) {
        this.allowanceName = allowanceName;
        this.amount = amount;
        this.remarks = remarks;
    }

    public Long getAllowanceId() {
        return allowanceId;
    }

    public void setAllowanceId(Long allowanceId) {
        this.allowanceId = allowanceId;
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
        return "Allowance{" +
                "allowanceId=" + allowanceId +
                ", allowanceName='" + allowanceName + '\'' +
                ", amount=" + amount +
                ", remarks='" + remarks + '\'' +
                ", payinfo=" + payinfo +
                '}';
    }
}
