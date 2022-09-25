package com.conceiversolutions.hrsystem.rostering.block;

import java.time.LocalDate;

import javax.persistence.*;

import com.conceiversolutions.hrsystem.rostering.roster.Roster;
import com.conceiversolutions.hrsystem.user.user.User;

@Entity
@Table(name = "blocks")
public class Block {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "block_id")
    private Long blockId;
    @Column(name = "start_time", nullable = false)
    private LocalDate startTime;
    @Column(name = "end_time", nullable = false)
    private LocalDate endTime;
    @Column(nullable = false, name = "block_title")
    private String blockTitle;
    @Column(nullable = false, name = "reason")
    private String reason;
    @Column(nullable = false)
    private Boolean isPaid;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    private User employee;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "roster_id")
    private Roster roster;

    public Block() {
    }

    public Block(LocalDate startTime, LocalDate endTime, String blockTitle, String reason, Boolean isPaid,
            User employee, Roster roster) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.blockTitle = blockTitle;
        this.reason = reason;
        this.isPaid = isPaid;
        this.employee = employee;
        this.roster = roster;
    }

    public Long getBlockId() {
        return blockId;
    }

    public void setBlockId(Long blockId) {
        this.blockId = blockId;
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

    public String getBlockTitle() {
        return blockTitle;
    }

    public void setBlockTitle(String blockTitle) {
        this.blockTitle = blockTitle;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public Boolean getIsPaid() {
        return isPaid;
    }

    public void setIsPaid(Boolean isPaid) {
        this.isPaid = isPaid;
    }

    public User getEmployee() {
        return employee;
    }

    public void setEmployee(User employee) {
        this.employee = employee;
    }

    public Roster getRoster() {
        return roster;
    }

    public void setRoster(Roster roster) {
        this.roster = roster;
    }

    @Override
    public String toString() {
        return "Block [blockId=" + blockId + ", blockTitle=" + blockTitle + ", employee=" + employee + ", endTime="
                + endTime + ", isPaid=" + isPaid + ", reason=" + reason + ", roster=" + roster + ", startTime="
                + startTime + "]";
    }

}
