package com.conceiversolutions.hrsystem.organizationstructure.department;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.conceiversolutions.hrsystem.organizationstructure.organization.Organization;
import com.conceiversolutions.hrsystem.organizationstructure.team.Team;
import com.conceiversolutions.hrsystem.user.user.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "departments")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "department_id", nullable = false)
    private Long departmentId;
    @Column(name = "department_name", nullable = false, length = 64)
    private String departmentName;

    @ManyToOne(fetch = FetchType.LAZY, optional = false, targetEntity = Organization.class)
    @JoinColumn(name = "organization_id")
    private Organization organization;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "department", targetEntity = Team.class)
    private List<Team> teams;
    @OneToOne(targetEntity = User.class, fetch = FetchType.LAZY, optional = false)
    private User departmentHead;

    public Department() {
        this.teams = new ArrayList<>();
    }

    public Department(String departmentName, Organization organization, List<Team> teams, User departmentHead) {
        this.departmentName = departmentName;
        this.organization = organization;
        this.teams = new ArrayList<>();
        this.departmentHead = departmentHead;
    }

    public Department(String departmentName, Organization organization, List<Team> teams, User departmentHead, boolean bo) {
        this.departmentName = departmentName;
        this.organization = organization;
        this.teams = teams;
        this.departmentHead = departmentHead;
    }

    public Long getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    public List<Team> getTeams() {
        return teams;
    }

    public void setTeams(List<Team> teams) {
        this.teams = teams;
    }

    public List<Team> addTeam(Team t) {
        this.teams.add(t);
        return this.teams;
    }

    public List<Team> removeTeam(Team t) {
        this.teams.remove(t);
        return this.teams;
    }

    public User getDepartmentHead() {
        return departmentHead;
    }

    public void setDepartmentHead(User departmentHead) {
        this.departmentHead = departmentHead;
    }

    @Override
    public String toString() {
        return "Department [departmentHead=" + departmentHead + ", departmentId=" + departmentId + ", departmentName="
                + departmentName + ", organization=" + organization + "]";
    }

}
