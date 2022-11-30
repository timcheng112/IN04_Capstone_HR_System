package com.conceiversolutions.hrsystem.performance.achievement;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/achievement")
public class AchievementController {
    
    private final AchievementService achievementService;

    public AchievementController(AchievementService achievementService) {
        this.achievementService = achievementService;
    }

    @GetMapping
    public List<Achievement> getAllAchievements() {
        return achievementService.getAllAchievements();
    }

    @GetMapping(path = "{year}")
    public List<Achievement> getAchievementsByYear(@PathVariable("year") String year) {
        return achievementService.getAchievementsByYear(year);
    }

}
