package com.conceiversolutions.hrsystem.user.user;

import com.conceiversolutions.hrsystem.enums.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // SELECT * FROM user WHERE email = ?
    @Query("SELECT u FROM User u WHERE u.email = ?1")
    Optional<User> findUserByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.workEmail = ?1")
    Optional<User> findUserByWorkEmail(String workEmail);

    @Transactional
    @Modifying
    @Query("UPDATE User u " +
            "SET u.isEnabled = TRUE WHERE u.email = ?1")
    int enableUser(String email);

    @Query("SELECT c.user FROM ConfirmationToken c WHERE c.token = ?1")
    Optional<User> findUserByToken(String token);

//    @Query("SELECT ")

    // @Query("SELECT u FROM User u WHERE u.userRole = ?1")
    // List<User> findAllEmployees(RoleEnum userRole);

    // @Query("SELECT u FROM User u WHERE u.userRole = ?1 AND (u.task_list_items NOT
    // IN(SELECT t.task_list_items FROM Task t WHERE t.id = ?2))")
    // List<User> findEmployeesWithoutTask(RoleEnum userRole, Long taskId);

    // @Query("SELECT u FROM User u WHERE u.userRole = 'EMPLOYEE' AND (ANY
    // u.task_list_items IN(SELECT t.task_list_items FROM Task t WHERE t.id =
    // taskId)))")
    // Optional<List<User>> findEmployeesWithTask(Long taskId);

    // @Query("SELECT t.user FROM TaskListItem t WHERE NOT t.task.taskId = ?1 AND
    // t.user.userRole <> ?2 AND t.user.userRole <> ?3")
    // List<User> findEmployeesWithoutTask(Long taskId, RoleEnum role, RoleEnum
    // role2);
    @Query("SELECT u FROM User u WHERE u NOT IN (SELECT t.user FROM TaskListItem t WHERE t.task.taskId = ?1) AND u.userRole <> ?2 AND u.userRole <> ?3")
    List<User> findEmployeesWithoutTask(Long taskId, RoleEnum role, RoleEnum role2);

    @Query("SELECT t.user FROM TaskListItem t WHERE t.task.taskId = ?1 AND t.user.userRole <> ?2 AND t.user.userRole <> ?3")
    List<User> findEmployeesWithTask(Long taskId, RoleEnum role, RoleEnum role2);

    @Query("SELECT u FROM User u WHERE u.userRole = ?1")
    List<User> findAllByRole(RoleEnum role);

    @Query("SELECT u FROM User u WHERE u.userRole = ?1 OR u.userRole = ?2")
    List<User> findAllStaff(RoleEnum role, RoleEnum role2);

//    @Query("SELECT u FROM User u, Team t, IN (t.users) tu WHERE t.teamId = ?3 AND NOT tu.userId = u.userId AND (u.userRole = ?1 OR u.userRole = ?2)")
//    List<User> getEmployeesNotInGivenTeam(RoleEnum role, RoleEnum role2, Long teamId);
    @Query("SELECT u FROM User u WHERE u NOT IN (SELECT user FROM User user JOIN user.teams team WHERE team.teamId = ?3) AND (u.userRole = ?1 OR u.userRole = ?2)")
    List<User> getEmployeesNotInGivenTeam(RoleEnum role, RoleEnum role2, Long teamId);

//    @Query("SELECT u from USER u WHERE u.team.teamId = ?1 AND (u.userRole= ?1 OR u.userRole = ?2)")
//    List<User> getEmployeesInGivenTeam( RoleEnum role, RoleEnum role2, Long teamId);
}
