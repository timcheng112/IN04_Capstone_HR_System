package com.conceiversolutions.hrsystem.user.qualificationinformation;

import com.conceiversolutions.hrsystem.enums.EducationEnum;
import com.conceiversolutions.hrsystem.skillset.userskillset.UserSkillset;
import com.conceiversolutions.hrsystem.user.docdata.DocData;
import com.conceiversolutions.hrsystem.user.docdata.DocDataRepository;
import com.conceiversolutions.hrsystem.user.docdata.DocDataService;
import com.conceiversolutions.hrsystem.user.recommendation.Recommendation;
import com.conceiversolutions.hrsystem.user.recommendation.RecommendationRepository;
import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;
import com.conceiversolutions.hrsystem.user.workexperience.WorkExperience;
import com.conceiversolutions.hrsystem.user.workexperience.WorkExperienceRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class QualificationService {

    private final QualificationRepository qualificationRepository;
    //only can have it on 1 end.
    private final DocDataService docDataService;
    private final UserRepository userRepository;
    private final RecommendationRepository recommendationRepository;
    private final WorkExperienceRepository workExperienceRepository;

    public Long addCVtoUser(MultipartFile file, Long userId) throws Exception {
        System.out.println("QualificationService.addCVtoUser");
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
                QualificationInformation qi = qualificationRepository.findById(u1.getQualificationInformation().getInfoId()).get();
                qi.setCv(doc);
                QualificationInformation q1 = qualificationRepository.saveAndFlush(qi);
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
            throw new Exception("CV cannot be added to User.");
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

    public QualificationInformation getUserQualificationInformation(Long userId) {
        System.out.println("QualificationService.getUserQualificationInformation");
        System.out.println("userId = " + userId);

        User u1 = userRepository.findById(userId).get();
        Optional<QualificationInformation> qi = qualificationRepository.findById(u1.getQualificationInformation().getInfoId());
        if (qi.isEmpty()) {
            throw new IllegalStateException("User does not exist, cannot proceed");
        }

        QualificationInformation info = qi.get();

        // Nullify Relationships
        User insideUser = info.getUser();
        //// Nullify inside user
        insideUser.setTeams(new ArrayList<>());
        insideUser.setQualificationInformation(null);
        insideUser.setBlocks(new ArrayList<>());
        insideUser.setShiftListItems(new ArrayList<>());
        insideUser.setSwapRequestsReceived(new ArrayList<>());
        insideUser.setSwapRequestsRequested(new ArrayList<>());
        insideUser.setReactivationRequest(null);
        insideUser.setAttendances(new ArrayList<>());
        insideUser.setCurrentPayInformation(null);
        insideUser.setEmployeeAppraisals(new ArrayList<>());
        insideUser.setManagerAppraisals(new ArrayList<>());
        insideUser.setManagerReviews(new ArrayList<>());
        insideUser.setEmployeeReviews(new ArrayList<>());
        insideUser.setApplications(new ArrayList<>());
        insideUser.setPositions(new ArrayList<>());
        insideUser.setJobRequests(new ArrayList<>());
        insideUser.setLeaves(new ArrayList<>());
        insideUser.setLeaveQuotas(new ArrayList<>());
        insideUser.setCurrentLeaveQuota(null);
        insideUser.setTaskListItems(new ArrayList<>());

        List<UserSkillset> userSkills = info.getUserSkills();
        for (UserSkillset skill : userSkills) {
//            System.out.println(skill.getUserSkillsetId());
            skill.getSkillset().setJobRequests(new ArrayList<>());
            skill.getSkillset().setJobPostings(new ArrayList<>());
        }

        return info;
    }

    public String deleteUserDocument(Long userId, String document) {
        System.out.println("QualificationService.deleteUserDocument");
        System.out.println("userId = " + userId + ", document = " + document);

        User u1 = userRepository.findById(userId).get();
        Optional<QualificationInformation> qi = qualificationRepository.findById(u1.getQualificationInformation().getInfoId());
        if (qi.isEmpty()) {
            throw new IllegalStateException("User does not exist, cannot proceed");
        }

        QualificationInformation info = qi.get();

        Long docId;
        if (document.equals("CV")) {
            docId = info.getCv().getDocId();
            info.setCv(null);
        } else if (document.equals("Cover Letter")) {
            docId = info.getCoverLetter().getDocId();
            info.setCoverLetter(null);
        } else {
            docId = info.getTranscript().getDocId();
            info.setTranscript(null);
        }

        qualificationRepository.save(info);
        docDataService.deleteDocument(docId);

        return "User's " + document + " has been successfully removed.";
    }

    public Long addCLtoUser(MultipartFile file, Long userId) throws Exception {
        System.out.println("QualificationService.addCLtoUser");
        try {
            DocData doc = docDataService.uploadDoc(file);
            User u1 = userRepository.findById(userId).get();
            if (u1.getQualificationInformation() == null){
                QualificationInformation qi = new QualificationInformation();
                qi.setCoverLetter(doc);
                qi.setLanguagesSpoken(new ArrayList<>());
                QualificationInformation q1 = qualificationRepository.saveAndFlush(qi);
                u1.setQualificationInformation(q1);
                userRepository.saveAndFlush(u1);
            } else {
                QualificationInformation qi = qualificationRepository.findById(u1.getQualificationInformation().getInfoId()).get();
                qi.setCoverLetter(doc);
                QualificationInformation q1 = qualificationRepository.saveAndFlush(qi);
                u1.setQualificationInformation(q1);

                userRepository.saveAndFlush(u1);
                if (qi.getCv() != null){
                    System.out.println("there is a cover letter in here");
                } else {
                    System.out.println("there is no cover letter in here");
                }
            }
            return doc.getDocId();
        } catch (Exception ex) {
            throw new Exception("Cover Letter cannot be added to User.");
        }
    }

    public Long addTranscripttoUser(MultipartFile file, Long userId) throws Exception {
        System.out.println("QualificationService.addTranscripttoUser");
        try {
            DocData doc = docDataService.uploadDoc(file);
            User u1 = userRepository.findById(userId).get();
            if (u1.getQualificationInformation() == null){
                QualificationInformation qi = new QualificationInformation();
                qi.setTranscript(doc);
                qi.setLanguagesSpoken(new ArrayList<>());
                QualificationInformation q1 = qualificationRepository.saveAndFlush(qi);
                u1.setQualificationInformation(q1);
                userRepository.saveAndFlush(u1);
            } else {
                QualificationInformation qi = qualificationRepository.findById(u1.getQualificationInformation().getInfoId()).get();
                qi.setTranscript(doc);
                QualificationInformation q1 = qualificationRepository.saveAndFlush(qi);
                u1.setQualificationInformation(q1);

                userRepository.saveAndFlush(u1);
                if (qi.getCv() != null){
                    System.out.println("there is a transcript in here");
                } else {
                    System.out.println("there is no transcript in here");
                }
            }
            return doc.getDocId();
        } catch (Exception ex) {
            throw new Exception("Transcript cannot be added to User.");
        }
    }

    public Long addRecommendation(Long userId, String name, Integer phone, String email, String relationship) {
        System.out.println("QualificationService.addRecommendation");
        System.out.println("userId = " + userId + ", name = " + name + ", phone = " + phone + ", email = " + email + ", relationship = " + relationship);
        User u1 = userRepository.findById(userId).get();

        if (u1.getQualificationInformation() == null){
            QualificationInformation qi = new QualificationInformation();

            QualificationInformation q1 = qualificationRepository.saveAndFlush(qi);
            u1.setQualificationInformation(q1);
            userRepository.saveAndFlush(u1);
        }

        QualificationInformation qi = qualificationRepository.findById(u1.getQualificationInformation().getInfoId()).get();

        Recommendation rec = new Recommendation(name, phone, email, relationship);
        Recommendation savedRec = recommendationRepository.saveAndFlush(rec);

        List<Recommendation> curList = qi.getRecommendations();
        curList.add(savedRec);
        qi.setRecommendations(curList);

        qualificationRepository.save(qi);

        return savedRec.getRecommendationId();
    }

    public List<Recommendation> getUserRecommendations(Long userId) {
        System.out.println("QualificationService.getUserRecommendations");

        User u1 = userRepository.findById(userId).get();
        Optional<QualificationInformation> qi = qualificationRepository.findById(u1.getQualificationInformation().getInfoId());

        if (qi.isEmpty()) {
            return new ArrayList<>();
        }

        QualificationInformation info = qi.get();
        return info.getRecommendations();
    }

    public String removeUserRecommendation(Long userId, Long recoId) {
        System.out.println("QualificationService.removeUserRecommendation");
        System.out.println("userId = " + userId + ", recoId = " + recoId);

        User u1 = userRepository.findById(userId).get();
        Optional<QualificationInformation> qi = qualificationRepository.findById(u1.getQualificationInformation().getInfoId());

        if (qi.isEmpty() || qi.get().getRecommendations().isEmpty()) {
            throw new IllegalStateException("No Recommendation to remove");
        }

        QualificationInformation info = qi.get();
        Recommendation rec = recommendationRepository.findById(recoId).get();

        info.getRecommendations().remove(rec);
        qualificationRepository.save(info);
        recommendationRepository.deleteById(recoId);

        return "Recommendation successfully removed";
    }

    public Long addWorkExperience(Long userId, String positionName, String companyName, LocalDate start, LocalDate end, Boolean currentlyWorking, String description) {
        System.out.println("QualificationService.addWorkExperience");
        System.out.println("userId = " + userId + ", positionName = " + positionName + ", companyName = " + companyName + ", start = " + start + ", end = " + end + ", currentlyWorking = " + currentlyWorking + ", description = " + description);

        User u1 = userRepository.findById(userId).get();

        if (u1.getQualificationInformation() == null){
            QualificationInformation qi = new QualificationInformation();

            QualificationInformation q1 = qualificationRepository.saveAndFlush(qi);
            u1.setQualificationInformation(q1);
            userRepository.saveAndFlush(u1);
        }

        QualificationInformation qi = qualificationRepository.findById(u1.getQualificationInformation().getInfoId()).get();

        WorkExperience workExp = new WorkExperience(positionName, companyName, start, end, currentlyWorking, description);
        WorkExperience savedExp = workExperienceRepository.saveAndFlush(workExp);

        List<WorkExperience> curList = qi.getWorkExperiences();
        curList.add(savedExp);
        qi.setWorkExperiences(curList);

        qualificationRepository.save(qi);

        return savedExp.getExperienceId();
    }

    public List<WorkExperience> getUserExperiences(Long userId) {
        System.out.println("QualificationService.getUserExperiences");

        User u1 = userRepository.findById(userId).get();
        Optional<QualificationInformation> qi = qualificationRepository.findById(u1.getQualificationInformation().getInfoId());

        if (qi.isEmpty()) {
            return new ArrayList<>();
        }

        QualificationInformation info = qi.get();
        return info.getWorkExperiences();
    }

    public String removeUserExperience(Long userId, Long expId) {
        System.out.println("QualificationService.removeUserExperience");
        System.out.println("userId = " + userId + ", expId = " + expId);

        User u1 = userRepository.findById(userId).get();
        Optional<QualificationInformation> qi = qualificationRepository.findById(u1.getQualificationInformation().getInfoId());

        if (qi.isEmpty() || qi.get().getWorkExperiences().isEmpty()) {
            throw new IllegalStateException("No Experience to remove");
        }

        QualificationInformation info = qi.get();
        WorkExperience exp = workExperienceRepository.findById(expId).get();

        info.getWorkExperiences().remove(exp);
        qualificationRepository.save(info);
        recommendationRepository.deleteById(expId);

        return "Work Experience successfully removed";
    }

    public Long updateUserEducation(Long userId, EducationEnum education, String schoolName, Integer schoolGradYear) {
        System.out.println("QualificationService.updateUserEducation");
        System.out.println("userId = " + userId + ", education = " + education + ", schoolName = " + schoolName + ", schoolGradYear = " + schoolGradYear);


        return 0L;
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
