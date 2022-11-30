package com.conceiversolutions.hrsystem.pay.allowance;

import com.conceiversolutions.hrsystem.pay.payinformation.PayInformation;
import com.conceiversolutions.hrsystem.pay.payinformation.PayInformationRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AllowanceService {
    private final AllowanceRepository allowanceRepository;
    private final PayInformationRepository payInformationRepository;

    public List<Allowance> getAllAllowances(){
        return allowanceRepository.findAll();
    }

    public Allowance getAllowance(Long id){
        Optional<Allowance> allowanceOptional = allowanceRepository.findById(id);
        if(allowanceOptional.isPresent()){
            return allowanceOptional.get();
        }else{
            throw new IllegalStateException("Allowance of id " + id + " does not exist.");
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

    public List<Allowance> findUserAllowanceByMonth(Long userId, LocalDate month) {
        LocalDateTime start = LocalDateTime.of(LocalDate.of(month.getYear(), month.getMonthValue(), 1), LocalTime.of(0,0));
        LocalDateTime end = LocalDateTime.of(LocalDate.of(month.getYear(), month.getMonthValue(), month.lengthOfMonth()), LocalTime.of(23, 59, 59));

        List<Allowance> allowanceList = allowanceRepository.findUserAllowanceByMonth(userId, start, end);

        if (allowanceList.isEmpty()) {
            throw new IllegalStateException(
                    "Cannot find allowances for user with id:" + userId + "in the month of " + month
            );
        }
        return allowanceList;
    }

    public List<Allowance> findAllowanceByMonth(LocalDate month){
        LocalDateTime start = LocalDateTime.of(LocalDate.of(month.getYear(), month.getMonthValue(), 1), LocalTime.of(0,0));
        LocalDateTime end = LocalDateTime.of(LocalDate.of(month.getYear(), month.getMonthValue(), month.lengthOfMonth()), LocalTime.of(23, 59, 59));

        List<Allowance> allowanceList = allowanceRepository.findAllowanceByMonth(start, end);

        if (allowanceList.isEmpty()) {
            throw new IllegalStateException(
                    "Cannot find allowances in the month of " + month
            );
        }
        return allowanceList;
    }

    public Boolean createAllowances(List<Allowance> allowances, Long userId) {
        System.out.println("AllowanceService.createAllowances");
        System.out.println("allowances = " + allowances);
        Optional<PayInformation> payInformation = payInformationRepository.findPayInformationByUserId(userId);
        PayInformation payInfo = payInformation.get();
        List<Allowance> piAllowanceList = payInfo.getAllowance();
        for (Allowance allowance : allowances) {
            //set relationships:
            piAllowanceList.add(allowance);
        }
        payInfo.setAllowance(piAllowanceList);
        allowanceRepository.saveAll(allowances);
        return true;
    }
    public Boolean deleteAllowanceList(List<Long> idList) {
        System.out.println("AllowanceService.deleteAllowanceList");
        System.out.println("idList = " + idList);
        for (Long id : idList) {

            //first: remove relationship from payinfo to allowance.
            Optional<PayInformation> payInformation = payInformationRepository.findPayInformationByAllowanceId(id);

            if (payInformation.isPresent()) {
                //check if found allowance
                PayInformation payinfo = payInformation.get();
                List<Allowance> allowances = payinfo.getAllowance();
//                List<Allowance> newList = new ArrayList<>();

                //remove allowance from payinfo
                for (Allowance allowance: allowances) {
//                    if (!allowance.getAllowanceId().equals(id)) {
//                        newList.add(allowance);
//                    }
                    if (allowance.getAllowanceId().equals(id)){
                        allowances.remove(allowance);
                        break;
                    }
                }
//                allowanceRepository.deleteById(id);
                payinfo.setAllowance(allowances);
                payInformationRepository.saveAndFlush(payinfo);
            } else {
                //pay info not found
                throw new IllegalStateException(
                        "Could not find pay information associated with allowance with id:" + id
                );
            }

            //we are not using templates so no need to care about that r/s.

            //delete payinfo
//            allowanceRepository.deleteById(id);
        }
//        allowanceRepository.deleteAllById(idList);
        return true;
    }
}
