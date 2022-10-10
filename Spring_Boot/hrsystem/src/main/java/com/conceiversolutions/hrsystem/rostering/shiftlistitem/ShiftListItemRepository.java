package com.conceiversolutions.hrsystem.rostering.shiftlistitem;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShiftListItemRepository extends JpaRepository<ShiftListItem, Long> {

}
