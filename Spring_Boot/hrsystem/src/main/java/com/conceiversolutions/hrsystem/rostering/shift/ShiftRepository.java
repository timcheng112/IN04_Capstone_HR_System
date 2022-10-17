package com.conceiversolutions.hrsystem.rostering.shift;

import com.conceiversolutions.hrsystem.rostering.shiftlistitem.ShiftListItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ShiftRepository extends JpaRepository<Shift, Long> {

//    @Query("SELECT s FROM Shift s WHERE userId = ?1")
//    Optional<ShiftListItem> getAllShiftListItems(Long userId);



}
