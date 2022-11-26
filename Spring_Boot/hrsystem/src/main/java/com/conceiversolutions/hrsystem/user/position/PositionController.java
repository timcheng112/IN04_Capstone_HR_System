package com.conceiversolutions.hrsystem.user.position;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/position")
@AllArgsConstructor
public class PositionController {

    private final PositionService positionService;

    @GetMapping(path= "/GetAllPositions")
    public List<Position> getAllPositions(){
        return getAllPositions();
    }
}
