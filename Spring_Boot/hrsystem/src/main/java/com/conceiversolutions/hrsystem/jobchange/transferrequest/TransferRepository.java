package com.conceiversolutions.hrsystem.jobchange.transferrequest;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TransferRepository extends JpaRepository<TransferRequest, Long> {

    @Query("SELECT p FROM TransferRequest p WHERE p.status <> 'Withdrawn' AND p.status <> 'Failed' AND p.status <> 'Rejected' AND p.status <> 'Approved' AND p.manager.userId = ?1")
    public List<TransferRequest> findUserActiveRequests(Long userId);

    @Query("SELECT p FROM TransferRequest p WHERE p.status <> 'Withdrawn' AND p.status <> 'Failed' AND p.status <> 'Rejected' AND p.status <> 'Approved' AND p.interviewer.userId = ?1")
    public List<TransferRequest> findUserToInterviewRequests(Long userId);

    @Query("SELECT DISTINCT p FROM TransferRequest p, User u WHERE p.status = 'Passed' AND u.isHrEmployee = true")
    public List<TransferRequest> findUserToApproveRequests(Long userId);

    @Query("SELECT p FROM TransferRequest p WHERE p.status = 'Withdrawn' OR p.status = 'Failed' OR p.status = 'Rejected' OR p.status = 'Approved' AND p.manager.userId = ?1 OR p.processedBy.userId = ?1 OR p.interviewer.userId = ?1")
    public List<TransferRequest> findUserRequestHistory(Long userId);

}
