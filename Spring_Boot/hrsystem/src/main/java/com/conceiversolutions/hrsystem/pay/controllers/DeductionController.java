package com.conceiversolutions.hrsystem.pay.controllers;

import com.conceiversolutions.hrsystem.pay.entities.Deduction;
import com.conceiversolutions.hrsystem.pay.service.DeductionService;
import com.conceiversolutions.hrsystem.pay.service.DeductionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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


}
