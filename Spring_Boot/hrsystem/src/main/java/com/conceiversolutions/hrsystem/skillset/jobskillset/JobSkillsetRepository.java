package com.conceiversolutions.hrsystem.skillset.jobskillset;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobSkillsetRepository extends JpaRepository<JobSkillset, Long> {
}
