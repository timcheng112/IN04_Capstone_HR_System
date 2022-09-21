package com.conceiversolutions.hrsystem.engagement.medicalcertificate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicalCertificateRepository extends JpaRepository<MedicalCertificate,Long> {
}
