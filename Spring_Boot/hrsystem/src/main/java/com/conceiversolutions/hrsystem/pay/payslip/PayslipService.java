package com.conceiversolutions.hrsystem.pay.payslip;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

import com.conceiversolutions.hrsystem.user.docdata.DocData;
import com.conceiversolutions.hrsystem.user.docdata.DocDataService;
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
    private final DocDataService docDataService;

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

    // public void deletePayslip(@PathVariable("payslipId") Long id) {
    // // boolean exists = payslipRepository.existsById(id);
    // // if(!exists){
    // // throw new IllegalStateException("Payslip with payslip id" + id + " does
    // not
    // // exist to be deleted.");
    // // }else{
    // // payslipRepository.deleteById(id);
    // // }
    // payslipRepository.deleteById(id);
    // }

    public void deletePayslip(@PathVariable("payslipId") Long id) {
        Payslip payslip = payslipRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Payslip with ID: " + id + " does not exist!"));
        payslip.getEmployee().removePayslip(payslip);
        payslip.setEmployee(null);
        payslip.setPayInformation(null);
        payslipRepository.deleteById(payslip.getPayslipId());
    }

    // public void deleteAllPayslips() {
    // payslipRepository.deleteAll();
    // }

    public void deleteAllPayslips() {
        List<Payslip> payslips = payslipRepository.findAll();
        for (Payslip payslip : payslips) {
            payslip.getEmployee().removePayslip(payslip);
            payslip.setEmployee(null);
            payslip.setPayInformation(null);
            payslipRepository.deleteById(payslip.getPayslipId());
        }
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
        List<Payslip> payslips = getPayslips();
        // List<Payslip> payslips = user.getPayslips();
        List<Payslip> userPayslips = new ArrayList<>();
        for (Payslip payslip : payslips) {
            if (payslip.getEmployee() != null) {
                if (payslip.getEmployee().getUserId() == userId) {
                    if (payslip.getPayInformation() != null) {
                        payslip.getPayInformation().setUser(null);
                        payslip.getPayInformation().setAllowance(new ArrayList<>());
                        payslip.getPayInformation().setAllowanceTemplates(new ArrayList<>());
                        payslip.getPayInformation().setDeduction(new ArrayList<>());
                        payslip.getPayInformation().setDeductionTemplates(new ArrayList<>());
                    }
                    payslip.getEmployee().nullify();
                    userPayslips.add(payslip);
                }
            }

        }
        return userPayslips;
    }

    public Long addPayslipToUser(Long userId, Payslip payslip) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("User with ID: " + userId + " does not exist!"));
        if (user.getCurrentPayInformation() == null) {
            throw new IllegalStateException("User with ID: " + userId + " does not have pay information!");
        }
        Payslip oldPayslip = null;
        List<Payslip> payslips = getPayslips();
        for (Payslip userPayslip : payslips) {
            if (userPayslip.getEmployee() != null) {
                if (userPayslip.getMonthOfPayment().equals(payslip.getMonthOfPayment())
                        && userPayslip.getYearOfPayslip().equals(payslip.getYearOfPayslip())
                        && userId.equals(userPayslip.getEmployee().getUserId())) {
                    System.out.println("********OLD PAYSLIP FOUND**********");
                    oldPayslip = userPayslip;
                    break;
                }
            }
        }
        if (oldPayslip != null) {
            System.out.println("***************DELETING OLD PAYSLIP**************");
            this.deletePayslip(oldPayslip.getPayslipId());
        }
        payslip.setEmployee(user);
        payslip.setPayInformation(user.getCurrentPayInformation());
        Payslip savedPayslip = payslipRepository.saveAndFlush(payslip);
        user.addPayslip(savedPayslip);
        User savedUser = userRepository.saveAndFlush(user);
        System.out.println("*************PAYSLIPS: " + savedUser.getPayslips() + " *************");
        return savedPayslip.getPayslipId();
    }

    public Long uploadPayslipPdf(MultipartFile file, Long payslipId) throws Exception {
        try {
            System.out.println("******************* FILE: " + file + " *******************");
            DocData doc = docDataService.uploadDoc(file);
            Payslip payslip = payslipRepository.findById(payslipId)
                    .orElseThrow(() -> new IllegalStateException("Payslip with ID: " + payslipId + " does not exist!"));
            payslip.setPayslipPDF(doc);
            payslipRepository.save(payslip);
            return doc.getDocId();
        } catch (Exception e) {
            throw new IllegalStateException(e.getMessage());
        }
    }
}
