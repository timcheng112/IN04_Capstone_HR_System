package com.conceiversolutions.hrsystem.organizationstructure.team;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {

//    @Query("SELECT t FROM Teams t WHERE t.id = ?1")
//    Optional<Team> findTeamsByDeptId(Long id);
}