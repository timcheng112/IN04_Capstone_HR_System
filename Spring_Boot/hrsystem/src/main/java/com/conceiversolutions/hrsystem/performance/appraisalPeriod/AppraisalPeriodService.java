package com.conceiversolutions.hrsystem.performance.appraisalPeriod;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppraisalPeriodService {

    @Autowired
    private final AppraisalPeriodRepository appraisalPeriodRepository;

    public AppraisalPeriodService(AppraisalPeriodRepository appraisalPeriodRepository) {
        this.appraisalPeriodRepository = appraisalPeriodRepository;
    }

    public Long addAppraisalPeriod(AppraisalPeriod appraisalPeriod) throws Exception {
        Optional<AppraisalPeriod> existingPeriod = appraisalPeriodRepository
                .findAppraisalPeriodByYear(appraisalPeriod.getYear());
        if (existingPeriod.isPresent()) {
            throw new IllegalStateException("Appraisal period for year " + appraisalPeriod.getYear());
        } else {
            AppraisalPeriod ap = appraisalPeriodRepository.save(appraisalPeriod);
            return ap.getAppraisalPeriodId();
        }
    }

    public AppraisalPeriod getAppraisalPeriodByYear(String year) {
        Optional<AppraisalPeriod> existingAppraisal = appraisalPeriodRepository.findAppraisalPeriodByYear(year);
        if (existingAppraisal.isPresent()) {
            AppraisalPeriod appraisalPeriod = existingAppraisal.get();
            return appraisalPeriod;
        } else {
            throw new IllegalStateException("Appraisal period for year " + year + " does not exist");
        }
    }

    public List<AppraisalPeriod> getAppraisalPeriods() {
        return appraisalPeriodRepository.findAll();
    }

    public String deleteAppraisalPeriod(String year) {
        AppraisalPeriod ap = getAppraisalPeriodByYear(year);
        appraisalPeriodRepository.deleteById(ap.getAppraisalPeriodId());
        return "Appraisal period for " + ap.getYear() + " has been deleted";
    }

    @Transactional
    public String updateAppraisalPeriod(String startDate, String endDate) throws Exception {

        Optional<AppraisalPeriod> existingAp = appraisalPeriodRepository
                .findAppraisalPeriodByYear(endDate.substring(0, 4));

        if (existingAp.isPresent()) {
            AppraisalPeriod ap = existingAp.get(); 
            ap.setStartDate(LocalDate.parse(startDate));
            ap.setEndDate(LocalDate.parse(endDate));
            return "Appraisal period for " + ap.getYear() + " has been changed";
        } else {
            throw new IllegalStateException("Appraisal period does not exist");
        }
    }

}
