package com.conceiversolutions.hrsystem.jobchange.promotionrequest;

import java.time.LocalDate;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.conceiversolutions.hrsystem.organizationstructure.team.Team;

import lombok.AllArgsConstructor;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/promotion")
@AllArgsConstructor
public class PromotionController {

    private final PromotionService promotionService;

    // public List<PromotionRequest> getAllPromotionRequests() {
    // return promotionService.getAllPromotionRequests();
    // }

    @PostMapping
    public String createPromotionRequest(@RequestParam("created") LocalDate created,
            @RequestParam("appraisalId") Long appraisalId, @RequestParam("employeeId") Long employeeId,
            @RequestParam("managerId") Long managerId,
            @RequestParam("promotionJustification") String promotionJustification,
            @RequestParam("withdrawRemarks") String withdrawRemarks) throws Exception {
        return promotionService.createPromotionRequest(created, appraisalId, employeeId, managerId,
                promotionJustification, withdrawRemarks);
    }

    @PutMapping(path = "/submit/{promotionId}")
    public String submitPromotionRequest(@PathVariable("promotionId") Long promotionId,
            @RequestParam("promotionJustification") String promotionJustification,
            @RequestParam("positionId") Long positionId, @RequestParam("withdrawRemarks") String withdrawRemarks,
            @RequestParam("interviewDate") String interviewDate)
            throws Exception {
        return promotionService.submitPromotionRequest(promotionId, promotionJustification, positionId,
                withdrawRemarks, interviewDate);
    }

    @PutMapping(path = "/interview/{promotionId}")
    public String conductInterview(@PathVariable("promotionId") Long promotionId,
            @RequestParam("comments") String comments, @RequestParam("status") String status) throws Exception {
        return promotionService.conductInterview(promotionId, comments, status);
    }

    @PutMapping(path = "/process/{promotionId}")
    public String processPromotionRequest(@PathVariable("promotionId") Long promotionId,
            @RequestParam("rejectRemarks") String rejectRemarks,
            @RequestParam("basicSalary") String basicSalary,
            @RequestParam("basicHourlyPay") String basicHourlyPay,
            @RequestParam("weekendHourlyPay") String weekendHourlyPay,
            @RequestParam("eventPay") String eventPay,
            @RequestParam("processedBy") Long processedById,
            @RequestParam("newTeam") Boolean newTeam,
            @RequestParam("teamName") String teamName,
            @RequestParam("outletId") Long outletId,
            @RequestParam("inOffice") Boolean inOffice,
            @RequestParam("departmentId") Long departmentId)
            throws Exception {
        return promotionService.processPromotionRequest(promotionId, rejectRemarks, basicSalary,
                basicHourlyPay, weekendHourlyPay, eventPay, processedById, newTeam, teamName, outletId, inOffice, departmentId);
    }

    @GetMapping(path = "/active/{userId}")
    public List<PromotionRequest> getUserActiveRequests(@PathVariable("userId") Long userId) throws Exception {
        return promotionService.getUserActiveRequests(userId);
    }

    @GetMapping(path = "/interview/{userId}")
    public List<PromotionRequest> getUserToInterviewRequests(@PathVariable("userId") Long userId) throws Exception {
        return promotionService.getUserToInterviewRequests(userId);
    }

    @GetMapping(path = "/approve/{userId}")
    public List<PromotionRequest> getUserToApproveRequests(@PathVariable("userId") Long userId) throws Exception {
        return promotionService.getUserToApproveRequests(userId);
    }

    @GetMapping(path = "/history/{userId}")
    public List<PromotionRequest> getUserRequestHistory(@PathVariable("userId") Long userId) throws Exception {
        return promotionService.getUserRequestHistory(userId);
    }

    @GetMapping(path = "{promotionId}")
    public PromotionRequest getPromotionRequest(@PathVariable("promotionId") Long promotionId) throws Exception {
        return promotionService.getPromotionRequest(promotionId);
    }

    // public String addAPromotionRequest(@PathVariable("userInQuestion") Long
    // employeeId, @PathVariable("userId") Long managerId,
    // @PathVariable("departmentId") Long departmentId,@PathVariable("assigned")
    // Long processedBy, @RequestParam("interviewComments") String interviewComments
    // ){
    // return promotionService.addAPromotionRequest(employeeId,managerId,
    // departmentId, processedBy, interviewComments);
    // }
    @GetMapping(path = "/position/{positionId}")
    public String getPositionGroup(@PathVariable("positionId") Long positionId) throws Exception {
        return promotionService.getPositionGroup(positionId);
    }

    // @PostMapping(path = "/team")
    // public Long addNewTeamPromotion(@RequestParam("teamName") String teamName,
    // @RequestParam("teamHeadId") Integer teamHeadId,
    // @RequestParam("outletId") Integer outletId,
    // @RequestParam("isOffice") Boolean isOffice,
    // @RequestParam("deptId") Integer deptId) {
    // return promotionService.addNewTeamPromotion(teamName, teamHeadId, outletId,
    // isOffice, deptId);
    // }

    @GetMapping(path = "/team/{userId}")
    public Team getNewTeamPromotion(@PathVariable("userId") Long userId) throws Exception {
        return promotionService.getNewTeamPromotion(userId);
    }

    @GetMapping(path = "/team/department/{departmentId}")
    public List<Team> getTeamEmptyHead(@PathVariable("departmentId") Long departmentId) throws Exception {
        return promotionService.getTeamEmptyHead(departmentId);
    }

    @GetMapping(path = "/user/{employeeId}")
    public PromotionRequest getPromotionRequestByEmployee(@PathVariable("employeeId") Long employeeId) throws Exception {
        return promotionService.getPromotionRequestByEmployee(employeeId);
    }


}
