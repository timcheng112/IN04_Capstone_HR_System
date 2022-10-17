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
}
