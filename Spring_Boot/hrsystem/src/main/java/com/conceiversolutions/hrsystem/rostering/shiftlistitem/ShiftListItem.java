package com.conceiversolutions.hrsystem.rostering.shiftlistitem;

import java.time.LocalDateTime;

import javax.persistence.*;

import com.conceiversolutions.hrsystem.rostering.shift.Shift;
import com.conceiversolutions.hrsystem.user.user.User;
import com.fasterxml.jackson.annotation.JsonFormat;

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
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Singapore")
    private LocalDateTime checkInTiming;
    @Column(name = "check_out_timing")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Singapore")
    private LocalDateTime checkOutTiming;
    @Column(name = "is_weekend")
    private Boolean isWeekend;
    @Column(name = "is_ph_event")
    private Boolean isPhEvent;
    @Column(name = "shift_role")
    private String shiftRole;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = Shift.class)
    @JoinColumn(name = "shift_id")
    private Shift shift;
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "user_id")
    private User user;

    public ShiftListItem() {
    }

    public ShiftListItem(Boolean isWeekend, Boolean isPhEvent, String shiftRole) {
        this.isWeekend = isWeekend;
        this.isPhEvent = isPhEvent;
        this.shiftRole = shiftRole;
    }

    public ShiftListItem(LocalDateTime checkInTiming, LocalDateTime checkOutTiming, Boolean isWeekend,
            Boolean isPhEvent, String shiftRole) {
        this.checkInTiming = checkInTiming;
        this.checkOutTiming = checkOutTiming;
        this.isWeekend = isWeekend;
        this.isPhEvent = isPhEvent;
        this.shiftRole = shiftRole;
    }

    public ShiftListItem(LocalDateTime checkInTiming, LocalDateTime checkOutTiming, Boolean isWeekend,
            Boolean isPhEvent, String shiftRole, Shift shift, User user) {
        this.checkInTiming = checkInTiming;
        this.checkOutTiming = checkOutTiming;
        this.isWeekend = isWeekend;
        this.isPhEvent = isPhEvent;
        this.shiftRole = shiftRole;
        this.shift = shift;
        this.user = user;
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

    public String getShiftRole() {
        return shiftRole;
    }

    public void setShiftRole(String shiftRole) {
        this.shiftRole = shiftRole;
    }

    @Override
    public String toString() {
        return "ShiftListItem [shiftListItemId=" + shiftListItemId + ", checkInTiming=" + checkInTiming
                + ", checkOutTiming=" + checkOutTiming + ", isWeekend=" + isWeekend + ", isPhEvent=" + isPhEvent
                + ", shiftRole=" + shiftRole + ", shift=" + shift + ", user=" + user + "]";
    }

}
