package com.conceiversolutions.hrsystem.pay.allowance;

import com.conceiversolutions.hrsystem.enums.AllowanceTypeEnum;
import com.conceiversolutions.hrsystem.pay.payinformation.PayInformation;
import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

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

    @Column(nullable = false, name="is_flat_amount")
    private Boolean isFlatAmount;

    @Column(name = "date")
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Singapore")
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    @Column(nullable = true, name="allowance_type")
    private AllowanceTypeEnum allowanceType;

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

    public Allowance(String allowanceName, BigDecimal amount, String remarks, PayInformation payInfo) {
        this.allowanceName = allowanceName;
        this.amount = amount;
        this.remarks = remarks;
        this.payInfo = payInfo;
    }


    public Allowance(String allowanceName, BigDecimal amount, String remarks, Boolean isFlatAmount, LocalDate date, AllowanceTypeEnum allowanceType, PayInformation payInfo) {
        this.allowanceName = allowanceName;
        this.amount = amount;
        this.remarks = remarks;
        this.isFlatAmount = isFlatAmount;
        this.date = date;
        this.allowanceType = allowanceType;
        this.payInfo = payInfo;
    }

    public Allowance(Long allowanceId, String allowanceName, BigDecimal amount, String remarks, Boolean isFlatAmount, LocalDate date, AllowanceTypeEnum allowanceType, PayInformation payInfo) {
        this.allowanceId = allowanceId;
        this.allowanceName = allowanceName;
        this.amount = amount;
        this.remarks = remarks;
        this.isFlatAmount = isFlatAmount;
        this.date = date;
        this.allowanceType = allowanceType;
        this.payInfo = payInfo;
    }

    public Allowance(String allowanceName, BigDecimal amount, String remarks, Boolean isFlatAmount, LocalDate date, AllowanceTypeEnum allowanceType) {
        this.allowanceName = allowanceName;
        this.amount = amount;
        this.remarks = remarks;
        this.isFlatAmount = isFlatAmount;
        this.date = date;
        this.allowanceType = allowanceType;
    }

    public Boolean getFlatAmount() {
        return isFlatAmount;
    }

    public void setFlatAmount(Boolean flatAmount) {
        isFlatAmount = flatAmount;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public AllowanceTypeEnum getAllowanceType() {
        return allowanceType;
    }

    public void setAllowanceType(AllowanceTypeEnum allowanceType) {
        this.allowanceType = allowanceType;
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
                ", isFlatAmount=" + isFlatAmount +
                ", date=" + date +
                ", allowanceType=" + allowanceType +
                ", payInfo=" + payInfo +
                '}';
    }
}
