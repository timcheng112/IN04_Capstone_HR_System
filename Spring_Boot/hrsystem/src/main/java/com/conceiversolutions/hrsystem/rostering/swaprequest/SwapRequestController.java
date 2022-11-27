package com.conceiversolutions.hrsystem.rostering.swaprequest;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @GetMapping(path = "getSwapRequestsByUserId")
    public List<SwapRequest> getSwapRequestsByUserId(@RequestParam(name = "userId") Long userId) {
        return swapRequestService.getSwapRequestsByUserId(userId);
    }

    @GetMapping(path = "getSwapRequestsByTeamId")
    public List<SwapRequest> getSwapRequestsByTeamId(@RequestParam(name = "teamId") Long teamId) {
        return swapRequestService.getSwapRequestsByTeamId(teamId);
    }

    @PostMapping
    public Long addNewSwapRequest(@RequestParam(name = "reason") String reason,
            @RequestParam(name = "receiverShiftListItemId") Long receiverShiftListItemId,
            @RequestParam(name = "requesterShiftListItemId") Long requesterShiftListItemId) {
        return swapRequestService.addNewSwapRequest(reason, receiverShiftListItemId, requesterShiftListItemId);
    }

    @DeleteMapping(path = "{swapRequestId}")
    public void deleteSwapRequest(@PathVariable("swapRequestId") Long swapRequestId) {
        swapRequestService.deleteSwapRequest(swapRequestId);
    }

    @PutMapping(path = "approveSwapRequest")
    public void approveSwapRequest(@RequestParam(name = "swapRequestId") Long swapRequestId,
            @RequestParam(name = "responseReason") String responseReason) {
        swapRequestService.approveSwapRequest(swapRequestId, responseReason);
    }

    @PutMapping(path = "rejectSwapRequest")
    public void rejectSwapRequest(@RequestParam(name = "swapRequestId") Long swapRequestId,
            @RequestParam(name = "responseReason") String responseReason) {
        swapRequestService.rejectSwapRequest(swapRequestId, responseReason);
    }

    @PutMapping(path = "clearSwapRequest")
    public void clearSwapRequest(@RequestParam(name = "swapRequestId") Long swapRequestId) {
        swapRequestService.clearSwapRequest(swapRequestId);
    }

    @PutMapping(path = "approvePendingSwapRequest")
    public void approvePendingSwapRequest(@RequestParam(name = "swapRequestId") Long swapRequestId,
            @RequestParam(name = "responseReason") String responseReason) {
        swapRequestService.approvePendingSwapRequest(swapRequestId, responseReason);
    }

    @PostMapping(path = "counterProposeSwapRequest")
    public void counterProposeSwapRequest(@RequestParam(name = "reason") String reason,
            @RequestParam(name = "oldSwapRequestId") Long oldSwapRequestId,
            @RequestParam(name = "receiverShiftListItemId") Long receiverShiftListItemId,
            @RequestParam(name = "requesterShiftListItemId") Long requesterShiftListItemId) {
        swapRequestService.counterProposeSwapRequest(reason, oldSwapRequestId, receiverShiftListItemId,
                requesterShiftListItemId);
    }

    @GetMapping(path = "getNumberOfPendingIncomingSwapRequestsByUser")
    public Long getNumberOfPendingIncomingSwapRequestsByUser(@RequestParam(name = "userId") Long userId) {
        return swapRequestService.getNumberOfPendingIncomingSwapRequestsByUser(userId);
    }
}
