package com.conceiversolutions.hrsystem.skillset.userskillset;

import com.conceiversolutions.hrsystem.skillset.skillset.Skillset;
import com.conceiversolutions.hrsystem.skillset.skillset.SkillsetRepository;
import com.conceiversolutions.hrsystem.user.qualificationinformation.QualificationInformation;
import com.conceiversolutions.hrsystem.user.qualificationinformation.QualificationRepository;
import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserSkillsetService {
    private final UserSkillsetRepositoy userSkillsetRepositoy;
    private final UserRepository userRepository;
    private final QualificationRepository qualificationRepository;
    private final SkillsetRepository skillsetRepository;

    public List<UserSkillset> getUserSkillset(Long userId) {
        System.out.println("UserSkillsetService.getUserSkillset");
        System.out.println("userId = " + userId);

        return userSkillsetRepositoy.findSkillsetByUserId(userId);

    }

    public Long addUserSkillset(Long userId, Long skillsetId, Integer skillLevel) {
        System.out.println("UserSkillsetService.addUserSkillset");
        System.out.println("userId = " + userId + ", skillsetId = " + skillsetId + ", skillLevel = " + skillLevel);

        // get user
        User user = userRepository.findById(userId).get();

        QualificationInformation qi = null;

        // check if user has an QI entity
        if (user.getQualificationInformation() != null) { // QI exist, use existing
//            System.out.println("qi is not null");
            qi = user.getQualificationInformation();
//            System.out.println("qi id is " + qi.getInfoId());
        } else { // QI not existing, create new QI
//            System.out.println("qi is null");
            QualificationInformation q1 = new QualificationInformation(user);
            qi = qualificationRepository.saveAndFlush(q1);
//            System.out.println("qi id is " + qi.getInfoId());
            user.setQualificationInformation(qi);
            userRepository.save(user);
        }

        // check if user already has the skillset
        List<UserSkillset> userSkillsets = qi.getUserSkills();
        for (UserSkillset ss : userSkillsets) {
            if (ss.getSkillset().getSkillsetId().equals(skillsetId)) {
                throw new IllegalStateException("User already has this UserSkillset added. Please edit it instead");
            }
        }

        // user don't have skillset yet so can create
        Skillset chosenSS = skillsetRepository.findById(skillsetId).get();
        UserSkillset newUSS = new UserSkillset(skillLevel, chosenSS);
        UserSkillset savedUSS = userSkillsetRepositoy.saveAndFlush(newUSS);

        userSkillsets.add(savedUSS);
        qi.setUserSkills(userSkillsets);
        qualificationRepository.save(qi);
        return qi.getInfoId();
    }
}
