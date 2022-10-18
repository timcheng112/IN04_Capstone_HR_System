package com.conceiversolutions.hrsystem.rostering.shift;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

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

    public List<Shift> getShifts() {
        List<Shift> shifts = shiftRepository.findAll();
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

    public Shift getShiftById(Long shiftId) {
        Shift shift = shiftRepository.findById(shiftId)
                .orElseThrow(() -> new IllegalStateException("Shift with ID: " + shiftId + " does not exist!"));
        shift.getRoster().setShifts(new ArrayList<>());
        shift.getRoster().setBlocks(new ArrayList<>());
        shift.getRoster().setTeam(null);
        for (ShiftListItem shiftListItem : shift.getShiftListItems()) {
            shiftListItem.setShift(null);
            shiftListItem.setUser(null);
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

    public Shift getShiftByTeamAndTime(Long teamId, LocalDateTime date) {
        List<Shift> shiftList = shiftRepository.findShiftByTeamTime(teamId, date);
        if (shiftList.isEmpty()) {
            throw new IllegalStateException("Shift with teamId: " + teamId + " date: " + date + "does not exist!");
        } else if (shiftList.size() > 1) {
            throw new IllegalStateException("More than 1 Shifts were found at this time!");
        } else {
            return shiftList.get(0);
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
}
