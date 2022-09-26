package com.conceiversolutions.hrsystem.pay.payslip;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Service
public class PayslipService {
    private final PayslipRepository payslipRepository;

    @Autowired
    public PayslipService(PayslipRepository payslipRepository) {
        this.payslipRepository = payslipRepository;
    }

    public List<Payslip> getPayslips(){
        return payslipRepository.findAll();
    }

    public Payslip getPayslip(Long id){
        Optional<Payslip> p = payslipRepository.findById(id);
        if(p.isPresent()){
            return p.get();
        }else{
            throw new IllegalStateException("Payslip does not exist.");
        }

    }

    //i need to come back to change this. no dummy user now. need to check if user alr has payslip. if so
    //we will not be adding a new payslip as well.

    public void addNewPayslip(Payslip payslip) {
//        Optional<Payslip> payslipByIdOptional = payslipRepository.findById(payslip.getPayslipId());
//        if(payslipByIdOptional.isPresent()){
//            throw new IllegalStateException("Payslip already exist");
//        }else{
//            payslipRepository.save(payslip);
//        }
//        System.out.println(payslip);
        payslipRepository.save(payslip);
    }


    public void updatePayslip(Payslip payslip, Long payslipId){
        Optional<Payslip> payslipByIdOptional = payslipRepository.findById(payslip.getPayslipId());
        if(payslipByIdOptional.isEmpty()){
            throw new IllegalStateException("Payslip does not exist to be updated.");
        }else{
            Payslip p = getPayslip(payslipId);
            p.setMonthOfPayment(payslip.getMonthOfPayment());
            p.setYearOfPayslip(payslip.getYearOfPayslip());
            p.setDateOfPayment(payslip.getDateOfPayment());
            p.setGrossSalary(payslip.getGrossSalary());
            p.setDateGenerated(payslip.getDateGenerated());
            //not yet
//            p.setPayInformation(payslip.getPayInformation());
//            p.setPayslipPDF(payslip.getPayslipPDF());
            //payslipRepository.save(p);
        }
    }

    public void deletePayslip(@PathVariable("payslipId") Long id){
//        boolean exists = payslipRepository.existsById(id);
//        if(!exists){
//            throw new IllegalStateException("Payslip with payslip id" + id + " does not exist to be deleted.");
//        }else{
//            payslipRepository.deleteById(id);
//        }
        payslipRepository.deleteById(id);
    }

    public void deleteAllPayslips(){
        payslipRepository.deleteAll();
    }
}
