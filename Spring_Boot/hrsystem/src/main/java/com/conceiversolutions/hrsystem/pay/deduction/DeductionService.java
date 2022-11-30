package com.conceiversolutions.hrsystem.pay.deduction;

import com.conceiversolutions.hrsystem.pay.allowance.Allowance;
import com.conceiversolutions.hrsystem.pay.payinformation.PayInformation;
import com.conceiversolutions.hrsystem.pay.payinformation.PayInformationRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class DeductionService {
    private final DeductionRepository deductionRepository;
    private final PayInformationRepository payInformationRepository;

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
        }
        deductionRepository.deleteById(deductionId);
    }

    public void deleteAllDeductions(){
        deductionRepository.deleteAll();
    }

    public List<Deduction> findUserDeductionByMonth(Long userId, LocalDate month) {
        LocalDateTime start;
        LocalDateTime end;
        // day is after 7th
        if (month.getDayOfMonth() >= 7) {
            start = LocalDateTime.of(LocalDate.of(month.getYear(), month.getMonthValue(), 7),
                    LocalTime.of(0, 0));
            if (month.getMonthValue() == 12) {
                end = LocalDateTime.of(
                        LocalDate.of(month.getYear() + 1, 1, 6), LocalTime.of(23, 59, 59));

            } else {
                end = LocalDateTime.of(
                        LocalDate.of(month.getYear(), month.getMonthValue() + 1, 6), LocalTime.of(23, 59, 59));
            }
        } else { //day is before the 7th, which means its still last month
            if (month.getMonthValue() == 1) {
                start = LocalDateTime.of(LocalDate.of(month.getYear() - 1, 12, 7),
                    LocalTime.of(0, 0));
            } else {
                start = LocalDateTime.of(LocalDate.of(month.getYear(), month.getMonthValue() - 1, 7),
                    LocalTime.of(0, 0));
            }
            end = LocalDateTime.of(LocalDate.of(month.getYear(), month.getMonthValue(), 6),
                    LocalTime.of(23, 59, 59));
        }

        List<Deduction> deductionList = deductionRepository.findUserDeductionByMonth(userId, start, end);

        if (deductionList.isEmpty()) {
            throw new IllegalStateException(
                    "Cannot find deductions for user with id:" + userId + "in the month of " + month
            );
        }
        return deductionList;
    }

    public List<Deduction> findDeductionByMonth(LocalDate month){
        LocalDateTime start;
        LocalDateTime end;
        // day is after 7th
        if (month.getDayOfMonth() >= 7) {
            start = LocalDateTime.of(LocalDate.of(month.getYear(), month.getMonthValue(), 7),
                    LocalTime.of(0, 0));
            if (month.getMonthValue() == 12) {
                end = LocalDateTime.of(
                        LocalDate.of(month.getYear() + 1, 1, 6), LocalTime.of(23, 59, 59));

            } else {
                end = LocalDateTime.of(
                        LocalDate.of(month.getYear(), month.getMonthValue() + 1, 6), LocalTime.of(23, 59, 59));
            }
        } else { //day is before the 7th, which means its still last month
            if (month.getMonthValue() == 1) {
                start = LocalDateTime.of(LocalDate.of(month.getYear() - 1, 12, 7),
                    LocalTime.of(0, 0));
            } else {
                start = LocalDateTime.of(LocalDate.of(month.getYear(), month.getMonthValue() - 1, 7),
                    LocalTime.of(0, 0));
            }
            end = LocalDateTime.of(LocalDate.of(month.getYear(), month.getMonthValue(), 6),
                    LocalTime.of(23, 59, 59));
        }

        List<Deduction> deductionList = deductionRepository.findDeductionByMonth(start, end);

        if (deductionList.isEmpty()) {
            throw new IllegalStateException(
                    "Cannot find deductions in the month of " + month
            );
        }
        return deductionList;
    }

    public Boolean createDeductions(List<Deduction> deductions, Long userId) {
        System.out.println("DeductionService.createDeductions");
        System.out.println("deductions = " + deductions);
        Optional<PayInformation> payInformation = payInformationRepository.findPayInformationByUserId(userId);
        PayInformation payInfo = payInformation.get();
        List<Deduction> piDeductionList = payInfo.getDeduction();
        for (Deduction deduction : deductions) {
            //set relationships:
            piDeductionList.add(deduction);
        }
        payInfo.setDeduction(piDeductionList);
        deductionRepository.saveAll(deductions);
        return true;
    }
    public Boolean deleteDeductionList(List<Long> idList) {
        System.out.println("DeductionService.deleteDeductionList");
        System.out.println("idList = " + idList);
        for (Long id : idList) {

            //first: remove relationship from payinfo to deduction.
            Optional<PayInformation> payInformation = payInformationRepository.findPayInformationByDeductionId(id);

            if (payInformation.isPresent()) {
                //check if found deduction
                PayInformation payinfo = payInformation.get();
                List<Deduction> deductions = payinfo.getDeduction();
//                List<Allowance> newList = new ArrayList<>();

                //remove allowance from payinfo
                for (Deduction deduction: deductions) {
//                    if (!allowance.getAllowanceId().equals(id)) {
//                        newList.add(allowance);
//                    }
                    if (deduction.getDeductionId().equals(id)){
                        deductions.remove(deduction);
                        break;
                    }
                }
//                allowanceRepository.deleteById(id);
                payinfo.setDeduction(deductions);
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
