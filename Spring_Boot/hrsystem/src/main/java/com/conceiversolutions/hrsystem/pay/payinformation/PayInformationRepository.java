package com.conceiversolutions.hrsystem.pay.payinformation;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PayInformationRepository extends JpaRepository<PayInformation, Long> {
    @Query("SELECT p FROM PayInformation p WHERE p.user.userId = ?1")
    public Optional<PayInformation> findUserPayInformation(Long userId);
}
