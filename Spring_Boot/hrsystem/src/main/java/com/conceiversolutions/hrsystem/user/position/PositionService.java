package com.conceiversolutions.hrsystem.user.position;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class PositionService {

    private final PositionRepository positionRepository;

    public List<Position> getAllPositions(){
//        return positionRepository.findAllUniquePositions();
        return positionRepository.findAll();
    }
}
