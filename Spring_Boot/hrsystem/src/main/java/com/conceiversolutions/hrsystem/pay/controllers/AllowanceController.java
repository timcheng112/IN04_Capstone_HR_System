package com.conceiversolutions.hrsystem.pay.controllers;

import com.conceiversolutions.hrsystem.pay.entities.Allowance;
import com.conceiversolutions.hrsystem.pay.entities.Allowance;
import com.conceiversolutions.hrsystem.pay.service.AllowanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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


}
