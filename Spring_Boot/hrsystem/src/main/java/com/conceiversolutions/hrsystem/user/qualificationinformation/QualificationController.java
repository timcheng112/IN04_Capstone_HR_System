package com.conceiversolutions.hrsystem.user.qualificationinformation;


import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping(path = "api/qualification")
public class QualificationController{

    private final QualificationService qualificationService;

    public void  addCVtoUser(@RequestParam("document") MultipartFile file ,@RequestParam("userId") Long userId ) throws Exception {
        qualificationService.addCVtoUser(file, userId);
    }


}
