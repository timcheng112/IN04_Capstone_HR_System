package com.conceiversolutions.hrsystem.jobchange.promotionrequest;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/promotion")
@AllArgsConstructor
public class PromotionController {

    private final PromotionService promotionService;

    public List<PromotionRequest> getAllPromotionRequests(){
        return promotionService.getAllPromotionRequests();
    }

    public String addAPromotionRequest(@PathVariable("userInQuestion") Long employeeId, @PathVariable("userId") Long managerId, @PathVariable("departmentId")  Long departmentId,@PathVariable("assigned") Long processedBy, @RequestParam("interviewComments") String interviewComments ){
        return promotionService.addAPromotionRequest(employeeId,managerId, departmentId, processedBy, interviewComments);
    }


}
