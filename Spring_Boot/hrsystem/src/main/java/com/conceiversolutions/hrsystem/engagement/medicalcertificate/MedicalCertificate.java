package com.conceiversolutions.hrsystem.engagement.medicalcertificate;

import javax.persistence.*;
import java.sql.Blob;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table
public class MedicalCertificate {
    //attributes
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    @Column(name="certificate_id")
    private Long certId;
    @Column(name="dates")
    @ElementCollection(targetClass = LocalDate.class)
    private List<LocalDate> dates;
    @Column(name="supporting_documents")
    private Blob supportingDocs;

    //relationships

    //constructors
    public MedicalCertificate(List<LocalDate> dates, Blob supportingDocs) {
        this.dates = dates;
        this.supportingDocs = supportingDocs;
    }

    public MedicalCertificate() {
        dates = new ArrayList<LocalDate>();
    }

    //getters and setters

    public Long getCertId() {
        return certId;
    }

    public void setCertId(Long certId) {
        this.certId = certId;
    }

    public List<LocalDate> getDates() {
        return dates;
    }

    public void setDates(List<LocalDate> dates) {
        this.dates = dates;
    }

    public Blob getSupportingDocs() {
        return supportingDocs;
    }

    public void setSupportingDocs(Blob supportingDocs) {
        this.supportingDocs = supportingDocs;
    }

    @Override
    public String toString() {
        return "MedicalCertificate{" +
                "certId=" + certId +
                ", dates=" + dates +
                ", supportingDocs=" + supportingDocs +
                '}';
    }
}
