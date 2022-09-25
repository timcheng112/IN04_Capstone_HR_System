package com.conceiversolutions.hrsystem.pay.service;

import com.conceiversolutions.hrsystem.pay.entities.PayInformation;
import com.conceiversolutions.hrsystem.pay.entities.Payslip;
import com.conceiversolutions.hrsystem.pay.repositories.PayInformationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Service
public class PayInformationService {

    private final PayInformationRepository payInformationRepository;

    @Autowired
    public PayInformationService(PayInformationRepository payInformationRepository) {
        this.payInformationRepository = payInformationRepository;
    }

    public List<PayInformation> getAllPayInformation(){
        return payInformationRepository.findAll();
    }

    public PayInformation getPayInformation(Long id){
        Optional<PayInformation> payInfo = payInformationRepository.findById(id);
        if(payInfo.isPresent()){
            return payInfo.get();
        }else{
            throw new IllegalStateException("Pay Information does not exist.");
        }

    }


    //i need to come back to change this. no dummy user now. need to check if user alr has payslip. if so
    //we will not be adding a new payinfo as well.
    public void addNewPayInformation(PayInformation payInformation) {
        payInformationRepository.save(payInformation);
    }

//    public void updatePayInformation(PayInformation payInformation, Long payInformationId){
//        Optional<PayInformation> payInfoByIdOptional = payInformationRepository.findById(payInformationId);
//        if(!payInfoByIdOptional.isPresent()){
//            throw new IllegalStateException("Payslip does not exist to be updated.");
//        }else{
//            PayInformation p = getPayInformation(payInformationId);
//            p.setPayType(payInformation.getPayType());
//            p.setBasicHourlyPay(payInformation.getBasicHourlyPay());
//            p.setEventPhHourlyPay(payInformation.getEventPhHourlyPay());
//            p.setOvertimeHourlyPay(payInformation.getOvertimeHourlyPay());
//            p.setPaymentMethod(payInformation.getPaymentMethod());
//            p.setSelfHelpGroupContributionType(payInformation.getSelfHelpGroupContributionType());
//            p.setWeekendHourlyPay(payInformation.getWeekendHourlyPay());
//            //not yet
////            p.setPayslip(payInformation.getPayslip());
////            p.setAllowance(payInformation.getAllowance());
////            p.setDeduction(payInformation.getDeduction());
//            //not yet
//            //payInformationRepository.save(p);
//        }
//    }

    public void deletePayInformation(@PathVariable("payInformationId") Long payInformationId){
        payInformationRepository.deleteById(payInformationId);
    }

    public void deleteAllPayInformation(){
        payInformationRepository.deleteAll();
    }
}
