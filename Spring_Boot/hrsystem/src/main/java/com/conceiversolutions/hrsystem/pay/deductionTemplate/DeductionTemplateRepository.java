package com.conceiversolutions.hrsystem.pay.deductionTemplate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeductionTemplateRepository extends JpaRepository<DeductionTemplate,Long> {
}
