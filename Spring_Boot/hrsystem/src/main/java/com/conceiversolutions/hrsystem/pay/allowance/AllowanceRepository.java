package com.conceiversolutions.hrsystem.pay.allowance;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AllowanceRepository extends JpaRepository<Allowance, Long> {

    @Query("SELECT a FROM User u INNER JOIN u.currentPayInformation pi INNER JOIN pi.allowance a WHERE u.userId = ?1 AND DATE(a.date) BETWEEN DATE(?2) AND DATE(?3)")
    List<Allowance> findUserAllowanceByMonth(Long userId, LocalDateTime start, LocalDateTime end);

    @Query("SELECT a FROM Allowance a WHERE DATE(a.date) BETWEEN DATE(?1) AND DATE(?2)")
    List<Allowance> findAllowanceByMonth(LocalDateTime start, LocalDateTime end);
}