package com.conceiversolutions.hrsystem.pay.payinformation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/pay/payinfo")
public class PayInformationController {
    private final PayInformationService payInformationService;

    @Autowired
    public PayInformationController(PayInformationService payInformationService) {
        this.payInformationService = payInformationService;
    }

    @GetMapping
    public List<PayInformation> getAllPayInformation() {
        return payInformationService.getAllPayInformation();
    }

    @GetMapping(path = "{payInformationId}")
    public PayInformation getPayInformation(@PathVariable("payInformationId") Long id) {
        return payInformationService.getPayInformation(id);
    }

    @PostMapping(path = "/addPayInformation")
    public void addNewPayInformation(@RequestParam("userId") Long userId, @RequestBody PayInformation payInformation) {
        payInformationService.addNewPayInformation(userId, payInformation);
    }

    // @PutMapping(path = "{payInformationId}")
    // public void updatePayInformation(@RequestBody PayInformation payInformation,
    // @PathVariable("payslipId") Long payslipId ){
    // payInformationService.updatePayInformation(payInformation, payslipId);
    // }

    @DeleteMapping(path = "{payslipId}")
    public void deletePayslip(@PathVariable("payslipId") Long id) {
        payInformationService.deletePayInformation(id);
    }

    @PutMapping(path = "/removeFromPayroll")
    public void removeFromPayroll(@RequestParam("userId") Long userId) {
        payInformationService.removeFromPayroll(userId);
    }
    @GetMapping(path = "/user/{userId}")
    public PayInformation getUserPayInformation(@PathVariable("userId") Long userId) throws Exception {
        return payInformationService.getUserPayInformation(userId);
    }

    @GetMapping(path = "position/{positionId}")
    public PayInformation getPositionPayInformation(@PathVariable("positionId") Long positionId) throws Exception {
        return payInformationService.getPositionPayInformation(positionId);
    }

    @GetMapping(path = "/getEmployeesAverageSalary")
    public BigDecimal getEmployeesAverageSalary(){ return payInformationService.getEmployeesAverageSalary(); }
}
