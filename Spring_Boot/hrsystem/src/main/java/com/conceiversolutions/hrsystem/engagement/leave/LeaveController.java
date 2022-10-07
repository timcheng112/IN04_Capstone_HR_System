package com.conceiversolutions.hrsystem.engagement.leave;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path="api/leaves")
@AllArgsConstructor
public class LeaveController {

    private final LeaveService leaveService;
//
//    @Autowired
//    public LeaveController(LeaveService leaveService) {
//        this.leaveService = leaveService;
//    }

    @GetMapping
    public List<Leave> getLeaves() {
        return leaveService.getLeaves();
    }
}
