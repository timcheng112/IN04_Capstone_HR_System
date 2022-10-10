package com.conceiversolutions.hrsystem.skillset.userskillset;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserSkillsetRepositoy extends JpaRepository<UserSkillset, Long> {
    @Query("SELECT uss FROM UserSkillset uss, QualificationInformation q, IN (q.userSkills) us WHERE q.user.userId = ?1 AND us.userSkillsetId = uss.userSkillsetId")
    List<UserSkillset> findSkillsetByUserId(Long userId);
}
