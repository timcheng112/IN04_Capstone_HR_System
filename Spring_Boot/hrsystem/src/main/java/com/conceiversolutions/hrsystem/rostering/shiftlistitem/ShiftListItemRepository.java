package com.conceiversolutions.hrsystem.rostering.shiftlistitem;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface ShiftListItemRepository extends JpaRepository<ShiftListItem, Long> {
    @Query("SELECT s FROM ShiftListItem s WHERE s.shift.shiftId = ?1")
    List<ShiftListItem> findShiftListItemByShiftId(Long shiftId);
}
