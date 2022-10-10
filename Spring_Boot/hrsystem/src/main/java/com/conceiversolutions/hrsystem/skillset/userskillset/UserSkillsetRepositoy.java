package com.conceiversolutions.hrsystem.skillset.userskillset;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserSkillsetRepositoy extends JpaRepository<UserSkillset, Long> {
    @Query("SELECT q.userSkills FROM User u JOIN u.qualificationInformation q WHERE u.userId = ?1")
    List<UserSkillset> findSkillsetByUserId(Long userId);
}
