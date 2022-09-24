package com.conceiversolutions.hrsystem.rostering.shift;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.*;

import com.conceiversolutions.hrsystem.rostering.roster.Roster;
import com.conceiversolutions.hrsystem.user.user.User;

@Entity
@Table(name = "shifts")
public class Shift {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shift_id", nullable = false)
    private Long shiftId;
    @Column(name = "start_time", nullable = false)
    private LocalDate startTime;
    @Column(name = "end_time", nullable = false)
    private LocalDate endTime;
    @Column(name = "shift_title", nullable = false)
    private String shiftTitle;
    @Column(name = "unpaid_break", nullable = false)
    private Long unpaidBreak;
    @Column(name = "location", nullable = true)
    private String location;
    @Column(name = "remarks", nullable = true)
    private String remarks;
    @Column(name = "min_quota", nullable = false)
    private Long minQuota;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "roster_id")
    private Roster roster;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "shift", joinColumns = @JoinColumn(name = "shift_id", referencedColumnName = "shift_id"), inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "user_id"))
    private List<User> employees_involved;

    public Shift() {
    }

    public Shift(LocalDate startTime, LocalDate endTime, String shiftTitle, Long unpaidBreak, String location,
            String remarks, Long minQuota, Roster roster, List<User> employees_involved) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.shiftTitle = shiftTitle;
        this.unpaidBreak = unpaidBreak;
        this.location = location;
        this.remarks = remarks;
        this.minQuota = minQuota;
        this.roster = roster;
        this.employees_involved = employees_involved;
    }

    public Long getShiftId() {
        return shiftId;
    }

    public void setShiftId(Long shiftId) {
        this.shiftId = shiftId;
    }

    public LocalDate getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDate startTime) {
        this.startTime = startTime;
    }

    public LocalDate getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDate endTime) {
        this.endTime = endTime;
    }

    public String getShiftTitle() {
        return shiftTitle;
    }

    public void setShiftTitle(String shiftTitle) {
        this.shiftTitle = shiftTitle;
    }

    public Long getUnpaidBreak() {
        return unpaidBreak;
    }

    public void setUnpaidBreak(Long unpaidBreak) {
        this.unpaidBreak = unpaidBreak;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public Long getMinQuota() {
        return minQuota;
    }

    public void setMinQuota(Long minQuota) {
        this.minQuota = minQuota;
    }

    public Roster getRoster() {
        return roster;
    }

    public void setRoster(Roster roster) {
        this.roster = roster;
    }

    public List<User> getEmployees_involved() {
        return employees_involved;
    }

    public void setEmployees_involved(List<User> employees_involved) {
        this.employees_involved = employees_involved;
    }

    @Override
    public String toString() {
        return "Shift [employees_involved=" + employees_involved + ", endTime=" + endTime + ", location=" + location
                + ", minQuota=" + minQuota + ", remarks=" + remarks + ", roster=" + roster + ", shiftId=" + shiftId
                + ", shiftTitle=" + shiftTitle + ", startTime=" + startTime + ", unpaidBreak=" + unpaidBreak + "]";
    }

}
