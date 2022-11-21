package com.conceiversolutions.hrsystem.engagement.claim;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path="api/claims")
@AllArgsConstructor
public class ClaimController {
    private final ClaimService claimService;

}
