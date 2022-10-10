package com.conceiversolutions.hrsystem.rostering.swaprequest;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "api/swap_request")
@AllArgsConstructor
public class SwapRequestController {

    private final SwapRequestService swapRequestService;

    @GetMapping
    public List<SwapRequest> getSwapRequests() {
        return swapRequestService.getSwapRequests();
    }

    @GetMapping(path = "{swapRequestId}")
    public SwapRequest getSwapRequestById(@PathVariable("swapRequestId") Long swapRequestId) {
        return swapRequestService.getSwapRequestById(swapRequestId);
    }

    @PostMapping
    public Long addNewSwapRequest(@RequestBody SwapRequest swapRequest,
            @RequestParam(name = "receiverShiftListItemId") Long receiverShiftListItemId,
            @RequestParam(name = "requesterShiftListItemId") Long requesterShiftListItemId) {
        return swapRequestService.addNewSwapRequest(swapRequest, receiverShiftListItemId, requesterShiftListItemId);
    }

    @DeleteMapping(path = "{swapRequestId}")
    public void deleteSwapRequest(@PathVariable("swapRequestId") Long swapRequestId) {
        swapRequestService.deleteSwapRequest(swapRequestId);
    }
}
