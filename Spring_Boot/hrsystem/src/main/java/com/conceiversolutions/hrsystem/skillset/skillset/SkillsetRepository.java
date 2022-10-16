package com.conceiversolutions.hrsystem.skillset.skillset;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillsetRepository extends JpaRepository<Skillset, Long> {
}
