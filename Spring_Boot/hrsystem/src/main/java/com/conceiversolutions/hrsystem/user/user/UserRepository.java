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

//    SELECT * FROM user WHERE email = ?
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

    @Query("SELECT u FROM User u WHERE u.userRole = ?1")
    List<User> findAllByRole(RoleEnum role);

    @Query("SELECT u FROM User u WHERE u.userRole = ?1 OR u.userRole = ?2")
    List<User> findAllStaff(RoleEnum role, RoleEnum role2);
}
