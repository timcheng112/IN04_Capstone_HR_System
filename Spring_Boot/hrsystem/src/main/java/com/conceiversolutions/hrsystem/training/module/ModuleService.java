package com.conceiversolutions.hrsystem.training.module;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.conceiversolutions.hrsystem.training.video.Video;
import com.conceiversolutions.hrsystem.training.video.VideoRepository;
import com.conceiversolutions.hrsystem.training.video.VideoService;
import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;

@Service
public class ModuleService {

    @Autowired
    private final ModuleRepository moduleRepository;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final VideoRepository videoRepository;

    public ModuleService(ModuleRepository moduleRepository, UserRepository userRepository, VideoRepository videoRepository) {
        this.moduleRepository = moduleRepository;
        this.userRepository = userRepository;
        this.videoRepository = videoRepository;
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
            System.out.println("get employees " + m.get().getEmployees());
            return m.get();
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
            
            return employees.size() + " employee(s) have been assigned to module " + moduleId;
        } else {
            throw new IllegalStateException("Module does not exist");
        }
    }

    @Transactional
    public String editModule(Long moduleId, Module module) throws Exception {
        Module m = getModule(moduleId);
        m.setTitle(module.getTitle());
        m.setDescription(module.getDescription());
        m.setThumbnail(module.getThumbnail());
        return module.getTitle() + " successfuly edited";
    }

    public Iterable<Video> getVideosInModule(Long moduleId) {
        return moduleRepository.getVideosInModule(moduleId);
    }

    @Transactional
    public String addVideoToModule(Long moduleId, Video video) throws Exception {
        videoRepository.save(video);

        Optional<Module> m = moduleRepository.findById(moduleId);
        if (m.isPresent()) {
            Module module = m.get();
            module.getVideoList().add(video);
            System.out.println("module " + module.getModuleId() + "; videos = " + module.getVideoList());
            return video.getTitle() + " has been added to " + module.getTitle();
        } else {
            throw new IllegalStateException("Module does not exist");
        }
    }
}