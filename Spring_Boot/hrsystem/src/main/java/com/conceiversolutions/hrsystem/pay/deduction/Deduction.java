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

    @Column(nullable = false)
    private String remarks;

    @Column(name = "date")
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Singapore")
    private LocalDate date;

    public Deduction() {
    }

    public Deduction(String remarks, LocalDate date) {
        this.remarks = remarks;
        this.date = date;
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

    @Override
    public String toString() {
        return "Deduction{" +
                "deductionId=" + deductionId +
                ", remarks='" + remarks + '\'' +
                ", date=" + date +
                '}';
    }
}
