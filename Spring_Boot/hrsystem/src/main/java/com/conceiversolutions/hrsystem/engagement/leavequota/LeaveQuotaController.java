package com.conceiversolutions.hrsystem.engagement.leavequota;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping(path="api/leavequota")
@AllArgsConstructor
public class LeaveQuotaController {
    private final LeaveQuotaService leaveQuotaService;


}
