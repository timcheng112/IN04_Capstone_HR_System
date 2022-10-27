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

    @Query("SELECT s FROM Shift s INNER JOIN s.roster r INNER JOIN r.team t WHERE t.teamId = ?1 AND DATE(s.startTime) BETWEEN DATE(?2) AND DATE(?3)")
    List<Shift> findShiftByTeamTime(Long teamId, LocalDateTime start, LocalDateTime end);

    @Query("SELECT s FROM Shift s WHERE s.roster.rosterId = ?1 AND s.isTemplateShift = TRUE")
    List<Shift> findTemplateShiftsByRoster(Long rosterId);

    @Query("SELECT s FROM Shift s WHERE s.roster.team.teamId = ?1")
    List<Shift> findShiftsByTeam(Long teamId);

    // @Query("SELECT s FROM Shift s WHERE userId = ?1")
    // Optional<ShiftListItem> getAllShiftListItems(Long userId);

    // @Query("SELECT s FROM Shift s WHERE userId = ?1")
    // Optional<ShiftListItem> getAllShiftListItems(Long userId);

}
