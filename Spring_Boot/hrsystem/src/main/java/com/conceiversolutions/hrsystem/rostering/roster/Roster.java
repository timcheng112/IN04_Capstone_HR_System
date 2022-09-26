package com.conceiversolutions.hrsystem.rostering.roster;

import java.util.List;

import javax.persistence.*;

import com.conceiversolutions.hrsystem.organizationstructure.team.Team;
import com.conceiversolutions.hrsystem.rostering.block.Block;
import com.conceiversolutions.hrsystem.rostering.shift.Shift;

@Entity
@Table(name = "rosters")
public class Roster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "roster_id", nullable = false)
    private Long rosterId;
    @Column(name = "roster_description", nullable = true)
    private String rosterDescription;

    @OneToOne(mappedBy = "roster", optional = false)
    private Team team;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "roster")
    private List<Shift> shifts;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "roster")
    private List<Block> blocks;

    public Roster() {
    }

    public Roster(String rosterDescription, Team team, List<Shift> shifts, List<Block> blocks) {
        this.rosterDescription = rosterDescription;
        this.team = team;
        this.shifts = shifts;
        this.blocks = blocks;
    }

    public Long getRosterId() {
        return rosterId;
    }

    public void setRosterId(Long rosterId) {
        this.rosterId = rosterId;
    }

    public String getRosterDescription() {
        return rosterDescription;
    }

    public void setRosterDescription(String rosterDescription) {
        this.rosterDescription = rosterDescription;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public List<Shift> getShifts() {
        return shifts;
    }

    public void setShifts(List<Shift> shifts) {
        this.shifts = shifts;
    }

    public List<Block> getBlocks() {
        return blocks;
    }

    public void setBlocks(List<Block> blocks) {
        this.blocks = blocks;
    }

    @Override
    public String toString() {
        return "Roster [blocks=" + blocks + ", rosterDescription=" + rosterDescription + ", rosterId=" + rosterId
                + ", shifts=" + shifts + ", team=" + team + "]";
    }

}
