package com.conceiversolutions.hrsystem.jobchange.promotionrequest;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
