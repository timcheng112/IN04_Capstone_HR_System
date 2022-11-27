package com.conceiversolutions.hrsystem.rostering.shiftlistitem;

import java.util.List;
import java.util.ArrayList;
import java.time.*;

import org.springframework.stereotype.Service;

import com.conceiversolutions.hrsystem.enums.PositionTypeEnum;
import com.conceiversolutions.hrsystem.organizationstructure.team.Team;
import com.conceiversolutions.hrsystem.organizationstructure.team.TeamRepository;
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
    private final TeamRepository teamRepository;

    // doesnt really work
    public List<ShiftListItem> getShiftListItems() {
        List<ShiftListItem> shiftListItems = shiftListItemRepository.findAll();
        for (ShiftListItem shiftListItem : shiftListItems) {
            shiftListItem.getShift().setRoster(null);
            shiftListItem.getShift().setShiftListItems(new ArrayList<>());
            shiftListItem.setUser(null);
        }
        return shiftListItems;
    }

    public ShiftListItem getShiftListItemById(Long shiftListItemId) {
        ShiftListItem shiftListItem = shiftListItemRepository.findById(shiftListItemId).orElseThrow(
                () -> new IllegalStateException("Shift List Item with ID: " + shiftListItemId + " does not exist!"));
        shiftListItem.getShift().setRoster(null);
        shiftListItem.getShift().setShiftListItems(new ArrayList<>());
        shiftListItem.setUser(null);
        return shiftListItem;
    }

    public List<ShiftListItem> getShiftListItemByShift(Long shiftId) {
        List<ShiftListItem> shiftListItems = shiftListItemRepository.findShiftListItemByShiftId(shiftId);
        for (ShiftListItem shiftListItem : shiftListItems) {
            shiftListItem.getShift().setRoster(null);
            shiftListItem.getShift().setShiftListItems(new ArrayList<>());
            // shiftListItem.getUser().setTeams(new ArrayList<>());
            // shiftListItem.getUser().setQualificationInformation(null);
            // shiftListItem.getUser().setPositions(new ArrayList<>());
            // shiftListItem.getUser().setTaskListItems(new ArrayList<>());
            // shiftListItem.getUser().setShiftListItems(new ArrayList<>());
            shiftListItem.getUser().nullify();
        }
        return shiftListItems;
    }

    public List<ShiftListItem> getShiftListItemByPosition(Long shiftId, String posType) {
        PositionTypeEnum posTypeEnum = PositionTypeEnum.valueOf(posType);
        List<ShiftListItem> shiftListItems = shiftListItemRepository.findShiftListItemByPosition(shiftId, posTypeEnum);
        for (ShiftListItem shiftListItem : shiftListItems) {
            shiftListItem.getShift().setRoster(null);
            shiftListItem.getShift().setShiftListItems(new ArrayList<>());
            shiftListItem.getUser().setTeams(new ArrayList<>());
            shiftListItem.getUser().setQualificationInformation(null);
            shiftListItem.getUser().setPositions(new ArrayList<>());
            shiftListItem.getUser().setTaskListItems(new ArrayList<>());
            shiftListItem.getUser().setShiftListItems(new ArrayList<>());

        }
        return shiftListItems;
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
        // System.out.println("SHIFT: " + shift.getShiftListItems());
        shiftRepository.save(shift);

        user.addShiftListItems(savedShiftListItem);
        userRepository.save(user);

        return savedShiftListItem.getShiftListItemId();
    }

    public void deleteShiftListItem(Long shiftListItemId) {
        ShiftListItem shiftListItem = shiftListItemRepository.findById(shiftListItemId).orElseThrow(
                () -> new IllegalStateException("Shift List Item with ID: " + shiftListItemId + " does not exist!"));

        if (shiftListItem.getShift() != null) {
            shiftListItem.getShift().removeShiftListItem(shiftListItem);
            shiftListItem.setShift(null);
        }
        shiftListItem.getUser().removeShiftListItems(shiftListItem);
        shiftListItem.setUser(null);

        shiftListItemRepository.deleteById(shiftListItemId);
    }

    // controller should convert string date into localdate
    public ShiftListItem getShiftListItemByDateAndUserId(LocalDate date, Long userId) {
        LocalDateTime start = LocalDateTime.of(date, LocalTime.of(0, 0));
        LocalDateTime end = LocalDateTime.of(date, LocalTime.of(23, 59, 59));
        ShiftListItem shiftListItem = null;

        List<ShiftListItem> shiftListItems = shiftListItemRepository.findShiftListItemByDateAndUserId(start, end,
                userId);
        if (shiftListItems.size() == 0) {
            // failtofind
            throw new IllegalStateException("No shiftListItems found for specified date and userId");
        } else if (shiftListItems.size() > 1) {
            // unexpected found more than 1 shiftListItem for user on specified date.
            throw new IllegalStateException("Found more than 1 shiftListItem for specified date and userId");
        } else {
            // default
            shiftListItem = shiftListItems.get(0);
        }

        if (shiftListItem != null) {
            shiftListItem.getShift().setRoster(null);
            shiftListItem.getShift().setShiftListItems(new ArrayList<>());
            // shiftListItem.getShift().getShiftListItems();
            // shiftListItem.getShift().removeShiftListItem(shiftListItem);
            // for (ShiftListItem shiftListItemInShift :
            // shiftListItem.getShift().getShiftListItems()) {
            // shiftListItemInShift.setUser(null);
            // shiftListItemInShift.setShift(null);
            // }
            // shiftListItem.getUser().setTeams(new ArrayList<>());
            // shiftListItem.getUser().setQualificationInformation(null);
            // shiftListItem.getUser().setPositions(new ArrayList<>());
            // shiftListItem.getUser().setTaskListItems(new ArrayList<>());
            // shiftListItem.getUser().setShiftListItems(new ArrayList<>());
            shiftListItem.getUser().nullify();
        }

        return shiftListItem;
    }

    public List<ShiftListItem> getShiftListItemByDateAndTeam(LocalDate date, Long teamId) {
        LocalDateTime start = LocalDateTime.of(date, LocalTime.of(0, 0, 0));
        LocalDateTime end = LocalDateTime.of(date, LocalTime.of(23, 59, 59));

        List<ShiftListItem> shiftListItems = shiftListItemRepository.findShiftListItemsByDateAndTeam(start, end,
                teamId);

        for (ShiftListItem shiftListItem : shiftListItems) {
            if (shiftListItem != null) {
                shiftListItem.getShift().setRoster(null);
                shiftListItem.getShift().setShiftListItems(new ArrayList<>());
                shiftListItem.getUser().nullify();
                // shiftListItem.getUser().setTeams(new ArrayList<>());
                // shiftListItem.getUser().setQualificationInformation(null);
                // shiftListItem.getUser().setPositions(new ArrayList<>());
                // shiftListItem.getUser().setTaskListItems(new ArrayList<>());
                // shiftListItem.getUser().setShiftListItems(new ArrayList<>());
            }
        }

        return shiftListItems;
    }

    public List<ShiftListItem> getShiftListItemByTeam(Long teamId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new IllegalStateException("Team with ID: " + teamId + " does not exist!"));
        List<ShiftListItem> shiftListItems = shiftListItemRepository.findShiftListItemByTeam(teamId);

        for (ShiftListItem shiftListItem : shiftListItems) {
            if (shiftListItem != null) {
                shiftListItem.getShift().setRoster(null);
                shiftListItem.getShift().setShiftListItems(new ArrayList<>());
                shiftListItem.getUser().nullify();
            }
        }
        return shiftListItems;
    }
}
