package com.conceiversolutions.hrsystem.engagement.claim;

import com.conceiversolutions.hrsystem.engagement.benefitplan.BenefitPlanInstance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClaimRepository extends JpaRepository<Claim,Long> {
    @Query("SELECT c FROM Claim c WHERE c.benefitPlanInstance.planOwner.userId =?1")
    List<Claim> findAllByEmployeeId(Long employeeId);
}
