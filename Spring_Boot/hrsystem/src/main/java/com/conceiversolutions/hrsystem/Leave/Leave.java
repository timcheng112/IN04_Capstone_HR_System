package com.conceiversolutions.hrsystem.Leave;

import com.conceiversolutions.hrsystem.Enums.ApprovalStatusEnum;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table
public class Leave {
    //attributes
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    @Column(name="leave_id")
    private Long leaveId;
    @Column(name="leave_dates")
    @ElementCollection(targetClass = LocalDate.class)
    private List<LocalDate> dates;
    @Column(name="remarks")
    private String remarks;
    @Column(name="approval_remarks")
    private String approvalRemarks;
    @Column(name="approval_status")
    @Enumerated(EnumType.STRING)
    private ApprovalStatusEnum approvalStatusEnum;

    //relationships

    //constructors
    public Leave(List<LocalDate> dates, String remarks) {
        this.dates = dates;
        this.remarks = remarks;
    }

    public Leave() {
        dates = new ArrayList<>();
    }

    //getters and setters

    public Long getLeaveId() {
        return leaveId;
    }

    public void setLeaveId(Long leaveId) {
        this.leaveId = leaveId;
    }

    public List<LocalDate> getDates() {
        return dates;
    }

    public void setDates(List<LocalDate> dates) {
        this.dates = dates;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getApprovalRemarks() {
        return approvalRemarks;
    }

    public void setApprovalRemarks(String approvalRemarks) {
        this.approvalRemarks = approvalRemarks;
    }

    public ApprovalStatusEnum getApprovalStatus() {
        return approvalStatusEnum;
    }

    public void setApprovalStatus(ApprovalStatusEnum approvalStatusEnum) {
        this.approvalStatusEnum = approvalStatusEnum;
    }

    @Override
    public String toString() {
        return "Leave{" +
                "leaveId=" + leaveId +
                ", dates=" + dates +
                ", remarks='" + remarks + '\'' +
                ", approvalRemarks='" + approvalRemarks + '\'' +
                ", approvalStatus=" + approvalStatusEnum +
                '}';
    }
}
