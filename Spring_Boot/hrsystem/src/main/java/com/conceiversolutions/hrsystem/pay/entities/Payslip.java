package com.conceiversolutions.hrsystem.pay.entities;

import com.conceiversolutions.hrsystem.user.User;
import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Blob;
import java.time.LocalDate;

@Entity
@Table(name="payslip")
public class Payslip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="payslip_id")
    private Long payslipId;
    @Column(name="month_of_payment", nullable = false)
    private Integer monthOfPayment;
    @Column(name="year_of_payslip", nullable = false)
    private Integer yearOfPayslip;
    @Column(name="date_of_payment" ,nullable = false)
    private LocalDate dateOfPayment;
    @Column(name="gross_salary", nullable = false)
    private BigDecimal grossSalary;
    @Column(name="date_generated", nullable = false)
    private LocalDate dateGenerated;
    //we cant handle blob yet, null - true
    @Column(name="payslip_pdf", nullable = true)
    private Blob payslipPDF;
    @OneToOne(cascade = CascadeType.ALL, targetEntity = PayInformation.class)
    //@JoinColumn(name="payInformationId")
    private PayInformation payInformation;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="userId")
    private User employee;


    public Payslip() {
    }

    public Payslip(Integer monthOfPayment, Integer yearOfPayslip, LocalDate dateOfPayment,
                   BigDecimal grossSalary, LocalDate dateGenerated) {
        this.monthOfPayment = monthOfPayment;
        this.yearOfPayslip = yearOfPayslip;
        this.dateOfPayment = dateOfPayment;
        this.grossSalary = grossSalary;
        this.dateGenerated = dateGenerated;
    }

    //without id to test db identity id generation #1
    public Payslip(Integer monthOfPayment, Integer yearOfPayslip, LocalDate dateOfPayment, BigDecimal grossSalary, LocalDate dateGenerated, Blob payslipPDF, PayInformation payInformation, User employee) {
        this.monthOfPayment = monthOfPayment;
        this.yearOfPayslip = yearOfPayslip;
        this.dateOfPayment = dateOfPayment;
        this.grossSalary = grossSalary;
        this.dateGenerated = dateGenerated;
        this.payslipPDF = payslipPDF;
        this.payInformation = payInformation;
        this.employee = employee;
    }

    //with id, static offline testing
    public Payslip(Long payslipId, Integer monthOfPayment, Integer yearOfPayslip, LocalDate dateOfPayment, BigDecimal grossSalary, LocalDate dateGenerated, Blob payslipPDF, PayInformation payInformation, User employee) {
        this.payslipId = payslipId;
        this.monthOfPayment = monthOfPayment;
        this.yearOfPayslip = yearOfPayslip;
        this.dateOfPayment = dateOfPayment;
        this.grossSalary = grossSalary;
        this.dateGenerated = dateGenerated;
        this.payslipPDF = payslipPDF;
        this.payInformation = payInformation;
        this.employee = employee;
    }
    //test payslip -> payInfo ->  Allowance // payslip -> payInfo -> Deduction #3
    public Payslip(Integer monthOfPayment, Integer yearOfPayslip, LocalDate dateOfPayment, BigDecimal grossSalary,
                   LocalDate dateGenerated, Blob payslipPDF, PayInformation payInformation) {
        this.monthOfPayment = monthOfPayment;
        this.yearOfPayslip = yearOfPayslip;
        this.dateOfPayment = dateOfPayment;
        this.grossSalary = grossSalary;
        this.dateGenerated = dateGenerated;
        this.payslipPDF = payslipPDF;
        this.payInformation = payInformation;
    }

    //just payslip. no info yet. check user #2 -- later
    public Payslip(Integer monthOfPayment, Integer yearOfPayslip, LocalDate dateOfPayment, BigDecimal grossSalary, LocalDate dateGenerated, User employee) {
        this.monthOfPayment = monthOfPayment;
        this.yearOfPayslip = yearOfPayslip;
        this.dateOfPayment = dateOfPayment;
        this.grossSalary = grossSalary;
        this.dateGenerated = dateGenerated;
        this.employee = employee;
    }


    public Long getPayslipId() {
        return payslipId;
    }

    public void setPayslipId(Long payslipId) {
        this.payslipId = payslipId;
    }

    public Integer getMonthOfPayment() {
        return monthOfPayment;
    }

    public void setMonthOfPayment(Integer monthOfPayment) {
        this.monthOfPayment = monthOfPayment;
    }

    public Integer getYearOfPayslip() {
        return yearOfPayslip;
    }

    public void setYearOfPayslip(Integer yearOfPayslip) {
        this.yearOfPayslip = yearOfPayslip;
    }

    public LocalDate getDateOfPayment() {
        return dateOfPayment;
    }

    public void setDateOfPayment(LocalDate dateOfPayment) {
        this.dateOfPayment = dateOfPayment;
    }

    public BigDecimal getGrossSalary() {
        return grossSalary;
    }

    public void setGrossSalary(BigDecimal grossSalary) {
        this.grossSalary = grossSalary;
    }

    public LocalDate getDateGenerated() {
        return dateGenerated;
    }

    public void setDateGenerated(LocalDate dateGenerated) {
        this.dateGenerated = dateGenerated;
    }

    public Blob getPayslipPDF() {
        return payslipPDF;
    }

    public void setPayslipPDF(Blob payslipPDF) {
        this.payslipPDF = payslipPDF;
    }

    public PayInformation getPayInformation() {
        return payInformation;
    }

    public void setPayInformation(PayInformation payInformation) {
        this.payInformation = payInformation;
    }

    public User getEmployee() {
        return employee;
    }

    public void setEmployee(User employee) {
        this.employee = employee;
    }

    @Override
    public String toString() {
        return "Payslip{" +
                "payslipId=" + payslipId +
                ", monthOfPayment=" + monthOfPayment +
                ", yearOfPayslip=" + yearOfPayslip +
                ", dateOfPayment=" + dateOfPayment +
                ", grossSalary=" + grossSalary +
                ", dateGenerated=" + dateGenerated +
                ", payslipPDF=" + payslipPDF +
                '}';
    }
}
