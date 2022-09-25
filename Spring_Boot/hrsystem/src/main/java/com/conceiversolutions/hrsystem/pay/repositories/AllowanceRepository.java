package com.conceiversolutions.hrsystem.pay.repositories;

import com.conceiversolutions.hrsystem.pay.entities.Allowance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AllowanceRepository extends JpaRepository<Allowance, Long> {

}
