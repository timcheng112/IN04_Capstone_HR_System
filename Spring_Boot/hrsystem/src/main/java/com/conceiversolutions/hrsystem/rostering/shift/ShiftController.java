package com.conceiversolutions.hrsystem.rostering.shift;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

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

        LocalDateTime dateTime = LocalDateTime.parse(date);

        return shiftService.getShiftByTeamAndTime(teamId, dateTime);
    }

    @GetMapping(path = "/getTemplateShiftsByRoster")
    public List<Shift> getTemplateShiftsByRoster(@RequestParam("rosterId") Long rosterId) {
        return shiftService.getTemplateShiftsByRoster(rosterId);
    }
}
