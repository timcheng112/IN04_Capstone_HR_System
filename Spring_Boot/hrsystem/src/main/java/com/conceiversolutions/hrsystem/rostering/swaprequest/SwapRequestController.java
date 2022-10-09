package com.conceiversolutions.hrsystem.rostering.swaprequest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(name = "swap_request")
@AllArgsConstructor
public class SwapRequestController {

    private final SwapRequestService swapRequestService;
}
