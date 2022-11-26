package com.conceiversolutions.hrsystem.jobchange.promotionrequest;


import com.conceiversolutions.hrsystem.enums.StatusEnum;
import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class PromotionService {

    private final PromotionRepository promotionRepository;

    private final UserRepository userRepository;

    public List<PromotionRequest> getAllPromotionRequests(){
        return promotionRepository.findAll();
    }


    public String addAPromotionRequest(Long employeeId, Long managerId, Long departmentId, Long processedBy, String interviewComments ){

        User employeePromotion = userRepository.findById(employeeId)
                .orElseThrow(() -> new IllegalStateException("User with ID: " + employeeId + " does not exist!"));

        PromotionRequest p = new PromotionRequest(LocalDate.now(), employeeId, managerId, null, null, interviewComments, null,departmentId, processedBy,StatusEnum.PENDING, employeePromotion);
//        promotion.setStatus(StatusEnum.PENDING);
//        promotion.setCreated(LocalDate.now());
        promotionRepository.saveAndFlush(p);
        return "Promotion Request is successfully created for employee: " + employeePromotion.getFirstName();
    }



}
