package com.conceiversolutions.hrsystem.jobchange.promotionrequest;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.conceiversolutions.hrsystem.organizationstructure.department.DepartmentService;
import com.conceiversolutions.hrsystem.organizationstructure.organization.OrganizationService;
import com.conceiversolutions.hrsystem.organizationstructure.team.TeamService;
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

            User employee = optionalEmployee.get().nullify();
            User manager = optionalManager.get().nullify();
            Appraisal appraisal = optionalAppraisal.get();
            appraisal.getEmployee().nullify();
            appraisal.getManagerAppraising().nullify();

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

                    User interviewer = optionalInterviewer.get().nullify();
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
            pr.getAppraisal().getEmployee().nullify();
            pr.getAppraisal().getManagerAppraising().nullify();
            pr.getEmployee().nullify();
            pr.getManager().nullify();
            pr.getInterviewer().nullify();
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

            promotionRequest.getAppraisal().getEmployee().nullify();
            promotionRequest.getAppraisal().getManagerAppraising().nullify();

            promotionRequest.getEmployee().nullify();
            promotionRequest.getManager().nullify();

            if (promotionRequest.getInterviewer() != null) {
                promotionRequest.getInterviewer().nullify();
            }

            return promotionRequest;
        } else {
            throw new IllegalStateException("Promotion Request unable to be found");
        }
    }

    @Transactional
    public String submitPromotionRequest(Long promotionId, String promotionJustification, Long positionId,
            String withdrawRemarks) throws Exception {

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
            pr.getEmployee().nullify();
            pr.getManager().nullify();
            if (pr.getInterviewer() != null) {
                pr.getInterviewer().nullify();
            }
        }
        return requests;
    }
}
