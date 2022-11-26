package com.conceiversolutions.hrsystem.jobchange.promotionrequest;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.conceiversolutions.hrsystem.engagement.leavequota.LeaveQuota;
import com.conceiversolutions.hrsystem.organizationstructure.department.DepartmentService;
import com.conceiversolutions.hrsystem.organizationstructure.organization.OrganizationService;
import com.conceiversolutions.hrsystem.organizationstructure.team.TeamService;
import com.conceiversolutions.hrsystem.pay.payinformation.PayInformation;
import com.conceiversolutions.hrsystem.pay.payinformation.PayInformationService;
import com.conceiversolutions.hrsystem.performance.appraisal.Appraisal;
import com.conceiversolutions.hrsystem.performance.appraisal.AppraisalRepository;
import com.conceiversolutions.hrsystem.user.position.Position;
import com.conceiversolutions.hrsystem.user.position.PositionRepository;
import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PromotionService {

    private final UserRepository userRepository;

    private final PromotionRepository promotionRepository;

    private final PositionRepository positionRepository;

    private final DepartmentService departmentService;

    private final TeamService teamService;

    private final OrganizationService organizationService;

    private final AppraisalRepository appraisalRepository;

    private final PayInformationService payInformationService;

    public User breakRelationships(User user) {
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

    public List<PromotionRequest> getAllPromotionRequests() {
        return promotionRepository.findAll();
    }

    public String createPromotionRequest(LocalDate created, Long appraisalId, Long employeeId, Long managerId,
            String promotionJustification,
            String withdrawRemarks) throws Exception {

        System.out.println("PromotionService.createPromotionRequest");

        Optional<User> optionalEmployee = userRepository.findById(employeeId);
        Optional<User> optionalManager = userRepository.findById(managerId);
        Optional<Appraisal> optionalAppraisal = appraisalRepository.findById(appraisalId);

        if (optionalEmployee.isPresent() && optionalManager.isPresent() && optionalAppraisal.isPresent()) {

            User employee = breakRelationships(optionalEmployee.get());
            User manager = breakRelationships(optionalManager.get());
            Appraisal appraisal = optionalAppraisal.get();
            appraisal.setEmployee(breakRelationships(appraisal.getEmployee()));
            appraisal.setManagerAppraising(breakRelationships(appraisal.getManagerAppraising()));

            Optional<PromotionRequest> existingPromotionRequest = promotionRepository
                    .findExistingPromotionRequest(appraisalId, employeeId, managerId);

            if (!existingPromotionRequest.isPresent()) {

                Long interviewerId = Long.valueOf(-1);

                if (teamService.isEmployeeTeamHead(managerId) > -1) {
                    User departmentHead = departmentService.getDepartmentHeadByEmployee(employeeId);
                    interviewerId = departmentHead.getUserId();
                    // System.out.println("Department head is user with id " +
                    // departmentHead.getUserId());
                }
                // else if (departmentService.isEmployeeDepartmentHead(managerId) > -1) {
                // System.out.println("Department " + managerId);
                // User organizationHead = organizationService.getOrganizationHead();
                // interviewerId = organizationHead.getUserId();
                // } else if (organizationService.isEmployeeOrganizationHead(managerId) > -1) {
                // interviewerId = managerId;
                // }

                System.out.println("Interviewer is user " + interviewerId);

                Optional<User> optionalInterviewer = userRepository.findById(interviewerId);

                if (optionalInterviewer.isPresent()) {

                    User interviewer = breakRelationships(optionalInterviewer.get());
                    PromotionRequest promotionRequest = new PromotionRequest(created, appraisal, employee, manager,
                            interviewer, "Created", promotionJustification, "");

                    PromotionRequest pr = promotionRepository.save(promotionRequest);

                } else {
                    throw new IllegalStateException("Unable to find interviewer");
                }
                // System.out.println("Promotion Request id " + pr.getPromotionId());

                return "Promotion request for " + employee.getFirstName() + " " + employee.getLastName()
                        + " has been created";
            } else {

                return "Promotion request for " + employee.getFirstName() + " " + employee.getLastName()
                        + " has already been created";
            }

        } else {
            throw new IllegalStateException("Employee, manager or appraisal does not exist");
        }
    }

    public List<PromotionRequest> getUserActiveRequests(Long userId) {

        System.out.println("PromotionService.getUserActiveRequests");

        List<PromotionRequest> activeRequests = promotionRepository.findUserActiveRequests(userId);

        for (PromotionRequest pr : activeRequests) {
            pr.getAppraisal().setEmployee(breakRelationships(pr.getAppraisal().getEmployee()));
            pr.getAppraisal().setManagerAppraising(breakRelationships(pr.getAppraisal().getManagerAppraising()));

            pr.setEmployee(breakRelationships(pr.getEmployee()));
            pr.setManager(breakRelationships(pr.getManager()));
            pr.setInterviewer(breakRelationships(pr.getInterviewer()));

            if (pr.getProcessedBy() != null) {
                pr.setProcessedBy(breakRelationships(pr.getProcessedBy()));
            }

            // pr.getProcessedBy().nullify();
        }

        System.out.print("Active requests ");
        System.out.println(activeRequests);
        return activeRequests;
    }

    public PromotionRequest getPromotionRequest(Long promotionId) throws Exception {
        Optional<PromotionRequest> optionalPromotion = promotionRepository.findById(promotionId);
        if (optionalPromotion.isPresent()) {
            PromotionRequest promotionRequest = optionalPromotion.get();

            // promotionRequest.getAppraisal().getEmployee().nullify();
            // promotionRequest.getAppraisal().getManagerAppraising().nullify();

            // promotionRequest.getEmployee().nullify();
            // promotionRequest.getManager().nullify();

            promotionRequest.getAppraisal()
                    .setEmployee(breakRelationships(promotionRequest.getAppraisal().getEmployee()));
            promotionRequest.getAppraisal()
                    .setManagerAppraising(breakRelationships(promotionRequest.getAppraisal().getManagerAppraising()));

            promotionRequest.setEmployee(breakRelationships(promotionRequest.getEmployee()));
            promotionRequest.setManager(breakRelationships(promotionRequest.getManager()));

            if (promotionRequest.getInterviewer() != null) {
                promotionRequest.setInterviewer(breakRelationships(promotionRequest.getInterviewer()));
                // promotionRequest.getInterviewer().nullify();
            }

            if (promotionRequest.getProcessedBy() != null) {
                promotionRequest.setProcessedBy(breakRelationships(promotionRequest.getProcessedBy()));
            }

            return promotionRequest;
        } else {
            throw new IllegalStateException("Unable to find promotion request");
        }
    }

    @Transactional
    public String submitPromotionRequest(Long promotionId, String promotionJustification, Long positionId,
            String withdrawRemarks, String interviewDate) throws Exception {

        System.out.println("PromotionService.submitPromotionRequest");

        Optional<PromotionRequest> optionalRequest = promotionRepository.findById(promotionId);

        if (optionalRequest.isPresent()) {

            PromotionRequest promotionRequest = optionalRequest.get();

            if (withdrawRemarks.isEmpty()) {

                Optional<Position> optionalPosition = positionRepository.findById(positionId);

                if (optionalPosition.isPresent()) {

                    Position newPosition = optionalPosition.get();

                    promotionRequest.setPromotionJustification(promotionJustification);
                    promotionRequest.setNewPosition(newPosition);
                    promotionRequest.setInterviewDate(LocalDate.parse(interviewDate));

                    promotionRequest.setWithdrawRemarks("");
                    promotionRequest.setStatus("Submitted");

                    return "Promotion request for " + promotionRequest.getEmployee().getFirstName() + " "
                            + promotionRequest.getEmployee().getLastName() + " has been "
                            + promotionRequest.getStatus().toLowerCase();

                } else {
                    throw new IllegalStateException("Unable to find position");
                }

            } else {
                promotionRequest.setWithdrawRemarks(withdrawRemarks);
                promotionRequest.setStatus("Withdrawn");
                return "Promotion request for " + promotionRequest.getEmployee().getFirstName() + " "
                        + promotionRequest.getEmployee().getLastName() + " has been "
                        + promotionRequest.getStatus().toLowerCase();
            }

        } else {
            throw new IllegalStateException("Unable to find position or promotion request");
        }

    }

    public List<PromotionRequest> getUserRequestHistory(Long userId) {
        List<PromotionRequest> requests = promotionRepository.findUserRequestHistory(userId);
        for (PromotionRequest pr : requests) {

            pr.getAppraisal().setEmployee(breakRelationships(pr.getAppraisal().getEmployee()));
            pr.getAppraisal().setManagerAppraising(breakRelationships(pr.getAppraisal().getManagerAppraising()));

            User employee = pr.getEmployee();
            User manager = pr.getManager();

            pr.setEmployee(breakRelationships(employee));
            pr.setManager(breakRelationships(manager));

            // pr.getEmployee().nullify();
            // pr.getManager().nullify();
            if (pr.getInterviewer() != null) {
                User interviewer = pr.getInterviewer();
                pr.setInterviewer(breakRelationships(interviewer));
                // pr.getInterviewer().nullify();
            }

            if (pr.getProcessedBy() != null) {
                User processedBy = pr.getProcessedBy();
                pr.setProcessedBy(breakRelationships(processedBy));
            }
        }
        return requests;
    }

    @Transactional
    public String conductInterview(Long promotionId, String comments, String status) throws Exception {

        System.out.println("PromotionService.conductInterview");

        Optional<PromotionRequest> optionalRequest = promotionRepository.findById(promotionId);

        if (optionalRequest.isPresent()) {

            PromotionRequest request = optionalRequest.get();

            request.setInterviewRemarks(comments);
            request.setStatus(status);

            return "" + request.getEmployee().getFirstName() + " "
                    + request.getEmployee().getLastName() + " has "
                    + request.getStatus().toLowerCase() + " the promotion interview.";

        } else {
            throw new IllegalStateException("Unable to find promotion request");
        }

    }

    @Transactional
    public String processPromotionRequest(Long promotionId, String effectiveFrom, String rejectRemarks,
            String basicSalary, String basicHourlyPay, String weekendHourlyPay, String eventPay,
            Long processedById) throws Exception {

        Optional<PromotionRequest> optionalRequest = promotionRepository.findById(promotionId);
        Optional<User> optionalProcessed = userRepository.findById(processedById);

        if (optionalRequest.isPresent() && optionalProcessed.isPresent()) {

            PromotionRequest pr = optionalRequest.get();

            Optional<User> optionalEmployee = userRepository.findById(pr.getEmployee().getUserId());
            Optional<Position> optionalPosition = positionRepository.findById(pr.getNewPosition().getPositionId());

            if (optionalEmployee.isPresent() && optionalPosition.isPresent()) {

                User employee = optionalEmployee.get();

                Position newPosition = optionalPosition.get();

                breakRelationships(employee).setCurrentPosition(newPosition);

                pr.setEmployee(employee);

                User processedBy = optionalProcessed.get();
               
                pr.setProcessedBy(breakRelationships(processedBy));

                PayInformation pi = payInformationService.getUserPayInformation(pr.getEmployee().getUserId());

                if (rejectRemarks.isEmpty()) {

                    pr.setEffectiveFrom(LocalDate.parse(effectiveFrom));

                    if (!basicSalary.isEmpty()) {
                        pi.setBasicSalary(new BigDecimal(basicSalary));
                    } else {
                        pi.setBasicHourlyPay(new BigDecimal(basicHourlyPay));
                        pi.setWeekendHourlyPay(new BigDecimal(weekendHourlyPay));
                        pi.setEventPhHourlyPay(new BigDecimal(eventPay));
                    }

                    pr.setStatus("Approved");

                } else {
                    pr.setRejectRemarks(rejectRemarks);
                    pr.setStatus("Rejected");
                }

                pr.setEmployee(breakRelationships(pr.getEmployee()));
                pr.setManager(breakRelationships(pr.getManager()));
                pr.setInterviewer(breakRelationships(pr.getInterviewer()));

                return "Promotion request for " + pr.getEmployee().getFirstName() + " " + pr.getEmployee().getLastName()
                        + " has been " + pr.getStatus().toLowerCase();

            } else {
                throw new IllegalStateException("Unable to find employee or new position");
            }

        } else {
            throw new IllegalStateException("Unable to find request or user");
        }

    }

    public List<PromotionRequest> getUserToInterviewRequests(Long userId) {
        List<PromotionRequest> toInterview = promotionRepository.findUserToInterviewRequests(userId);

        for (PromotionRequest p : toInterview) {
            p.getAppraisal().setEmployee(breakRelationships(p.getEmployee()));
            p.getAppraisal().setManagerAppraising(breakRelationships(p.getManager()));

            p.setEmployee(breakRelationships(p.getEmployee()));
            p.setManager(breakRelationships(p.getManager()));
            p.setInterviewer(breakRelationships(p.getInterviewer()));
            if (p.getProcessedBy() != null) {
                p.setProcessedBy(breakRelationships(p.getProcessedBy()));
            }
        }

        return toInterview;
    }

    public List<PromotionRequest> getUserToApproveRequests(Long userId) {
        List<PromotionRequest> promotionRequests = promotionRepository.findUserToApproveRequests(userId);
        for (PromotionRequest p : promotionRequests) {
            p.getAppraisal().setEmployee(breakRelationships(p.getEmployee()));
            p.getAppraisal().setManagerAppraising(breakRelationships(p.getManager()));

            p.setEmployee(breakRelationships(p.getEmployee()));
            p.setManager(breakRelationships(p.getManager()));
            p.setInterviewer(breakRelationships(p.getInterviewer()));
            if (p.getProcessedBy() != null) {
                p.setProcessedBy(breakRelationships(p.getProcessedBy()));
            }
        }
        return promotionRequests;
    }
}
