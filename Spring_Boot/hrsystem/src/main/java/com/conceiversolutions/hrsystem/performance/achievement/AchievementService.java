package com.conceiversolutions.hrsystem.performance.achievement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AchievementService {

    @Autowired
    private final AchievementRepository achievementRepository;

    public AchievementService(AchievementRepository achievementRepository) {
        this.achievementRepository = achievementRepository;
    }

    public List<Achievement> getAllAchievements() {
        List<Achievement> a = achievementRepository.findAll();

        for (Achievement achievement : a) {
            achievement.setEmployeeGoal(null);
        }
        return a;
    }

    public List<Achievement> getAchievementsByYear(String year) {
        List<Achievement> achievements = achievementRepository.findAll();
        List<Achievement> aList = new ArrayList<>();

        for (Achievement a : achievements) {
            if (a.getEmployeeGoal().getYear().equals(year)) {
                a.setEmployeeGoal(null);
                aList.add(a);
            }
        }
        return aList;
    }


    
}
