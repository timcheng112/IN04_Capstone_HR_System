package com.conceiversolutions.hrsystem.organizationstructure.team;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.conceiversolutions.hrsystem.user.user.User;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {

    // @Query("SELECT t FROM Teams t WHERE t.id = ?1")
    // Optional<Team> findTeamsByDeptId(Long id);

    @Query("SELECT t.users FROM Team t WHERE t.teamHead.userId = ?1")
    List<User> findTeamMembersByTeamHead(Long userId);

    @Query("SELECT t FROM Team t WHERE t.teamHead.userId = ?1")
    Optional<Team> findTeamByTeamHead(Long userId);

    @Query("SELECT t.teamHead FROM Team t")
    List<User> findTeamHeads();

}