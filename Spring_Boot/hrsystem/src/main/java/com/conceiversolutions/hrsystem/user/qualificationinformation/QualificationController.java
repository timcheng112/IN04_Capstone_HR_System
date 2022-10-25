package com.conceiversolutions.hrsystem.user.qualificationinformation;


import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @GetMapping(path= "/getQualification")
    public QualificationInformation getQualificationInformation(Long userId){
        return qualificationService.getQualificationInformation(userId);
    }


}
