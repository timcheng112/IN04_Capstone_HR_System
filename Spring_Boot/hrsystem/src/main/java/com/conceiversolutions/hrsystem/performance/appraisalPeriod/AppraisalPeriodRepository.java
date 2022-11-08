package com.conceiversolutions.hrsystem.performance.appraisalPeriod;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AppraisalPeriodRepository extends JpaRepository<AppraisalPeriod, Long> {
    
    @Query("SELECT a FROM AppraisalPeriod a WHERE a.year = ?1")
    Optional<AppraisalPeriod> findAppraisalPeriodByYear(String year);

}
