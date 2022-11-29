// package com.conceiversolutions.hrsystem.pay.attendance;

// import lombok.AllArgsConstructor;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @CrossOrigin("*")
// @RestController
// @RequestMapping(path = "api/attendance")
// @AllArgsConstructor
// public class AttendanceController {

//     private final AttendanceService attendanceService;

//     @GetMapping(path="/getAllAttendances")
//     public List<Attendance> getAllAttendance(){
//         return attendanceService.getAllAttendance();
//     }
//     @PostMapping(path = "/addAttendance")
//     public String addAttendance(@RequestParam("attendance") Attendance attendance){
//         return attendanceService.addAttendance(attendance);
//     }

//     //for one instance.. need to do jquery for other deletions
//     @DeleteMapping(path = "/deleteAttendance")
//     public String deleteAttendance(@PathVariable Long attendanceId){
//         return attendanceService.deleteAttendance(attendanceId);
//     }

//     @GetMapping(path = "/nfc")
//     public String callNFC(){
//         return attendanceService.callNFC();
// //        return "ran";
//     }
// }
