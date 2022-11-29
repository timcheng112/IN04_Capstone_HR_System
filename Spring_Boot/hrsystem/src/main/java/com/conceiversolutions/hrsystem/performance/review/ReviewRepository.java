package com.conceiversolutions.hrsystem.performance.review;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    
    @Query("SELECT r FROM Review r WHERE r.employeeReviewing.userId = ?1 AND r.manager.userId = ?2 AND r.reviewYear = ?3")
    Optional<Review> findReviewByEmployeeManager(Long employeeId, Long managerId, String year);

    @Query("SELECT r FROM Review r WHERE r.reviewYear = ?1 AND r.employeeReviewing.userId = ?2")
    List<Review> findEmployeeReviewByYear(String year, Long employeeId);

    @Query("SELECT r FROM Review r WHERE r.reviewYear = ?1 AND r.manager.userId = ?2")
    List<Review> findManagerReviewByYear(String year, Long managerId);

    @Query("SELECT r FROM Review r WHERE r.reviewYear = ?1")
    List<Review> findAllReviewsByYear(String year);
    
}
