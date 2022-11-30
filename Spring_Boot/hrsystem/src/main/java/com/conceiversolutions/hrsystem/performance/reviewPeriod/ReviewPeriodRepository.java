package com.conceiversolutions.hrsystem.performance.reviewPeriod;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewPeriodRepository extends JpaRepository<ReviewPeriod, Long>  {

    @Query("SELECT r FROM ReviewPeriod r WHERE r.year = ?1")
    Optional<ReviewPeriod> findReviewPeriodByYear(String year);
    
}
