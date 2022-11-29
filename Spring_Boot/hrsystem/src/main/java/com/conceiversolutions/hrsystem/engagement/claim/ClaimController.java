package com.conceiversolutions.hrsystem.engagement.claim;

import com.conceiversolutions.hrsystem.engagement.benefitplan.BenefitPlanInstance;
import com.conceiversolutions.hrsystem.user.user.User;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path="api/claims")
@AllArgsConstructor
@CrossOrigin("*")
public class ClaimController {
    private final ClaimService claimService;

    @GetMapping("getEmployeeClaims")
    public List<Claim> getEmployeeClaims(@RequestParam("employeeId") Long employeeId) {
        return claimService.getEmployeeClaims(employeeId);
    }

    @PostMapping("makeNewClaim")
    public String makeNewClaim(@RequestParam("claimDate") String claimDate,
                              @RequestParam("incidentDate") String incidentDate,
                              @RequestParam("remarks") String remarks,
                              @RequestParam("claimAmount") Float claimAmount,
                              @RequestParam("benefitPlanInstanceId") Long benefitPlanInstanceId,
                               @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        return claimService.makeNewClaim(LocalDate.parse(claimDate), LocalDate.parse(incidentDate), remarks, BigDecimal.valueOf(claimAmount), benefitPlanInstanceId, file);
    }

    @GetMapping("getAllClaims")
    public List<Claim> getAllClaims() {
        return claimService.getAllClaims();
    }

    @GetMapping("getClaim")
    public Claim getClaim(@RequestParam("claimId") Long claimId) {
        Claim claim = claimService.getClaim(claimId);
        BenefitPlanInstance bpi = claim.getBenefitPlanInstance();
        bpi.setClaims(new ArrayList<>());
        bpi.getPlanOwner().nullify();
        return claim;
    }

    @PutMapping("approveClaim")
    public String approveClaim(@RequestParam("claimId") Long claimId) {
        return claimService.approveClaim(claimId);
    }

    @PutMapping("rejectClaim")
    public String rejectClaim(@RequestParam("claimId") Long claimId) {
        return claimService.rejectClaim(claimId);
    }

    @DeleteMapping("withdrawClaim")
    public String withdrawClaim(@RequestParam("claimId") Long claimId) {
        return claimService.withdrawClaim(claimId);
    }
}
