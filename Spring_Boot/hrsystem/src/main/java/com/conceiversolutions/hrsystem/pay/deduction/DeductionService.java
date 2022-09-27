package com.conceiversolutions.hrsystem.pay.deduction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Service
public class DeductionService {
    private final DeductionRepository deductionRepository;


    @Autowired
    public DeductionService(DeductionRepository deductionRepository) {
        this.deductionRepository = deductionRepository;
    }

    public List<Deduction> getAllDeductions(){
        return deductionRepository.findAll();
    }

    public Deduction getDeduction(Long deductionId){
        Optional<Deduction> deductionOptional = deductionRepository.findById(deductionId);
        if(deductionOptional.isPresent()){
            return deductionOptional.get();
        }else{
            throw new IllegalStateException("Pay Information does not exist.");
        }

    }


    //i need to come back to change this. no dummy user now. need to check if user alr has payslip. if so
    //we will not be adding a new payinfo as well.
    public void addNewDeduction(Deduction Deduction) {
        deductionRepository.save(Deduction);
    }

    public void updateDeduction(Deduction deduction, Long deductionId){
        Optional<Deduction> deductionByIdOptional = deductionRepository.findById(deductionId);
        if(deductionByIdOptional.isEmpty()){
            throw new IllegalStateException("Payslip does not exist to be updated.");
        }else{
            Deduction d = getDeduction(deductionId);
            d.setDeductionName(deduction.getDeductionName());
            d.setAmount(deduction.getAmount());
            d.setRemarks(deduction.getRemarks());

            //not yet
//            d.setPayInfo(deduction.getPayInfo());
            //deductionRepository.save(d);
            //need to change in list too
        }
    }

    public void deleteDeduction(@PathVariable("deductionId") Long deductionId){
        Optional<Deduction> d1 = deductionRepository.findById(deductionId);
        if(d1.isPresent()){
            Deduction d = d1.get();
            d.getPayInfo().getDeduction().remove(d);
        }
        deductionRepository.deleteById(deductionId);
    }

    public void deleteAllDeductions(){
        deductionRepository.deleteAll();
    }
}
