package com.conceiversolutions.hrsystem.engagement.benefitplan;

import com.conceiversolutions.hrsystem.engagement.benefittype.BenefitType;
import com.conceiversolutions.hrsystem.engagement.benefittype.BenefitTypeRepository;
import com.conceiversolutions.hrsystem.engagement.claim.Claim;
import com.conceiversolutions.hrsystem.enums.BenefitTypeEnum;
import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class BenefitPlanService {
    private final BenefitPlanRepository benefitPlanRepository;
    private final BenefitPlanInstanceRepository benefitPlanInstanceRepository;
    private final BenefitTypeRepository benefitTypeRepository;
    private final UserRepository userRepository;

    public void checkDates(LocalDate start, LocalDate end) {
        System.out.println("BenefitPlanService.checkDates");
        System.out.println("start = " + start + ", end = " + end);
        if (start.compareTo(end) >= 0) {
            throw new IllegalStateException("Start Date cannot be before End Date");
        } else if (start.isBefore(LocalDate.now()) && end.isBefore(LocalDate.now())) {
            throw new IllegalStateException("Past plans cannot be edited");
        }
    }

    // Benefit Type
    public List<BenefitTypeEnum> getAllBenefitTypes() {
        System.out.println("BenefitPlanService.getAllBenefitTypes");
//        return benefitTypeRepository.findAll();
        return Arrays.stream(BenefitTypeEnum.values()).toList();
    }

//    public BenefitType getBenefitType(Long benefitTypeId) {
//        System.out.println("BenefitPlanService.getBenefitType");
//        System.out.println("benefitTypeId = " + benefitTypeId);
//
//        Optional<BenefitType> opt = benefitTypeRepository.findById(benefitTypeId);
//        if (opt.isEmpty()) {
//            throw new IllegalStateException("Benefit Type ID invalid");
//        }
//        return opt.get();
//    }

    // Benefit Plan
    public List<BenefitPlan> getAllBenefitPlans() {
        System.out.println("BenefitPlanService.getAllBenefitPlans");
        return benefitPlanRepository.findAll();
    }

    public List<BenefitPlan> getAllBenefitPlansByType(BenefitTypeEnum benefitType) {
        System.out.println("BenefitPlanService.getAllBenefitPlansByType");
        System.out.println("benefitType = " + benefitType);
        return benefitPlanRepository.findAllByBenefitTypeId(benefitType);
    }

    public Long addBenefitPlan(String description, String planName, BigDecimal planAmount, LocalDate startDate, LocalDate endDate, BenefitTypeEnum planType) {
        System.out.println("BenefitPlanService.addBenefitPlan");
        System.out.println("description = " + description + ", planName = " + planName + ", planAmount = " + planAmount + ", startDate = " + startDate + ", endDate = " + endDate + ", planType = " + planType);

        checkDates(startDate, endDate); // date is invalid



        BenefitPlan newPlan = new BenefitPlan(description, planName, planAmount, startDate, endDate, planType);
        BenefitPlan savedPlan = benefitPlanRepository.saveAndFlush(newPlan);
        return savedPlan.getBenefitPlanId();
    }

    public BenefitPlan getBenefitPlanById(Long benefitPlanId) {
        System.out.println("BenefitPlanService.getBenefitPlanById");
        System.out.println("benefitPlanId = " + benefitPlanId);
        Optional<BenefitPlan> opt = benefitPlanRepository.findById(benefitPlanId);
        if (opt.isEmpty()) {
            throw new IllegalStateException("Benefit Plan ID invalid");
        }
        return opt.get();
    }

    public Long editBenefitPlan(Long planId, String description, String planName, BigDecimal planAmount, LocalDate startDate, LocalDate endDate) {
        System.out.println("BenefitPlanService.editBenefitPlan");
        System.out.println("planId = " + planId + ", description = " + description + ", planName = " + planName + ", planAmount = " + planAmount + ", startDate = " + startDate + ", endDate = " + endDate);
        BenefitPlan benefitPlan = getBenefitPlanById(planId);

        checkDates(startDate, endDate); // date is invalid

        benefitPlan.setDescription(description);
        benefitPlan.setPlanName(planName);
        benefitPlan.setPlanAmount(planAmount);
        benefitPlan.setStartDate(startDate);
        benefitPlan.setEndDate(endDate);
        benefitPlanRepository.save(benefitPlan);
        return planId;
    }

    public Long terminateBenefitPlan(Long planId) {
        System.out.println("BenefitPlanService.terminateBenefitPlan");
        System.out.println("planId = " + planId);

        BenefitPlan benefitPlan = getBenefitPlanById(planId);
        benefitPlan.setIsActive(false);

        // TODO : handle all the benefit plan instances
        List<BenefitPlanInstance> planInstances = benefitPlanInstanceRepository.findAllByBenefitPlanId(planId);
        for (BenefitPlanInstance instance : planInstances) {
            instance.setIsActive(false);
        }
        benefitPlanInstanceRepository.saveAll(planInstances);
        benefitPlanRepository.save(benefitPlan);
        return planId;
    }

    // Benefit Plan Instance
    public Long addBenefitPlanInstance(Long planId, Long employeeId) {
        System.out.println("BenefitPlanService.addBenefitPlanInstance");
        System.out.println("planId = " + planId + ", employeeId = " + employeeId);

        BenefitPlan benefitPlan = getBenefitPlanById(planId);
        if (!benefitPlan.getIsActive()) {
            throw new IllegalStateException("Benefit Plan is not active, cannot be allocated.");
        }

        Optional<User> opt = userRepository.findById(employeeId);
        if (opt.isEmpty()) {
            throw new IllegalStateException("Employee not found");
        }
        User employee = opt.get();

        // create new instance
        BenefitPlanInstance newPlanInstance = new BenefitPlanInstance(benefitPlan.getPlanAmount(), benefitPlan, employee);
        BenefitPlanInstance savedPlanInstance = benefitPlanInstanceRepository.saveAndFlush(newPlanInstance);

        List<BenefitPlanInstance> list = employee.getBenefitPlanInstances();
        list.add(savedPlanInstance);
        employee.setBenefitPlanInstances(list);

        userRepository.save(employee);
        return savedPlanInstance.getBenefitPlanInstanceId();
    }

    public List<BenefitPlanInstance> getAllBenefitPlanInstancesByPlan(Long benefitPlanId) {
        System.out.println("BenefitPlanService.getAllBenefitPlanInstancesByPlan");
        System.out.println("benefitPlanId = " + benefitPlanId);
        List<BenefitPlanInstance> planInstances = benefitPlanInstanceRepository.findAllByBenefitPlanId(benefitPlanId);
        for (BenefitPlanInstance bpi : planInstances) {
            bpi.setPlanOwner(null);
            for (Claim claim : bpi.getClaims()) {
                claim.setBenefitPlanInstance(null);
                if (claim.getSupportingDocument() != null) {
                    claim.getSupportingDocument().setDocData(new byte[0]);
                }
            }
        }
        return planInstances;
    }

    public List<BenefitPlanInstance> getAllBenefitPlanInstancesByEmployeeId(Long employeeId) {
        System.out.println("BenefitPlanService.getAllBenefitPlanInstancesByEmployeeId");
        System.out.println("employeeId = " + employeeId);

        List<BenefitPlanInstance> planInstances = benefitPlanInstanceRepository.findAllByEmployeeId(employeeId);
        for (BenefitPlanInstance bpi : planInstances) {
            bpi.setPlanOwner(null);
            for (Claim claim : bpi.getClaims()) {
                claim.setBenefitPlanInstance(null);
                if (claim.getSupportingDocument() != null) {
                    claim.getSupportingDocument().setDocData(new byte[0]);
                }
            }
        }
        return planInstances;
    }
}
