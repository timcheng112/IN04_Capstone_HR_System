package com.conceiversolutions.hrsystem.jobchange.promotionrequest;

import java.time.LocalDate;

import javax.persistence.*;

import com.conceiversolutions.hrsystem.enums.StatusEnum;
import com.conceiversolutions.hrsystem.user.user.User;

@Entity
@Table(name = "promotion_requests")
public class PromotionRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "promotion_id", nullable = false)
    private Long promotionId;
    @Column(name = "created", nullable = false)
    private LocalDate created;
    @Column(name = "appraisal_id", nullable = true)
    private Long appraisalId;

    //hr incharge?
    @Column(name = "employee_id", nullable = false)
    private Long employeeId;
    @Column(name = "manager_id", nullable = false)
    private Long managerId;
    @Column(name = "approved_by", nullable = true)
    private Long approvedBy;
    @Column(name = "interview_comments", nullable = true)
    private String interviewComments;
    @Column(name = "new_position_id", nullable = true)
    private Long newPositionId;
    @Column(name = "new_department_id", nullable = false)
    private Long newDepartmentId;
    @Column(name = "processed_by", nullable = true)
    private Long processedBy;
    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private StatusEnum status;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id")
    private User employee;

    public PromotionRequest() {
    }

    public PromotionRequest(LocalDate created, Long appraisalId, Long employeeId, Long managerId, Long approvedBy,
                            String interviewComments, Long newPositionId, Long newDepartmentId, Long processedBy,
                            StatusEnum status, User employee) {
        this.created = created;
        this.appraisalId = appraisalId;
        this.employeeId = employeeId;
        this.managerId = managerId;
        this.approvedBy = approvedBy;
        this.interviewComments = interviewComments;
        this.newPositionId = newPositionId;
        this.newDepartmentId = newDepartmentId;
        this.processedBy = processedBy;
        this.status = status;
        this.employee = employee;
    }

    public PromotionRequest(Long promotionId, LocalDate created, Long employeeId, Long managerId, Long approvedBy, String interviewComments, Long newPositionId, Long newDepartmentId, Long processedBy, StatusEnum status, User employee) {
        this.promotionId = promotionId;
        this.created = created;
        this.employeeId = employeeId;
        this.managerId = managerId;
        this.approvedBy = approvedBy;
        this.interviewComments = interviewComments;
        this.newPositionId = newPositionId;
        this.newDepartmentId = newDepartmentId;
        this.processedBy = processedBy;
        this.status = status;
        this.employee = employee;
    }

    public PromotionRequest(LocalDate created, Long employeeId, Long managerId, Long approvedBy, String interviewComments, Long newPositionId, Long newDepartmentId, Long processedBy, StatusEnum status, User employee) {
        this.created = created;
        this.employeeId = employeeId;
        this.managerId = managerId;
        this.approvedBy = approvedBy;
        this.interviewComments = interviewComments;
        this.newPositionId = newPositionId;
        this.newDepartmentId = newDepartmentId;
        this.processedBy = processedBy;
        this.status = status;
        this.employee = employee;
    }

    public Long getPromotionId() {
        return promotionId;
    }

    public void setPromotionId(Long promotionId) {
        this.promotionId = promotionId;
    }

    public LocalDate getCreated() {
        return created;
    }

    public void setCreated(LocalDate created) {
        this.created = created;
    }

    public Long getAppraisalId() {
        return appraisalId;
    }

    public void setAppraisalId(Long appraisalId) {
        this.appraisalId = appraisalId;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Long getManagerId() {
        return managerId;
    }

    public void setManagerId(Long managerId) {
        this.managerId = managerId;
    }

    public Long getApprovedBy() {
        return approvedBy;
    }

    public void setApprovedBy(Long approvedBy) {
        this.approvedBy = approvedBy;
    }

    public String getInterviewComments() {
        return interviewComments;
    }

    public void setInterviewComments(String interviewComments) {
        this.interviewComments = interviewComments;
    }

    public Long getNewPositionId() {
        return newPositionId;
    }

    public void setNewPositionId(Long newPositionId) {
        this.newPositionId = newPositionId;
    }

    public Long getNewDepartmentId() {
        return newDepartmentId;
    }

    public void setNewDepartmentId(Long newDepartmentId) {
        this.newDepartmentId = newDepartmentId;
    }

    public Long getProcessedBy() {
        return processedBy;
    }

    public void setProcessedBy(Long processedBy) {
        this.processedBy = processedBy;
    }

    public StatusEnum getStatus() {
        return status;
    }

    public void setStatus(StatusEnum status) {
        this.status = status;
    }

    public User getEmployee() {
        return employee;
    }

    public void setEmployee(User employee) {
        this.employee = employee;
    }

    @Override
    public String toString() {
        return "PromotionRequest [appraisalId=" + appraisalId + ", approvedBy=" + approvedBy + ", created=" + created
                + ", employee=" + employee + ", employeeId=" + employeeId + ", interviewComments=" + interviewComments
                + ", managerId=" + managerId + ", newDepartmentId=" + newDepartmentId + ", newPositionId="
                + newPositionId + ", processedBy=" + processedBy + ", promotionId=" + promotionId + ", status=" + status
                + "]";
    }

}
