package com.conceiversolutions.hrsystem.jobchange.promotionrequest;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PromotionRepository extends JpaRepository<PromotionRequest, Long> {
    @Query("SELECT p FROM PromotionRequest p WHERE p.appraisal.appraisalId = ?1 AND p.employee.userId = ?2 AND p.manager.userId = ?3")
    public Optional<PromotionRequest> findExistingPromotionRequest(Long appraisalId, Long employeeId, Long managerId);

    @Query("SELECT p FROM PromotionRequest p WHERE p.appraisal.appraisalId = ?1")
    public Optional<PromotionRequest> findPromotionRequestByAppraisal(Long appraisalId);

    @Query("SELECT p FROM PromotionRequest p WHERE p.status <> 'Withdrawn' AND p.status <> 'Failed' AND p.status <> 'Rejected' AND p.manager.userId = ?1")
    public List<PromotionRequest> findUserActiveRequests(Long userId);

    @Query("SELECT p FROM PromotionRequest p WHERE p.status <> 'Withdrawn' AND p.status <> 'Failed' AND p.status <> 'Rejected' AND p.interviewer.userId = ?1")
    public List<PromotionRequest> findUserToInterviewRequests(Long userId);

    @Query("SELECT DISTINCT p FROM PromotionRequest p, User u WHERE p.status = 'Passed' AND u.isHrEmployee = true")
    public List<PromotionRequest> findUserToApproveRequests(Long userId);

    @Query("SELECT p FROM PromotionRequest p WHERE p.status = 'Withdrawn' OR p.status = 'Failed' OR p.status = 'Rejected' AND p.manager.userId = ?1")
    public List<PromotionRequest> findUserRequestHistory(Long userId);
}
