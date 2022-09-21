package com.conceiversolutions.hrsystem.engagement.medicalcertificate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicalCertificateService {

    private final MedicalCertificateRepository medicalCertificateRepository;

    @Autowired
    public MedicalCertificateService(MedicalCertificateRepository medicalCertificateRepository) {
        this.medicalCertificateRepository = medicalCertificateRepository;
    }

    //might not work because of Blob? not sure yet.
    public List<MedicalCertificate> getMedicalCertificates() {
        return medicalCertificateRepository.findAll();
    }
}
