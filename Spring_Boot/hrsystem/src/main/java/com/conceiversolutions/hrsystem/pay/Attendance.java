package com.conceiversolutions.hrsystem.pay;
import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long attendanceId;
    private Long weekendHoursWorked;
    private Long overTimeHoursWorked;
    private Long phEventHoursWorked;
    private LocalDate periodStart;
    private LocalDate periodEnd;
//    @OneToMany(cascade = {CascadeType.ALL}, fetch =FetchType.EAGER)
//    private User user;


    public Attendance() {
    }

    public Attendance(Long attendanceId, Long weekendHoursWorked, Long overTimeHoursWorked, Long phEventHoursWorked, LocalDate periodStart, LocalDate periodEnd) {
        this.attendanceId = attendanceId;
        this.weekendHoursWorked = weekendHoursWorked;
        this.overTimeHoursWorked = overTimeHoursWorked;
        this.phEventHoursWorked = phEventHoursWorked;
        this.periodStart = periodStart;
        this.periodEnd = periodEnd;
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
