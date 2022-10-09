package com.conceiversolutions.hrsystem.rostering.shift;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(name = "shift")
@AllArgsConstructor
public class ShiftController {

    private final ShiftService shiftService;

}
