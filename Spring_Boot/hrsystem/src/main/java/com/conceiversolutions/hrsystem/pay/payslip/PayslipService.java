package com.conceiversolutions.hrsystem.pay.payslip;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;

import lombok.AllArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PayslipService {
    private final PayslipRepository payslipRepository;
    private final UserRepository userRepository;

    public List<Payslip> getPayslips() {
        return payslipRepository.findAll();
    }

    public Payslip getPayslip(Long id) {
        Optional<Payslip> p = payslipRepository.findById(id);
        if (p.isPresent()) {
            return p.get();
        } else {
            throw new IllegalStateException("Payslip does not exist.");
        }

    }

    // i need to come back to change this. no dummy user now. need to check if user
    // alr has payslip. if so
    // we will not be adding a new payslip as well.

    public void addNewPayslip(Payslip payslip) {
        // Optional<Payslip> payslipByIdOptional =
        // payslipRepository.findById(payslip.getPayslipId());
        // if(payslipByIdOptional.isPresent()){
        // throw new IllegalStateException("Payslip already exist");
        // }else{
        // payslipRepository.save(payslip);
        // }
        // System.out.println(payslip);
        payslipRepository.save(payslip);
    }

    public void addNewPayslipFlush(Payslip payslip) {
        payslipRepository.saveAndFlush(payslip);
    }

    public void updatePayslip(Payslip payslip, Long payslipId) {
        Optional<Payslip> payslipByIdOptional = payslipRepository.findById(payslip.getPayslipId());
        if (payslipByIdOptional.isEmpty()) {
            throw new IllegalStateException("Payslip does not exist to be updated.");
        } else {
            Payslip p = getPayslip(payslipId);
            p.setMonthOfPayment(payslip.getMonthOfPayment());
            p.setYearOfPayslip(payslip.getYearOfPayslip());
            p.setDateOfPayment(payslip.getDateOfPayment());
            p.setGrossSalary(payslip.getGrossSalary());
            p.setDateGenerated(payslip.getDateGenerated());
            // not yet
            // p.setPayInformation(payslip.getPayInformation());
            // p.setPayslipPDF(payslip.getPayslipPDF());
            // payslipRepository.save(p);
        }
    }

    public void deletePayslip(@PathVariable("payslipId") Long id) {
        // boolean exists = payslipRepository.existsById(id);
        // if(!exists){
        // throw new IllegalStateException("Payslip with payslip id" + id + " does not
        // exist to be deleted.");
        // }else{
        // payslipRepository.deleteById(id);
        // }
        payslipRepository.deleteById(id);
    }

    public void deleteAllPayslips() {
        payslipRepository.deleteAll();
    }

    // public List<Payslip> getPayslipsByMonth(Integer monthIndex) {

    // return null;
    // }
    public Payslip findUserPayslipByMonth(Long userId, LocalDate month) {
        // LocalDateTime start = LocalDateTime.of(LocalDate.of(month.getYear(),
        // month.getMonthValue(), 1), LocalTime.of(0,0));
        // LocalDateTime end = LocalDateTime.of(LocalDate.of(month.getYear(),
        // month.getMonthValue(), month.lengthOfMonth()), LocalTime.of(23, 59, 59));
        LocalDate start = LocalDate.of(month.getYear(), month.getMonthValue(), 1);
        System.out.println(start);
        LocalDate end = LocalDate.of(month.getYear(), month.getMonthValue(), month.lengthOfMonth());
        System.out.println("END !!!!!!: " + end);
        List<Payslip> payslips = payslipRepository.findUserPayslipByMonth(userId, start, end);

        if (payslips.isEmpty()) {
            throw new IllegalStateException(
                    "Cannot find payslip for user with id:" + userId + "in the month of " + month);
        } else if (payslips.size() > 1) {
            throw new IllegalStateException(
                    "More than 1 payslip for user with id:" + userId + "in the month of " + month);
        }
        Payslip payslip = payslips.get(0);
        payslip.getPayInformation().setUser(null);
        payslip.getPayInformation().setAllowance(new ArrayList<>());
        payslip.getPayInformation().setAllowanceTemplates(new ArrayList<>());
        payslip.getPayInformation().setDeduction(new ArrayList<>());
        payslip.getPayInformation().setDeductionTemplates(new ArrayList<>());
        System.out.println(payslip.getDateOfPayment());

        payslip.getEmployee().nullify();

        return payslip;
    }

    public List<Payslip> findPayslipByMonth(LocalDate month) {
        LocalDateTime start = LocalDateTime.of(LocalDate.of(month.getYear(), month.getMonthValue(), 1),
                LocalTime.of(0, 0));
        LocalDateTime end = LocalDateTime.of(
                LocalDate.of(month.getYear(), month.getMonthValue(), month.lengthOfMonth()), LocalTime.of(23, 59, 59));
        System.out.println("END !!!!!!: " + end);

        List<Payslip> payslips = payslipRepository.findPayslipsByMonth(start, end);

        if (payslips.isEmpty()) {
            throw new IllegalStateException(
                    "Cannot find payslips in the month of " + month);
        }
        for (Payslip payslip : payslips) {
            payslip.getPayInformation().setUser(null);
            payslip.getPayInformation().setAllowance(new ArrayList<>());
            payslip.getPayInformation().setAllowanceTemplates(new ArrayList<>());
            payslip.getPayInformation().setDeduction(new ArrayList<>());
            payslip.getPayInformation().setDeductionTemplates(new ArrayList<>());

            payslip.getEmployee().nullify();
        }
        return payslips;
    }

    public List<Payslip> getPayslipByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("User with ID: " + userId + " does not exist!"));
        List<Payslip> payslips = user.getPayslips();
        for (Payslip payslip : payslips) {
            if (payslip.getPayInformation() != null) {
                payslip.getPayInformation().setUser(null);
                payslip.getPayInformation().setAllowance(new ArrayList<>());
                payslip.getPayInformation().setAllowanceTemplates(new ArrayList<>());
                payslip.getPayInformation().setDeduction(new ArrayList<>());
                payslip.getPayInformation().setDeductionTemplates(new ArrayList<>());
            }
            if (payslip.getEmployee() != null) {
                payslip.getEmployee().nullify();
            }
        }
        return payslips;
    }
}
