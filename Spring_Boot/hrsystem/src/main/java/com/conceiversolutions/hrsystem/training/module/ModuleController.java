package com.conceiversolutions.hrsystem.training.module;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}