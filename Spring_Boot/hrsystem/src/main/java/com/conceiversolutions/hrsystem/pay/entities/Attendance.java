package com.conceiversolutions.hrsystem.pay.entities;
import javax.persistence.*;
import java.time.LocalDate;
import com.conceiversolutions.hrsystem.user.user.User;


@Entity
@Table(name="attendance")
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
    @Column(name="period_start", nullable = false)
    private LocalDate periodStart;
    @Column(name="period_end", nullable = false)
    private LocalDate periodEnd;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;


    public Attendance() {
    }

    public Attendance(Long attendanceId, Long weekendHoursWorked, Long overTimeHoursWorked, Long phEventHoursWorked, LocalDate periodStart, LocalDate periodEnd, User user) {
        this.attendanceId = attendanceId;
        this.weekendHoursWorked = weekendHoursWorked;
        this.overTimeHoursWorked = overTimeHoursWorked;
        this.phEventHoursWorked = phEventHoursWorked;
        this.periodStart = periodStart;
        this.periodEnd = periodEnd;
        this.user = user;
    }

    public Attendance(Long weekendHoursWorked, Long overTimeHoursWorked, Long phEventHoursWorked, LocalDate periodStart, LocalDate periodEnd, User user) {
        this.weekendHoursWorked = weekendHoursWorked;
        this.overTimeHoursWorked = overTimeHoursWorked;
        this.phEventHoursWorked = phEventHoursWorked;
        this.periodStart = periodStart;
        this.periodEnd = periodEnd;
        this.user = user;
    }

    public Attendance(Long weekendHoursWorked, Long overTimeHoursWorked, Long phEventHoursWorked, LocalDate periodStart, LocalDate periodEnd) {
        this.weekendHoursWorked = weekendHoursWorked;
        this.overTimeHoursWorked = overTimeHoursWorked;
        this.phEventHoursWorked = phEventHoursWorked;
        this.periodStart = periodStart;
        this.periodEnd = periodEnd;
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

    public LocalDate getPeriodStart() {
        return periodStart;
    }

    public void setPeriodStart(LocalDate periodStart) {
        this.periodStart = periodStart;
    }

    public LocalDate getPeriodEnd() {
        return periodEnd;
    }

    public void setPeriodEnd(LocalDate periodEnd) {
        this.periodEnd = periodEnd;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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
