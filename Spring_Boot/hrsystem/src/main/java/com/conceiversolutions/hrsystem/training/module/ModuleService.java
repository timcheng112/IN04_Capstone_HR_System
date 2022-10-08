package com.conceiversolutions.hrsystem.training.module;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;

@Service
public class ModuleService {

    @Autowired
    private final ModuleRepository moduleRepository;
    @Autowired
    private final UserRepository userRepository;

    public ModuleService(ModuleRepository moduleRepository, UserRepository userRepository) {
        this.moduleRepository = moduleRepository;
        this.userRepository = userRepository;
    }

    public List<Module> getModules() {
        List<Module> modules = moduleRepository.findAll();
        for (Module m : modules) {
            m.setEmployees(new ArrayList<>());
        }
        return modules;
    }

    public Module getModule(Long moduleId) throws Exception {
        Optional<Module> m = moduleRepository.findById(moduleId);
        if (m.isPresent()) {
            return m.get() ;
        } else {
            throw new IllegalStateException("Module not found");
        }
    }

    public Long addModule(Module module) {
        Optional<Module> existingModule = moduleRepository.findModuleByTitle(module.getTitle());
        if (existingModule.isPresent()) {
            throw new IllegalStateException("title taken");
        }
        Module m = moduleRepository.save(module);
        return m.getModuleId();
    }

    public void deleteModule(Long moduleId) {
        if(!moduleRepository.existsById(moduleId)) {
            throw new IllegalStateException("module with id " + moduleId + " does not exist");
        }
        moduleRepository.deleteById(moduleId);
    }

    public Iterable<Module> getUserModules(Long userId) throws Exception {
        List<Module> userModules = new ArrayList<>();
        List<Module> allModules = getModules();
        for (Module m : allModules) {
            for (User employee : m.getEmployees()) {
                if (employee.getUserId() == userId) {
                    userModules.add(m);
                }
            }
        }
        return userModules;
    }

    public String assignModulesToEmployees(Long moduleId, List<Long> employees) throws Exception {
        System.out.println("ModuleService.assignModulesToEmployees");
        Optional<Module> m = moduleRepository.findById(moduleId);
        if (m.isPresent()) {
            Module module = m.get();
            for (Long userId : employees) {
                System.out.println("userId = " + userId);
                Optional<User> user = userRepository.findById(userId);
                if (user.isPresent()) {
                    if (module.getEmployees() != null) {
                        module.getEmployees().add(user.get());
                    } else {
                        module.setEmployees(new ArrayList<>());
                        module.getEmployees().add(user.get());
                        System.out.println(module.getEmployees() + " ");
                    }
                    System.out.println("Employee with id " + userId + " has been found");
                } else {
                    throw new IllegalStateException("Employee does not exist");
                }
            }
            moduleRepository.save(module);
            System.out.println(module.getEmployees() instanceof List);
            
            return employees.size() + " employees have been added to module " + moduleId;
        } else {
            throw new IllegalStateException("Module does not exist");
        }
    }

}