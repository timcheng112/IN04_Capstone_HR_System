package com.conceiversolutions.hrsystem.organizationstructure.team;

import com.conceiversolutions.hrsystem.enums.RoleEnum;
import com.conceiversolutions.hrsystem.organizationstructure.department.Department;
import com.conceiversolutions.hrsystem.organizationstructure.department.DepartmentRepository;
import com.conceiversolutions.hrsystem.organizationstructure.organization.Organization;
import com.conceiversolutions.hrsystem.organizationstructure.organization.OrganizationRepository;
import com.conceiversolutions.hrsystem.organizationstructure.outlet.Outlet;
import com.conceiversolutions.hrsystem.organizationstructure.outlet.OutletService;
import com.conceiversolutions.hrsystem.rostering.roster.Roster;
import com.conceiversolutions.hrsystem.rostering.roster.RosterRepository;
import com.conceiversolutions.hrsystem.rostering.shiftlistitem.ShiftListItem;
import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;
import com.conceiversolutions.hrsystem.user.user.UserService;
import lombok.AllArgsConstructor;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TeamService {
    private final TeamRepository teamRepository;
    private final DepartmentRepository departmentRepository;
    private final UserService userService;
    private final UserRepository userRepository;
    private final RosterRepository rosterRepository;
    private final OutletService outletService;

    private final OrganizationRepository organizationRepository;

    // @Autowired
    // public TeamService(TeamRepository teamRepository) {
    // this.teamRepository = teamRepository;
    // }

    public List<Team> getAllTeams() {
        System.out.println("TeamService.getAllTeams");
        List<Team> teams = teamRepository.findAll();

        if (teams.isEmpty()) {
            throw new IllegalStateException("Unable to retrieve, no teams exist");
        }

        for (Team t : teams) {
            System.out.println("Team ID is : " + t.getTeamId() + ", Team name is : " + t.getTeamName());
            Department d = t.getDepartment();
            d.setTeams(new ArrayList<>());
            d.setDepartmentHead(null);
            d.setOrganization(null);

            List<User> teamMembers = t.getUsers();
            for (User member : teamMembers) {
                member.setTeams(new ArrayList<>());
            }

            t.getRoster().setTeam(null);
            t.getRoster().setBlocks(new ArrayList<>());
            t.getRoster().setShifts(new ArrayList<>());

            t.getTeamHead().setTeams(new ArrayList<>());
            t.getTeamHead().setQualificationInformation(null);
            t.getTeamHead().setPositions(new ArrayList<>());
            t.getTeamHead().setTaskListItems(new ArrayList<>());
            t.getTeamHead().setShiftListItems(new ArrayList<>());
        }

        return teams;
    }

    public List<Team> getAllTeamsInDept(Long deptId) {
        System.out.println("TeamService.getAllTeamsInDept");
        List<Team> teams = teamRepository.findAll();

        List<Team> teamsInDept = new ArrayList<>();

        if (teams.isEmpty()) {
            throw new IllegalStateException("Unable to retrieve, no teams exist");
        }

        for (Team t : teams) {

            System.out.println("Team ID is : " + t.getTeamId() + ", Team name is : " + t.getTeamName());
            Department d = t.getDepartment();

            if (d.getDepartmentId() == deptId) {
                teamsInDept.add(t);
            }
        }

        for (Team t : teamsInDept) {
            System.out.println("Team ID is : " + t.getTeamId() + ", Team name is : " + t.getTeamName());
            Department d = t.getDepartment();

            d.setTeams(new ArrayList<>());
            d.setDepartmentHead(null);
            d.setOrganization(null);

            List<User> teamMembers = t.getUsers();
            for (User member : teamMembers) {
                member.setTeams(new ArrayList<>());
                member.setJobRequests(new ArrayList<>());
                member.setApplications(new ArrayList<>());
                member.setGoals(new ArrayList<>());
                member.setPositions(new ArrayList<>());
                member.setShiftListItems(new ArrayList<>());
                member.setTaskListItems(new ArrayList<>());
                member.setEmployeeReviews(new ArrayList<>());
                member.setAttendances(new ArrayList<>());
                member.setEmployeeAppraisals(new ArrayList<>());
            }

            t.getRoster().setTeam(null);
            t.getRoster().setBlocks(new ArrayList<>());
            t.getRoster().setShifts(new ArrayList<>());

            t.getTeamHead().setTeams(new ArrayList<>());
            t.getTeamHead().setQualificationInformation(null);
            t.getTeamHead().setPositions(new ArrayList<>());
            t.getTeamHead().setTaskListItems(new ArrayList<>());
            t.getTeamHead().setShiftListItems(new ArrayList<>());
        }

        return teamsInDept;
    }

    public Team getTeam(Long id) {
        Optional<Team> team = teamRepository.findById(id);
        if (team.isPresent()) {
            Team t = team.get();

            System.out.println("Team ID is : " + t.getTeamId() + ", Team name is : " + t.getTeamName());
            Department d = t.getDepartment();
            d.setTeams(new ArrayList<>());
            d.setDepartmentHead(null);
            d.setOrganization(null);

            List<User> teamMembers = t.getUsers();
            for (User member : teamMembers) {
                member.setTeams(new ArrayList<>());
            }

            t.getRoster().setTeam(null);
            t.getRoster().setBlocks(new ArrayList<>());
            t.getRoster().setShifts(new ArrayList<>());

            // added by shihan not too sure.
            t.getOutlet();
            t.getOutlet().getAddress();
            t.getDepartment().setTeams(new ArrayList<>());

            t.getTeamHead().setTeams(new ArrayList<>());
            t.getTeamHead().setQualificationInformation(null);
            t.getTeamHead().setPositions(new ArrayList<>());
            t.getTeamHead().setTaskListItems(new ArrayList<>());
            t.getTeamHead().setShiftListItems(new ArrayList<>());

            return t;
        } else {
            throw new IllegalStateException("Team does not exist.");
        }
    }

    // public void addNewTeam(Team team) {
    // teamRepository.save(team);
    // }

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

    public String deleteTeam(Long teamId) {
        Optional<Team> t = teamRepository.findById(Long.valueOf(teamId));
        if (t.isEmpty()) {
            throw new IllegalStateException("Team does not exist");
        }
        Team team = t.get();
        Long deptId = team.getDepartment().getDepartmentId();

        Optional<Department> d = departmentRepository.findById(Long.valueOf(deptId));
        Department dept = d.get();

        System.out.println("are you here");
        // remove team members & team head
        List<User> teamMembers = team.getUsers();

        //for loop index will be not be correct if not persisted proper
        //so need to remove user inside, persist user. then clear teamMember list
        System.out.println("!!!");
        if(!teamMembers.isEmpty()){
            for (User u : teamMembers) {
                System.out.println(u);
    //            removeMemberFromTeam(teamId.intValue(), u.getUserId().intValue());

                boolean checker = false;
                for (Team t1 : u.getTeams()) {
                    if (t1.getTeamId().equals(team.getTeamId())) {
//                        System.out.println("!!!2");
                        checker = true;
                        break;
                    }
                }
                if (!checker) {
                    throw new IllegalStateException("Employee is not in the team");
                }

                List<Team> tempTeams = u.getTeams();
                tempTeams.remove(team);

                u.setTeams(tempTeams);
                userRepository.save(u);
//                System.out.println("!!!3");

                }
        }
//        System.out.println("!!!4");
        team.setUsers(null);
//        System.out.println("!!!5");
        team.setTeamHead(null);

//        System.out.println("!!!6");
//        System.out.println(team.getTeamHead() + "excuse me where are you");
        team.getDepartment().removeTeam(team);
//        System.out.println("!!!7");
//        System.out.println();
        teamRepository.save(team);


        // delete from user team head
        // User th1 = t.getTeamHead();
        // List<Team> tempTeams = th1.getTeams();
        // tempTeams.remove(t);
        // th1.setTeams(tempTeams);
        // userRepository.saveAndFlush(th1);

//        System.out.println("!!!8");
        // delete from team
        dept.removeTeam(team);
        departmentRepository.saveAndFlush(dept);

        team.getRoster().setTeam(null);
        // delete from roster
        Long r = team.getRoster().getRosterId();
        Optional<Roster> roster = rosterRepository.findById(r);
        if (roster.isEmpty()) {
            throw new IllegalStateException("Roster does not exist.");
        }
        Roster ros = roster.get();
        ros.setTeam(null);
        rosterRepository.saveAndFlush(ros);
        // rosterRepository.findAll().remove(ros);

//        int o = organizationRepository.findAll().size();
//        System.out.println(o);
//        List<Organization> temp = organizationRepository.findAll();
//        if(!temp.isEmpty()){
//            for(Organization org: temp){
//                System.out.println(org);
////                org.getDepartments()
//            }
//            System.out.println();
//        }

        teamRepository.delete(team);
        return teamId + " is deleted successfully";
    }

    public Long addNewTeam(String teamName, Integer teamHeadId, Integer outletId, Boolean isOffice, Integer deptId) {
        System.out.println("TeamService.addNewTeam");
        System.out.println("teamName = " + teamName + ", teamHeadId = " + teamHeadId + ", outletId = " + outletId
                + ", isOffice = " + isOffice + ", deptId = " + deptId);

        Outlet outlet = outletService.getOutletById(Long.valueOf(outletId));

        Optional<Department> d = departmentRepository.findById(Long.valueOf(deptId));
        if (d.isEmpty()) {
            throw new IllegalStateException("Department does not exist.");
        }

        Department dept = d.get();
        User teamHead = userRepository.findById(Long.valueOf(teamHeadId)).get();
//        User teamHead = userService.getUser(Long.valueOf(teamHeadId));
        if (!teamHead.getUserRole().equals(RoleEnum.MANAGER)) {
            throw new IllegalStateException("User selected is not a Manager, please appoint a manager instead");
        } else if (!teamHead.isEnabled()) {
            throw new IllegalStateException(
                    "Manager selected is not an active employee, please appoint an active employee instead");
        }

        List<User> teamMembers = List.of(teamHead);

        Roster tempRoster = new Roster("temp");
        Roster emptyRoster = rosterRepository.saveAndFlush(tempRoster);

        Team newTeam = new Team(teamName, outlet, isOffice, dept, emptyRoster, teamMembers, teamHead);

        Team savedTeam = teamRepository.saveAndFlush(newTeam);

        List<Team> tempTeams = teamHead.getTeams();
        tempTeams.add(savedTeam);
        teamHead.setTeams(tempTeams);
        userRepository.saveAndFlush(teamHead);

        dept.addTeam(savedTeam);
        departmentRepository.saveAndFlush(dept);

        emptyRoster.setTeam(savedTeam);
        rosterRepository.saveAndFlush(emptyRoster);



        return savedTeam.getTeamId();
    }

    public boolean addMemberToTeam(Integer teamId, Integer userId) {
        Optional<Team> t = teamRepository.findById(Long.valueOf(teamId));
        if (t.isEmpty()) {
            throw new IllegalStateException("Team does not exist");
        }
        Team team = t.get();

        Optional<User> u = userRepository.findById(Long.valueOf(userId));
        if (u.isEmpty()) {
            throw new IllegalStateException("User does not exist");
        }
        User user = u.get();

        if (user.getUserRole().equals(RoleEnum.APPLICANT) || user.getUserRole().equals(RoleEnum.ADMINISTRATOR)) {
            throw new IllegalStateException(
                    "User being assigned is not an employee, please add an active employee instead");
        }

        if (!user.isEnabled()) {
            throw new IllegalStateException(
                    "Employee being assigned is not an active employee, please appoint an active employee instead");
        }

        for (Team t1 : user.getTeams()) {
            if (t1.getTeamId().equals(team.getTeamId())) {
                throw new IllegalStateException("Employee is already in the team");
            }
        }

        List<Team> tempTeams = user.getTeams();
        tempTeams.add(team);

        user.setTeams(tempTeams);
        team.addUser(user);

        userRepository.save(user);
        teamRepository.save(team);

        return true;
    }

    public boolean removeMemberFromTeam(Integer userId, Integer teamId ) {
        Optional<Team> t = teamRepository.findById(Long.valueOf(teamId));
        if (t.isEmpty()) {
            throw new IllegalStateException("Team does not exist");
        }
        Team team = t.get();

        Optional<User> u = userRepository.findById(Long.valueOf(userId));
        if (u.isEmpty()) {
            throw new IllegalStateException("User does not exist");
        }
        User user = u.get();

        boolean checker = false;
        for (Team t1 : user.getTeams()) {
            if (t1.getTeamId().equals(team.getTeamId())) {
                checker = true;
                break;
            }
        }
        if (!checker) {
            throw new IllegalStateException("Employee is not in the team");
        }

        for(ShiftListItem sli : user.getShiftListItems()){

        }

        List<Team> tempTeams = user.getTeams();
        tempTeams.remove(team);

        user.setTeams(tempTeams);
        team.removeUser(user);

        userRepository.save(user);
        teamRepository.save(team);

        return true;
    }

    public String assignTeamToDept(Integer deptId, Integer teamId) {
        Optional<Department> d = departmentRepository.findById(Long.valueOf(deptId));
        if (d.isEmpty()) {
            throw new IllegalStateException("Department entity does not exist, cannot proceed");
        }

        Optional<Team> t = teamRepository.findById(Long.valueOf(teamId));
        if (t.isEmpty()) {
            throw new IllegalStateException("Team entity does not exist, cannot proceed");
        }

        if (d.get().getTeams().contains(t.get())) {
            throw new IllegalStateException("Team is already assigned to the department");
        }

        Department dept = d.get();
        Team team = t.get();
        Department oldDept = team.getDepartment();
        oldDept.removeTeam(team);
        dept.addTeam(team);
        team.setDepartment(dept);

        departmentRepository.save(oldDept);
        departmentRepository.save(dept);
        teamRepository.save(team);

        return "Team " + team.getTeamName() + " has been assigned to Department : " + dept.getDepartmentName();
    }

    public String changeTeamHead(Integer teamId, Integer newHeadId) {
        Optional<Team> t = teamRepository.findById(Long.valueOf(teamId));
        if (t.isEmpty()) {
            throw new IllegalStateException("Team entity does not exist, cannot proceed");
        }
        Team team = t.get();

        Optional<User> u = userRepository.findById(Long.valueOf(newHeadId));
        if (u.isEmpty()) {
            throw new IllegalStateException("User entity does not exist, cannot proceed");
        }
        User newTeamHead = u.get();

        if (!newTeamHead.getUserRole().equals(RoleEnum.MANAGER)) {
            throw new IllegalStateException("User selected is not a Manager, please appoint a manager instead");
        } else if (!newTeamHead.isEnabled()) {
            throw new IllegalStateException(
                    "Manager selected is not an active employee, please appoint an active employee instead");
        }

        team.setTeamHead(newTeamHead);
        if (!team.getUsers().contains(newTeamHead)) {
            addMemberToTeam(teamId, newHeadId);
        }

        teamRepository.save(team);

        return "Team " + team.getTeamName() + " head has been successfully updated to be " + newTeamHead.getFirstName()
                + " " + newTeamHead.getLastName();
    }

    public String moveEmployeeToTeam(Integer userId, Integer teamId, Integer newTeamId ) throws Exception {
        System.out.println("TeamService.moveEmployeeToTeam");
        Optional<Team> t = teamRepository.findById(Long.valueOf(teamId));
        if (t.isEmpty()) {
            throw new IllegalStateException("Team does not exist");
        }
        Team team = t.get();
        Long deptId = team.getDepartment().getDepartmentId();

        Optional<Department> d = departmentRepository.findById(Long.valueOf(deptId));
        Department dept = d.get();

//        Optional<User> u = userRepository.findById(Long.valueOf(userId));
//        if (u.isEmpty()) {
//            throw new IllegalStateException("User does not exist");
//        }
//        User user = u.get();

        // remove team members & team head
//        List<User> teamMembers = team.getUsers();
        if(team.getTeamHead().getUserId() == Long.valueOf(userId)){
            throw new Exception("User is team head. Unable to change teams for user until team head is changed.");
        }

        //remove from team and relationships regarding user
        boolean isRemoved = removeMemberFromTeam(teamId, userId);
        //add to team and relating to user
        boolean isAdded = addMemberToTeam(newTeamId, userId);

        //need to come back to this and check shifts and drop upcoming roster &/ shifts for user

        System.out.println("isRemoved: " + isRemoved + "& isAdded:" + isAdded);
        return "Member successfully moved to " + newTeamId ;
    }
}
