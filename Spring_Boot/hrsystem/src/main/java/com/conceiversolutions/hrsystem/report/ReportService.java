package com.conceiversolutions.hrsystem.report;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@AllArgsConstructor
public class ReportService {


    private final ReportRepository reportRepository;

    public List<Report> getAllReports(){
        return reportRepository.findAll();
    }

}
