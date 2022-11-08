package com.conceiversolutions.hrsystem.rostering.shift;

import java.sql.Date;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/shift")
@AllArgsConstructor
public class ShiftController {

    private final ShiftService shiftService;

    @GetMapping
    public List<Shift> getShifts() {
        return shiftService.getShifts();
    }

    @GetMapping(path = "{shiftId}")
    public Shift getShiftById(@PathVariable("shiftId") Long shiftId) {
        return shiftService.getShiftById(shiftId);
    }

    @PostMapping
    public Long addNewShift(@RequestBody Shift shift, @RequestParam(name = "rosterId", required = true) Long rosterId) {
        return shiftService.addNewShift(shift, rosterId);
    }

    @DeleteMapping(path = "{shiftId}")
    public void deleteShift(@PathVariable("shiftId") Long shiftId) {
        shiftService.deleteShift(shiftId);
    }

    @GetMapping(path = "/getShiftByTeamAndTime")
    public Shift getShiftByTeamAndTime(@RequestParam("teamId") Long teamId, @RequestParam("dateString") String date) {

        LocalDate localDate = LocalDate.parse(date);

        System.out.println("date for getShiftByTeamAndTime: " + date);

        return shiftService.getShiftByTeamAndTime(teamId, localDate);
    }

    @GetMapping(path = "/getShiftsByTeam")
    public List<Shift> getShiftsByTeam(@RequestParam("teamId") Long teamId) {
        return shiftService.getShiftsByTeam(teamId);
    }

    @GetMapping(path = "/getTemplateShiftsByRoster")
    public List<Shift> getTemplateShiftsByRoster(@RequestParam("rosterId") Long rosterId) {
        return shiftService.getTemplateShiftsByRoster(rosterId);
    }

    @PutMapping(path = "/editShift/{shiftId}")
    public void editShift(@RequestBody Shift editedShift, @PathVariable("shiftId") Long shiftId) {
        shiftService.editShift(shiftId, editedShift);
    }

    @GetMapping(path = "/getShiftsByRosterAndTime")
    public List<Shift> getShiftsByRosterAndTime(@RequestParam("rosterId") Long rosterId,
            @RequestParam("dateString") String date) {
        LocalDate localDate = LocalDate.parse(date);
        System.out.println("date for getShiftByTeamAndTime: " + date);
        return shiftService.getShiftsByRosterAndTime(rosterId, localDate);
    }
}
