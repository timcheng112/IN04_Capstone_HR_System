package com.conceiversolutions.hrsystem.rostering.shiftlistitem;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(name = "shift_list_item")
@AllArgsConstructor
public class ShiftListItemController {

    private final ShiftListItemService shiftListItemService;
}
