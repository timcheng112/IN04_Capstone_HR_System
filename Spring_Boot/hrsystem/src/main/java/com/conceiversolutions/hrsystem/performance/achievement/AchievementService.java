package com.conceiversolutions.hrsystem.performance.achievement;

import lombok.AllArgsConstructor;

import java.time.LocalDate;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
//@AllArgsConstructor
public class AchievementService {

    @Autowired
    private final AchievementRepository achievementRepository;

    public AchievementService(AchievementRepository achievementRepository) {
        this.achievementRepository = achievementRepository;
    }

    public String deleteAchievement(Long achievementId){
        
        achievementRepository.deleteById(achievementId);
        return "Achievement has been successfully deleted";

    }

    @Transactional
    public String editAchievement(Long achievementId, String description) {
        Optional<Achievement> optionalA = achievementRepository.findById(achievementId);
        
        if (optionalA.isPresent()) {
            Achievement a = optionalA.get();
            a.setDescription(description);
            a.setLastModified(LocalDate.now());
            return "Achievement has been successfully edited";
        } else {
            throw new IllegalStateException("Unable to find achievement");
        }
        
    }

    
}
