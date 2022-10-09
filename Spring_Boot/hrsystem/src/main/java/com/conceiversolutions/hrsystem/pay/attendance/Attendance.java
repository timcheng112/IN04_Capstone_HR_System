package com.conceiversolutions.hrsystem.pay.attendance;
import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.conceiversolutions.hrsystem.user.user.User;
import lombok.EqualsAndHashCode;
import lombok.ToString;


@Entity
@Table(name="attendance")
@ToString
@EqualsAndHashCode
public class Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "attendance_id", nullable = false)
    private Long attendanceId;
    @Column(name="weekend_hours_worked", nullable = false)
    private Long weekendHoursWorked;
    @Column(name="overtime_hours_worked", nullable = false)
    private Long overTimeHoursWorked;
    @Column(name="ph_event_hours_worked", nullable = false)
    private Long phEventHoursWorked;

    //not sure if i should remove
    @Column(nullable = false)
    private LocalDate date;

    //need to store their count somewhere. user doesnt have it
    @Column(name="total_count")
    private int totalCount;

    @Column(name="period_start")
    private LocalDateTime periodStart;
    @Column(name="period_end")
    private LocalDateTime periodEnd;

    @ManyToOne(fetch  = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    //ask timothy if shifts need to be here
//    @OneToOne(targetEntity = Shift.class, fetch = FetchType.LAZY)
//    @JoinColumn(name="shiftId")
//    private Shift shift;

    //also should have absent/present
    //can check by clock in but will make life easier via jquery
    //private boolean absent;


    public Attendance() {
    }

    public Attendance(Long attendanceId, Long weekendHoursWorked, Long overTimeHoursWorked, Long phEventHoursWorked, LocalDate date, LocalDateTime periodStart, LocalDateTime periodEnd, User user) {
        this.attendanceId = attendanceId;
        this.weekendHoursWorked = weekendHoursWorked;
        this.overTimeHoursWorked = overTimeHoursWorked;
        this.phEventHoursWorked = phEventHoursWorked;
        this.date = date;
        this.periodStart = periodStart;
        this.periodEnd = periodEnd;
        this.user = user;
    }

    public Attendance(Long weekendHoursWorked, Long overTimeHoursWorked, Long phEventHoursWorked, LocalDate date, LocalDateTime periodStart, LocalDateTime periodEnd, User user) {
        this.weekendHoursWorked = weekendHoursWorked;
        this.overTimeHoursWorked = overTimeHoursWorked;
        this.phEventHoursWorked = phEventHoursWorked;
        this.date = date;
        this.periodStart = periodStart;
        this.periodEnd = periodEnd;
        this.user = user;
    }

    public Attendance(Long weekendHoursWorked, Long overTimeHoursWorked, Long phEventHoursWorked, LocalDate date, LocalDateTime periodStart, LocalDateTime periodEnd) {
        this.weekendHoursWorked = weekendHoursWorked;
        this.overTimeHoursWorked = overTimeHoursWorked;
        this.phEventHoursWorked = phEventHoursWorked;
        this.date = date;
        this.periodStart = periodStart;
        this.periodEnd = periodEnd;
    }

    public Attendance(Long weekendHoursWorked, Long overTimeHoursWorked, Long phEventHoursWorked, LocalDate date, int totalCount, LocalDateTime periodStart, LocalDateTime periodEnd, User user) {
        this.weekendHoursWorked = weekendHoursWorked;
        this.overTimeHoursWorked = overTimeHoursWorked;
        this.phEventHoursWorked = phEventHoursWorked;
        this.date = date;
        this.totalCount = totalCount;
        this.periodStart = periodStart;
        this.periodEnd = periodEnd;
        this.user = user;
    }

    public Long getAttendanceId() {
        return attendanceId;
    }

    public void setAttendanceId(Long attendanceId) {
        this.attendanceId = attendanceId;
    }

    public Long getWeekendHoursWorked() {
        return weekendHoursWorked;
    }

    public void setWeekendHoursWorked(Long weekendHoursWorked) {
        this.weekendHoursWorked = weekendHoursWorked;
    }

    public Long getOverTimeHoursWorked() {
        return overTimeHoursWorked;
    }

    public void setOverTimeHoursWorked(Long overTimeHoursWorked) {
        this.overTimeHoursWorked = overTimeHoursWorked;
    }

    public Long getPhEventHoursWorked() {
        return phEventHoursWorked;
    }

    public void setPhEventHoursWorked(Long phEventHoursWorked) {
        this.phEventHoursWorked = phEventHoursWorked;
    }

    public LocalDateTime getPeriodStart() {
        return periodStart;
    }

    public void setPeriodStart(LocalDateTime periodStart) {
        this.periodStart = periodStart;
    }

    public LocalDateTime getPeriodEnd() {
        return periodEnd;
    }

    public void setPeriodEnd(LocalDateTime periodEnd) {
        this.periodEnd = periodEnd;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }

    @Override
    public String toString() {
        return "Attendance{" +
                "attendanceId=" + attendanceId +
                ", weekendHoursWorked=" + weekendHoursWorked +
                ", overTimeHoursWorked=" + overTimeHoursWorked +
                ", phEventHoursWorked=" + phEventHoursWorked +
                ", periodStart=" + periodStart +
                ", periodEnd=" + periodEnd +
                '}';
    }
}
