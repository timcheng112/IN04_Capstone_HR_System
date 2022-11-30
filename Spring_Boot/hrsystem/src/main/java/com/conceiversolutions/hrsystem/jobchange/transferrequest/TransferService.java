package com.conceiversolutions.hrsystem.jobchange.transferrequest;

import lombok.AllArgsConstructor;
import net.bytebuddy.asm.Advice.Local;

import org.springframework.stereotype.Service;

import com.conceiversolutions.hrsystem.enums.PositionTypeEnum;
import com.conceiversolutions.hrsystem.enums.RoleEnum;
import com.conceiversolutions.hrsystem.organizationstructure.department.Department;
import com.conceiversolutions.hrsystem.organizationstructure.department.DepartmentRepository;
import com.conceiversolutions.hrsystem.organizationstructure.team.Team;
import com.conceiversolutions.hrsystem.organizationstructure.team.TeamRepository;
import com.conceiversolutions.hrsystem.organizationstructure.team.TeamService;
import com.conceiversolutions.hrsystem.pay.payinformation.PayInformation;
import com.conceiversolutions.hrsystem.pay.payinformation.PayInformationService;
import com.conceiversolutions.hrsystem.user.position.Position;
import com.conceiversolutions.hrsystem.user.position.PositionRepository;
import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

@Service
@AllArgsConstructor
public class TransferService {

    private final TransferRepository transferRepository;

    private final UserRepository userRepository;

    private final PositionRepository positionRepository;

    private final DepartmentRepository departmentRepository;

    private final TeamRepository teamRepository;

    private final PayInformationService payInformationService;

    private final TeamService teamService;

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
            List<Team> teams = departmentRepository.findTeamsByDepartmentHead(userId);

            List<User> possible = new ArrayList<>();
            for (User u : allUsers) {
                boolean inTeam = false;
                for (Team t : teams) {
                    if (u.getUserId() == t.getTeamHead().getUserId()) {
                        inTeam = true;
                    }
                }
                if (!inTeam && !u.getWorkEmail().equals("ongj@libro.com")
                        && !u.getUserRole().equals(RoleEnum.ADMINISTRATOR)
                        && !u.getUserRole().equals(RoleEnum.APPLICANT)) {
                    possible.add(breakRelationships(u));
                }
            }

            return possible;
            // throw new IllegalStateException("Unable to find team");
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

        List<Team> teams = departmentRepository.findTeamsByDepartmentHead(managerId);

        for (Team t : teams) {

            for (User u : t.getUsers()) {
                Position p = u.getCurrentPosition();
                System.out.println(u.getFirstName());
                if (p.getPositionId() != positionId && !positions.contains(p)) {
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

        if (optionalEmployee.isPresent() && optionalPosition.isPresent() && optionalDepartment.isPresent()) {
            User employee = optionalEmployee.get();
            User manager = optionalManager.get();
            Position position = optionalPosition.get();
            Department department = optionalDepartment.get();
            Team team = null;
            if (teamId != 0) {
                team = optionalTeam.get();
            }

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

    public TransferRequest getTransferRequest(Long requestId) throws Exception {
        Optional<TransferRequest> optionalTR = transferRepository.findById(requestId);

        if (optionalTR.isPresent()) {
            TransferRequest request = optionalTR.get();

            request.setEmployee(breakRelationships(request.getEmployee()));
            request.setManager(breakRelationships(request.getManager()));
            request.setInterviewer(breakRelationships(request.getInterviewer()));

            if (request.getProcessedBy() != null) {
                request.setProcessedBy(breakRelationships(request.getProcessedBy()));
            }

            Department department = new Department();
            department.setDepartmentId(request.getNewDepartment().getDepartmentId());
            department.setDepartmentName(request.getNewDepartment().getDepartmentName());
            request.setNewDepartment(department);

            Team team = new Team();
            if (request.getNewTeam() != null) {
                team.setTeamId(request.getNewTeam().getTeamId());
                team.setTeamName(request.getNewTeam().getTeamName());
                request.setNewTeam(team);
            }

            return request;

        } else {
            throw new IllegalStateException("Unable to find transfer request");
        }
    }

    @Transactional
    public String conductInterview(Long transferId, String comments, String status) throws Exception {

        Optional<TransferRequest> optionalTransfer = transferRepository.findById(transferId);

        if (optionalTransfer.isPresent()) {
            TransferRequest transferRequest = optionalTransfer.get();

            transferRequest.setInterviewRemarks(comments);
            transferRequest.setStatus(status);

            return "" + transferRequest.getEmployee().getFirstName() + " " + transferRequest.getEmployee().getLastName()
                    + " has " + transferRequest.getStatus().toLowerCase() + " the transfer interview.";
        } else {
            throw new IllegalStateException("Unable to find transfer request");
        }

    }

    @Transactional
    public String processTransferRequest(Long transferId, String rejectRemarks, String basicSalary,
            String basicHourlyPay, String weekendHourlyPay, String eventPay, Long processedById) throws Exception {
        Optional<TransferRequest> request = transferRepository.findById(transferId);
        Optional<User> optionalProcessedBy = userRepository.findById(processedById);

        if (request.isPresent() && optionalProcessedBy.isPresent()) {
            TransferRequest tr = request.get();

            if (tr.getNewTeam() != null) {
                Team team = tr.getNewTeam();
                Long oldTeamId = teamService.getTeamByEmployee(tr.getEmployee().getUserId());
                Optional<User> optionalUser = userRepository.findById(tr.getEmployee().getUserId());

                Optional<Team> oldTeamOptional = teamRepository.findById(oldTeamId);

                if (oldTeamOptional.isPresent()) {
                    Team oldTeam = oldTeamOptional.get();

                    if (optionalUser.isPresent()) {
                        User user = optionalUser.get();
                        oldTeam.getUsers().remove(user);
                        team.addUser(user);
                    }

                } else {
                    throw new IllegalStateException("Unable to find old team");
                }

            }

            User processedBy = optionalProcessedBy.get();

            tr.setProcessedBy(processedBy);

            if (rejectRemarks.isEmpty()) {

                PayInformation pi = payInformationService.getUserPayInformation(tr.getEmployee().getUserId());

                if (!basicSalary.isEmpty()) {
                    pi.setBasicSalary(new BigDecimal(basicSalary));
                } else {
                    pi.setBasicHourlyPay(new BigDecimal(basicHourlyPay));
                    pi.setWeekendHourlyPay(new BigDecimal(weekendHourlyPay));
                    pi.setEventPhHourlyPay(new BigDecimal(eventPay));
                }

                tr.setStatus("Approved");

            } else {
                tr.setStatus("Rejected");
                tr.setRejectRemarks(rejectRemarks);
            }
            return "Transfer request for " + tr.getEmployee().getFirstName() + " " + tr.getEmployee().getLastName()
                    + " has been " + tr.getStatus().toLowerCase() + ".";
        } else {
            throw new IllegalStateException("Unable to find transfer request");
        }
    }

    public List<TransferRequest> getActiveRequests(Long userId) {
        List<TransferRequest> active = transferRepository.findUserActiveRequests(userId);

        for (TransferRequest t : active) {
            t.setEmployee(breakRelationships(t.getEmployee()));
            t.setManager(breakRelationships(t.getManager()));

            if (t.getInterviewer() != null) {
                t.setInterviewer(breakRelationships(t.getInterviewer()));
            }

            if (t.getProcessedBy() != null) {
                t.setProcessedBy(breakRelationships(t.getProcessedBy()));
            }
            t.setNewDepartment(null);
            t.setNewTeam(null);

        }

        return active;
    }

    public List<TransferRequest> getInterviewRequests(Long userId) {
        List<TransferRequest> toInterview = transferRepository.findUserToInterviewRequests(userId);

        for (TransferRequest t : toInterview) {
            t.setEmployee(breakRelationships(t.getEmployee()));
            t.setManager(breakRelationships(t.getManager()));

            if (t.getInterviewer() != null) {
                t.setInterviewer(breakRelationships(t.getInterviewer()));
            }

            if (t.getProcessedBy() != null) {
                t.setProcessedBy(breakRelationships(t.getProcessedBy()));
            }
            t.setNewDepartment(null);
            t.setNewTeam(null);
        }
        return toInterview;
    }

    public List<TransferRequest> getApproveRequests(Long userId) {
        List<TransferRequest> toApprove = transferRepository.findUserToApproveRequests(userId);

        for (TransferRequest t : toApprove) {
            t.setEmployee(breakRelationships(t.getEmployee()));
            t.setManager(breakRelationships(t.getManager()));

            if (t.getInterviewer() != null) {
                t.setInterviewer(breakRelationships(t.getInterviewer()));
            }

            if (t.getProcessedBy() != null) {
                t.setProcessedBy(breakRelationships(t.getProcessedBy()));
            }
            t.setNewDepartment(null);
            t.setNewTeam(null);
        }
        return toApprove;
    }

    public List<TransferRequest> getRequestHistory(Long userId) {
        List<TransferRequest> history = transferRepository.findUserRequestHistory(userId);

        for (TransferRequest t : history) {
            t.setEmployee(breakRelationships(t.getEmployee()));
            t.setManager(breakRelationships(t.getManager()));

            if (t.getInterviewer() != null) {
                t.setInterviewer(breakRelationships(t.getInterviewer()));
            }

            if (t.getProcessedBy() != null) {
                t.setProcessedBy(breakRelationships(t.getProcessedBy()));
            }
            t.setNewDepartment(null);
            t.setNewTeam(null);
        }
        return history;
    }
}
