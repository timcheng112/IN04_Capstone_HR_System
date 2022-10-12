package com.conceiversolutions.hrsystem.jobmanagement.jobposting;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/jobposting")
@AllArgsConstructor
public class JobPostingController {
    private final JobPostingService jobPostingService;


}
