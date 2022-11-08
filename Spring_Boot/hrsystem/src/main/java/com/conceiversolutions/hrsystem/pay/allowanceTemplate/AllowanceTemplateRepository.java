package com.conceiversolutions.hrsystem.pay.allowanceTemplate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AllowanceTemplateRepository extends JpaRepository<AllowanceTemplate, Long> {
}
