package com.conceiversolutions.hrsystem.rostering.roster;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/roster")
@AllArgsConstructor
public class RosterController {

    private final RosterService rosterService;

    @GetMapping
    public List<Roster> getRosters() {
        return rosterService.getRosters();
    }

    @GetMapping(path = "{rosterId}")
    public Roster getRosterById(@PathVariable("rosterId") Long rosterId) {
        return rosterService.getRosterById(rosterId);
    }

    @PostMapping
    public Long addNewRoster(@RequestBody Roster roster, @RequestParam(name = "teamId", required = true) Long teamId) {
        return rosterService.addNewRoster(roster, teamId);
    }

    @DeleteMapping(path = "{rosterId}")
    public void deleteRoster(@PathVariable("rosterId") Long rosterId) {
        rosterService.deleteRoster(rosterId);
    }

}
