package com.conceiversolutions.hrsystem.job_change.transferRequest;

import java.time.LocalDate;

import javax.persistence.*;

import com.conceiversolutions.hrsystem.enums.ProgressionEnum;

@Entity
@Table(name = "transfer_requests")
public class TransferRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transfer_id", nullable = false)
    private Long transferId;
    @Column(name = "created", nullable = false)
    private LocalDate created;
    @Column(name = "manager_id", nullable = false)
    private Long managerId;
    @Column(name = "new_position_id", nullable = false)
    private Long newPositionId;
    @Column(name = "new_department_id", nullable = false)
    private Long newDepartmentId;
    @Column(name = "processed_by", nullable = true)
    private Long processedBy;
    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private ProgressionEnum status;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id")
    private User employee;

    public TransferRequest() {
    }

    public TransferRequest(LocalDate created, Long managerId, Long newPositionId, Long newDepartmentId,
            Long processedBy, ProgressionEnum status, User employee) {
        this.created = created;
        this.managerId = managerId;
        this.newPositionId = newPositionId;
        this.newDepartmentId = newDepartmentId;
        this.processedBy = processedBy;
        this.status = status;
        this.employee = employee;
    }

    public Long getTransferId() {
        return transferId;
    }

    public void setTransferId(Long transferId) {
        this.transferId = transferId;
    }

    public LocalDate getCreated() {
        return created;
    }

    public void setCreated(LocalDate created) {
        this.created = created;
    }

    public Long getManagerId() {
        return managerId;
    }

    public void setManagerId(Long managerId) {
        this.managerId = managerId;
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

    public ProgressionEnum getStatus() {
        return status;
    }

    public void setStatus(ProgressionEnum status) {
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
        return "TransferRequest [created=" + created + ", employee=" + employee + ", managerId=" + managerId
                + ", newDepartmentId=" + newDepartmentId + ", newPositionId=" + newPositionId + ", processedBy="
                + processedBy + ", status=" + status + ", transferId=" + transferId + "]";
    }

}
