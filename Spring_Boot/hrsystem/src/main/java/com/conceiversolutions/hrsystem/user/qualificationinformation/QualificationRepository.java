package com.conceiversolutions.hrsystem.user.qualificationinformation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface QualificationRepository extends JpaRepository<QualificationInformation, Long> {
    @Query("SELECT qi FROM QualificationInformation qi WHERE qi.user.userId = ?1")
    Optional<QualificationInformation> findQIByApplicantId(Long applicantId);
}
