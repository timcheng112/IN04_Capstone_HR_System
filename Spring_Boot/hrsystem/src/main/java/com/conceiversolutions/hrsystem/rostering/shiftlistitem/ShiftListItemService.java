package com.conceiversolutions.hrsystem.rostering.shiftlistitem;

import java.util.List;

import org.springframework.stereotype.Service;

import com.conceiversolutions.hrsystem.rostering.shift.Shift;
import com.conceiversolutions.hrsystem.rostering.shift.ShiftRepository;
import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ShiftListItemService {

    private final ShiftListItemRepository shiftListItemRepository;
    private final ShiftRepository shiftRepository;
    private final UserRepository userRepository;

    public List<ShiftListItem> getShiftListItems() {
        List<ShiftListItem> shiftListItems = shiftListItemRepository.findAll();
        for (ShiftListItem shiftListItem : shiftListItems) {
            shiftListItem.getShift().setRoster(null);
            shiftListItem.setUser(null);
        }
        return shiftListItems;
    }

    public ShiftListItem getShiftListItemById(Long shiftListItemId) {
        ShiftListItem shiftListItem = shiftListItemRepository.findById(shiftListItemId).orElseThrow(
                () -> new IllegalStateException("Shift List Item with ID: " + shiftListItemId + " does not exist!"));
        shiftListItem.getShift().setRoster(null);
        shiftListItem.setUser(null);
        return shiftListItem;
    }

    public Long addNewShiftListItem(ShiftListItem shiftListItem, Long shiftId, Long userId) {
        Shift shift = shiftRepository.findById(shiftId)
                .orElseThrow(() -> new IllegalStateException("Shift with ID: " + shiftId + " does not exist!"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("User with ID: " + userId + " does not exist!"));

        shiftListItem.setShift(shift);
        shiftListItem.setUser(user);
        ShiftListItem savedShiftListItem = shiftListItemRepository.saveAndFlush(shiftListItem);

        shift.addShiftListItem(savedShiftListItem);
        shiftRepository.saveAndFlush(shift);

        user.addShiftListItems(savedShiftListItem);
        userRepository.saveAndFlush(user);

        return savedShiftListItem.getShiftListItemId();
    }

    public void deleteShiftListItem(Long shiftListItemId) {
        ShiftListItem shiftListItem = shiftListItemRepository.findById(shiftListItemId).orElseThrow(
                () -> new IllegalStateException("Shift List Item with ID: " + shiftListItemId + " does not exist!"));

        shiftListItem.getShift().removeShiftListItem(shiftListItem);
        shiftListItem.setShift(null);
        shiftListItem.getUser().removeShiftListItems(shiftListItem);
        shiftListItem.setUser(null);

        shiftListItemRepository.deleteById(shiftListItemId);
    }
}
