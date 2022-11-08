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

    @Column(nullable = false)
    private String remarks;

    @Column(name = "date")
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Singapore")
    private LocalDate date;

    public Allowance() {
    }

    public Allowance(String remarks, LocalDate date) {
        this.remarks = remarks;
        this.date = date;
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

    @Override
    public String toString() {
        return "Allowance{" +
                "allowanceId=" + allowanceId +
                ", remarks='" + remarks + '\'' +
                ", date=" + date +
                '}';
    }
}
