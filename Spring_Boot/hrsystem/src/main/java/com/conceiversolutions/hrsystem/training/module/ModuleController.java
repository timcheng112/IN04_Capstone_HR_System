package com.conceiversolutions.hrsystem.training.module;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.conceiversolutions.hrsystem.training.video.Video;
import com.conceiversolutions.hrsystem.user.user.User;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/module")
public class ModuleController {

    private final ModuleService moduleService;

    @Autowired
    public ModuleController(ModuleService moduleService) {
        this.moduleService = moduleService;
    }

    @GetMapping
    public Iterable<Module> getModules() {
        return moduleService.getModules();
    }

    @GetMapping(path = "{moduleId}")
    public Module getModule(@PathVariable("moduleId") Long moduleId) throws Exception {
        return moduleService.getModule(moduleId);
    }

    @GetMapping(path = "user/{userId}")
    public Iterable<Module> getUserModules(@PathVariable("userId") Long userId) throws Exception {
        return moduleService.getUserModules(userId);
    }

    @PostMapping
    public Long addModule(@RequestBody Module module) {
        return moduleService.addModule(module);
    }

    @DeleteMapping(path = "{moduleId}")
    public void deleteModule(@PathVariable("moduleId") Long id) {
        moduleService.deleteModule(id);
    }

    @PostMapping(path = "user/{moduleId}")
    public String assignModulesToEmployees(@PathVariable("moduleId") Long moduleId, @RequestBody List<Long> employees)
            throws Exception {
        return moduleService.assignModulesToEmployees(moduleId, employees);
    }

    @GetMapping(path = "{moduleId}/user")
    public List<User> getEmployeesAssignedToModule(@PathVariable("moduleId") Long moduleId)
            throws Exception {
        return moduleService.getEmployeesAssignedToModule(moduleId);
    }

    @GetMapping(path = "{moduleId}/unAssignedUser")
    public List<User> getEmployeesUnassignedToModule(@PathVariable("moduleId") Long moduleId)
            throws Exception {
        return moduleService.getEmployeesUnassignedToModule(moduleId);
    }

    @PutMapping(path = "{moduleId}")
    public String editModule(@PathVariable("moduleId") Long moduleId, @RequestBody Module module) throws Exception {
        return moduleService.editModule(moduleId, module);
    }

    @GetMapping(path = "{moduleId}/videos")
    public Iterable<Video> getVideosInModule(@PathVariable("moduleId") Long moduleId) {
        return moduleService.getVideosInModule(moduleId);
    }

    @PostMapping(path = "{moduleId}")
    public String addVideoToModule(@PathVariable("moduleId") Long moduleId, @RequestBody Video video) throws Exception {
        return moduleService.addVideoToModule(moduleId, video);
    }

    @GetMapping(path = "video/{videoId}")
    public Module getModuleFromVideo(@PathVariable("videoId") Long videoId) throws Exception {
        return moduleService.getModuleFromVideo(videoId);
    }

    @GetMapping(path = "{moduleId}/user/{userId}")
    public String getUserProgress(@PathVariable("moduleId") Long moduleId, @PathVariable("userId") Long userId) throws Exception {
        return moduleService.getUserProgress(moduleId, userId);
    }

    @GetMapping(path = "user/{userId}/completed")
    public List<Module> getUserCompletedModules(@PathVariable("userId") Long userId) throws Exception {
        return moduleService.getUserCompletedModules(userId);
    }
}