package com.conceiversolutions.hrsystem.skillset.userskillset;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/userskillset")
@AllArgsConstructor
public class UserSkillsetController {
    private final UserSkillsetService userSkillsetService;

    @GetMapping(path = "/getUserSkillset")
    public List<UserSkillset> getUserSkillset(@RequestParam("userId") Long userId) {
        return userSkillsetService.getUserSkillset(userId);
    }

    @PostMapping(path = "/addUserSkillset")
    public Long addUserSkillset(@RequestParam("userId") Long userId,
                                @RequestParam("skillsetId") Long skillsetId,
                                @RequestParam("skillLevel") Integer skillLevel) {
        return userSkillsetService.addUserSkillset(userId, skillsetId, skillLevel);
    }
}
