package com.conceiversolutions.hrsystem.pay.attendance;


import net.bytebuddy.asm.Advice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    LocalDate timeNow = LocalDate.now();
    //for each user need to query attendance for today by user
    @Query("SELECT a FROM Attendance a WHERE a.user.userId = ?1 AND a.date = ?2")
    List<Attendance> attendanceByUserandAttendanceToday(Long userId, LocalDate timeNow);
    //you can just a.user.attribute no need inner join
//    @Query("SELECT a FROM Attendance a INNER JOIN User u WHERE u.user_id = ?1")
//    Optional<Attendance> attendanceByUserandAttendanceToday(Long userId, LocalDate timeNow);

    @Query("SELECT a FROM Attendance a WHERE a.date = ?1")
    List<Attendance> attendanceToday(LocalDate timeNow);




}
