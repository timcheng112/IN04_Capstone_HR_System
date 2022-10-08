package com.conceiversolutions.hrsystem.rostering.roster;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;


@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/roster")
@AllArgsConstructor
public class RosterController {

    private final RosterService rosterService;



}
