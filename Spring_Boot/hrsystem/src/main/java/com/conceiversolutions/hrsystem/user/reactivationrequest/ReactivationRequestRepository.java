package com.conceiversolutions.hrsystem.user.reactivationrequest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReactivationRequestRepository extends JpaRepository<ReactivationRequest, Long> {
}
