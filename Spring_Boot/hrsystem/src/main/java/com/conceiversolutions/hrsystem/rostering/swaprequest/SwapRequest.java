package com.conceiversolutions.hrsystem.rostering.swaprequest;

import java.util.List;

import javax.persistence.*;

import com.conceiversolutions.hrsystem.enums.StatusEnum;
import com.conceiversolutions.hrsystem.rostering.shift.Shift;
import com.conceiversolutions.hrsystem.rostering.shiftlistitem.ShiftListItem;
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

    // @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, targetEntity =
    // Shift.class)
    // @JoinColumn(name = "shift_id", referencedColumnName = "swap_request_id")
    // private List<Shift> shifts;
    @OneToOne(cascade = CascadeType.MERGE, optional = false)
    @JoinColumn(name = "requestor_shift_id", nullable = false)
    private ShiftListItem requestorShiftListItem;
    @OneToOne(cascade = CascadeType.MERGE, optional = false)
    @JoinColumn(name = "receiver_shift_id", nullable = false)
    private ShiftListItem receiverShiftListItem;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "requestor_id")
    private User requestor;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "receiver_id")
    private User receiver;

    public SwapRequest() {
    }

    public SwapRequest(String reason, StatusEnum status) {
        this.reason = reason;
        this.status = status;
    }

    public SwapRequest(String reason, StatusEnum status, String responseReason) {
        this.reason = reason;
        this.status = status;
        this.responseReason = responseReason;
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

    public ShiftListItem getRequestorShiftListItem() {
        return requestorShiftListItem;
    }

    public void setRequestorShiftListItem(ShiftListItem requestorShiftListItem) {
        this.requestorShiftListItem = requestorShiftListItem;
    }

    public ShiftListItem getReceiverShiftListItem() {
        return receiverShiftListItem;
    }

    public void setReceiverShiftListItem(ShiftListItem receiverShiftListItem) {
        this.receiverShiftListItem = receiverShiftListItem;
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
        return "SwapRequest [swapRequestId=" + swapRequestId + ", reason=" + reason + ", status=" + status
                + ", responseReason=" + responseReason + ", requestorShiftListItem=" + requestorShiftListItem
                + ", receiverShiftListItem=" + receiverShiftListItem + ", requestor=" + requestor + ", receiver="
                + receiver + "]";
    }

}
