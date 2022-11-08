package com.conceiversolutions.hrsystem.pay.deduction;

import com.conceiversolutions.hrsystem.enums.AllowanceTypeEnum;
import com.conceiversolutions.hrsystem.enums.DeductionTypeEnum;
import com.conceiversolutions.hrsystem.pay.payinformation.PayInformation;
import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

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

    @Column(nullable = false, name="is_flat_amount")
    private Boolean isFlatAmount;

    @Column(name = "date")
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Singapore")
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    @Column(nullable = true, name="deduction_type")
    private DeductionTypeEnum deductionType;
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

    public Deduction(String deductionName, BigDecimal amount, String remarks, Boolean isFlatAmount, LocalDate date, DeductionTypeEnum deductionType) {
        this.deductionName = deductionName;
        this.amount = amount;
        this.remarks = remarks;
        this.isFlatAmount = isFlatAmount;
        this.date = date;
        this.deductionType = deductionType;
    }

    public Deduction(String deductionName, BigDecimal amount, String remarks, Boolean isFlatAmount, LocalDate date, DeductionTypeEnum deductionType, PayInformation payInfo) {
        this.deductionName = deductionName;
        this.amount = amount;
        this.remarks = remarks;
        this.isFlatAmount = isFlatAmount;
        this.date = date;
        this.deductionType = deductionType;
        this.payInfo = payInfo;
    }

    public Deduction(Long deductionId, String deductionName, BigDecimal amount, String remarks, Boolean isFlatAmount, LocalDate date, DeductionTypeEnum deductionType, PayInformation payInfo) {
        this.deductionId = deductionId;
        this.deductionName = deductionName;
        this.amount = amount;
        this.remarks = remarks;
        this.isFlatAmount = isFlatAmount;
        this.date = date;
        this.deductionType = deductionType;
        this.payInfo = payInfo;
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

    public DeductionTypeEnum getDeductionType() {
        return deductionType;
    }

    public void setDeductionType(DeductionTypeEnum deductionType) {
        this.deductionType = deductionType;
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
                ", isFlatAmount=" + isFlatAmount +
                ", date=" + date +
                ", deductionType=" + deductionType +
                ", payInfo=" + payInfo +
                '}';
    }
}
