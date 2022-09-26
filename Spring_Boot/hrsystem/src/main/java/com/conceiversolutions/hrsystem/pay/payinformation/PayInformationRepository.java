package com.conceiversolutions.hrsystem.pay.payinformation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PayInformationRepository extends JpaRepository<PayInformation, Long> {
}
