package com.conceiversolutions.hrsystem.skillset.skillset;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/skillset")
@AllArgsConstructor
public class SkillsetController {
    private final SkillsetService skillsetService;

    @GetMapping(path = "/getAllSkillsets")
    public List<Skillset> getAllSkillsets() {
        return skillsetService.getAllSkillsets();
    }

    @PostMapping(path = "/addSkillSet")
    public Long addSkillset(@RequestParam("skillsetName") String skillsetName) {
        return skillsetService.addSkillset(skillsetName);
    }
}
