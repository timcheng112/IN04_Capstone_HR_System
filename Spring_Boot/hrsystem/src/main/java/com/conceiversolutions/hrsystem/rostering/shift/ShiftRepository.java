package com.conceiversolutions.hrsystem.rostering.shift;

import java.sql.Date;
import com.conceiversolutions.hrsystem.rostering.shiftlistitem.ShiftListItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ShiftRepository extends JpaRepository<Shift, Long> {

    @Query("SELECT s FROM Shift s INNER JOIN Roster r INNER JOIN Team t WHERE t.teamId = ?1 AND s.startTime = ?2")
    List<Shift> findShiftByTeamTime(Long teamId, LocalDateTime startTime);

//    @Query("SELECT s FROM Shift s WHERE userId = ?1")
//    Optional<ShiftListItem> getAllShiftListItems(Long userId);

}
