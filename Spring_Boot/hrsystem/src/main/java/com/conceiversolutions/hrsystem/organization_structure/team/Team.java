package com.conceiversolutions.hrsystem.organization_structure.team;

import javax.persistence.*;

import com.conceiversolutions.hrsystem.organization_structure.department.Department;
import com.conceiversolutions.hrsystem.rostering.roster.Roster;

@Entity
@Table(name = "teams")
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_id", nullable = false)
    private Long teamId;
    @Column(name = "team_name", nullable = false)
    private String teamName;
    @Column(name = "outlet", nullable = true)
    private String outlet;
    @Column(name = "is_office", nullable = false)
    private Boolean isOffice;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "department_id")
    private Department department;
    @OneToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name = "roster_id")
    private Roster roster;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "team")
    private List<User> users;
    @OneToOne(targetEntity = User.class, fetch = FetchType.LAZY, optional = false)
    private User teamHead;

    public Team() {
    }

    public Team(String teamName, String outlet, Boolean isOffice, Department department, Roster roster,
            List<User> users, User teamHead) {
        this.teamName = teamName;
        this.outlet = outlet;
        this.isOffice = isOffice;
        this.department = department;
        this.roster = roster;
        this.users = users;
        this.teamHead = teamHead;
    }

    public Long getTeamId() {
        return teamId;
    }

    public void setTeamId(Long teamId) {
        this.teamId = teamId;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public String getOutlet() {
        return outlet;
    }

    public void setOutlet(String outlet) {
        this.outlet = outlet;
    }

    public Boolean getIsOffice() {
        return isOffice;
    }

    public void setIsOffice(Boolean isOffice) {
        this.isOffice = isOffice;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public Roster getRoster() {
        return roster;
    }

    public void setRoster(Roster roster) {
        this.roster = roster;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public User getTeamHead() {
        return teamHead;
    }

    public void setTeamHead(User teamHead) {
        this.teamHead = teamHead;
    }

    @Override
    public String toString() {
        return "Team [department=" + department + ", isOffice=" + isOffice + ", outlet=" + outlet + ", roster=" + roster
                + ", teamHead=" + teamHead + ", teamId=" + teamId + ", teamName=" + teamName + ", users=" + users + "]";
    }

}
