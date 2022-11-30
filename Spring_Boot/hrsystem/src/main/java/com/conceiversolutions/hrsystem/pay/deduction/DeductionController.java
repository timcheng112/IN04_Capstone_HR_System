package com.conceiversolutions.hrsystem.pay.deduction;

import com.conceiversolutions.hrsystem.pay.allowance.Allowance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/pay/deduction")
public class DeductionController {
    private final DeductionService deductionService;

    @Autowired
    public DeductionController(DeductionService deductionService) {
        this.deductionService = deductionService;
    }

    @GetMapping
    public List<Deduction> getAllDeductions() {
        return deductionService.getAllDeductions();
    }

    @GetMapping(path = "{deductionId}")
    public Deduction getDeduction(@PathVariable("deductionId") Long deductionId){
        return deductionService.getDeduction(deductionId);
    }

    @PostMapping
    public void addNewDeduction(@RequestBody Deduction Deduction) {
        deductionService.addNewDeduction(Deduction);
    }

    @PutMapping(path = "{deductionId}")
    public void updateDeduction(@RequestBody Deduction Deduction, @PathVariable("deductionId") Long deductionId ){
        deductionService.updateDeduction(Deduction, deductionId);
    }

    @DeleteMapping(path = "{deductionId}")
    public void deleteDeduction(@PathVariable("deductionId") Long deductionId){
        deductionService.deleteDeduction(deductionId);
    }

    @DeleteMapping
    public void deleteAllDeductions(){
        deductionService.deleteAllDeductions();
    }

    @GetMapping(path = "/findUserDeductionByMonth")
    public List<Deduction> findUserDeductionByMonth(@RequestParam("userId") Long userId, @RequestParam("dateString") String date){
        LocalDate localDate = LocalDate.parse(date);
        System.out.println("date for findUserDeductionByMonth: " + localDate);
        return deductionService.findUserDeductionByMonth(userId, localDate);
    }

    @GetMapping(path = "/findDeductionByMonth")
    public List<Deduction> findDeductionByMonth(@RequestParam("dateString") String date){
        LocalDate localDate = LocalDate.parse(date);
        System.out.println("date for findDeductionByMonth: " + localDate);
        return deductionService.findDeductionByMonth(localDate);
    }

    @PostMapping(path="/createDeductions")
    public Boolean createDeductions(@RequestParam("userId") Long userId, @RequestBody List<Deduction> deductions){
        return deductionService.createDeductions(deductions, userId);
    }

    @DeleteMapping(path="/deleteDeductionList")
    public Boolean deleteDeductionList(@RequestParam("idList") List<String> idList) {
        System.out.println("idList: "+ idList);
        List<Long> numbers = new ArrayList<Long>();
        for (String string : idList) {
            System.out.println("string: " + string);
            numbers.add(Long.parseLong(string));
        }
        return deductionService.deleteDeductionList(numbers);
    }
}