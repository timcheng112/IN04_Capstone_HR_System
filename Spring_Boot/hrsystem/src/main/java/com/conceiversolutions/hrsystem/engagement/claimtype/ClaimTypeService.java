package com.conceiversolutions.hrsystem.engagement.claimtype;

import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

public class ClaimTypeService {

    private final ClaimTypeRepository claimTypeRepository;

    @Autowired
    public ClaimTypeService(ClaimTypeRepository claimTypeRepository) {
        this.claimTypeRepository = claimTypeRepository;
    }

    public List<ClaimType> getClaimTypes() {
        return claimTypeRepository.findAll();
    }

}
