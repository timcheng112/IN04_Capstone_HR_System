package com.conceiversolutions.hrsystem.pay.allowance;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Service
public class AllowanceService {
    private final AllowanceRepository allowanceRepository;

    @Autowired
    public AllowanceService(AllowanceRepository allowanceRepository) {
        this.allowanceRepository = allowanceRepository;
    }


    public List<Allowance> getAllAllowances(){
        return allowanceRepository.findAll();
    }

    public Allowance getAllowance(Long id){
        Optional<Allowance> allowanceOptional = allowanceRepository.findById(id);
        if(allowanceOptional.isPresent()){
            return allowanceOptional.get();
        }else{
            throw new IllegalStateException("Pay Information does not exist.");
        }

    }


    //i need to come back to change this. no dummy user now. need to check if user alr has payslip. if so
    //we will not be adding a new payinfo as well.
    public void addNewAllowance(Allowance allowance) {
        allowanceRepository.save(allowance);
    }

    public void updateAllowance(Allowance allowance, Long allowanceId){
        Optional<Allowance> allowanceByIdOptional = allowanceRepository.findById(allowanceId);
        if(allowanceByIdOptional.isEmpty()){
            throw new IllegalStateException("Payslip does not exist to be updated.");
        }else{
            Allowance a = getAllowance(allowanceId);
            a.setAmount(allowance.getAmount());
            a.setAllowanceName(allowance.getAllowanceName());
            a.setRemarks(allowance.getRemarks());

            //not yet
            //a.setPayInfo(allowance.getPayInfo());
            //allowanceRepository.save(p);
        }
    }

    public void deleteAllowance(@PathVariable("allowanceId") Long allowanceId){
//        Optional<Allowance> a1 = allowanceRepository.findById(allowanceId);
//        if(a1.isPresent()){
//            Allowance realA = a1.get();
//            realA.getPayInfo().getAllowance().remove(realA);
//        }
        allowanceRepository.deleteById(allowanceId);
    }

    //user
    public void deleteUsersAllowances(){
        allowanceRepository.deleteAll();
    }

    //admin
    public void deleteAllAllowances(){
        allowanceRepository.deleteAll();
    }
}
