package com.conceiversolutions.hrsystem.jobchange.transferrequest;

import java.time.LocalDate;

import javax.persistence.*;

import com.conceiversolutions.hrsystem.enums.StatusEnum;
import com.conceiversolutions.hrsystem.organizationstructure.department.Department;
import com.conceiversolutions.hrsystem.organizationstructure.team.Team;
import com.conceiversolutions.hrsystem.user.position.Position;
import com.conceiversolutions.hrsystem.user.user.User;

@Entity
@Table(name = "transfer_requests")
public class TransferRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transfer_id", nullable = false)
    private Long transferId;
    
    @Column(name = "created", nullable = false)
    private LocalDate created;

    // CREATED -> SUBMITTED / WITHDRAWN -> PASSED / FAILED (INTERVIEW) -> APPROVED /
    // REJECTED
    @Column(name = "status", nullable = false)
    private String status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    private User employee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manager_id")
    private User manager;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "interviewer_id")
    private User interviewer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "processed_by", nullable = true)
    private User processedBy;

    @OneToOne
    @JoinColumn(name = "new_position", nullable = true)
    private Position newPosition;

    @OneToOne
    @JoinColumn(name = "new_team", nullable = true)
    private Team newTeam;

    @OneToOne
    @JoinColumn(name = "new_department", nullable = true)
    private Department newDepartment;

    @Column(name = "interview_date", nullable = true)
    private LocalDate interviewDate;

    @Column(name = "interview_remarks", nullable = true)
    private String interviewRemarks;

    @Column(name = "reject_remarks", nullable = true)
    private String rejectRemarks;

    public TransferRequest() {
    }

    public TransferRequest(LocalDate created, String status, User employee, User manager, User interviewer, User processedBy, Position newPosition, Team newTeam, Department newDepartment, LocalDate interviewDate, String interviewRemarks, String rejectRemarks) {
        this.created = created;
        this.status = status;
        this.employee = employee;
        this.manager = manager;
        this.interviewer = interviewer;
        this.processedBy = processedBy;
        this.newPosition = newPosition;
        this.newTeam = newTeam;
        this.newDepartment = newDepartment;
        this.interviewDate = interviewDate;
        this.interviewRemarks = interviewRemarks;
        this.rejectRemarks = rejectRemarks;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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

    public User getProcessedBy() {
        return processedBy;
    }

    public void setProcessedBy(User processedBy) {
        this.processedBy = processedBy;
    }

    public Position getNewPosition() {
        return newPosition;
    }

    public void setNewPosition(Position newPosition) {
        this.newPosition = newPosition;
    }

    public Team getNewTeam() {
        return newTeam;
    }

    public void setNewTeam(Team newTeam) {
        this.newTeam = newTeam;
    }

    public Department getNewDepartment() {
        return newDepartment;
    }

    public void setNewDepartment(Department newDepartment) {
        this.newDepartment = newDepartment;
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

    public String getRejectRemarks() {
        return rejectRemarks;
    }

    public void setRejectRemarks(String rejectRemarks) {
        this.rejectRemarks = rejectRemarks;
    }

    @java.lang.Override
    public java.lang.String toString() {
        return "TransferRequest{" +
                "transferId=" + transferId +
                ", created=" + created +
                ", status='" + status + '\'' +
                ", employee=" + employee +
                ", manager=" + manager +
                ", interviewer=" + interviewer +
                ", processedBy=" + processedBy +
                ", newPosition=" + newPosition +
                ", newTeam=" + newTeam +
                ", newDepartment=" + newDepartment +
                ", interviewDate=" + interviewDate +
                ", interviewRemarks='" + interviewRemarks + '\'' +
                ", rejectRemarks='" + rejectRemarks + '\'' +
                '}';
    }
}
