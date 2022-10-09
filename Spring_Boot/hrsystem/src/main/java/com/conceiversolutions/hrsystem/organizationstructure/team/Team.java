package com.conceiversolutions.hrsystem.organizationstructure.team;

import java.util.List;

import javax.persistence.*;

import com.conceiversolutions.hrsystem.organizationstructure.department.Department;
import com.conceiversolutions.hrsystem.organizationstructure.outlet.Outlet;
import com.conceiversolutions.hrsystem.rostering.roster.Roster;
import com.conceiversolutions.hrsystem.user.user.User;

@Entity
@Table(name = "teams")
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_id", nullable = false)
    private Long teamId;
    @Column(name = "team_name", nullable = false)
    private String teamName;
    @OneToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "outlet_id", nullable = true)
    private Outlet outlet;
    @Column(name = "is_office", nullable = false)
    private Boolean isOffice;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "department_id")
    private Department department;
    @OneToOne(cascade = CascadeType.MERGE, optional = true)
    @JoinColumn(name = "roster_id", nullable = true)
    private Roster roster;
    @ManyToMany
    @JoinTable(
        name = "team_user",
        joinColumns = @JoinColumn(name = "team_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> users;
    @OneToOne(targetEntity = User.class, fetch = FetchType.LAZY, optional = false)
    private User teamHead;

    public Team() {
    }

    public Team(String teamName, Outlet outlet, Boolean isOffice, Department department, Roster roster,
            List<User> users, User teamHead) {
        this.teamName = teamName;
        this.outlet = outlet;
        this.isOffice = isOffice;
        this.department = department;
        this.roster = roster;
        this.users = users;
        this.teamHead = teamHead;
    }

    public Team(String teamName, Outlet outlet, Boolean isOffice, Department department, List<User> users, User teamHead) {
        this.teamName = teamName;
        this.outlet = outlet;
        this.isOffice = isOffice;
        this.department = department;
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

    public Outlet getOutlet() {
        return outlet;
    }

    public void setOutlet(Outlet outlet) {
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

    public void addUser(User u) {
        this.users.add(u);
    }

    public void removeUser(User u) {
        this.users.remove(u);
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
