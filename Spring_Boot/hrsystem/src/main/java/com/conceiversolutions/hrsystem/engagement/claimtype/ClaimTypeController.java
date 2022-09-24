package com.conceiversolutions.hrsystem.engagement.claimtype;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping(path="claim_types")
public class ClaimTypeController {

    private final ClaimTypeService claimTypeService;

    @Autowired
    public ClaimTypeController(ClaimTypeService claimTypeService) {
        this.claimTypeService = claimTypeService;
    }

    @GetMapping
    public List<ClaimType> getClaimTypes(){
        return claimTypeService.getClaimTypes();
    }
}
