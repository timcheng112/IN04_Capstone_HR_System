package com.conceiversolutions.hrsystem.engagement.benefitplan;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BenefitPlanRepository extends JpaRepository<BenefitPlan, Long> {
}
