package com.conceiversolutions.hrsystem.user.position;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PositionRepository extends JpaRepository<Position, Long> {

//    @Query("SELECT DISTINCT p FROM Positions p")
//    List<Position> findAllUniquePositions();
}
