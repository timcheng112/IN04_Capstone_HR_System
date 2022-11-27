package com.conceiversolutions.hrsystem.training.module;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.conceiversolutions.hrsystem.training.video.Video;
import com.conceiversolutions.hrsystem.training.video.VideoRepository;
import com.conceiversolutions.hrsystem.user.docdata.DocData;
import com.conceiversolutions.hrsystem.user.docdata.DocDataService;
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
    
    private final DocDataService docDataService; 

    public ModuleService(ModuleRepository moduleRepository, UserRepository userRepository,
            VideoRepository videoRepository, DocDataService docDataService) {
        this.moduleRepository = moduleRepository;
        this.userRepository = userRepository;
        this.videoRepository = videoRepository;
        this.docDataService = docDataService;
    }

    public User breakRelationships(User user) {
        User u = new User();

        u.setUserId(user.getUserId());
        u.setFirstName(user.getFirstName());
        u.setLastName(user.getLastName());
        u.setWorkEmail(user.getWorkEmail());
        u.setUserRole(user.getUserRole());
        u.setProfilePic(user.getProfilePic());
        u.setIsBlackListed(user.getIsBlackListed());
        u.setCitizenship(user.getCitizenship());
        u.setDateJoined(user.getDateJoined());
        u.setDob(user.getDob());
        u.setEmail(user.getEmail());
        u.setGender(user.getGender());
        u.setIsEnabled(user.getIsEnabled());
        u.setIsHrEmployee(user.getIsHrEmployee());
        u.setIsPartTimer(user.getIsPartTimer());
        u.setPassword(user.getPassword());
        u.setPhone(user.getPhone());
        u.setRace(user.getRace());

        return u;
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
            Module module = m.get();
            module.setEmployees(new ArrayList<>());
            return module;
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
        if (!moduleRepository.existsById(moduleId)) {
            throw new IllegalStateException("module with id " + moduleId + " does not exist");
        }
        moduleRepository.deleteById(moduleId);
    }

    public String assignModulesToEmployees(Long moduleId, Long currentUserId, List<Long> employees) throws Exception {
        System.out.println("ModuleService.assignModulesToEmployees");
        Optional<Module> m = moduleRepository.findById(moduleId);
        List<User> newEmployeeList = new ArrayList<>();
        if (m.isPresent()) {

            Module module = m.get();
            
            Optional<User> optionalUser = userRepository.findById(currentUserId);
            if (optionalUser.isPresent()) {
                User currentUser = optionalUser.get();
                if (module.getEmployees().contains(currentUser)) {
                    User u = breakRelationships(currentUser);
                    newEmployeeList.add(u);
                }
            } else {
                throw new IllegalStateException("Current user does not exist");
            }
            
            module.setEmployees(new ArrayList<>());
            for (Long userId : employees) {
                System.out.println("userId = " + userId);
                Optional<User> user = userRepository.findById(userId);
                
                if (user.isPresent()) {
                    User u = breakRelationships(user.get());
                    newEmployeeList.add(u);
                    System.out.println("Employee with id " + userId + " has been found");
                } else {
                    throw new IllegalStateException("Employee does not exist");
                }

            }
            module.setEmployees(newEmployeeList);
            moduleRepository.save(module);
            System.out.println(module.getEmployees() instanceof List);

            return newEmployeeList.size() + " employee(s) have been assigned to module " + moduleId;
        } else {
            throw new IllegalStateException("Module does not exist");
        }
    }

    @Transactional
    public String editModule(Long moduleId, Module module) throws Exception {
        Optional<Module> optionalModule = moduleRepository.findById(moduleId);
        if (optionalModule.isPresent()) {
            Module m = optionalModule.get();
            m.setTitle(module.getTitle());
            m.setDescription(module.getDescription());
            m.setThumbnail(module.getThumbnail());
        } else {
            throw new IllegalStateException("Module does not exist");
        }
        return module.getTitle() + " has been successfuly edited";
    }

    public Iterable<Video> getVideosInModule(Long moduleId) {
        return moduleRepository.getVideosInModule(moduleId);
    }

    @Transactional
    public String addVideoToModule(Long moduleId, String title, String description) throws Exception {

        Video newVideo = new Video();

        newVideo.setTitle(title);
        newVideo.setDescription(description);
        newVideo.setPosition(1);
        videoRepository.save(newVideo);

        Optional<Module> m = moduleRepository.findById(moduleId);
        if (m.isPresent()) {
            Module module = m.get();
            module.getVideoList().add(newVideo);
            System.out.println("module " + module.getModuleId() + "; videos = " + module.getVideoList());
            return newVideo.getTitle() + " has been added to " + module.getTitle();
        } else {
            throw new IllegalStateException("Module does not exist");
        }
    }

    public Iterable<Module> getUserModules(Long userId) {
        List<Module> userModules = new ArrayList<>();

        List<Module> allModules = moduleRepository.findAll();
        for (Module module : allModules) {
            for (User employee : module.getEmployees()) {
                if (employee.getUserId() == userId) {
                    module.setEmployees(new ArrayList<>());
                    userModules.add(module);
                }
            }
        }
        return userModules;
    }

    public Module getModuleFromVideo(Long videoId) throws Exception {
        Optional<Video> optionalVideo = videoRepository.findById(videoId);
        if (optionalVideo.isPresent()) {
            Video v = optionalVideo.get();
            List<Module> allModules = moduleRepository.findAll();
            for (Module module : allModules) {
                if (module.getVideoList().contains(v)) {
                    return module;
                }
            }
            throw new IllegalStateException("Could not find module");
        } else {
            throw new IllegalStateException("Video does not exist");
        }

    }

    public List<User> getEmployeesAssignedToModule(Long moduleId) throws Exception {
        System.out.println("ModuleService.getEmployeesAssignedToModule");
        Optional<Module> optionalModule = moduleRepository.findById(moduleId);
        if (optionalModule.isPresent()) {
            List<User> employees = optionalModule.get().getEmployees();
            List<User> assigned = new ArrayList<>();

            for (User u : employees) {
                User newUser = breakRelationships(u);
                System.out.println("ASSIGNED " + newUser.getWorkEmail());
                assigned.add(newUser);
            }

            return assigned;
        } else {
            throw new IllegalStateException("Module does not exist");
        }
    }

    public List<User> getEmployeesUnassignedToModule(Long moduleId) throws Exception {
        List<User> assignedEmployees = getEmployeesAssignedToModule(moduleId);
        List<User> allEmployees = userRepository.findAll();
        for (User assigned : assignedEmployees) {
            allEmployees.remove(assigned);
            System.out.println("Removed user " + assigned.getUserId());
        }
        List<User> unassigned = new ArrayList<>();
        for (User user : allEmployees) {
            User unassignedUser = breakRelationships(user);
            unassigned.add(unassignedUser);
        }
        return unassigned;
    }

    public String getUserProgress(Long moduleId, Long userId) throws Exception {
        System.out.println("ModuleService.getUserProgress");
        Iterable<Module> userModules = getUserModules(userId);
        System.out.println("user mods = " + userModules);
        for (Module module : userModules) {

            if (module.getModuleId() == moduleId) {
                Integer watched = 0;
                for (Video video : module.getVideoList()) {
                    Optional<User> optionalUser = userRepository.findById(userId);
                    if (optionalUser.isPresent()) {
                        User user = optionalUser.get();
                        if (video.getWatchedBy().contains(user)) {
                            watched++;
                        }
                    } else {
                        throw new IllegalStateException("User does not exist");
                    }
                }
                return watched + " out of " + module.getVideoList().size() + " watched";
            }
        }
        throw new IllegalStateException("User is not assigned to this module");
    }

    public List<Module> getUserCompletedModules(Long userId) throws Exception {

        System.out.println("ModuleService.getUserCompletedModules");
        Iterable<Module> userModules = getUserModules(userId);
        List<Module> completedModules = new ArrayList<>();
        Optional<User> optionalUser = userRepository.findById(userId);

        System.out.println(userModules);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            for (Module module : userModules) {
                int watched = 0;
                int total = module.getVideoList().size();
                for (Video v : module.getVideoList()) {
                    if (v.getWatchedBy().contains(user)) {
                        watched++;
                    }
                }
                if (watched == total) {
                    completedModules.add(module);
                }
            }
            return completedModules;
        } else {
            throw new IllegalStateException("User does not exist");
        }
    }

    public Boolean getIsUserAssigned(Long moduleId, Long userId) throws Exception {
        List<User> assignedEmployees = getEmployeesAssignedToModule(moduleId);
        for (User u : assignedEmployees) {
            if (u.getUserId() == userId) {
                return true;
            }
        }
        return false;
    }

}