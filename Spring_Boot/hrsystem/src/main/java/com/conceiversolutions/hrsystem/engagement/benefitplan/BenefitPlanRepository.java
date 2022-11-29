package com.conceiversolutions.hrsystem.engagement.benefitplan;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BenefitPlanRepository extends JpaRepository<BenefitPlan, Long> {
    @Query("SELECT bp FROM BenefitPlan bp WHERE bp.planType.benefitTypeId =?1")
    List<BenefitPlan> findAllByBenefitTypeId(Long benefitTypeId);
}
