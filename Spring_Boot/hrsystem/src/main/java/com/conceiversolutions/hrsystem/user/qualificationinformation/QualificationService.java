package com.conceiversolutions.hrsystem.user.qualificationinformation;

import com.conceiversolutions.hrsystem.user.docdata.DocData;
import com.conceiversolutions.hrsystem.user.docdata.DocDataRepository;
import com.conceiversolutions.hrsystem.user.docdata.DocDataService;
import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;

@Service
@AllArgsConstructor
public class QualificationService {

    private final QualificationRepository qualificationRepository;
    //only can have it on 1 end.
    private final DocDataService docDataService;
    private final UserRepository userRepository;

    public Long addCVtoUser(MultipartFile file, Long userId) throws Exception {
        try {
            DocData doc = docDataService.uploadDoc(file);
            User u1 = userRepository.findById(userId).get();
            if(u1.getQualificationInformation() == null){
                QualificationInformation qi = new QualificationInformation();
                qi.setCv(doc);
                qi.setLanguagesSpoken(new ArrayList<>());
                QualificationInformation q1 =qualificationRepository.saveAndFlush(qi);
                u1.setQualificationInformation(q1);
                System.out.println(qi);
                System.out.println(u1.getQualificationInformation().getCv());
                System.out.println("sorry what1");
                userRepository.saveAndFlush(u1);
            }else{
                QualificationInformation qi = u1.getQualificationInformation();
                qi.setCv(doc);
                QualificationInformation q1 =qualificationRepository.saveAndFlush(qi);
                u1.setQualificationInformation(q1);

                userRepository.saveAndFlush(u1);
                if(qi.getCv() != null){
                    System.out.println("there is a cv in here");
                }else{
                    System.out.println("there is no cv in here");
                }
//                System.out.println(u1.getQualificationInformation().getCv());
                System.out.println("sorry what2");

            }
            return doc.getDocId();


        }catch(Exception ex){
            throw new Exception("File cannot be added to User.");
        }

    }

    public QualificationInformation getQualificationInformation(Long userId){
        User u1 = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException(
                        "User with ID: " + userId + " does not exist!"));
        if(u1.getQualificationInformation() == null){
            QualificationInformation newqi = new QualificationInformation();
            newqi.setLanguagesSpoken(new ArrayList<>());
            QualificationInformation q1 =qualificationRepository.saveAndFlush(newqi);
            u1.setQualificationInformation(newqi);
            userRepository.saveAndFlush(u1);
            QualificationInformation qi = u1.getQualificationInformation();
            return qi;
        }else {
            QualificationInformation qi = u1.getQualificationInformation();
            return qi;
        }

    }

//    public DocData getCV(Long userId){
//        User u1 = userRepository.findById(userId)
//                .orElseThrow(() -> new IllegalStateException(
//                        "User with ID: " + userId + " does not exist!"));
//        if(u1.getQualificationInformation() == null){
//            u1.setQualificationInformation(new QualificationInformation());
//            userRepository.saveAndFlush(u1);
//            QualificationInformation qi = u1.getQualificationInformation();
//            if(qi.getCv() != null){
//                DocData cv = qi.getCv();
//                return cv;
//            }else{
//                System.out.println("bro something is wrong. no cv for some reason. can you upload thanks.");
//                return null;
//            }
//
//        }else {
//            QualificationInformation qi = u1.getQualificationInformation();
//        }
//
//    }

}
