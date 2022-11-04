package com.conceiversolutions.hrsystem.performance.appraisal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppraisalRepository extends JpaRepository<Appraisal,Long> {
}
