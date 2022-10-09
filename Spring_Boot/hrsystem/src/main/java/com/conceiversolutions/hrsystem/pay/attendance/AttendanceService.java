package com.conceiversolutions.hrsystem.pay.attendance;


import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;
import com.conceiversolutions.hrsystem.user.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import java.time.Instant;
import java.time.temporal.Temporal;
import java.time.temporal.ChronoUnit;

@Service
@AllArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final UserRepository userRepository;
    private final UserService userService;

//need to figure out how it looks on front end first
//check if today, they have any attendance first
//and on shift, if yes then add
//need to tally
//check if need to use ZonedDateTime
//take out lunch hour 9-1= 8 hrs from 9-6

//FULL-TIME
//Allowance
//Basic Monthly Rate, Overtime Hourly Pay
//Deduction
//Self Help Group Contribution Type

//PART-TIME
//Allowance
//Basic Hourly Rate, Weekend Hourly Rate, Overtime Hourly Rate, PH/Event Hourly Rate
//Deduction
//Self Help Group Contribution Type

//INTERN
//Allowance
//Basic Monthly Rate, Overtime Hourly Pay

//CONTRACT
//Allowance
//PH/Event Hourly Rate

    public List<Attendance> getAllAttendance(){
        return attendanceRepository.findAll();
    }
    public String addAttendance(Attendance attendance){

        //check if they are on leave // wait for sh's leave.
        //if(onleave){
        //    return "user is on leave. cant clock in"
        // }
        //clock in store hour for day. in payroll, tabulate total hours. should i tabulate pay here..?
        //they need to pass this info to payroll. need to check if today is weekday, weekend or event for pay
        attendanceRepository.saveAndFlush(attendance);
        return "User is added. Employee id = " + attendance.getUser().getUserId();

    }

    public String deleteAttendance(Long attendanceId){

        Optional<Attendance> attend = attendanceRepository.findById(attendanceId);
        if(attend.isPresent()){
            Attendance attendance = attend.get();
            attendanceRepository.delete(attendance);
            return "Attendance is deleted for this user";
        }else{
            return "Attendance not deleted as there is no such attendance";
        }

        //

    }

//    public List<Attendance> findAttendanceByUserAttendance(){
//
//        //find by user and attendance for the day
//        //need jquery
//
//    }

    //for part time
    public void countAttendanceForToday(Attendance attendance ){

//        User u1 = userRepository.findById(attendance.getUser().getUserId()).get();
        User u1 = userService.getUser(attendance.getUser().getUserId());
        //will have user

        //Check time for today
        //find
        LocalDateTime dt1 = attendance.getPeriodStart();
        LocalDateTime dt2 = attendance.getPeriodEnd();
        //https://stackoverflow.com/questions/25747499/java-8-difference-between-two-localdatetime-in-multiple-units
        //https://docs.oracle.com/javase/tutorial/datetime/iso/period.html
        //dont use minus(). gives u back 1 LDT and u have to translate again BOO

//        test -ve for between
//        LocalDateTime localDT1 = LocalDateTime.parse("1979-12-09T09:00:25");
//        LocalDateTime localDT2 = LocalDateTime.parse("1979-12-09T18:00:24");
//        Long hours = ChronoUnit.HOURS.between(localDT1,localDT2);
//        System.out.println(hours);
        if(dt2.isAfter(dt1)){
//            LocalDateTime timeWorked =  dt2. dt1;
            //Chronos hours return Long
            //minus 1 cos lunch break
            Long hours = ChronoUnit.HOURS.between(dt1,dt2);
            Integer clocked = hours.intValue() - 1;

            //need to check with shift which kind of shift is it. event or normal for payroll
            if(clocked > 8){
                Integer ot = clocked -8;
                attendance.setPhEventHoursWorked(ot.longValue());
                attendance.setTotalCount(attendance.getTotalCount() + clocked + ot);
            }else{
                attendance.setTotalCount(attendance.getTotalCount() + clocked);
            }

        }
        //they need to pass this info to payroll. need to check if today is weekday, weekend or event for pay
        attendanceRepository.saveAndFlush(attendance);

    }

//    //monthly
//    public String countPay(Long userId){
//
//    }





}
