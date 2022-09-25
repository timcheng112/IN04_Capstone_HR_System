package com.conceiversolutions.hrsystem.rostering.swapRequest;

import java.util.List;

import javax.persistence.*;

import com.conceiversolutions.hrsystem.enums.ProgressionEnum;
import com.conceiversolutions.hrsystem.rostering.shift.Shift;
import com.conceiversolutions.hrsystem.user.user.User;

@Entity
@Table(name = "swap_requests")
public class SwapRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "swap_request_id", nullable = false)
    private Long swapRequestId;
    @Column(name = "reason", nullable = false)
    private String reason;
    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private ProgressionEnum status;
    @Column(name = "response_reason", nullable = true)
    private String responseReason;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, targetEntity = Shift.class)
    @JoinColumn(name = "shift_id", referencedColumnName = "swap_request_id")
    private List<Shift> shifts;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id")
    private User requestor;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id")
    private User receiver;

    public SwapRequest() {
    }

    public SwapRequest(String reason, ProgressionEnum status, String responseReason, List<Shift> shifts, User requestor,
            User receiver) {
        this.reason = reason;
        this.status = status;
        this.responseReason = responseReason;
        this.shifts = shifts;
        this.requestor = requestor;
        this.receiver = receiver;
    }

    public Long getSwapRequestId() {
        return swapRequestId;
    }

    public void setSwapRequestId(Long swapRequestId) {
        this.swapRequestId = swapRequestId;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public ProgressionEnum getStatus() {
        return status;
    }

    public void setStatus(ProgressionEnum status) {
        this.status = status;
    }

    public String getResponseReason() {
        return responseReason;
    }

    public void setResponseReason(String responseReason) {
        this.responseReason = responseReason;
    }

    public List<Shift> getShifts() {
        return shifts;
    }

    public void setShifts(List<Shift> shifts) {
        this.shifts = shifts;
    }

    public User getRequestor() {
        return requestor;
    }

    public void setRequestor(User requestor) {
        this.requestor = requestor;
    }

    public User getReceiver() {
        return receiver;
    }

    public void setReceiver(User receiver) {
        this.receiver = receiver;
    }

    @Override
    public String toString() {
        return "SwapRequest [reason=" + reason + ", receiver=" + receiver + ", requestor=" + requestor
                + ", responseReason=" + responseReason + ", shifts=" + shifts + ", status=" + status
                + ", swapRequestId=" + swapRequestId + "]";
    }

}
