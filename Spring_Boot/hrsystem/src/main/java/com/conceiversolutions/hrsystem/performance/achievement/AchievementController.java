package com.conceiversolutions.hrsystem.performance.achievement;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/achievement")
public class AchievementController {
    
    private final AchievementService achievementService;

    public AchievementController(AchievementService achievementService) {
        this.achievementService = achievementService;
    }

    @DeleteMapping(path = "{achievementId}")
    public String deleteAchievement(@PathVariable("achievementId") Long achievementId){
        return achievementService.deleteAchievement(achievementId);
    }

    @PutMapping(path = "{achievementId}")
    public String editAchievement(@PathVariable("achievementId") Long achievementId, @RequestParam("description") String description) {
        return achievementService.editAchievement(achievementId, description);
    }

//    public void editAchievement(Long achievementId){
//
//    }

}
