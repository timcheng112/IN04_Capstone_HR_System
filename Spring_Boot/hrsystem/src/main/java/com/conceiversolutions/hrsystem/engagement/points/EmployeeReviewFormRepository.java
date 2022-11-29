package com.conceiversolutions.hrsystem.engagement.points;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeReviewFormRepository extends JpaRepository<EmployeeReviewForm, Long> {
}
