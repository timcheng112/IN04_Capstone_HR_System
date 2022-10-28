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

    @GetMapping(path = "/getUserSkillsets")
    public List<UserSkillset> getUserSkillsets(@RequestParam("userId") Long userId) {
        return userSkillsetService.getUserSkillsets(userId);
    }

    @PostMapping(path = "/addUserSkillset")
    public Long addUserSkillset(@RequestParam("userId") Long userId,
                                @RequestParam("skillsetId") Long skillsetId,
                                @RequestParam("skillLevel") Integer skillLevel) {
        return userSkillsetService.addUserSkillset(userId, skillsetId, skillLevel);
    }

    @PutMapping(path = "/updateUserSkillset")
    public Long updateUserSkillset(@RequestParam("userSkillsetId") Long userSkillsetId,
                                   @RequestParam("skillLevel") Integer skillLevel) {
        return userSkillsetService.updateUserSkillset(userSkillsetId, skillLevel);
    }

    @DeleteMapping(path = "/removeUserSkillset")
    public String updateUserSkillset(@RequestParam("userId") Long userId,
                                   @RequestParam("userSkillsetId") Long userSkillsetId) {
        return userSkillsetService.removeUserSkillset(userId, userSkillsetId);
    }


}
