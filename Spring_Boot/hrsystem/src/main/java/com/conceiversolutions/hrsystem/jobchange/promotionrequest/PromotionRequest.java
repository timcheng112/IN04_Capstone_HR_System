package com.conceiversolutions.hrsystem.jobchange.promotionrequest;

import java.time.LocalDate;

import javax.persistence.*;

import com.conceiversolutions.hrsystem.performance.appraisal.Appraisal;
import com.conceiversolutions.hrsystem.user.position.Position;
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

    @OneToOne
    @JoinColumn(name = "appraisal")
    private Appraisal appraisal;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "employee", nullable = false)
    private User employee;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "manager", nullable = false)
    private User manager;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "interviewer", nullable = true)
    private User interviewer;

    @OneToOne
    @JoinColumn(name = "new_position", nullable = true)
    private Position newPosition;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "processed_by", nullable = true)
    private User processedBy;

    // CREATED -> SUBMITTED / WITHDRAWN -> PASSED / FAILED (INTERVIEW) -> APPROVED /
    // REJECTED
    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "promotion_justification", nullable = true)
    private String promotionJustification;
    @Column(name = "withdraw_remarks", nullable = true)
    private String withdrawRemarks;

    @Column(name = "interview_date", nullable = true)
    private LocalDate interviewDate;
    @Column(name = "interview_remarks", nullable = true)
    private String interviewRemarks;

    @Column(name = "effective_from", nullable = true)
    private LocalDate effectiveFrom;
    @Column(name = "reject_remarks", nullable = true)
    private String rejectRemarks;

    public PromotionRequest() {
    }

    public PromotionRequest(LocalDate created, Appraisal appraisal, User employee, User manager, User interviewer,
            String status, String promotionJustification, String withdrawRemarks) {
        this.created = created;
        this.appraisal = appraisal;
        this.employee = employee;
        this.manager = manager;
        this.interviewer = interviewer;
        this.status = status;
        this.promotionJustification = promotionJustification;
        this.withdrawRemarks = withdrawRemarks;
    }

    public PromotionRequest(LocalDate created, Appraisal appraisal, User employee, User manager, User interviewer,
            Position newPosition, User processedBy, String status, String promotionJustification,
            String withdrawRemarks, LocalDate interviewDate, String interviewRemarks, LocalDate effectiveFrom,
            String rejectRemarks) {
        this.created = created;
        this.appraisal = appraisal;
        this.employee = employee;
        this.manager = manager;
        this.interviewer = interviewer;
        this.newPosition = newPosition;
        this.processedBy = processedBy;
        this.status = status;
        this.promotionJustification = promotionJustification;
        this.withdrawRemarks = withdrawRemarks;
        this.interviewDate = interviewDate;
        this.interviewRemarks = interviewRemarks;
        this.effectiveFrom = effectiveFrom;
        this.rejectRemarks = rejectRemarks;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPromotionJustification() {
        return promotionJustification;
    }

    public void setPromotionJustification(String promotionJustification) {
        this.promotionJustification = promotionJustification;
    }

    public String getWithdrawRemarks() {
        return withdrawRemarks;
    }

    public void setWithdrawRemarks(String withdrawRemarks) {
        this.withdrawRemarks = withdrawRemarks;
    }

    public LocalDate getInterviewDate() {
        return interviewDate;
    }

    public void setInterviewDate(LocalDate interviewDate) {
        this.interviewDate = interviewDate;
    }

    public String getInterviewRemarks() {
        return interviewRemarks;
    }

    public void setInterviewRemarks(String interviewRemarks) {
        this.interviewRemarks = interviewRemarks;
    }

    public LocalDate getEffectiveFrom() {
        return effectiveFrom;
    }

    public void setEffectiveFrom(LocalDate effectiveFrom) {
        this.effectiveFrom = effectiveFrom;
    }

    public String getRejectRemarks() {
        return rejectRemarks;
    }

    public void setRejectRemarks(String rejectRemarks) {
        this.rejectRemarks = rejectRemarks;
    }

    public Appraisal getAppraisal() {
        return appraisal;
    }

    public void setAppraisal(Appraisal appraisal) {
        this.appraisal = appraisal;
    }

    public User getEmployee() {
        return employee;
    }

    public void setEmployee(User employee) {
        this.employee = employee;
    }

    public User getManager() {
        return manager;
    }

    public void setManager(User manager) {
        this.manager = manager;
    }

    public User getInterviewer() {
        return interviewer;
    }

    public void setInterviewer(User interviewer) {
        this.interviewer = interviewer;
    }

    public Position getNewPosition() {
        return newPosition;
    }

    public void setNewPosition(Position newPosition) {
        this.newPosition = newPosition;
    }

    public User getProcessedBy() {
        return processedBy;
    }

    public void setProcessedBy(User processedBy) {
        this.processedBy = processedBy;
    }

    @java.lang.Override
    public java.lang.String toString() {
        return "PromotionRequest{" +
                "promotionId=" + promotionId +
                ", created=" + created +
                ", appraisal=" + appraisal +
                ", employee=" + employee +
                ", manager=" + manager +
                ", interviewer=" + interviewer +
                ", newPosition=" + newPosition +
                ", processedBy=" + processedBy +
                ", status='" + status + '\'' +
                ", promotionJustification='" + promotionJustification + '\'' +
                ", withdrawRemarks='" + withdrawRemarks + '\'' +
                ", interviewDate=" + interviewDate +
                ", interviewRemarks='" + interviewRemarks + '\'' +
                ", effectiveFrom=" + effectiveFrom +
                ", rejectRemarks='" + rejectRemarks + '\'' +
                '}';
    }
}
