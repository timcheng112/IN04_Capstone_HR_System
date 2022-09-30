package com.conceiversolutions.hrsystem.engagement.medicalcertificate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path="api/medical_certificates")
public class MedicalCertificateController {

    private final MedicalCertificateService medicalCertificateService;

    @Autowired
    public MedicalCertificateController(MedicalCertificateService medicalCertificateService) {
        this.medicalCertificateService = medicalCertificateService;
    }

    //might not work because of Blob document
    @GetMapping
    public List<MedicalCertificate> getMedicalCertificates() {
        return medicalCertificateService.getMedicalCertificates();
    }
}
