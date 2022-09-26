package com.conceiversolutions.hrsystem.pay.payinformation;
import com.conceiversolutions.hrsystem.pay.payslip.Payslip;
import com.conceiversolutions.hrsystem.pay.allowance.Allowance;
import com.conceiversolutions.hrsystem.pay.deduction.Deduction;
import com.conceiversolutions.hrsystem.user.user.User;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name="pay_information")
public class PayInformation {
    //ali note to self: pay type means MONTHLY, YEARLY... pay method means CASH, CHEQUE, C

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="pay_information_id")
    private Long payInformationId;
    @Column(name="pay_type", nullable = false)
    private String payType;
    @Column(name="basic_hourly_pay", nullable = false)
    private BigDecimal basicHourlyPay;
    @Column(name="weekend_hourly_pay", nullable = false)
    private BigDecimal weekendHourlyPay;
    @Column(name="event_ph_hourly_pay", nullable = false)
    private BigDecimal eventPhHourlyPay;
    @Column(name="overtime_hourly_pay", nullable = false)
    private BigDecimal overtimeHourlyPay;
    @Column(name="pay_method", nullable = false)
    private String paymentMethod;
    @Column(name="self_help_group_contribution_type", nullable = false)
    private String selfHelpGroupContributionType;
//    @OneToOne(mappedBy = "payInformation")
    //@JoinColumn(name = "payslip_id")
//    private Payslip payslip;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "allowanceId")
    //@JoinColumn(name="allowanceId") mappedBy ^ over here suffice for linkage
    private List<Allowance> allowance;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "deductionId")
    //@JoinColumn(name ="deductionId")
    private List<Deduction> deduction;
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public PayInformation() {
        this.allowance = new ArrayList<>();
        this.deduction = new ArrayList<>();
    }

    public PayInformation(Long payInformationId, String payType, BigDecimal basicHourlyPay, BigDecimal weekendHourlyPay, BigDecimal eventPhHourlyPay, BigDecimal overtimeHourlyPay, String paymentMethod, String selfHelpGroupContributionType, List<Allowance> allowance, List<Deduction> deduction, User employee) {
        this.payInformationId = payInformationId;
        this.payType = payType;
        this.basicHourlyPay = basicHourlyPay;
        this.weekendHourlyPay = weekendHourlyPay;
        this.eventPhHourlyPay = eventPhHourlyPay;
        this.overtimeHourlyPay = overtimeHourlyPay;
        this.paymentMethod = paymentMethod;
        this.selfHelpGroupContributionType = selfHelpGroupContributionType;
        this.allowance = allowance;
        this.deduction = deduction;
        this.user = employee;
    }

    public PayInformation(String payType, BigDecimal basicHourlyPay, BigDecimal weekendHourlyPay, BigDecimal eventPhHourlyPay, BigDecimal overtimeHourlyPay, String paymentMethod, String selfHelpGroupContributionType, Payslip payslip, List<Allowance> allowance, List<Deduction> deduction, User employee) {
        this.payType = payType;
        this.basicHourlyPay = basicHourlyPay;
        this.weekendHourlyPay = weekendHourlyPay;
        this.eventPhHourlyPay = eventPhHourlyPay;
        this.overtimeHourlyPay = overtimeHourlyPay;
        this.paymentMethod = paymentMethod;
        this.selfHelpGroupContributionType = selfHelpGroupContributionType;
        this.allowance = allowance;
        this.deduction = deduction;
        this.user = employee;
    }

    public PayInformation(String monthly, BigDecimal bigDecimal, BigDecimal basicHourlyPay, BigDecimal weekendHourlyPay, BigDecimal eventPhHourlyPay, String giro, String cpf, Object selfHelpGroupContributionType, Object allowance, Object deduction) {
    }

    public Long getPayInformationId() {
        return payInformationId;
    }

    public void setPayInformationId(Long payInformationId) {
        this.payInformationId = payInformationId;
    }

    public String getPayType() {
        return payType;
    }

    public void setPayType(String payType) {
        this.payType = payType;
    }

    public BigDecimal getBasicHourlyPay() {
        return basicHourlyPay;
    }

    public void setBasicHourlyPay(BigDecimal basicHourlyPay) {
        this.basicHourlyPay = basicHourlyPay;
    }

    public BigDecimal getWeekendHourlyPay() {
        return weekendHourlyPay;
    }

    public void setWeekendHourlyPay(BigDecimal weekendHourlyPay) {
        this.weekendHourlyPay = weekendHourlyPay;
    }

    public BigDecimal getEventPhHourlyPay() {
        return eventPhHourlyPay;
    }

    public void setEventPhHourlyPay(BigDecimal eventPhHourlyPay) {
        this.eventPhHourlyPay = eventPhHourlyPay;
    }

    public BigDecimal getOvertimeHourlyPay() {
        return overtimeHourlyPay;
    }

    public void setOvertimeHourlyPay(BigDecimal overtimeHourlyPay) {
        this.overtimeHourlyPay = overtimeHourlyPay;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getSelfHelpGroupContributionType() {
        return selfHelpGroupContributionType;
    }

    public void setSelfHelpGroupContributionType(String selfHelpGroupContributionType) {
        this.selfHelpGroupContributionType = selfHelpGroupContributionType;
    }

//    public Payslip getPayslip() {
//        return payslip;
//    }
//
//    public void setPayslip(Payslip payslip) {
//        this.payslip = payslip;
//    }

    public List<Allowance> getAllowance() {
        return allowance;
    }

    public void setAllowance(List<Allowance> allowance) {
        this.allowance = allowance;
    }

    public List<Deduction> getDeduction() {
        return deduction;
    }

    public void setDeduction(List<Deduction> deduction) {
        this.deduction = deduction;
    }

    @Override
    public String toString() {
        return "PayInformation{" +
                "payInformationId=" + payInformationId +
                ", payType='" + payType + '\'' +
                ", basicHourlyPay=" + basicHourlyPay +
                ", weekendHourlyPay=" + weekendHourlyPay +
                ", eventPhHourlyPay=" + eventPhHourlyPay +
                ", overtimeHourlyPay=" + overtimeHourlyPay +
                ", paymentMethod='" + paymentMethod + '\'' +
                ", selfHelpGroupContributionType='" + selfHelpGroupContributionType + '\'' +
                ", allowance=" + allowance +
                ", deduction=" + deduction +
                '}';
    }
}