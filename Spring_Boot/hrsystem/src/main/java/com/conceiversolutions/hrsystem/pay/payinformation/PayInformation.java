package com.conceiversolutions.hrsystem.pay.payinformation;

import com.conceiversolutions.hrsystem.enums.SelfHelpGroupEnum;
import com.conceiversolutions.hrsystem.pay.allowanceTemplate.AllowanceTemplate;
import com.conceiversolutions.hrsystem.pay.deductionTemplate.DeductionTemplate;
import com.conceiversolutions.hrsystem.pay.payslip.Payslip;
import com.conceiversolutions.hrsystem.pay.allowance.Allowance;
import com.conceiversolutions.hrsystem.pay.deduction.Deduction;
import com.conceiversolutions.hrsystem.user.user.User;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "pay_information")
public class PayInformation {
    // ali note to self: pay type means MONTHLY, YEARLY... pay method means CASH,
    // CHEQUE, C

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pay_information_id")
    private Long payInformationId;
    @Column(name = "pay_type", nullable = true)
    private String payType;
    @Column(name = "basic_salary", nullable = true)
    private BigDecimal basicSalary;
    @Column(name = "basic_hourly_pay", nullable = true)
    private BigDecimal basicHourlyPay;
    @Column(name = "weekend_hourly_pay", nullable = true)
    private BigDecimal weekendHourlyPay;
    @Column(name = "event_ph_hourly_pay", nullable = true)
    private BigDecimal eventPhHourlyPay;
    @Column(name = "overtime_hourly_pay", nullable = true)
    private BigDecimal overtimeHourlyPay;
    @Column(name = "pay_method", nullable = true)
    private String paymentMethod;
    @Column(name = "in_payroll", nullable = true)
    private Boolean inPayroll;
    // @OneToOne(mappedBy = "payInformation")
    // @JoinColumn(name = "payslip_id")
    // private Payslip payslip;

    @Column(name = "has_commission", nullable = true)
    private Boolean hasCommission;

    @Enumerated(EnumType.STRING)
    @Column(nullable = true, name = "self_help_group")
    private SelfHelpGroupEnum selfHelpGroup;
    @OneToMany
    // @JoinColumn(name="allowanceId") mappedBy ^ over here suffice for linkage
    private List<Allowance> allowance;
    @OneToMany
    // @JoinColumn(name ="deductionId")
    private List<Deduction> deduction;

    @OneToMany
    // @JoinColumn(name="allowanceId") mappedBy ^ over here suffice for linkage
    private List<AllowanceTemplate> allowanceTemplates;
    @OneToMany
    // @JoinColumn(name ="deductionId")
    private List<DeductionTemplate> deductionTemplates;
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public PayInformation() {
        this.allowance = new ArrayList<>();
        this.deduction = new ArrayList<>();
        this.allowanceTemplates = new ArrayList<>();
        this.deductionTemplates = new ArrayList<>();
    }

    public PayInformation(BigDecimal basicSalary, Boolean inPayroll, Boolean hasCommission,
            User user) {
        this.basicSalary = basicSalary;
        this.inPayroll = inPayroll;
        this.hasCommission = hasCommission;
        this.user = user;
        this.allowance = new ArrayList<>();
        this.deduction = new ArrayList<>();
        this.allowanceTemplates = new ArrayList<>();
        this.deductionTemplates = new ArrayList<>();
    }

    public PayInformation(String payType, BigDecimal basicSalary, BigDecimal basicHourlyPay,
            BigDecimal weekendHourlyPay, BigDecimal eventPhHourlyPay, BigDecimal overtimeHourlyPay,
            String paymentMethod, Boolean inPayroll, Boolean hasCommission, SelfHelpGroupEnum selfHelpGroup,
            List<Allowance> allowance, List<Deduction> deduction, List<AllowanceTemplate> allowanceTemplates,
            List<DeductionTemplate> deductionTemplates, User user) {
        this.payType = payType;
        this.basicSalary = basicSalary;
        this.basicHourlyPay = basicHourlyPay;
        this.weekendHourlyPay = weekendHourlyPay;
        this.eventPhHourlyPay = eventPhHourlyPay;
        this.overtimeHourlyPay = overtimeHourlyPay;
        this.paymentMethod = paymentMethod;
        this.inPayroll = inPayroll;
        this.hasCommission = hasCommission;
        this.selfHelpGroup = selfHelpGroup;
        this.allowance = allowance;
        this.deduction = deduction;
        this.allowanceTemplates = allowanceTemplates;
        this.deductionTemplates = deductionTemplates;
        this.user = user;

    }

    public PayInformation(BigDecimal basicHourlyPay, BigDecimal weekendHourlyPay, BigDecimal eventPhHourlyPay,
            BigDecimal overtimeHourlyPay, Boolean inPayroll, Boolean hasCommission, User user) {
        this.basicHourlyPay = basicHourlyPay;
        this.weekendHourlyPay = weekendHourlyPay;
        this.eventPhHourlyPay = eventPhHourlyPay;
        this.overtimeHourlyPay = overtimeHourlyPay;
        this.inPayroll = inPayroll;
        this.hasCommission = hasCommission;
        this.user = user;
        this.allowance = new ArrayList<>();
        this.deduction = new ArrayList<>();
        this.allowanceTemplates = new ArrayList<>();
        this.deductionTemplates = new ArrayList<>();
    }

    public PayInformation(Long payInformationId, String payType, BigDecimal basicHourlyPay, BigDecimal weekendHourlyPay,
            BigDecimal eventPhHourlyPay, BigDecimal overtimeHourlyPay, String paymentMethod, List<Allowance> allowance,
            List<Deduction> deduction, User employee) {
        this.payInformationId = payInformationId;
        this.payType = payType;
        this.basicHourlyPay = basicHourlyPay;
        this.weekendHourlyPay = weekendHourlyPay;
        this.eventPhHourlyPay = eventPhHourlyPay;
        this.overtimeHourlyPay = overtimeHourlyPay;
        this.paymentMethod = paymentMethod;
        this.allowance = allowance;
        this.deduction = deduction;
        this.user = employee;
        this.allowance = new ArrayList<>();
        this.deduction = new ArrayList<>();
        this.allowanceTemplates = new ArrayList<>();
        this.deductionTemplates = new ArrayList<>();
    }

    public PayInformation(String payType, BigDecimal basicHourlyPay, BigDecimal weekendHourlyPay,
            BigDecimal eventPhHourlyPay, BigDecimal overtimeHourlyPay, String paymentMethod, Payslip payslip,
            List<Allowance> allowance, List<Deduction> deduction, User employee) {
        this.payType = payType;
        this.basicHourlyPay = basicHourlyPay;
        this.weekendHourlyPay = weekendHourlyPay;
        this.eventPhHourlyPay = eventPhHourlyPay;
        this.overtimeHourlyPay = overtimeHourlyPay;
        this.paymentMethod = paymentMethod;
        this.allowance = allowance;
        this.deduction = deduction;
        this.user = employee;

    }

    public PayInformation(String payType, BigDecimal basicHourlyPay, BigDecimal weekendHourlyPay,
            BigDecimal eventPhHourlyPay, BigDecimal overtimeHourlyPay, String paymentMethod, Boolean hasCommission,
            SelfHelpGroupEnum selfHelpGroup, List<Allowance> allowance, List<Deduction> deduction, User user) {
        this.payType = payType;
        this.basicHourlyPay = basicHourlyPay;
        this.weekendHourlyPay = weekendHourlyPay;
        this.eventPhHourlyPay = eventPhHourlyPay;
        this.overtimeHourlyPay = overtimeHourlyPay;
        this.paymentMethod = paymentMethod;
        this.hasCommission = hasCommission;
        this.selfHelpGroup = selfHelpGroup;
        this.allowance = allowance;
        this.deduction = deduction;
        this.user = user;
    }

    // SHG changed
    public PayInformation(String monthly, BigDecimal bigDecimal, BigDecimal basicHourlyPay, BigDecimal weekendHourlyPay,
            BigDecimal eventPhHourlyPay, String giro, String cpf, Object selfHelpGroupContributionType,
            Object allowance, Object deduction) {
    }

    public PayInformation(BigDecimal basicSalary, boolean inPayroll, boolean hasCommission) {
        this.basicSalary = basicSalary;
        this.inPayroll = inPayroll;
        this.hasCommission = hasCommission;
        this.allowance = new ArrayList<>();
        this.deduction = new ArrayList<>();
    }

    public PayInformation(BigDecimal basicHourlyPay, BigDecimal weekendHourlyPay, BigDecimal eventPhHourlyPay,
            BigDecimal overtimeHourlyPay, Boolean inPayroll, Boolean hasCommission) {
        this.basicHourlyPay = basicHourlyPay;
        this.weekendHourlyPay = weekendHourlyPay;
        this.eventPhHourlyPay = eventPhHourlyPay;
        this.overtimeHourlyPay = overtimeHourlyPay;
        this.inPayroll = inPayroll;
        this.hasCommission = hasCommission;
        this.allowance = new ArrayList<>();
        this.deduction = new ArrayList<>();
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

    // public Payslip getPayslip() {
    // return payslip;
    // }
    //
    // public void setPayslip(Payslip payslip) {
    // this.payslip = payslip;
    // }

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

    public BigDecimal getBasicSalary() {
        return basicSalary;
    }

    public void setBasicSalary(BigDecimal basicSalary) {
        this.basicSalary = basicSalary;
    }

    public Boolean getInPayroll() {
        return inPayroll;
    }

    public void setInPayroll(Boolean inPayroll) {
        this.inPayroll = inPayroll;
    }

    public Boolean getHasCommission() {
        return hasCommission;
    }

    public void setHasCommission(Boolean hasCommission) {
        this.hasCommission = hasCommission;
    }

    public SelfHelpGroupEnum getSelfHelpGroup() {
        return selfHelpGroup;
    }

    public void setSelfHelpGroup(SelfHelpGroupEnum selfHelpGroup) {
        this.selfHelpGroup = selfHelpGroup;
    }

    public List<AllowanceTemplate> getAllowanceTemplates() {
        return allowanceTemplates;
    }

    public void setAllowanceTemplates(List<AllowanceTemplate> allowanceTemplates) {
        this.allowanceTemplates = allowanceTemplates;
    }

    public List<DeductionTemplate> getDeductionTemplates() {
        return deductionTemplates;
    }

    public void setDeductionTemplates(List<DeductionTemplate> deductionTemplates) {
        this.deductionTemplates = deductionTemplates;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void addAllowance(Allowance allowance) {
        this.allowance.add(allowance);
    }

    public void removeAllowance(Allowance allowance) {
        this.allowance.remove(allowance);
    }

    public void addDeduction(Deduction deduction) {
        this.deduction.add(deduction);
    }

    public void removeDeduction(Deduction deduction) {
        this.deduction.remove(deduction);
    }

    public void addAllowanceTemplate(AllowanceTemplate allowanceTemplate) {
        this.allowanceTemplates.add(allowanceTemplate);
    }

    public void removeAllowanceTemplate(AllowanceTemplate allowanceTemplate) {
        this.allowanceTemplates.remove(allowanceTemplate);
    }

    public void addDeductionTemplate(DeductionTemplate deductionTemplate) {
        this.deductionTemplates.add(deductionTemplate);
    }

    public void removeDeductionTemplate(DeductionTemplate deductionTemplate) {
        this.deductionTemplates.remove(deductionTemplate);
    }

    @Override
    public String toString() {
        return "PayInformation{" +
                "payInformationId=" + payInformationId +
                ", payType='" + payType + '\'' +
                ", basicSalary=" + basicSalary +
                ", basicHourlyPay=" + basicHourlyPay +
                ", weekendHourlyPay=" + weekendHourlyPay +
                ", eventPhHourlyPay=" + eventPhHourlyPay +
                ", overtimeHourlyPay=" + overtimeHourlyPay +
                ", paymentMethod='" + paymentMethod + '\'' +
                ", inPayroll=" + inPayroll +
                ", hasCommission=" + hasCommission +
                ", selfHelpGroup=" + selfHelpGroup +
                ", allowance=" + allowance +
                ", deduction=" + deduction +
                ", allowanceTemplates=" + allowanceTemplates +
                ", deductionTemplates=" + deductionTemplates +
                ", user=" + user +
                '}';
    }
}
