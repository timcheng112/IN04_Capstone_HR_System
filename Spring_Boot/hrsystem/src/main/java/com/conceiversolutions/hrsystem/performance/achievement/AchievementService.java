package com.conceiversolutions.hrsystem.performance.achievement;

import lombok.AllArgsConstructor;
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
        System.out.println("achieve.delete");
        achievementRepository.deleteById(achievementId);
        return "achievement with ID: " + achievementId + "is successfully deleted.";

    }

    
}
