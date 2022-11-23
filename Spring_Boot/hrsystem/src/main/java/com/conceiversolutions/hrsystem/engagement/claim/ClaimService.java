package com.conceiversolutions.hrsystem.engagement.claim;

import com.conceiversolutions.hrsystem.engagement.benefitplan.BenefitPlanInstance;
import com.conceiversolutions.hrsystem.engagement.benefitplan.BenefitPlanInstanceRepository;
import com.conceiversolutions.hrsystem.enums.StatusEnum;
import com.conceiversolutions.hrsystem.user.docdata.DocData;
import com.conceiversolutions.hrsystem.user.docdata.DocDataService;
import com.conceiversolutions.hrsystem.user.user.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ClaimService {
    private final ClaimRepository claimRepository;
    private final BenefitPlanInstanceRepository benefitPlanInstanceRepository;
    private final DocDataService docDataService;

    public List<Claim> getEmployeeClaims(Long employeeId) {
        System.out.println("ClaimService.getEmployeeClaims");
        System.out.println("employeeId = " + employeeId);

        List<Claim> claims = claimRepository.findAllByEmployeeId(employeeId);
        for (Claim claim : claims) {
            BenefitPlanInstance bpi = claim.getBenefitPlanInstance();
            bpi.setClaims(new ArrayList<>());
            bpi.setPlanOwner(null);
            if (claim.getSupportingDocument() != null) {
                claim.getSupportingDocument().setDocData(new byte[0]);
            }
        }

        return claims;
    }

    public List<Claim> getAllClaims() {
        System.out.println("ClaimService.getAllClaims");

        List<Claim> claims = claimRepository.findAll();
        for (Claim claim : claims) {
            BenefitPlanInstance bpi = claim.getBenefitPlanInstance();
            bpi.setClaims(new ArrayList<>());
            bpi.getPlanOwner().nullify();
            if (claim.getSupportingDocument() != null) {
                claim.getSupportingDocument().setDocData(new byte[0]);
            }
        }

        return claims;
    }

    public Claim getClaim(Long claimId) {
        System.out.println("ClaimService.getClaim");
        System.out.println("claimId = " + claimId);

        Optional<Claim> opt = claimRepository.findById(claimId);
        if (opt.isEmpty()) {
            throw new IllegalStateException("Claim ID is invalid");
        }
        Claim claim = opt.get();
        if (claim.getSupportingDocument() != null) {
            claim.getSupportingDocument().setDocData(new byte[0]);
        }
        return opt.get();
    }

    public String approveClaim(Long claimId) {
        System.out.println("ClaimService.approveClaim");
        System.out.println("claimId = " + claimId);

        Claim claim = getClaim(claimId);
        claim.setLastUpdated(LocalDate.now());
        claim.setClaimStatus(StatusEnum.APPROVED);
        claimRepository.save(claim);
        return "Claim ID: " + claimId + " has been approved";
    }

    public String rejectClaim(Long claimId) {
        System.out.println("ClaimService.rejectClaim");
        System.out.println("claimId = " + claimId);

        Claim claim = getClaim(claimId);
        // need to refund the amount deducted
        BenefitPlanInstance bpi = claim.getBenefitPlanInstance();
        BigDecimal current = bpi.getRemainingAmount();
        BigDecimal refund = claim.getClaimAmount();
        bpi.setRemainingAmount(current.add(refund));
        benefitPlanInstanceRepository.save(bpi);

        claim.setLastUpdated(LocalDate.now());
        claim.setClaimStatus(StatusEnum.REJECTED);
        claimRepository.save(claim);
        return "Claim ID: " + claimId + " has been rejected and the amount has been returned";
    }

    public String withdrawClaim(Long claimId) {
        System.out.println("ClaimService.withdrawClaim");
        System.out.println("claimId = " + claimId);

        Claim claim = getClaim(claimId);
        // need to refund the amount deducted
        BenefitPlanInstance bpi = claim.getBenefitPlanInstance();
        BigDecimal current = bpi.getRemainingAmount();
        BigDecimal refund = claim.getClaimAmount();
        bpi.setRemainingAmount(current.add(refund));
        benefitPlanInstanceRepository.save(bpi);

        claim.setLastUpdated(LocalDate.now());
        claim.setClaimStatus(StatusEnum.CANCELLED);
        claimRepository.save(claim);
        return "Claim ID: " + claimId + " has been withdrawn and the amount has been returned";
    }

    public String makeNewClaim(LocalDate claimDate, LocalDate incidentDate, String remarks, BigDecimal claimAmount, Long benefitPlanInstanceId, MultipartFile file) throws IOException {
        System.out.println("ClaimService.makeNewClaim");
        System.out.println("claimDate = " + claimDate + ", incidentDate = " + incidentDate + ", remarks = " + remarks + ", claimAmount = " + claimAmount + ", benefitPlanInstanceId = " + benefitPlanInstanceId);
        checkDates(claimDate, incidentDate); // check for invalid dates

        Optional<BenefitPlanInstance> bpiOpt = benefitPlanInstanceRepository.findById(benefitPlanInstanceId);
        if (bpiOpt.isEmpty()) {
            throw new IllegalStateException("Benefit Plan Instance ID is invalid");
        }
        BenefitPlanInstance bpi = bpiOpt.get();
        if (!bpi.getIsActive()) { // check if BPI is active
            throw new IllegalStateException("Benefit Plan Instance ID is not active and cannot be used to make claims.");
        }

        if (bpi.getEnrolDate().compareTo(incidentDate) > 0) {
            throw new IllegalStateException("Claim cannot be made as incident happened before plan was enrolled.");
        }

        if (bpi.getRemainingAmount().compareTo(BigDecimal.valueOf(0)) == 0) {
            throw new IllegalStateException("Benefit Plan Instance has no more remaining amount.");
        }

        DocData supportingDocument = null;
        if (null != file) { // if file is uploaded, will set.
            if (!file.isEmpty()) {
                supportingDocument = docDataService.uploadDoc(file);
            }
        }

        if (bpi.getRemainingAmount().compareTo(claimAmount) < 0) { // if claim amount is more than what is left, we only let them claim what is left.
            Claim newClaim = new Claim(claimDate, incidentDate, remarks, bpi.getRemainingAmount(), bpi, supportingDocument);
            Claim savedClaim = claimRepository.saveAndFlush(newClaim);

            bpi.setRemainingAmount(BigDecimal.ZERO);
            benefitPlanInstanceRepository.save(bpi);
            return "Partial Claim Id: " + savedClaim.getClaimId() + " has been created as remaining amount is insufficent.";
        } else { // claim amount is ok
            Claim newClaim = new Claim(claimDate, incidentDate, remarks, claimAmount, bpi, supportingDocument);

            Claim savedClaim = claimRepository.saveAndFlush(newClaim);

            bpi.setRemainingAmount(bpi.getRemainingAmount().subtract(claimAmount));
            benefitPlanInstanceRepository.save(bpi);
            return "Claim Id: " + savedClaim.getClaimId() + " has been created.";
        }
    }

    public void checkDates(LocalDate claim, LocalDate incident) {
        System.out.println("BenefitPlanService.checkDates");
        System.out.println("claim date = " + claim + ", incident date = " + incident);
        if (claim.compareTo(incident) < 0) {
            throw new IllegalStateException("Claim Date cannot be before Incident Date");
        } else if (claim.isAfter(LocalDate.now()) || incident.isAfter(LocalDate.now())) {
            throw new IllegalStateException("Dates cannot be in the future");
        }
    }
}
