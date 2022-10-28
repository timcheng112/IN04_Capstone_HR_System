package com.conceiversolutions.hrsystem.skillset.userskillset;

import com.conceiversolutions.hrsystem.skillset.skillset.Skillset;
import com.conceiversolutions.hrsystem.skillset.skillset.SkillsetRepository;
import com.conceiversolutions.hrsystem.user.qualificationinformation.QualificationInformation;
import com.conceiversolutions.hrsystem.user.qualificationinformation.QualificationRepository;
import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserSkillsetService {
    private final UserSkillsetRepositoy userSkillsetRepositoy;
    private final UserRepository userRepository;
    private final QualificationRepository qualificationRepository;
    private final SkillsetRepository skillsetRepository;

    public List<UserSkillset> getUserSkillsets(Long userId) {
        System.out.println("UserSkillsetService.getUserSkillset");
        System.out.println("userId = " + userId);

        List<UserSkillset> userSkills = userSkillsetRepositoy.findSkillsetByUserId(userId);
        System.out.println("User has " + userSkills.size() + " user skills");

        for (UserSkillset skill : userSkills) {
            Skillset s = skill.getSkillset();
            s.setJobPostings(new ArrayList<>());
            s.setJobRequests(new ArrayList<>());
        }

        return userSkills;
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
//            qi = user.getQualificationInformation();
            qi = qualificationRepository.findById(user.getQualificationInformation().getInfoId()).get();
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
        return savedUSS.getUserSkillsetId();
    }

    public Long updateUserSkillset(Long userSkillsetId, Integer skillLevel) {
        System.out.println("UserSkillsetService.updateUserSkillset");
        System.out.println("userSkillsetId = " + userSkillsetId + ", skillLevel = " + skillLevel);

        Optional<UserSkillset> s = userSkillsetRepositoy.findById(userSkillsetId);
        if (s.isEmpty()) {
            throw new IllegalStateException("User skillset does not exist");
        }

        UserSkillset skill = s.get();
        skill.setSkillLevel(skillLevel);
        userSkillsetRepositoy.save(skill);

        return userSkillsetId;
    }

    public String removeUserSkillset(Long userId, Long userSkillsetId) {
        System.out.println("UserSkillsetService.removeUserSkillset");
        System.out.println("userId = " + userId + ", userSkillsetId = " + userSkillsetId);

        List<UserSkillset> userSkills = userSkillsetRepositoy.findSkillsetByUserId(userId);

        Optional<UserSkillset> toRemoveOpt = userSkillsetRepositoy.findById(userSkillsetId);
        if (toRemoveOpt.isEmpty()) {
            throw new IllegalStateException("User skill does not exist");
        }
        UserSkillset toRemove = toRemoveOpt.get();

        if (userSkills.isEmpty()) {
            throw new IllegalStateException("User has no skillsets");
        }

        User user = userRepository.findById(userId).get();
        QualificationInformation qi = qualificationRepository.findById(user.getQualificationInformation().getInfoId()).get();
        List<UserSkillset> userSkillsets = qi.getUserSkills();

        if (!userSkillsets.contains(toRemove)) {
            throw new IllegalStateException("User skill is not linked to user");
        }

        userSkillsets.remove(toRemove);
        qi.setUserSkills(userSkills);
        qualificationRepository.save(qi);
        return "User skillset unlinked";
    }
}
