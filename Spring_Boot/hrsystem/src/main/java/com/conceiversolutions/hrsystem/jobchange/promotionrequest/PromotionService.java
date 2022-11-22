package com.conceiversolutions.hrsystem.jobchange.promotionrequest;


import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class PromotionService {

    private final PromotionRepository promotionRepository;

    public List<PromotionRequest> getAllPromotionRequests(){
        return promotionRepository.findAll();
    }
}
