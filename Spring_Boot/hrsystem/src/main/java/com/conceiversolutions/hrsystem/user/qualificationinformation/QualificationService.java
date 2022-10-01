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

    public void addCVtoUser(MultipartFile file, Long userId) throws Exception {
        try {
            DocData doc = docDataService.uploadDoc(file);
            User u1 = userRepository.findById(userId).get();
            if(u1.getQualificationInformation() == null){
                QualificationInformation qi = new QualificationInformation();
                qi.setCv(doc);
                qi.setLanguagesSpoken(new ArrayList<>());
                QualificationInformation q1 =qualificationRepository.saveAndFlush(qi);
                u1.setQualificationInformation(q1);
                userRepository.saveAndFlush(u1);
            }else{
                QualificationInformation qi = u1.getQualificationInformation();
                qi.setCv(doc);
                QualificationInformation q1 =qualificationRepository.saveAndFlush(qi);
                u1.setQualificationInformation(q1);
                userRepository.saveAndFlush(u1);
            }

        }catch(Exception ex){
            throw new Exception("File cannot be added to User.");
        }
    }
}
