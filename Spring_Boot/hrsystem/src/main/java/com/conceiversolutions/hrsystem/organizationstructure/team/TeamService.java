package com.conceiversolutions.hrsystem.organizationstructure.team;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeamService {
    private final TeamRepository teamRepository;

    @Autowired
    public TeamService(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }


    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    public Team getTeam(Long id){
        Optional<Team> team = teamRepository.findById(id);
        if(team.isPresent()){
            return team.get();
        }else{
            throw new IllegalStateException("Team does not exist.");
        }
    }

    public void addNewTeam(Team team) {
        teamRepository.save(team);
    }

    public void updateTeam(Team team, Long teamId) {
        Team t1 = getTeam(teamId);
        t1.setDepartment(team.getDepartment());
        t1.setTeamName(team.getTeamName());
        t1.setTeamHead(team.getTeamHead());
        t1.setOutlet(team.getOutlet());
        t1.setIsOffice(team.getIsOffice());
        t1.setRoster(team.getRoster());
        t1.setUsers(team.getUsers());
    }

    public void deleteTeam(Long teamId) {
        teamRepository.deleteById(teamId);
    }

}
