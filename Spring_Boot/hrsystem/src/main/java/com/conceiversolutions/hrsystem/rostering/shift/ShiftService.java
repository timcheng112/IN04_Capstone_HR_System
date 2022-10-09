package com.conceiversolutions.hrsystem.rostering.shift;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.conceiversolutions.hrsystem.rostering.roster.Roster;
import com.conceiversolutions.hrsystem.rostering.roster.RosterRepository;
import com.conceiversolutions.hrsystem.rostering.shiftlistitem.ShiftListItem;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ShiftService {

    private final ShiftRepository shiftRepository;
    private final RosterRepository rosterRepository;

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

    // UNFINISHED
    public void deleteShift(Long shiftId) {
        Shift shift = shiftRepository.findById(shiftId)
                .orElseThrow(() -> new IllegalStateException("Shift with ID: " + shiftId + " does not exist!"));

        shift.getRoster().removeShift(shift);
        shift.setRoster(null);

        for (ShiftListItem shiftListItem : shift.getShiftListItems()) {
            // to-do call delete shiftlistitem method from shiftlistitem service
            shift.removeShiftListItem(shiftListItem);
        }

        shiftRepository.deleteById(shiftId);
    }
}
