package com.conceiversolutions.hrsystem.engagement.benefitplan;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BenefitPlanInstanceRepository extends JpaRepository<BenefitPlanInstance, Long> {
    @Query("SELECT bpi FROM BenefitPlanInstance bpi WHERE bpi.benefitPlan.benefitPlanId =?1")
    List<BenefitPlanInstance> findAllByBenefitPlanId(Long benefitPlanId);

    @Query("SELECT bpi FROM BenefitPlanInstance bpi WHERE bpi.planOwner.userId =?1")
    List<BenefitPlanInstance> findAllByEmployeeId(Long employeeId);
}
