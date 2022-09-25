package com.conceiversolutions.hrsystem.engagement.claimtype;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClaimTypeRepository extends JpaRepository<ClaimType, Long> {
}
