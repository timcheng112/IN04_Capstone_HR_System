package com.conceiversolutions.hrsystem.rostering.shift;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ShiftService {

    private final ShiftRepository shiftRepository;
}
