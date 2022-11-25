package com.conceiversolutions.hrsystem.jobchange.promotionrequest;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/promotion")
@AllArgsConstructor
public class PromotionController {

    private final PromotionService promotionService;

    public List<PromotionRequest> getAllPromotionRequests() {
        return promotionService.getAllPromotionRequests();
    }

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
    public String submitPromotionRequest(@PathVariable("promotionId") Long promotionId, @RequestParam("promotionJustification") String promotionJustification,
            @RequestParam("positionId") Long positionId, @RequestParam("withdrawRemarks") String withdrawRemarks) throws Exception {
                return promotionService.submitPromotionRequest(promotionId, promotionJustification, positionId, withdrawRemarks);
    }

    @GetMapping(path = "/active/{userId}")
    public List<PromotionRequest> getUserActiveRequests(@PathVariable("userId") Long userId) throws Exception {
        return promotionService.getUserActiveRequests(userId);
    }

    @GetMapping(path = "/history/{userId}")
    public List<PromotionRequest> getUserRequestHistory(@PathVariable("userId") Long userId) throws Exception {
        return promotionService.getUserRequestHistory(userId);
    }

    @GetMapping(path = "{promotionId}")
    public PromotionRequest getPromotionRequest(@PathVariable("promotionId") Long promotionId) throws Exception {
        return promotionService.getPromotionRequest(promotionId);
    }
}
