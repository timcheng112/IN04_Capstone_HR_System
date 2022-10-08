package com.conceiversolutions.hrsystem.pay.attendance;


import com.conceiversolutions.hrsystem.user.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final UserRepository userRepository;

}
