package com.conceiversolutions.hrsystem.pay.repositories;

import com.conceiversolutions.hrsystem.pay.entities.Deduction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeductionRepository extends JpaRepository<Deduction, Long> {
}
