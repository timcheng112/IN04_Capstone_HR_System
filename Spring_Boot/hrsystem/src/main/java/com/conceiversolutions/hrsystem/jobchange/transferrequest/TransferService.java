package com.conceiversolutions.hrsystem.jobchange.transferrequest;

import lombok.AllArgsConstructor;
import net.bytebuddy.asm.Advice.Local;

import org.springframework.stereotype.Service;

import com.conceiversolutions.hrsystem.enums.RoleEnum;
import com.conceiversolutions.hrsystem.organizationstructure.department.Department;
import com.conceiversolutions.hrsystem.organizationstructure.department.DepartmentRepository;
import com.conceiversolutions.hrsystem.organizationstructure.team.Team;
import com.conceiversolutions.hrsystem.organizationstructure.team.TeamRepository;
import com.conceiversolutions.hrsystem.user.position.Position;
import com.conceiversolutions.hrsystem.user.position.PositionRepository;
import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TransferService {

    private final TransferRepository transferRepository;

    private final UserRepository userRepository;

    private final PositionRepository positionRepository;

    private final DepartmentRepository departmentRepository;

    private final TeamRepository teamRepository;

    private User breakRelationships(User user) {
        User u = new User();

        u.setUserId(user.getUserId());
        u.setFirstName(user.getFirstName());
        u.setLastName(user.getLastName());
        u.setWorkEmail(user.getWorkEmail());
        u.setUserRole(user.getUserRole());
        u.setProfilePic(user.getProfilePic());
        u.setIsBlackListed(user.getIsBlackListed());
        u.setCitizenship(user.getCitizenship());
        u.setDateJoined(user.getDateJoined());
        u.setDob(user.getDob());
        u.setEmail(user.getEmail());
        u.setGender(user.getGender());
        u.setIsEnabled(user.getIsEnabled());
        u.setIsHrEmployee(user.getIsHrEmployee());
        u.setIsPartTimer(user.getIsPartTimer());
        u.setPassword(user.getPassword());
        u.setPhone(user.getPhone());
        u.setRace(user.getRace());
        u.setCurrentPosition(user.getCurrentPosition());
        u.setCurrentLeaveQuota(user.getCurrentLeaveQuota());

        return u;
    }

    public List<TransferRequest> getAllTransferRequests() {
        return transferRepository.findAll();
    }

    public List<User> getTransferrableEmployees(Long userId) throws Exception {
        List<User> allUsers = userRepository.findAll();

        Optional<Team> optionalTeam = teamRepository.findTeamByTeamHead(userId);

        if (optionalTeam.isPresent()) {
            Team team = optionalTeam.get();

            List<User> possible = new ArrayList<>();
            for (User u : allUsers) {
                boolean inTeam = false;
                for (User member : team.getUsers()) {
                    if (member.getUserId() == u.getUserId()) {
                        inTeam = true;
                    }
                }
                if (!inTeam) {
                    possible.add(u);
                }
            }

            List<User> users = new ArrayList<>();
            for (User u : possible) {
                if (u.getUserId() == userId || u.getWorkEmail().equals("ongj@libro.com")
                        || u.getUserRole().equals(RoleEnum.ADMINISTRATOR)
                        || u.getUserRole().equals(RoleEnum.APPLICANT)) {

                } else {
                    users.add(breakRelationships(u));
                }
            }

            return users;
        } else {
            throw new IllegalStateException("Unable to find team");
        }
    }

    public List<Position> getPositionsToTransfer(Long managerId, String userRole, Long positionId) {

        Optional<Team> optionalTeam = teamRepository.findTeamByTeamHead(managerId);
        List<Position> positions = new ArrayList<>();

        if (optionalTeam.isPresent()) {
            Team team = optionalTeam.get();
            for (User u : team.getUsers()) {
                Position p = u.getCurrentPosition();
                if (p.getPositionId() != positionId) {
                    positions.add(p);
                }
            }
        }

        // RoleEnum role = RoleEnum.EMPLOYEE;
        // if (userRole.equals("MANAGER")) {
        // role = RoleEnum.MANAGER;
        // }
        // List<User> users = userRepository.findUsersWithSameRole(role);

        // for (User u : users) {
        // if (!u.getWorkEmail().equals("ongj@libro.com")) {
        // Optional<Position> optionalPosition =
        // positionRepository.findUserPosition(u.getUserId());
        // if (optionalPosition.isPresent()) {
        // Position p = optionalPosition.get();
        // if (!positions.contains(p) && p.getPositionId() != positionId) {
        // positions.add(p);
        // }
        // }
        // }
        // }

        return positions;
    }

    public Department getNewDepartment(Long positionId) throws Exception {
        List<User> users = userRepository.findUsersWithPosition(positionId);
        for (User u : users) {
            Optional<Department> optionalDepartment = departmentRepository.findDepartmentByEmployeeId(u.getUserId());
            if (optionalDepartment.isPresent()) {
                Department newDepartment = optionalDepartment.get();
                Department d = new Department();
                d.setDepartmentId(newDepartment.getDepartmentId());
                d.setDepartmentName(newDepartment.getDepartmentName());
                return d;
            }

        }
        throw new IllegalStateException("Unable to find new department");
    }

    public List<Team> getPossibleTeams(Long departmentId) throws Exception {
        Optional<Department> optionalDepartment = departmentRepository.findById(departmentId);
        if (optionalDepartment.isPresent()) {
            List<Team> teams = optionalDepartment.get().getTeams();
            List<Team> possibleTeams = new ArrayList<>();
            for (Team t : teams) {
                Team newTeam = new Team();
                newTeam.setTeamId(t.getTeamId());
                newTeam.setTeamName(t.getTeamName());
                possibleTeams.add(newTeam);
            }
            return possibleTeams;
        } else {
            throw new IllegalStateException("Unable to find department");
        }
    }

    public Long createTransferRequest(Long managerId, Long employeeId, Long positionId, Long departmentId,
            Long teamId,
            String interview) throws Exception {
        LocalDate createdDate = LocalDate.now();
        LocalDate interviewDate = LocalDate.parse(interview);

        Optional<User> optionalEmployee = userRepository.findById(employeeId);
        Optional<User> optionalManager = userRepository.findById(managerId);
        Optional<Position> optionalPosition = positionRepository.findById(positionId);
        Optional<Department> optionalDepartment = departmentRepository.findById(departmentId);
        Optional<Team> optionalTeam = teamRepository.findById(teamId);

        if (optionalEmployee.isPresent() && optionalPosition.isPresent() && optionalDepartment.isPresent()
                && optionalTeam.isPresent()) {
            User employee = optionalEmployee.get();
            User manager = optionalManager.get();
            Position position = optionalPosition.get();
            Department department = optionalDepartment.get();
            Team team = optionalTeam.get();

            TransferRequest tr = new TransferRequest(createdDate, "Submitted", employee, manager, manager, null,
                    position, team, department,
                    interviewDate, "", "");

            TransferRequest request = transferRepository.save(tr);
            return request.getTransferId();
        } else {
            throw new IllegalStateException("Unable to find employee, position, team or department");
        }
    }

    public Team getNewTeam(Long userId) throws Exception {
        List<Team> teams = teamRepository.findAll();
        for (Team t : teams) {
            for (User u : t.getUsers()) {
                if (u.getUserId() == userId) {
                    Team newTeam = new Team();
                    newTeam.setTeamId(t.getTeamId());
                    newTeam.setTeamName(t.getTeamName());
                    return newTeam;
                }
            }
        }
        throw new IllegalStateException("Unable to find team");
    }
}
