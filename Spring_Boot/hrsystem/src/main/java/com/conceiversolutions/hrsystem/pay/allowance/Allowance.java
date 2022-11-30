package com.conceiversolutions.hrsystem.pay.allowance;

import com.conceiversolutions.hrsystem.enums.AllowanceTypeEnum;
import com.conceiversolutions.hrsystem.pay.allowanceTemplate.AllowanceTemplate;
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

    @Column(name="name", nullable = false)
    private String allowanceName;

    @Column(name="amount", nullable = false)
    private BigDecimal amount;

    @Column(nullable = false)
    private String remarks;

    @Column(name = "date")
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Singapore")
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name="allowance_type")
    private AllowanceTypeEnum allowanceType;

    @OneToOne(fetch = FetchType.LAZY, optional = true, targetEntity = AllowanceTemplate.class)
    private AllowanceTemplate template;

    public Allowance() {
    }

    public Allowance(String remarks, LocalDate date) {
        this.remarks = remarks;
        this.date = date;
    }

    public Allowance(String allowanceName, BigDecimal amount, String remarks, LocalDate date) {
        this.allowanceName = allowanceName;
        this.amount = amount;
        this.remarks = remarks;
        this.date = date;
    }

    public Allowance(String allowanceName, BigDecimal amount, String remarks, LocalDate date, String allowanceType) {
        this.allowanceName = allowanceName;
        this.amount = amount;
        this.remarks = remarks;
        this.date = date;
        this.allowanceType = AllowanceTypeEnum.valueOf(allowanceType);
    }

    public Long getAllowanceId() {
        return allowanceId;
    }

    public void setAllowanceId(Long allowanceId) {
        this.allowanceId = allowanceId;
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

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public AllowanceTemplate getTemplate() {
        return template;
    }

    public void setTemplate(AllowanceTemplate template) {
        this.template = template;
    }

    public String getAllowanceName() {
        return allowanceName;
    }

    public void setAllowanceName(String allowanceName) {
        this.allowanceName = allowanceName;
    }

    public AllowanceTypeEnum getAllowanceType() {
        return allowanceType;
    }

    public void setAllowanceType(AllowanceTypeEnum allowanceType) {
        this.allowanceType = allowanceType;
    }

    @Override
    public String toString() {
        return "Allowance{" +
                "allowanceId=" + allowanceId +
                ", allowanceName='" + allowanceName + '\'' +
                ", amount=" + amount +
                ", remarks='" + remarks + '\'' +
                ", date=" + date +
                ", allowanceType=" + allowanceType +
                ", template=" + template +
                '}';
    }
}
