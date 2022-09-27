package com.conceiversolutions.hrsystem.pay.payslip;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PayslipRepository extends JpaRepository<Payslip, Long> {
//    oop, just realised method is covered inside jpa repo
//    optional only returns when there is something
//    Select* from payslip where id = ?
//
//    @Query("SELECT p from Payslip p  WHERE p. = ?1")
//    Optional<Payslip> findPayslipById(Long id);
}
