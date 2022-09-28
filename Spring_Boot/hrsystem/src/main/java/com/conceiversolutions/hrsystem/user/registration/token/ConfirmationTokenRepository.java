package com.conceiversolutions.hrsystem.user.registration.token;

import com.conceiversolutions.hrsystem.user.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ConfirmationTokenRepository extends JpaRepository<ConfirmationToken, Long> {
    Optional<ConfirmationToken> findByToken(String token);

    @Transactional
    @Modifying
    @Query("UPDATE ConfirmationToken c " +
            "SET c.confirmedAt = ?2 " +
            "WHERE c.token = ?1")
    int updateConfirmedAt(String token, LocalDateTime time);

    @Query("SELECT ct FROM ConfirmationToken ct WHERE token.user = ?1 AND ct.confirmedAt IS NULL")
    Optional<ConfirmationToken> findUnconfirmedTokenByUserId(Long userId);

    @Query("SELECT ct FROM ConfirmationToken ct WHERE ct.confirmedAt IS NULL")
    List<ConfirmationToken> findByCreatedAtNull();
}
