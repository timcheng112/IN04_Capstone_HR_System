package com.conceiversolutions.hrsystem.performance.appraisal;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/appraisal")
@AllArgsConstructor
public class AppraisalController {

    private final AppraisalService appraisalService;

    public List<Appraisal> getAllAppraisals() {
        return appraisalService.getAllAppraisals();
    }

    public String createAppraisal(@RequestBody Appraisal appraisal){
        return appraisalService.createAppraisal(appraisal);
    }

    public Appraisal getAppraisal(Long appraisalId){
        return appraisalService.getAppraisal(appraisalId);
    }

    public String deleteAppraisal(Long appraisalId, Long userId){
        return appraisalService.deleteAppraisal(appraisalId,userId);
    }
    public void editAppraisal(){

    }



}