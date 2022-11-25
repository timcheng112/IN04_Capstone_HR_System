package com.conceiversolutions.hrsystem.user.position;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PositionService {
    
    private final PositionRepository positionRepository;

    public List<Position> getAllPositions() {
        List<Position> positions = positionRepository.findAll();
        return positions;
    }
    
}
