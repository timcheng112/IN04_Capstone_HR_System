package com.conceiversolutions.hrsystem.performance.appraisal;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AppraisalRepository extends JpaRepository<Appraisal, Long> {

    @Query("SELECT DISTINCT a FROM Appraisal a WHERE a.appraisalYear = ?1")
    List<Appraisal> findAllAppraisalsByYear(String year);

    @Query("SELECT a FROM Appraisal a WHERE a.employee.userId = ?1 AND a.managerAppraising.userId = ?2 AND a.appraisalYear = ?3")
    Optional<Appraisal> findAppraisalByEmployeeManager(Long userId, Long managerId, String year);

    @Query("SELECT a FROM Appraisal a WHERE a.appraisalYear = ?1 AND a.employee.userId = ?2")
    List<Appraisal> findAppraisalsByEmployee(String year, Long userId);

    @Query("SELECT a FROM Appraisal a WHERE a.employee.userId = ?1 AND a.rating = 1")
    List<Appraisal> findEligibleForPromotion(Long userId);

    @Query("SELECT a FROM Appraisal a WHERE a.employee.userId = ?1")
    List<Appraisal> findAllEmployeeAppraisals(Long userId);

}
