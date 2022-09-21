package com.conceiversolutions.hrsystem.engagement.claim;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClaimService {

    private final ClaimRepository claimRepository;

    public ClaimService(ClaimRepository claimRepository){
        this.claimRepository = claimRepository;
    }

    public List<Claim> getClaims() {return claimRepository.findAll();}
}
