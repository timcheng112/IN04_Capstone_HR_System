package com.conceiversolutions.hrsystem.rostering.shiftlistitem;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ShiftListItemService {

    private final ShiftListItemRepository shiftListItemRepository;
}
