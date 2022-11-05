package com.conceiversolutions.hrsystem.organizationstructure.team;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.conceiversolutions.hrsystem.user.user.User;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {

    // @Query("SELECT t FROM Teams t WHERE t.id = ?1")
    // Optional<Team> findTeamsByDeptId(Long id);

    @Query("SELECT t.users FROM Team t WHERE t.teamHead.userId = ?1")
    List<User> findTeamByTeamHead(Long userId);
}