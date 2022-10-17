package com.conceiversolutions.hrsystem.rostering.shift;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.conceiversolutions.hrsystem.rostering.roster.Roster;
import com.conceiversolutions.hrsystem.rostering.shiftlistitem.ShiftListItem;
import com.conceiversolutions.hrsystem.user.user.User;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "shifts")
public class Shift {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shift_id", nullable = false)
    private Long shiftId;
    @Column(name = "start_time", nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Singapore")
    private LocalDateTime startTime;
    @Column(name = "end_time", nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Singapore")
    private LocalDateTime endTime;
    @Column(name = "shift_title", nullable = false)
    private String shiftTitle;
    @Column(name = "remarks", nullable = true)
    private String remarks;
    @Column(name = "min_quota", nullable = false)
    @ElementCollection(targetClass=Long.class)
    private List<Long> minQuota;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "roster_id")
    private Roster roster;
    @OneToMany(fetch = FetchType.LAZY, targetEntity = ShiftListItem.class, mappedBy = "user")
    @Column(name = "shift_list_items")
    private List<ShiftListItem> shiftListItems;

    // @ManyToMany(cascade = CascadeType.ALL)
    // @JoinTable(name = "shift", joinColumns = @JoinColumn(name = "shift_id",
    // referencedColumnName = "shift_id"), inverseJoinColumns = @JoinColumn(name =
    // "user_id", referencedColumnName = "user_id"))
    // private List<User> employees_involved;

    public Shift() {
    }

    public Shift(LocalDateTime startTime, LocalDateTime endTime, String shiftTitle, String remarks,
            List<Long> minQuota) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.shiftTitle = shiftTitle;
        this.remarks = remarks;
        this.minQuota = minQuota;
        this.shiftListItems = new ArrayList<>();
    }

    public Shift(LocalDateTime startTime, LocalDateTime endTime, String shiftTitle,
            String remarks, List<Long> minQuota, Roster roster) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.shiftTitle = shiftTitle;
        this.remarks = remarks;
        this.minQuota = minQuota;
        this.roster = roster;
        this.shiftListItems = new ArrayList<>();
    }

    public Long getShiftId() {
        return shiftId;
    }

    public void setShiftId(Long shiftId) {
        this.shiftId = shiftId;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public String getShiftTitle() {
        return shiftTitle;
    }

    public void setShiftTitle(String shiftTitle) {
        this.shiftTitle = shiftTitle;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public List<Long> getMinQuota() {
        return minQuota;
    }

    public void setMinQuota(List<Long> minQuota) {
        this.minQuota = minQuota;
    }

    public Roster getRoster() {
        return roster;
    }

    public void setRoster(Roster roster) {
        this.roster = roster;
    }

    public List<ShiftListItem> getShiftListItems() {
        return shiftListItems;
    }

    public void setShiftListItems(List<ShiftListItem> shiftListItems) {
        this.shiftListItems = shiftListItems;
    }

    public List<ShiftListItem> addShiftListItem(ShiftListItem shiftListItem) {
        this.shiftListItems.add(shiftListItem);
        return this.shiftListItems;
    }

    public List<ShiftListItem> removeShiftListItem(ShiftListItem shiftListItem) {
        this.shiftListItems.remove(shiftListItem);
        return this.shiftListItems;
    }

    @Override
    public String toString() {
        return "Shift [shiftId=" + shiftId + ", startTime=" + startTime + ", endTime=" + endTime + ", shiftTitle="
                + shiftTitle + ", remarks=" + remarks + ", minQuota=" + minQuota + ", roster=" + roster
                + ", shiftListItems=" + shiftListItems + "]";
    }

}
