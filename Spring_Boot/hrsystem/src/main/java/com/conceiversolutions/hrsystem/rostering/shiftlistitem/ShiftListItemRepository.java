package com.conceiversolutions.hrsystem.rostering.shiftlistitem;

import java.util.List;
import java.time.*;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.conceiversolutions.hrsystem.enums.PositionTypeEnum;

import org.springframework.data.jpa.repository.Query;

@Repository
public interface ShiftListItemRepository extends JpaRepository<ShiftListItem, Long> {
    @Query("SELECT s FROM ShiftListItem s WHERE s.shift.shiftId = ?1")
    List<ShiftListItem> findShiftListItemByShiftId(Long shiftId);

    @Query("Select s FROM ShiftListItem s WHERE s.shift.shiftId = ?1 AND s.posType = ?2")
    List<ShiftListItem> findShiftListItemByPosition(Long shiftId, PositionTypeEnum posType);

    // find shifts given date and userID
    // given a date maybe we can check if the start time is within the start and end
    // of date?
    @Query("SELECT s FROM ShiftListItem s WHERE s.user.userId =?3 AND DATE(s.shift.startTime) BETWEEN DATE(?1) AND DATE(?2)")
    List<ShiftListItem> findShiftListItemByDateAndUserId(LocalDateTime start, LocalDateTime end, Long userId);
}
