package com.conceiversolutions.hrsystem.jobchange.promotionrequest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PromotionRepository extends JpaRepository<PromotionRequest, Long> {
}
