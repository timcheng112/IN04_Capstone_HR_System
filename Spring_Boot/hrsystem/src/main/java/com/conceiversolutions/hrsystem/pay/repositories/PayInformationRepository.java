package com.conceiversolutions.hrsystem.pay.repositories;

import com.conceiversolutions.hrsystem.pay.entities.PayInformation;
import com.conceiversolutions.hrsystem.pay.entities.Payslip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PayInformationRepository extends JpaRepository<PayInformation, Long> {

}
