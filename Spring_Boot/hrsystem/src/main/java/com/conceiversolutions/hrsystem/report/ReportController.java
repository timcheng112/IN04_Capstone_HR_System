package com.conceiversolutions.hrsystem.report;


import com.conceiversolutions.hrsystem.notification.NotificationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/report")
@AllArgsConstructor
public class ReportController {

    private final ReportService reportService;


    @GetMapping(path ="/allReports")
    public List<Report> getAllReports(){
        System.out.println("ReportService.getAllReports");
        return reportService.getAllReports();
    }



}
