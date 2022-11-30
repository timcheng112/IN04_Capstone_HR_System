package com.conceiversolutions.hrsystem.pay.deduction;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface DeductionRepository extends JpaRepository<Deduction, Long> {
    @Query("SELECT d FROM User u INNER JOIN u.currentPayInformation pi INNER JOIN pi.deduction d WHERE u.userId = ?1 AND DATE(d.date) BETWEEN DATE(?2) AND DATE(?3)")
    List<Deduction> findUserDeductionByMonth(Long userId, LocalDateTime start, LocalDateTime end);

    @Query("SELECT d FROM Deduction d WHERE DATE(d.date) BETWEEN DATE(?1) AND DATE(?2)")
    List<Deduction> findDeductionByMonth(LocalDateTime start, LocalDateTime end);
}
