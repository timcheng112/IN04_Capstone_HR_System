package com.conceiversolutions.hrsystem.pay.payinformation;

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

    @PostMapping(path = "/addPayInformation")
    public void addNewPayInformation(@RequestParam("userId") Long userId, @RequestBody PayInformation payInformation) {
        payInformationService.addNewPayInformation(userId, payInformation);
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
