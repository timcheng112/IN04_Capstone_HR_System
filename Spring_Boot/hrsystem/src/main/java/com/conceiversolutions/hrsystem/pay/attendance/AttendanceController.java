package com.conceiversolutions.hrsystem.pay.attendance;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/attendance")
@AllArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

//    @GetMapping(path="/getAllAttendances")
//    public List<Attendance> getAllAttendance(){
//    }
}
