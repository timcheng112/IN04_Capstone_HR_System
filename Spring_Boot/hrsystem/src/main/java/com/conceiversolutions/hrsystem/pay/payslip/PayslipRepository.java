package com.conceiversolutions.hrsystem.pay.payslip;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PayslipRepository extends JpaRepository<Payslip, Long> {
//    oop, just realised method is covered inside jpa repo
//    optional only returns when there is something
//    Select* from payslip where id = ?
//
//    @Query("SELECT p from Payslip p  WHERE p. = ?1")
//    Optional<Payslip> findPayslipById(Long id);

//should it be dateofpayment or dategenerated? what exactly is the difference?
//@Query("SELECT p FROM User u INNER JOIN u.payslips p WHERE u.userId =?1 AND DATE(p.dateOfPayment) BETWEEN DATE(?2) AND DATE(?3)")
@Query("SELECT p FROM Payslip p WHERE p.employee.userId =:userId AND p.dateOfPayment BETWEEN :start AND :end")
List<Payslip> findUserPayslipByMonth(@Param("userId") Long userId, @Param("start") LocalDate start, @Param("end") LocalDate end);

@Query("SELECT p FROM Payslip p WHERE DATE(p.dateOfPayment) BETWEEN DATE(?1) AND DATE(?2)")
List<Payslip> findPayslipsByMonth(LocalDateTime start, LocalDateTime end);

}
