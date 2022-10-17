package com.conceiversolutions.hrsystem.engagement.leavequota;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeaveQuotaRepository extends JpaRepository<LeaveQuota, Long> {
}
