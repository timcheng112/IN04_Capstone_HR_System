package com.conceiversolutions.hrsystem.skillset.skillset;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class SkillsetService {
    private final SkillsetRepository skillsetRepository;

    public List<Skillset> getAllSkillsets() {
        System.out.println("SkillsetService.getAllSkillsets");
        List<Skillset> skillsets = skillsetRepository.findAll();

        for (Skillset sk : skillsets) {
            sk.setJobRequests(new ArrayList<>());
            sk.setJobPostings(new ArrayList<>());
        }
        return skillsets;
    }

    public Long addSkillset(String skillsetName) {
        System.out.println("SkillsetService.addSkillset");
        System.out.println("skillsetName = " + skillsetName);
        Skillset newSS = new Skillset(skillsetName);

        Skillset savedSS = skillsetRepository.saveAndFlush(newSS);
        System.out.println("Skillset ID " + savedSS.getSkillsetId() + ", name " + savedSS.getSkillsetName() + " successfully created");
        return savedSS.getSkillsetId();
    }
}
