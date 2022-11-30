package com.conceiversolutions.hrsystem.pay.payinformation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PayInformationRepository extends JpaRepository<PayInformation, Long> {
    @Query("SELECT p FROM PayInformation p INNER JOIN p.allowance a WHERE a.allowanceId =?1")
    Optional<PayInformation> findPayInformationByAllowanceId(Long allowanceId);

    @Query("SELECT p FROM PayInformation p INNER JOIN p.deduction a WHERE a.deductionId =?1")
    Optional<PayInformation> findPayInformationByDeductionId(Long deductionId);

    @Query("SELECT p FROM PayInformation p INNER JOIN p.user u WHERE u.userId =?1")
    Optional<PayInformation> findPayInformationByUserId(Long userId);
}
