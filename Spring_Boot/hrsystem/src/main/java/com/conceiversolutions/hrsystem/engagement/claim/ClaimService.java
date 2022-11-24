package com.conceiversolutions.hrsystem.engagement.claim;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ClaimService {
    private final ClaimRepository claimRepository;


    public List<Claim> getEmployeeClaims(Long employeeId) {
        System.out.println("ClaimService.getEmployeeClaims");
        System.out.println("employeeId = " + employeeId);

        return null;
    }
}
