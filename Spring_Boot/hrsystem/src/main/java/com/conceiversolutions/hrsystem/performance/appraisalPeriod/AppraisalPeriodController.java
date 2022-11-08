package com.conceiversolutions.hrsystem.performance.appraisalPeriod;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/appraisalPeriod")
public class AppraisalPeriodController {

    private final AppraisalPeriodService appraisalPeriodService;

    public AppraisalPeriodController(AppraisalPeriodService appraisalPeriodService) {
        this.appraisalPeriodService = appraisalPeriodService;
    }

    @PostMapping
    public Long addAppraisalPeriod(@RequestBody AppraisalPeriod appraisalPeriod) throws Exception {
        return appraisalPeriodService.addAppraisalPeriod(appraisalPeriod);
    }

    @GetMapping(path = "{year}")
    public AppraisalPeriod getAppraisalPeriodByYear(@PathVariable("year") String year) {
        return appraisalPeriodService.getAppraisalPeriodByYear(year);
    }

    @GetMapping
    public List<AppraisalPeriod> getAppraisalPeriods() {
        return appraisalPeriodService.getAppraisalPeriods();
    }

    @DeleteMapping(path = "{year}")
    public String deleteAppraisalPeriod(@PathVariable("year") String year) throws Exception {
        return appraisalPeriodService.deleteAppraisalPeriod(year);
    }

    @PutMapping
    public String updateAppraisalPeriod(@RequestParam("startDate") String startDate,
            @RequestParam("endDate") String endDate) throws Exception {
        return appraisalPeriodService.updateAppraisalPeriod(startDate, endDate);
    }

}
