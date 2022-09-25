package com.conceiversolutions.hrsystem.pay.controllers;

import com.conceiversolutions.hrsystem.pay.entities.PayInformation;
import com.conceiversolutions.hrsystem.pay.entities.Payslip;
import com.conceiversolutions.hrsystem.pay.service.PayInformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/pay/payinfo")
public class PayInformationController {

    private final PayInformationService payInformationService;

    @Autowired
    public PayInformationController(PayInformationService payInformationService){
        this.payInformationService = payInformationService;
    }

    @GetMapping
    public List<PayInformation> getAllPayInformation() {
        return payInformationService.getAllPayInformation();
    }

    @GetMapping(path = "{payInformationId}")
    public PayInformation getPayInformation(@PathVariable("payInformationId") Long id){
        return payInformationService.getPayInformation(id);
    }

    @PostMapping
    public void addNewPayInformation(@RequestBody PayInformation payInformation) {
        payInformationService.addNewPayInformation(payInformation);
    }

//    @PutMapping(path = "{payInformationId}")
//    public void updatePayInformation(@RequestBody PayInformation payInformation, @PathVariable("payslipId") Long payslipId ){
//        payInformationService.updatePayInformation(payInformation, payslipId);
//    }

    @DeleteMapping(path = "{payslipId}")
    public void deletePayslip(@PathVariable("payslipId") Long id){
        payInformationService.deletePayInformation(id);
    }

}
