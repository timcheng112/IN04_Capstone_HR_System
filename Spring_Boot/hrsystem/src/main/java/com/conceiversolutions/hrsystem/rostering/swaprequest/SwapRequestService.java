package com.conceiversolutions.hrsystem.rostering.swaprequest;

import java.util.List;

import org.springframework.stereotype.Service;

import com.conceiversolutions.hrsystem.enums.StatusEnum;
import com.conceiversolutions.hrsystem.rostering.shift.Shift;
import com.conceiversolutions.hrsystem.rostering.shift.ShiftRepository;
import com.conceiversolutions.hrsystem.rostering.shiftlistitem.ShiftListItem;
import com.conceiversolutions.hrsystem.rostering.shiftlistitem.ShiftListItemRepository;
import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class SwapRequestService {

        private final SwapRequestRepository swapRequestRepository;
        private final ShiftListItemRepository shiftListItemRepository;
        private final UserRepository userRepository;

        public List<SwapRequest> getSwapRequests() {
                List<SwapRequest> swapRequests = swapRequestRepository.findAll();
                for (SwapRequest swapRequest : swapRequests) {
                        swapRequest.getReceiverShiftListItem().getShift().setRoster(null);
                        swapRequest.getReceiverShiftListItem().getUser().nullify();
                        // swapRequest.getReceiverShiftListItem().setUser(null);
                        swapRequest.getRequestorShiftListItem().getShift().setRoster(null);
                        swapRequest.getRequestorShiftListItem().getUser().nullify();
                        // swapRequest.getRequestorShiftListItem().setUser(null);
                        // swapRequest.setReceiver(null);
                        // swapRequest.setRequestor(null);
                        swapRequest.getReceiver().nullify();
                        swapRequest.getRequestor().nullify();
                }
                return swapRequests;
        }

        public SwapRequest getSwapRequestById(Long swapRequestId) {
                SwapRequest swapRequest = swapRequestRepository.findById(swapRequestId).orElseThrow(
                                () -> new IllegalStateException(
                                                "Swap Request with ID: " + swapRequestId + " does not exist!"));
                swapRequest.setReceiver(null);
                swapRequest.setRequestor(null);
                return swapRequest;
        }

        public Long addNewSwapRequest(String reason, Long receiverShiftListItemId,
                        Long requesterShiftListItemId) {
                ShiftListItem receiverShiftListItem = shiftListItemRepository.findById(receiverShiftListItemId)
                                .orElseThrow(() -> new IllegalStateException(
                                                "Shift List Item with ID: " + receiverShiftListItemId
                                                                + " does not exist!"));
                ShiftListItem requesterShiftListItem = shiftListItemRepository.findById(requesterShiftListItemId)
                                .orElseThrow(() -> new IllegalStateException(
                                                "Shift List Item with ID: " + requesterShiftListItemId
                                                                + " does not exist!"));
                // User receiver = userRepository.findById(receiverId)
                // .orElseThrow(
                // () -> new IllegalStateException("User (Receiver) with ID: " + receiverId
                // + " does not exist!"));
                // User requester = userRepository.findById(requesterId)
                // .orElseThrow(() -> new IllegalStateException(
                // "User (Requester) with ID: " + requesterId + " does not exist!"));

                if (receiverShiftListItem.getShift().getShiftId() == requesterShiftListItem.getShift().getShiftId()) {
                        throw new IllegalStateException("Cannot swap the same shifts!");
                }

                try {
                        User receiver = receiverShiftListItem.getUser();
                        User requester = requesterShiftListItem.getUser();

                        SwapRequest swapRequest = new SwapRequest();
                        swapRequest.setStatus(StatusEnum.PENDING);
                        swapRequest.setReason(reason);
                        swapRequest.setReceiverShiftListItem(receiverShiftListItem);
                        swapRequest.setRequestorShiftListItem(requesterShiftListItem);
                        swapRequest.setReceiver(receiver);
                        swapRequest.setRequestor(requester);
                        SwapRequest savedSwapRequest = swapRequestRepository.saveAndFlush(swapRequest);

                        receiver.addSwapRequestsReceived(savedSwapRequest);
                        userRepository.save(receiver);

                        requester.addSwapRequestsRequested(savedSwapRequest);
                        userRepository.save(requester);

                        return savedSwapRequest.getSwapRequestId();
                } catch (Exception e) {
                        throw new IllegalStateException("Shifts already involved in another swap!");
                }

        }

        public void deleteSwapRequest(Long swapRequestId) {
                SwapRequest swapRequest = swapRequestRepository.findById(swapRequestId).orElseThrow(
                                () -> new IllegalStateException(
                                                "Swap Request with ID: " + swapRequestId + " does not exist!"));

                swapRequest.getReceiver().removeSwapRequestsReceived(swapRequest);
                swapRequest.setReceiver(null);
                swapRequest.getRequestor().removeSwapRequestsRequested(swapRequest);
                swapRequest.setRequestor(null);

                swapRequestRepository.deleteById(swapRequestId);
        }

        public List<SwapRequest> getSwapRequestsByUserId(Long userId) {
                User user = userRepository.findById(userId).orElseThrow(
                                () -> new IllegalStateException("User with ID: " + userId + " does not exist!"));
                List<SwapRequest> swapRequests = user.getSwapRequestsRequested();
                for (SwapRequest swapRequest : swapRequests) {
                        swapRequest.getReceiverShiftListItem().getShift().setRoster(null);
                        swapRequest.getReceiverShiftListItem().getUser().nullify();
                        swapRequest.getRequestorShiftListItem().getShift().setRoster(null);
                        swapRequest.getRequestorShiftListItem().getUser().nullify();
                        swapRequest.getReceiver().nullify();
                        swapRequest.getRequestor().nullify();
                }
                return swapRequests;
        }
}
