package com.conceiversolutions.hrsystem.engagement.points;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeReviewFormRepository extends JpaRepository<EmployeeReviewForm, Long> {
    @Query("SELECT erf FROM EmployeeReviewForm erf WHERE erf.employee.userId =?1")
    List<EmployeeReviewForm> findByEmployeeId(Long employeeId);
}
