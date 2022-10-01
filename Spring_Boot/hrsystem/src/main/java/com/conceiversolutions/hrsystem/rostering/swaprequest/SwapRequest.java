package com.conceiversolutions.hrsystem.rostering.swaprequest;

import java.util.List;

import javax.persistence.*;

import com.conceiversolutions.hrsystem.enums.StatusEnum;
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
    private StatusEnum status;
    @Column(name = "response_reason", nullable = true)
    private String responseReason;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, targetEntity = Shift.class)
    @JoinColumn(name = "shift_id", referencedColumnName = "swap_request_id")
    private List<Shift> shifts;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "requestor_id")
    private User requestor;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "receiver_id")
    private User receiver;

    public SwapRequest() {
    }

    public SwapRequest(String reason, StatusEnum status, String responseReason, List<Shift> shifts, User requestor,
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

    public StatusEnum getStatus() {
        return status;
    }

    public void setStatus(StatusEnum status) {
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
