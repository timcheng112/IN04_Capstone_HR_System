package com.conceiversolutions.hrsystem.organizationstructure.team;

import com.conceiversolutions.hrsystem.organizationstructure.organization.Organization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/team")
public class TeamController {
    private final TeamService teamService;

    @Autowired
    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping
    public List<Team> getAllTeams() {
        return teamService.getAllTeams();
    }

    @GetMapping(path = "{teamId}")
    public Team getTeam(@PathVariable Long id ){
        return teamService.getTeam(id);
    }

//    @PostMapping(path = "/addTeam")
//    public Long addNewOrganization(@RequestParam("organizationName") String teamName, @RequestParam("teamId") Integer id) {
//       return teamService.addNewTeam(teamName, Long.valueOf(id));
//
//    }
}
