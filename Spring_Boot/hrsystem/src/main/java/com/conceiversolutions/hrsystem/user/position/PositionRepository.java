package com.conceiversolutions.hrsystem.user.position;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PositionRepository extends JpaRepository<Position, Long> {

    @Query("SELECT u.currentPosition FROM User u WHERE u.userId = ?1")
    Optional<Position> findUserPosition(Long userId);
}
