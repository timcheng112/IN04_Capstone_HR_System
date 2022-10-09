package com.conceiversolutions.hrsystem.rostering.shiftlistitem;

import java.time.LocalDateTime;

import javax.persistence.*;

import com.conceiversolutions.hrsystem.rostering.shift.Shift;
import com.conceiversolutions.hrsystem.user.user.User;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Entity
@Table(name = "shift_list_items")
public class ShiftListItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shift_list_item_id")
    private Long shiftListItemId;
    @Column(name = "check_in_timing")
    private LocalDateTime checkInTiming;
    @Column(name = "check_out_timing")
    private LocalDateTime checkOutTiming;
    @Column(name = "is_weekend")
    private Boolean isWeekend;
    @Column(name = "is_ph_event")
    private Boolean isPhEvent;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = Shift.class)
    @JoinColumn(name = "shift_id")
    private Shift shift;
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "user_id")
    private User user;

    public ShiftListItem() {
    }

    public Long getShiftListItemId() {
        return shiftListItemId;
    }

    public void setShiftListItemId(Long shiftListItemId) {
        this.shiftListItemId = shiftListItemId;
    }

    public LocalDateTime getCheckInTiming() {
        return checkInTiming;
    }

    public void setCheckInTiming(LocalDateTime checkInTiming) {
        this.checkInTiming = checkInTiming;
    }

    public LocalDateTime getCheckOutTiming() {
        return checkOutTiming;
    }

    public void setCheckOutTiming(LocalDateTime checkOutTiming) {
        this.checkOutTiming = checkOutTiming;
    }

    public Boolean getIsWeekend() {
        return isWeekend;
    }

    public void setIsWeekend(Boolean isWeekend) {
        this.isWeekend = isWeekend;
    }

    public Boolean getIsPhEvent() {
        return isPhEvent;
    }

    public void setIsPhEvent(Boolean isPhEvent) {
        this.isPhEvent = isPhEvent;
    }

    public Shift getShift() {
        return shift;
    }

    public void setShift(Shift shift) {
        this.shift = shift;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "ShiftListItem [shiftListItemId=" + shiftListItemId + ", checkInTiming=" + checkInTiming
                + ", checkOutTiming=" + checkOutTiming + ", isWeekend=" + isWeekend + ", isPhEvent=" + isPhEvent
                + ", shift=" + shift + ", user=" + user + "]";
    }

}
