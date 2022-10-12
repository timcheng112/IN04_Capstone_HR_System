package com.conceiversolutions.hrsystem.rostering.roster;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.conceiversolutions.hrsystem.organizationstructure.team.Team;
import com.conceiversolutions.hrsystem.organizationstructure.team.TeamRepository;
import com.conceiversolutions.hrsystem.rostering.block.Block;
import com.conceiversolutions.hrsystem.rostering.block.BlockService;
import com.conceiversolutions.hrsystem.rostering.roster.RosterRepository;
import com.conceiversolutions.hrsystem.rostering.shift.Shift;
import com.conceiversolutions.hrsystem.rostering.shift.ShiftService;
import com.conceiversolutions.hrsystem.rostering.shiftlistitem.ShiftListItem;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RosterService {

    private final RosterRepository rosterRepository;
    private final TeamRepository teamRepository;
    private final ShiftService shiftService;
    private final BlockService blockService;

    public List<Roster> getRosters() {
        List<Roster> rosters = rosterRepository.findAll();
        for (Roster roster : rosters) {
            roster.getTeam().setDepartment(null);
            roster.getTeam().setUsers(new ArrayList<>());
            roster.getTeam().setTeamHead(null);
            roster.getTeam().setRoster(null);
            // roster.setTeam(null);
            for (Shift shift : roster.getShifts()) {
                shift.setRoster(null);
                for (ShiftListItem shiftListItem : shift.getShiftListItems()) {
                    shiftListItem.setShift(null);
                    shiftListItem.setUser(null);
                }
            }
            for (Block block : roster.getBlocks()) {
                block.setRoster(null);
                block.setEmployee(null);
            }
        }
        return rosters;
    }

    public Roster getRosterById(Long rosterId) {
        Roster roster = rosterRepository.findById(rosterId)
                .orElseThrow(() -> new IllegalStateException("Roster with ID: " + rosterId + " does not exist!"));
        roster.getTeam().setDepartment(null);
        roster.getTeam().setUsers(new ArrayList<>());
        roster.getTeam().setTeamHead(null);
        roster.getTeam().setRoster(null);
        for (Shift shift : roster.getShifts()) {
            shift.setRoster(null);
            for (ShiftListItem shiftListItem : shift.getShiftListItems()) {
                shiftListItem.setShift(null);
                shiftListItem.setUser(null);
            }
        }
        for (Block block : roster.getBlocks()) {
            block.setRoster(null);
            block.setEmployee(null);
        }
        return roster;
    }

    public Long addNewRoster(Roster roster, Long teamId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new IllegalStateException("Team with ID: " + teamId + " does not exist!"));

        roster.setTeam(team);
        Roster savedRoster = rosterRepository.saveAndFlush(roster);

        team.setRoster(savedRoster);
        teamRepository.saveAndFlush(team);

        return savedRoster.getRosterId();
    }

    public void deleteRoster(Long rosterId) {
        Roster roster = rosterRepository.findById(rosterId)
                .orElseThrow(() -> new IllegalStateException("Roster with ID: " + rosterId + " does not exist!"));

        if (roster.getTeam() != null) {
            roster.getTeam().setRoster(null);
            roster.setTeam(null);
        }

        if (!roster.getShifts().isEmpty()) {
            for (Shift shift : roster.getShifts()) {
                shiftService.deleteShift(shift.getShiftId());
                roster.removeShift(shift);
            }
        }

        if (!roster.getBlocks().isEmpty()) {
            for (Block block : roster.getBlocks()) {
                blockService.deleteBlock(block.getBlockId());
                roster.removeBlock(block);
            }
        }

        rosterRepository.deleteById(rosterId);
    }
}
