package com.conceiversolutions.hrsystem.engagement.claim;

import com.conceiversolutions.hrsystem.user.user.User;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
}
