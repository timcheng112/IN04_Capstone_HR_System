package com.conceiversolutions.hrsystem.pay.deduction;

import com.conceiversolutions.hrsystem.enums.AllowanceTypeEnum;
import com.conceiversolutions.hrsystem.enums.DeductionTypeEnum;
import com.conceiversolutions.hrsystem.pay.deductionTemplate.DeductionTemplate;
import com.conceiversolutions.hrsystem.pay.payinformation.PayInformation;
import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "deduction")
public class Deduction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "deduction_id", nullable = false)
    private Long deductionId;

    @Column(nullable = false, name ="name")
    private String deductionName;

    @Column(nullable = false, name="amount")
    private BigDecimal amount;

    @Column(nullable = false)
    private String remarks;

    @Column(name = "date")
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Singapore")
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name="deduction_type")
    private DeductionTypeEnum deductionType;
    @OneToOne(fetch = FetchType.LAZY, optional = true, targetEntity = DeductionTemplate.class)
    private DeductionTemplate template;

    public Deduction() {
    }

    public Deduction(String remarks, LocalDate date) {
        this.remarks = remarks;
        this.date = date;
    }

    public Deduction(String deductionName, BigDecimal amount, String remarks, LocalDate date) {
        this.deductionName = deductionName;
        this.amount = amount;
        this.remarks = remarks;
        this.date = date;
    }

    public Deduction(String deductionName, BigDecimal amount, String remarks, LocalDate date, String deductionType) {
        this.deductionName = deductionName;
        this.amount = amount;
        this.remarks = remarks;
        this.date = date;
        this.deductionType = DeductionTypeEnum.valueOf(deductionType);
    }

    public DeductionTemplate getTemplate() {
        return template;
    }

    public void setTemplate(DeductionTemplate template) {
        this.template = template;
    }

    public Long getDeductionId() {
        return deductionId;
    }

    public void setDeductionId(Long deductionId) {
        this.deductionId = deductionId;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
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

    public DeductionTypeEnum getDeductionType() {
        return deductionType;
    }

    public void setDeductionType(DeductionTypeEnum deductionType) {
        this.deductionType = deductionType;
    }

    @Override
    public String toString() {
        return "Deduction{" +
                "deductionId=" + deductionId +
                ", deductionName='" + deductionName + '\'' +
                ", amount=" + amount +
                ", remarks='" + remarks + '\'' +
                ", date=" + date +
                ", deductionType=" + deductionType +
                ", template=" + template +
                '}';
    }
}
