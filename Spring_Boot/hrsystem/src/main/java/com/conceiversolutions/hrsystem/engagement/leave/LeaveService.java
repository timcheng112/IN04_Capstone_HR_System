package com.conceiversolutions.hrsystem.engagement.leave;

import com.conceiversolutions.hrsystem.enums.StatusEnum;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class LeaveService {

    private final LeaveRepository leaveRepository;

//    @Autowired
//    public LeaveService(LeaveRepository leaveRepository) {
//        this.leaveRepository = leaveRepository;
//    }

    public List<Leave> getLeaves() {
        return leaveRepository.findAll();
    }

    public List<Leave> getAllPendingLeaves() {
        System.out.println("LeaveService.getAllPendingLeaves");

        List<Leave> pending = leaveRepository.findJobRequestsByStatus(StatusEnum.PENDING);
        System.out.println("Size of pending leaves list is " + pending.size());

        return null;
    }
}
