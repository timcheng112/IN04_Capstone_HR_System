package com.conceiversolutions.hrsystem.pay.allowance;

import com.conceiversolutions.hrsystem.pay.deduction.Deduction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/pay/allowance")
public class AllowanceController {
    private final AllowanceService allowanceService;

    @Autowired
    public AllowanceController(AllowanceService allowanceService) {
        this.allowanceService = allowanceService;
    }

    @GetMapping
    public List<Allowance> getAllAllowance() {
        return allowanceService.getAllAllowances();
    }

    @GetMapping(path = "{allowanceId}")
    public Allowance getAllowance(@PathVariable("allowanceId") Long allowanceId){
        return allowanceService.getAllowance(allowanceId);
    }


    @PostMapping
    public void addNewAllowance(@RequestBody Allowance allowance) {
        allowanceService.addNewAllowance(allowance);
    }

    @PutMapping(path = "{allowanceId}")
    public void updateAllowance(@RequestBody Allowance Allowance, @PathVariable("allowanceId") Long allowanceId ){
        allowanceService.updateAllowance(Allowance, allowanceId);
    }

    @DeleteMapping(path = "{allowanceId}")
    public void deleteAllowance(@PathVariable("allowanceId") Long allowanceId){
        allowanceService.deleteAllowance(allowanceId);
    }

    @DeleteMapping
    public void deleteAllAllowances(){
        allowanceService.deleteAllAllowances();
    }

    @GetMapping(path = "/findUserAllowanceByMonth")
    public List<Allowance> findUserAllowanceByMonth(@RequestParam("userId") Long userId, @RequestParam("dateString") String date){
        LocalDate localDate = LocalDate.parse(date);
        System.out.println("date for findUserAllowanceByMonth: " + localDate);
        return allowanceService.findUserAllowanceByMonth(userId, localDate);
    }

    @GetMapping(path = "/findAllowanceByMonth")
    public List<Allowance> findAllowanceByMonth(@RequestParam("dateString") String date){
        LocalDate localDate = LocalDate.parse(date);
        System.out.println("date for findAllowanceByMonth: " + localDate);
        return allowanceService.findAllowanceByMonth(localDate);
    }

    @PostMapping(path="/createAllowances")
    public Boolean createAllowances(@RequestParam("userId") Long userId, @RequestBody List<Allowance> allowances){
        return allowanceService.createAllowances(allowances, userId);
    }

    @DeleteMapping(path="/deleteAllowanceList")
    public Boolean deleteAllowanceList(@RequestParam("idList") List<String> idList) {
        System.out.println("idList: "+ idList);
        List<Long> numbers = new ArrayList<Long>();
        for (String string : idList) {
            System.out.println("string: " + string);
            numbers.add(Long.parseLong(string));
        }
        return allowanceService.deleteAllowanceList(numbers);
    }
}