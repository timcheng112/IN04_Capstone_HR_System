package com.conceiversolutions.hrsystem.user.position;

import java.util.List;
import java.util.Optional;

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

    public Position getUserCurrentPosition(Long userId) throws Exception {
        Optional<Position> optionalPosition = positionRepository.findUserPosition(userId);

        if (optionalPosition.isPresent()) {

            Position position = optionalPosition.get();

            return position;

        } else {

            throw new IllegalStateException("Unable to find position");
        
        }
    }

}
