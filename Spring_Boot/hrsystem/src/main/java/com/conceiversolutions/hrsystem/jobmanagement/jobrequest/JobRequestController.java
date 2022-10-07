package com.conceiversolutions.hrsystem.jobmanagement.jobrequest;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/jobrequest")
@AllArgsConstructor
public class JobRequestController {
    private final JobRequestService jobRequestService;


}
