package com.conceiversolutions.hrsystem.user.qualificationinformation;


import com.conceiversolutions.hrsystem.enums.EducationEnum;
import com.conceiversolutions.hrsystem.skillset.userskillset.UserSkillset;
import com.conceiversolutions.hrsystem.user.recommendation.Recommendation;
import com.conceiversolutions.hrsystem.user.workexperience.WorkExperience;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping(path = "api/qualification")
public class QualificationController{

    private final QualificationService qualificationService;

    @PostMapping(path = "/addCv")
    public Long addCVtoUser(@RequestParam("document") MultipartFile file ,@RequestParam("userId") Long userId ) throws Exception {
        System.out.println("addCVtoUser method in");
        //returns docDataId tied
        return qualificationService.addCVtoUser(file, userId);
    }

    @PostMapping(path = "/addDocument")
    public Long addDocument(@RequestParam("file") MultipartFile file,
                            @RequestParam("userId") Long userId,
                            @RequestParam("documentType") String documentType) throws Exception {
        if (documentType.equals("CV")) {
            return qualificationService.addCVtoUser(file, userId);
        } else if (documentType.equals("Cover Letter")) {
            return qualificationService.addCLtoUser(file, userId);
        }
        return qualificationService.addTranscripttoUser(file, userId);
    }

    @GetMapping(path= "/getQualification")
    public QualificationInformation getQualificationInformation(Long userId){
        return qualificationService.getQualificationInformation(userId);
    }

    @GetMapping(path= "/getUserQualificationInformation")
    public QualificationInformation getUserQualificationInformation(@RequestParam("userId") Long userId) {
        return qualificationService.getUserQualificationInformation(userId);
    }

    @DeleteMapping(path = "/deleteUserDocument")
    public String deleteUserDocument(@RequestParam("userId") Long userId,
                                     @RequestParam("document") String document) {
        return qualificationService.deleteUserDocument(userId, document);
    }

    // Recommendations
    @PostMapping(path = "/addRecommendation")
    public Long addRecommendation(@RequestParam("userId") Long userId,
                                  @RequestParam("name") String name,
                                  @RequestParam(value = "phone", required = false) Integer phone,
                                  @RequestParam("email") String email,
                                  @RequestParam("relationship") String relationship) {
        return qualificationService.addRecommendation(userId, name, phone, email, relationship);
    }

    @GetMapping(path = "/getUserRecommendations")
    public List<Recommendation> getUserRecommendations(@RequestParam("userId") Long userId) {
        return qualificationService.getUserRecommendations(userId);
    }

    @DeleteMapping(path = "/removeUserRecommendation")
    public String removeUserRecommendation(@RequestParam("userId") Long userId,
                                           @RequestParam("recoId") Long recoId) {
        return qualificationService.removeUserRecommendation(userId, recoId);
    }

    // Work Experiences
    @PostMapping(path = "/addWorkExperience")
    public Long addWorkExperience(@RequestParam("userId") Long userId,
                                  @RequestParam("positionName") String positionName,
                                  @RequestParam("companyName") String companyName,
                                  @RequestParam("startDate") String startDate,
                                  @RequestParam(value = "endDate", required = false, defaultValue = "null") String endDate,
                                  @RequestParam("currentlyWorking") Boolean currentlyWorking,
                                  @RequestParam("description") String description) {
        if (endDate.equals("null")) {
            return qualificationService.addWorkExperience(userId, positionName, companyName, LocalDate.parse(startDate), null, currentlyWorking, description);
        }
        return qualificationService.addWorkExperience(userId, positionName, companyName, LocalDate.parse(startDate), LocalDate.parse(endDate), currentlyWorking, description);
    }

    @GetMapping(path = "/getUserExperiences")
    public List<WorkExperience> getUserExperiences(@RequestParam("userId") Long userId) {
        return qualificationService.getUserExperiences(userId);
    }

    @DeleteMapping(path = "/removeUserExperience")
    public String removeUserExperience(@RequestParam("userId") Long userId,
                                           @RequestParam("expId") Long expId) {
        return qualificationService.removeUserExperience(userId, expId);
    }

    @PutMapping(path = "/saveWorkExperiences")
    public String saveWorkExperiences(@RequestParam("userId") Long userId,
                                                    @RequestBody List<WorkExperience> experiences) {
        return qualificationService.saveWorkExperiences(userId, experiences);
    }

    @PutMapping(path = "/saveUserRecommendations")
    public String saveUserRecommendations(@RequestParam("userId") Long userId,
                                      @RequestBody List<Recommendation> recos) {
        return qualificationService.saveUserRecommendations(userId, recos);
    }

    @PutMapping(path = "/saveUserSkillsets")
    public String saveUserSkillsets(@RequestParam("userId") Long userId,
                                          @RequestBody List<UserSkillset> userSkills) {
        return qualificationService.saveUserSkillsets(userId, userSkills);
    }


}
