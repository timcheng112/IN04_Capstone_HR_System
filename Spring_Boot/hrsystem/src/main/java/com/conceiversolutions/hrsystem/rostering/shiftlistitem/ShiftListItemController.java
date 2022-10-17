package com.conceiversolutions.hrsystem.rostering.shiftlistitem;

import java.util.List;
import java.time.*;

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
@RequestMapping(path = "api/shift_list_item")
@AllArgsConstructor
public class ShiftListItemController {

    private final ShiftListItemService shiftListItemService;

    @GetMapping
    public List<ShiftListItem> getShiftListItems() {
        return shiftListItemService.getShiftListItems();
    }

    @GetMapping(path = "{shiftListItemId}")
    public ShiftListItem getShiftListItemById(@PathVariable("shiftListItemId") Long shiftListItemId) {
        return shiftListItemService.getShiftListItemById(shiftListItemId);
    }

    @PostMapping
    public Long addNewShiftListItem(@RequestBody ShiftListItem shiftListItem,
            @RequestParam(name = "shiftId", required = true) Long shiftId,
            @RequestParam(name = "userId", required = true) Long userId) {
        return shiftListItemService.addNewShiftListItem(shiftListItem, shiftId, userId);
    }

    @DeleteMapping(path = "{shiftListItemId}")
    public void deleteShiftListItem(@PathVariable("shiftListItemId") Long shiftListItemId) {
        shiftListItemService.deleteShiftListItem(shiftListItemId);
    }

    @GetMapping(path = "/getShiftListItemByShiftId")
    public List<ShiftListItem> getShiftListItemByShiftId(@RequestParam("shiftId") Long shiftId) {
        return shiftListItemService.getShiftListItemByShift(shiftId);
    }

    @GetMapping(path = "/getShiftListItemByPosition")
    public List<ShiftListItem> getShiftListItemByPosition(@RequestParam("shiftId") Long shiftId,
            @RequestParam("posType") String posType) {
        return shiftListItemService.getShiftListItemByPosition(shiftId, posType);
    }

    @GetMapping(path="/getShiftListItemByDateAndUserId")
    public ShiftListItem getShiftListItemByDateAndUserId(@RequestParam("date") String date, @RequestParam("userId") Long userId ){
        LocalDate dateTemp = LocalDate.parse(date);
        return shiftListItemService.getShiftListItemByDateAndUserId(dateTemp, userId);
    }
}
