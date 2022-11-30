package com.conceiversolutions.hrsystem.rostering.shiftlistitem;

import java.util.List;
import java.time.*;
import com.conceiversolutions.hrsystem.administration.category.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.conceiversolutions.hrsystem.enums.PositionTypeEnum;

import javax.transaction.Transactional;

import java.util.Optional;

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

    @Query("SELECT s FROM ShiftListItem s JOIN s.user u JOIN u.teams t WHERE t.teamId =?3 AND DATE(s.shift.startTime) BETWEEN DATE(?1) AND DATE(?2)")
    List<ShiftListItem> findShiftListItemsByDateAndTeam(LocalDateTime start, LocalDateTime end, Long teamId);

    @Query("SELECT s FROM ShiftListItem s JOIN s.user u JOIN u.teams t WHERE t.teamId = ?1")
    List<ShiftListItem> findShiftListItemByTeam(Long teamId);
    @Query("SELECT s FROM ShiftListItem s WHERE s.user.userId =?1 ")
    List<ShiftListItem> findShiftListItemByUserId(Long userId);

    @Query("SELECT s FROM ShiftListItem s JOIN s.user WHERE DATE(s.shift.startTime) BETWEEN DATE(?1) AND DATE(?2)")
    List<ShiftListItem> findShiftListItemByDate(LocalDateTime start, LocalDateTime end);


    @Query("SELECT s FROM ShiftListItem s WHERE s.user.userId =:userId AND s.shift.startTime BETWEEN :start AND :end")
    List<ShiftListItem> getShiftListItemsByMonth(@Param("userId") Long userId, @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end);

    // //manager?
    // @Query("SELECT s FROM ShiftListItem s WHERE userId = ?1")
    // Optional<ShiftListItem> getAllShiftListItems(Long userId);
    //
    // wrong, need by localdate only
    // @Query("SELECT s FROM ShiftListItem s WHERE checkInTiming = ?1")
    // Optional<ShiftListItem> getAllShiftListItemsByDate(LocalDateTime time);

    // MySQL stores all entries as UTC timezone and it looks like Hibernate converts
    // the value of LocalDateTime
    // from my local timezone to UTC before querying the DB. So, in my case
    // LocalDateTime storing "2020-06-09 00:00:00.000000"
    // became "2020-06-08 22:00:00.000000" in the query, what explains why '=' was
    // not matching those records.
    // @Query("SELECT s FROM ShiftListItem s WHERE checkInTiming = ?1")
    // Optional<ShiftListItem> getAllShiftListItemsByDate(LocalDateTime time);

    // @Transactional
    // @Modifying
    // @Query("SELECT s FROM ShiftListItem s WHERE YEAR(s.checkInTiming)=?1 AND
    // MONTH(s.checkInTiming)=?2 AND DAY(s.checkInTiming)=?3")
    // Optional<ShiftListItem> getAllShiftListItemsByDate(Integer year, Integer
    // month, Integer day);

    // try by >= ldt and <= 1monthlaterldt

}
