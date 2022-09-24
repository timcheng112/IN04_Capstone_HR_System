package com.conceiversolutions.hrsystem.engagement.claimtype;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClaimTypeService {

    @Autowired
    private final ClaimTypeRepository claimTypeRepository;

    public ClaimTypeService(ClaimTypeRepository claimTypeRepository) {
        this.claimTypeRepository = claimTypeRepository;
    }

    public List<ClaimType> getClaimTypes() {
        return claimTypeRepository.findAll();
    }

}
