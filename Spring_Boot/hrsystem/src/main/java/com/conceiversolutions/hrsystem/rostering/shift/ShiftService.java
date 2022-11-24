package com.conceiversolutions.hrsystem.rostering.shift;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.conceiversolutions.hrsystem.organizationstructure.team.Team;
import com.conceiversolutions.hrsystem.organizationstructure.team.TeamRepository;
import com.conceiversolutions.hrsystem.rostering.roster.Roster;
import com.conceiversolutions.hrsystem.rostering.roster.RosterRepository;
import com.conceiversolutions.hrsystem.rostering.shiftlistitem.ShiftListItem;
import com.conceiversolutions.hrsystem.rostering.shiftlistitem.ShiftListItemRepository;
import com.conceiversolutions.hrsystem.rostering.shiftlistitem.ShiftListItemService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ShiftService {

    private final ShiftRepository shiftRepository;
    private final RosterRepository rosterRepository;
    private final ShiftListItemService shiftListItemService;
    private final TeamRepository teamRepository;

    public List<Shift> getShifts() {
        List<Shift> shifts = shiftRepository.findAll();
        for (Shift shift : shifts) {
            shift.getRoster().setShifts(new ArrayList<>());
            shift.getRoster().setBlocks(new ArrayList<>());
            shift.getRoster().setTeam(null);
            for (ShiftListItem shiftListItem : shift.getShiftListItems()) {
                shiftListItem.setShift(null);
                // shiftListItem.setUser(null);
                shiftListItem.getUser().setTeams(new ArrayList<>());
                shiftListItem.getUser().setQualificationInformation(null);
                shiftListItem.getUser().setBlocks(new ArrayList<>());
                shiftListItem.getUser().setShiftListItems(new ArrayList<>());
                shiftListItem.getUser().setSwapRequestsReceived(new ArrayList<>());
                shiftListItem.getUser().setSwapRequestsRequested(new ArrayList<>());
                shiftListItem.getUser().setReactivationRequest(null);
                shiftListItem.getUser().setAttendances(new ArrayList<>());
                shiftListItem.getUser().setCurrentPayInformation(null);
                shiftListItem.getUser().setEmployeeAppraisals(new ArrayList<>());
                shiftListItem.getUser().setManagerAppraisals(new ArrayList<>());
                shiftListItem.getUser().setManagerReviews(new ArrayList<>());
                shiftListItem.getUser().setEmployeeReviews(new ArrayList<>());
                shiftListItem.getUser().setApplications(new ArrayList<>());
                shiftListItem.getUser().setGoals(new ArrayList<>());
                shiftListItem.getUser().setPositions(new ArrayList<>());
                shiftListItem.getUser().setJobRequests(new ArrayList<>());
                shiftListItem.getUser().setLeaves(new ArrayList<>());
                shiftListItem.getUser().setLeaveQuotas(new ArrayList<>());
                shiftListItem.getUser().setCurrentLeaveQuota(null);
            }
        }
        return shifts;
    }

    public Shift getShiftById(Long shiftId) {
        Shift shift = shiftRepository.findById(shiftId)
                .orElseThrow(() -> new IllegalStateException("Shift with ID: " + shiftId + " does not exist!"));
        shift.getRoster().setShifts(new ArrayList<>());
        shift.getRoster().setBlocks(new ArrayList<>());
        shift.getRoster().setTeam(null);
        for (ShiftListItem shiftListItem : shift.getShiftListItems()) {
            shiftListItem.setShift(null);
            // shiftListItem.setUser(null);
            shiftListItem.getUser().setTeams(new ArrayList<>());
            shiftListItem.getUser().setQualificationInformation(null);
            shiftListItem.getUser().setBlocks(new ArrayList<>());
            shiftListItem.getUser().setShiftListItems(new ArrayList<>());
            shiftListItem.getUser().setSwapRequestsReceived(new ArrayList<>());
            shiftListItem.getUser().setSwapRequestsRequested(new ArrayList<>());
            shiftListItem.getUser().setReactivationRequest(null);
            shiftListItem.getUser().setAttendances(new ArrayList<>());
            shiftListItem.getUser().setCurrentPayInformation(null);
            shiftListItem.getUser().setEmployeeAppraisals(new ArrayList<>());
            shiftListItem.getUser().setManagerAppraisals(new ArrayList<>());
            shiftListItem.getUser().setManagerReviews(new ArrayList<>());
            shiftListItem.getUser().setEmployeeReviews(new ArrayList<>());
            shiftListItem.getUser().setApplications(new ArrayList<>());
            shiftListItem.getUser().setGoals(new ArrayList<>());
            shiftListItem.getUser().setPositions(new ArrayList<>());
            shiftListItem.getUser().setJobRequests(new ArrayList<>());
            shiftListItem.getUser().setLeaves(new ArrayList<>());
            shiftListItem.getUser().setLeaveQuotas(new ArrayList<>());
            shiftListItem.getUser().setCurrentLeaveQuota(null);
        }
        return shift;
    }

    public Long addNewShift(Shift shift, Long rosterId) {
        Roster roster = rosterRepository.findById(rosterId)
                .orElseThrow(() -> new IllegalStateException("Roster with ID: " + rosterId + " does not exist!"));

        shift.setRoster(roster);
        Shift savedShift = shiftRepository.saveAndFlush(shift);

        roster.addShift(savedShift);
        rosterRepository.saveAndFlush(roster);

        return savedShift.getShiftId();
    }

    public void deleteShift(Long shiftId) {
        Shift shift = shiftRepository.findById(shiftId)
                .orElseThrow(() -> new IllegalStateException("Shift with ID: " + shiftId + " does not exist!"));

        shift.getRoster().removeShift(shift);
        shift.setRoster(null);

        for (ShiftListItem shiftListItem : shift.getShiftListItems()) {
            shiftListItemService.deleteShiftListItem(shiftListItem.getShiftListItemId());
        }

        shiftRepository.deleteById(shiftId);
    }

    public List<Shift> getShiftsByTeamAndTime(Long teamId, LocalDate localDate) {
        LocalDateTime start = LocalDateTime.of(localDate, LocalTime.of(0, 0));
        LocalDateTime end = LocalDateTime.of(localDate, LocalTime.of(23, 59, 59));
        List<Shift> shiftList = shiftRepository.findShiftByTeamTime(teamId, start, end);
        if (shiftList.isEmpty()) {
            throw new IllegalStateException(
                    "Shift with team ID: " + teamId + " date: " + localDate + "does not exist!");
        } else {
            System.out.println("##### getShiftsByTeamAndTime #####");
            for (Shift shift : shiftList) {
                shift.getRoster().setShifts(new ArrayList<>());
                shift.getRoster().setBlocks(new ArrayList<>());
                shift.getRoster().setTeam(null);
                System.out.println("shift: " + shift.getShiftTitle());
                for (ShiftListItem shiftListItem : shift.getShiftListItems()) {
                    System.out.println("list item: " + shiftListItem.getShiftListItemId());
                    shiftListItem.setShift(null);
                    shiftListItem.setUser(null);
                }
            }

            return shiftList;
        }
    }

    public List<Shift> getShiftsByRosterAndTime(Long rosterId, LocalDate localDate) {
        LocalDateTime start = LocalDateTime.of(localDate, LocalTime.of(0, 0));
        LocalDateTime end = LocalDateTime.of(localDate, LocalTime.of(23, 59, 59));
        List<Shift> shiftList = shiftRepository.findShiftsByRosterTime(rosterId, start, end);
        if (shiftList.isEmpty()) {
            throw new IllegalStateException(
                    "Shift with roster ID: " + rosterId + " date: " + localDate + "does not exist!");
        }
        // else if (shiftList.size() > 1) {
        // throw new IllegalStateException("More than 1 Shifts were found at this
        // time!");
        // }
        else {
            // Shift shift = shiftList.get(0);
            for (Shift shift : shiftList) {
                shift.getRoster().setShifts(new ArrayList<>());
                shift.getRoster().setBlocks(new ArrayList<>());
                shift.getRoster().setTeam(null);
                for (ShiftListItem shiftListItem : shift.getShiftListItems()) {
                    shiftListItem.setShift(null);
                    shiftListItem.setUser(null);
                }
            }
            return shiftList;
        }
    }

    public List<Shift> getTemplateShiftsByRoster(Long rosterId) {
        Roster roster = rosterRepository.findById(rosterId)
                .orElseThrow(() -> new IllegalStateException("Roster with ID: " + rosterId + " does not exist!"));

        List<Shift> shifts = shiftRepository.findTemplateShiftsByRoster(rosterId);
        for (Shift shift : shifts) {
            shift.getRoster().setShifts(new ArrayList<>());
            shift.getRoster().setBlocks(new ArrayList<>());
            shift.getRoster().setTeam(null);
            for (ShiftListItem shiftListItem : shift.getShiftListItems()) {
                shiftListItem.setShift(null);
                shiftListItem.setUser(null);
            }
        }
        return shifts;
    }

    public void editShift(Long shiftId, Shift editedShift) {
        Shift shift = shiftRepository.findById(shiftId)
                .orElseThrow(() -> new IllegalStateException("Shift with ID: " + shiftId + " does not exist!"));
        shift.setShiftTitle(editedShift.getShiftTitle());
        shift.setStartTime(editedShift.getStartTime());
        shift.setEndTime(editedShift.getEndTime());
        shift.setMinQuota(editedShift.getMinQuota());
        shift.setRemarks(editedShift.getRemarks());
        shiftRepository.saveAndFlush(shift);
    }

    public List<Shift> getShiftsByTeam(Long teamId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new IllegalStateException("Team with ID: " + teamId + " does not exist!"));

        List<Shift> shifts = shiftRepository.findShiftsByTeam(teamId);
        for (Shift shift : shifts) {
            shift.getRoster().setShifts(new ArrayList<>());
            shift.getRoster().setBlocks(new ArrayList<>());
            shift.getRoster().setTeam(null);
            for (ShiftListItem shiftListItem : shift.getShiftListItems()) {
                shiftListItem.setShift(null);
                shiftListItem.getUser().setTeams(new ArrayList<>());
                shiftListItem.getUser().setQualificationInformation(null);
                shiftListItem.getUser().setBlocks(new ArrayList<>());
                shiftListItem.getUser().setShiftListItems(new ArrayList<>());
                shiftListItem.getUser().setSwapRequestsReceived(new ArrayList<>());
                shiftListItem.getUser().setSwapRequestsRequested(new ArrayList<>());
                shiftListItem.getUser().setReactivationRequest(null);
                shiftListItem.getUser().setAttendances(new ArrayList<>());
                shiftListItem.getUser().setCurrentPayInformation(null);
                shiftListItem.getUser().setEmployeeAppraisals(new ArrayList<>());
                shiftListItem.getUser().setManagerAppraisals(new ArrayList<>());
                shiftListItem.getUser().setManagerReviews(new ArrayList<>());
                shiftListItem.getUser().setEmployeeReviews(new ArrayList<>());
                shiftListItem.getUser().setApplications(new ArrayList<>());
                shiftListItem.getUser().setGoals(new ArrayList<>());
                shiftListItem.getUser().setPositions(new ArrayList<>());
                shiftListItem.getUser().setJobRequests(new ArrayList<>());
                shiftListItem.getUser().setLeaves(new ArrayList<>());
                shiftListItem.getUser().setLeaveQuotas(new ArrayList<>());
                shiftListItem.getUser().setCurrentLeaveQuota(null);
            }
        }
        return shifts;
    }
}
