package com.conceiversolutions.hrsystem.user.qualificationinformation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface QualificationRepository extends JpaRepository<QualificationInformation, Long> {
}
