package com.conceiversolutions.hrsystem.pay;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name="allowance")
public class Allowance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="allowance_id", nullable = false)
    private Long allowanceId;
    @Column(name="allowance_name", nullable = false)
    private String allowanceName;
    @Column(nullable = false)
    private BigDecimal amount;
    @Column(nullable = false)
    private String remarks;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="pay_information_id")
    private PayInformation payInfo;

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

    public PayInformation getPayInfo() {
        return payInfo;
    }

    public void setPayInfo(PayInformation payInfo) {
        this.payInfo = payInfo;
    }

    @Override
    public String toString() {
        return "Allowance{" +
                "allowanceId=" + allowanceId +
                ", allowanceName='" + allowanceName + '\'' +
                ", amount=" + amount +
                ", remarks='" + remarks + '\'' +
                ", payinfo=" + payInfo +
                '}';
    }
}
