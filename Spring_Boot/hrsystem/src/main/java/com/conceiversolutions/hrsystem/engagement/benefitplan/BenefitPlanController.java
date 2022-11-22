package com.conceiversolutions.hrsystem.engagement.benefitplan;

import com.conceiversolutions.hrsystem.engagement.benefittype.BenefitType;
import com.conceiversolutions.hrsystem.enums.BenefitTypeEnum;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/claims")
@AllArgsConstructor
public class BenefitPlanController {
    private final BenefitPlanService benefitPlanService;

    // Benefit Type
    @GetMapping("getAllBenefitTypes")
    public List<BenefitTypeEnum> getAllBenefitTypes() {
        return benefitPlanService.getAllBenefitTypes();
    }

//    @GetMapping("getBenefitType")
//    public BenefitType getBenefitType(@RequestParam("benefitTypeId") Long benefitTypeId) {
//        return benefitPlanService.getBenefitType(benefitTypeId);
//    }

    // Benefit Plan
    @GetMapping("getAllBenefitPlans")
    public List<BenefitPlan> getAllBenefitPlans() {
        return benefitPlanService.getAllBenefitPlans();
    }

    @GetMapping("getAllBenefitPlansByType")
    public List<BenefitPlan> getAllBenefitPlansByType(@RequestParam("benefitType") String benefitType) {
        return benefitPlanService.getAllBenefitPlansByType(BenefitTypeEnum.valueOf(benefitType));
    }

    @PostMapping("addBenefitPlan")
    public Long addBenefitPlan(@RequestParam("description") String description,
                               @RequestParam("planName") String planName,
                               @RequestParam("planAmount") Float planAmount,
                               @RequestParam("startDate") String startDate,
                               @RequestParam("endDate") String endDate,
                               @RequestParam("planType") String planType) {
        return benefitPlanService.addBenefitPlan(description, planName, BigDecimal.valueOf(planAmount),
                LocalDate.parse(startDate), LocalDate.parse(endDate), BenefitTypeEnum.valueOf(planType));
    }

    @GetMapping("getBenefitPlanById")
    public BenefitPlan getBenefitPlanById(@RequestParam("benefitPlanId") Long benefitPlanId) {
        return benefitPlanService.getBenefitPlanById(benefitPlanId);
    }

    @PutMapping("editBenefitPlan")
    public Long editBenefitPlan(@RequestParam("planId") Long planId,
                                @RequestParam("description") String description,
                               @RequestParam("planName") String planName,
                               @RequestParam("planAmount") Float planAmount,
                               @RequestParam("startDate") String startDate,
                               @RequestParam("endDate") String endDate) {
        return benefitPlanService.editBenefitPlan(planId, description, planName, BigDecimal.valueOf(planAmount),
                LocalDate.parse(startDate), LocalDate.parse(endDate));
    }

    @PutMapping("terminateBenefitPlan")
    public Long terminateBenefitPlan(@RequestParam("planId") Long planId) {
        // Terminate is a one time action that is irreversible
        return benefitPlanService.terminateBenefitPlan(planId);
    }

    // Benefit Plan Instance
    @PostMapping("addBenefitPlanInstance")
    public Long addBenefitPlanInstance(@RequestParam("planId") Long planId,
                               @RequestParam("employeeId") Long employeeId) {
        return benefitPlanService.addBenefitPlanInstance(planId, employeeId);
    }

    @GetMapping("getAllBenefitPlanInstancesByPlan")
    public List<BenefitPlanInstance> getAllBenefitPlanInstancesByPlan(@RequestParam("benefitPlanId") Long benefitPlanId) {
        return benefitPlanService.getAllBenefitPlanInstancesByPlan(benefitPlanId);
    }
}
