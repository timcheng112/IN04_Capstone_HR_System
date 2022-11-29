package com.conceiversolutions.hrsystem.pay.payinformation;

import com.conceiversolutions.hrsystem.engagement.leavequota.LeaveQuota;
import com.conceiversolutions.hrsystem.pay.allowance.Allowance;
import com.conceiversolutions.hrsystem.pay.allowanceTemplate.AllowanceTemplate;
import com.conceiversolutions.hrsystem.user.position.Position;
import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PayInformationService {
    private final PayInformationRepository payInformationRepository;
    private final UserRepository userRepository;

    // @Autowired
    // public PayInformationService(PayInformationRepository
    // payInformationRepository) {
    // this.payInformationRepository = payInformationRepository;
    // }

    public List<PayInformation> getAllPayInformation() {
        return payInformationRepository.findAll();
    }

    public PayInformation getPayInformation(Long id) {
        Optional<PayInformation> payInfoOptional = payInformationRepository.findById(id);
        if (payInfoOptional.isPresent()) {
            PayInformation payInformation = payInfoOptional.get();
            payInformation.getUser().nullify();
            return payInformation;
        } else {
            throw new IllegalStateException("Pay Information does not exist.");
        }

    }

    // i need to come back to change this. no dummy user now. need to check if user
    // alr has payslip. if so
    // we will not be adding a new payinfo as well.
    public void addNewPayInformation(Long userId, PayInformation payInformation) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            // user exists.
            User user = optionalUser.get();

            // deal with previous pay information
            PayInformation oldPayInfo = user.getCurrentPayInformation();
            user.setCurrentPayInformation(null);
            if (oldPayInfo != null) {
                payInformationRepository.deleteById(oldPayInfo.getPayInformationId());
            }

            user = userRepository.saveAndFlush(user);

            // persist pay information
            payInformation.setUser(user);
            PayInformation payInformationPersisted = payInformationRepository.saveAndFlush(payInformation);

            // add pay information to user
            user.setCurrentPayInformation(payInformationPersisted);
            userRepository.save(user);
        } else {
            throw new IllegalStateException("User with id: " + userId + " does not exist.");
        }

    }

    // public void updatePayInformation(PayInformation payInformation, Long
    // payInformationId){
    // Optional<PayInformation> payInfoByIdOptional =
    // payInformationRepository.findById(payInformationId);
    // if(!payInfoByIdOptional.isPresent()){
    // throw new IllegalStateException("Payslip does not exist to be updated.");
    // }else{
    // PayInformation p = getPayInformation(payInformationId);
    // p.setPayType(payInformation.getPayType());
    // p.setBasicHourlyPay(payInformation.getBasicHourlyPay());
    // p.setEventPhHourlyPay(payInformation.getEventPhHourlyPay());
    // p.setOvertimeHourlyPay(payInformation.getOvertimeHourlyPay());
    // p.setPaymentMethod(payInformation.getPaymentMethod());
    // p.setSelfHelpGroupContributionType(payInformation.getSelfHelpGroupContributionType());
    // p.setWeekendHourlyPay(payInformation.getWeekendHourlyPay());
    // //not yet
    //// p.setPayslip(payInformation.getPayslip());
    //// p.setAllowance(payInformation.getAllowance());
    //// p.setDeduction(payInformation.getDeduction());
    // //not yet
    // //payInformationRepository.save(p);
    // }
    // }

    public void deletePayInformation(@PathVariable("payInformationId") Long payInformationId) {
        payInformationRepository.deleteById(payInformationId);
    }

    public void addAllowanceTemplate(Long payInformationId, AllowanceTemplate allowanceTemplate) {
        Optional<PayInformation> payInformationOptional = payInformationRepository.findById(payInformationId);
        if (payInformationOptional.isPresent()) {
            PayInformation payInformation = payInformationOptional.get();
            List<AllowanceTemplate> allowanceTemplates = payInformation.getAllowanceTemplates();
            allowanceTemplates.add(allowanceTemplate);
            payInformation.setAllowanceTemplates(allowanceTemplates);

            payInformationRepository.save(payInformation);
        } else {
            throw new IllegalStateException("Pay Information does not exist.");
        }
    }

    public void deleteAllPayInformation() {
        payInformationRepository.deleteAll();
    }

    public PayInformation getUserPayInformation(Long userId) throws Exception {
        Optional<PayInformation> optionalPayInformation = payInformationRepository.findUserPayInformation(userId);

        if (optionalPayInformation.isPresent()) {
            PayInformation p = optionalPayInformation.get();

            User user = p.getUser();

            Position position = user.getCurrentPosition();
            LeaveQuota leaveQuota = user.getCurrentLeaveQuota();

            p.getUser().nullify();

            p.getUser().setCurrentPosition(position);
            p.getUser().setCurrentLeaveQuota(leaveQuota);

            return p;
        } else {
            throw new IllegalStateException("Unable to find pay information");
        }
    }
}
