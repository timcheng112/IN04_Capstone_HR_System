package com.conceiversolutions.hrsystem.organizationstructure.team;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/team")
public class TeamController {
    private final TeamService teamService;

    @Autowired
    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping(path = "/getAllTeams")
    public List<Team> getAllTeams() {
        return teamService.getAllTeams();
    }

    @GetMapping(path= "/getAllTeamsInDept/{deptId}")
    public List<Team> getAllTeamsInDept(@PathVariable("deptId") Long deptId) {return teamService.getAllTeamsInDept(deptId);}

    @GetMapping(path = "{teamId}")
    public Team getTeam(@PathVariable("teamId") Long id ){
        return teamService.getTeam(id);
    }

    @PostMapping(path = "/addTeam")
    public Long addNewTeam(@RequestParam("teamName") String teamName,
                           @RequestParam("teamHeadId") Integer teamHeadId,
                           @RequestParam("outletId") Integer outletId,
                           @RequestParam("isOffice") Boolean isOffice,
                           @RequestParam("deptId") Integer deptId) {
        return teamService.addNewTeam(teamName, teamHeadId, outletId, isOffice, deptId);
    }

    @PutMapping(path = "/addMemberToTeam")
    public boolean addMemberToTeam(@RequestParam("teamId") Integer teamId,
                                   @RequestParam("userId") Integer userId) {
        return teamService.addMemberToTeam(teamId, userId);
    }

    @DeleteMapping (path = "/removeMemberFromTeam")
    public boolean removeMemberFromTeam(@RequestParam("userId") Integer userId,
                                        @RequestParam("teamId") Integer teamId) {
        return teamService.removeMemberFromTeam(userId, teamId);
    }

    @PutMapping(path = "/assignTeamToDept")
    public String assignTeamToDept(@RequestParam("deptId") Integer deptId,
                                   @RequestParam("teamId") Integer teamId) {
        return teamService.assignTeamToDept(deptId, teamId);
    }

    @PutMapping(path = "/changeTeamHead")
    public String changeTeamHead(@RequestParam("teamId") Integer teamId,
                                 @RequestParam("newHeadId") Integer newHeadId) {
        return teamService.changeTeamHead(teamId, newHeadId);
    }

    @DeleteMapping(path="/deleteTeam/{teamId}")
    public String deleteTeam(@PathVariable("teamId") Long teamId){
        return teamService.deleteTeam(teamId);
    }

    @PutMapping(path= "/moveEmpToTeam")
    public String moveEmpToTeam(@RequestParam("userId") Integer userId,
                                @RequestParam("teamId") Integer teamId,
                                @RequestParam("newTeamId") Integer newTeamId) throws Exception {
        return teamService.moveEmployeeToTeam(userId, teamId, newTeamId);

    }

    @GetMapping(path = "{employeeId}/isHead")
    public Long isEmployeeTeamHead(@PathVariable("employeeId") Long employeeId) throws Exception {
        return teamService.isEmployeeTeamHead(employeeId);
    }


}
