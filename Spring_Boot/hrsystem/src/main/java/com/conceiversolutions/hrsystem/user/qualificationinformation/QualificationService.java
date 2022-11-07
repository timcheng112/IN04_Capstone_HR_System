package com.conceiversolutions.hrsystem.user.qualificationinformation;

import com.conceiversolutions.hrsystem.enums.CitizenshipEnum;
import com.conceiversolutions.hrsystem.enums.EducationEnum;
import com.conceiversolutions.hrsystem.enums.JobStatusEnum;
import com.conceiversolutions.hrsystem.enums.RaceEnum;
import com.conceiversolutions.hrsystem.jobmanagement.jobposting.JobPosting;
import com.conceiversolutions.hrsystem.jobmanagement.jobposting.JobPostingRepository;
import com.conceiversolutions.hrsystem.skillset.skillset.Skillset;
import com.conceiversolutions.hrsystem.skillset.userskillset.UserSkillset;
import com.conceiversolutions.hrsystem.skillset.userskillset.UserSkillsetRepositoy;
import com.conceiversolutions.hrsystem.skillset.userskillset.UserSkillsetService;
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
    private final UserSkillsetService userSkillsetService;
    private final UserSkillsetRepositoy userSkillsetRepositoy;
    private final JobPostingRepository jobPostingRepository;

    public Long addCVtoUser(MultipartFile file, Long userId) throws Exception {
        System.out.println("QualificationService.addCVtoUser");
        try {
            DocData doc = docDataService.uploadDoc(file);
            User u1 = userRepository.findById(userId).get();
            if(u1.getQualificationInformation() == null){
                QualificationInformation qi = new QualificationInformation(u1);
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
//                System.out.println("sorry what2");

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
            QualificationInformation newqi = new QualificationInformation(u1);
            newqi.setLanguagesSpoken(new ArrayList<>());
            QualificationInformation q1 =qualificationRepository.saveAndFlush(newqi);
            u1.setQualificationInformation(newqi);
            userRepository.saveAndFlush(u1);
            QualificationInformation qi = u1.getQualificationInformation();
            return qi;
        }else {
            QualificationInformation qi = u1.getQualificationInformation();
            qi.setUser(null);
            for (JobPosting jp : qi.getBookmarks()) {
                jp.setJobRequest(null);
                jp.setPostedBy(null);
                jp.setJobPostRequirements(new ArrayList<>());
            }

            for (UserSkillset skill : qi.getUserSkills()) {
                Skillset s = skill.getSkillset();
                s.setJobPostings(new ArrayList<>());
                s.setJobRequests(new ArrayList<>());
            }
            qi.getCv().setDocData(null);
            qi.getCoverLetter().setDocData(null);
            qi.getTranscript().setDocData(null);

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

        info.getCv().setDocData(null);
        info.getCoverLetter().setDocData(null);
        info.getTranscript().setDocData(null);

        for (JobPosting jp : info.getBookmarks()) {
            jp.setJobRequest(null);
            jp.setPostedBy(null);
            jp.setJobPostRequirements(new ArrayList<>());
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
                QualificationInformation qi = new QualificationInformation(u1);
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
                QualificationInformation qi = new QualificationInformation(u1);
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
            QualificationInformation qi = new QualificationInformation(u1);

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
            QualificationInformation qi = new QualificationInformation(u1);

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

//    public String updateUserRecommendation(Long userId, Long recoId, String name, Integer phone, String email, String relationship) {
//        System.out.println("QualificationService.updateUserRecommendation");
//        System.out.println("userId = " + userId + ", recoId = " + recoId + ", name = " + name + ", phone = " + phone + ", email = " + email + ", relationship = " + relationship);
//        //TODO
//
//        return "done";
//    }

//    public String updateUserExperience(Long userId, Long experienceId, String positionName, String companyName, LocalDate start, LocalDate end, Boolean currentlyWorking, String description) {
//        System.out.println("QualificationService.updateUserExperience");
//        System.out.println("userId = " + userId + ", experienceId = " + experienceId + ", positionName = " + positionName + ", companyName = " + companyName + ", start = " + start + ", end = " + end + ", currentlyWorking = " + currentlyWorking + ", description = " + description);
//        //TODO
//
//        return "done";
//    }

    public String saveWorkExperiences(Long userId, List<WorkExperience> experiences) {
        System.out.println("QualificationService.saveWorkExperiences");
        System.out.println("userId = " + userId + ", experiences = " + experiences);

        User a = userRepository.findById(userId).get();
        User applicant = checkQIExists(a);
        List<WorkExperience> existingExperiences = applicant.getQualificationInformation().getWorkExperiences();
        List<Long> existingExpIds = existingExperiences.stream().map(x -> x.getExperienceId()).toList();
//        System.out.println("Existing experience ids are ");
//        System.out.println(existingExpIds);
//        System.out.println("Sent experience ids are ");
        List<Long> sentExpIds = experiences.stream().filter(x-> x.getExperienceId() != -1).map(x -> x.getExperienceId()).toList();
//        System.out.println(experiences);
//        System.out.println(experiences.get(0).getStartDate().getClass());

        if (experiences.isEmpty()) {
            applicant.getQualificationInformation().setWorkExperiences(new ArrayList<>());
            qualificationRepository.saveAndFlush(applicant.getQualificationInformation());
            return "No Experiences to save. List has been cleared";
        } else {
            // persist new one, remove old ones and update existing ones
            ArrayList<WorkExperience> toAdd = new ArrayList<>();
            for (WorkExperience exp : experiences) {
                if (exp.getExperienceId() == -1) { // new
                    // persist new
                    WorkExperience newExp = new WorkExperience(exp.getPositionName(), exp.getCompanyName(), exp.getStartDate(), exp.getEndDate(), exp.getCurrentlyWorking(), exp.getDescription());
                    WorkExperience savedExp = workExperienceRepository.saveAndFlush(newExp);
                    toAdd.add(savedExp);
//                    System.out.println("added one new work experience");
                } else if (existingExpIds.contains(exp.getExperienceId())) {
                    // update
                    for (WorkExperience e : existingExperiences) {
                        if (e.getExperienceId().equals(exp.getExperienceId())) {
                            e.setPositionName(exp.getPositionName());
                            e.setCompanyName(exp.getCompanyName());
                            e.setStartDate(exp.getStartDate());
                            e.setEndDate(exp.getEndDate());
                            e.setCurrentlyWorking(exp.getCurrentlyWorking());
                            e.setDescription(exp.getDescription());
//                            System.out.println("updated one work experience");
                            workExperienceRepository.save(e);
                            break;
                        }
                    }
                }
            }

            applicant = userRepository.findById(userId).get();
//            System.out.println(applicant.getQualificationInformation());

            List<WorkExperience> toRemove = new ArrayList<>();
            for (WorkExperience e : applicant.getQualificationInformation().getWorkExperiences()) {
                if (!sentExpIds.contains(e.getExperienceId())) {
                    toRemove.add(e);
//                    System.out.println("going to remove one experience");
                }
            }

            existingExperiences.removeAll(toRemove);
            existingExperiences.addAll(toAdd);
            qualificationRepository.saveAndFlush(applicant.getQualificationInformation());
            return "Experiences saved";
        }
    }

    public String saveUserRecommendations(Long userId, List<Recommendation> recos) {
        System.out.println("QualificationService.saveUserRecommendations");
        System.out.println("userId = " + userId + ", recos = " + recos);

        User a = userRepository.findById(userId).get();
        User applicant = checkQIExists(a);
        List<Recommendation> existingRecos = applicant.getQualificationInformation().getRecommendations();
        List<Long> existingRecoIds = existingRecos.stream().map(x -> x.getRecommendationId()).toList();
        List<Long> sentRecoIds = recos.stream().filter(x-> x.getRecommendationId() != -1).map(x -> x.getRecommendationId()).toList();

        if (recos.isEmpty()) {
            applicant.getQualificationInformation().setRecommendations(new ArrayList<>());
            qualificationRepository.saveAndFlush(applicant.getQualificationInformation());
            return "No Recommendations to save. List has been cleared";
        } else {
            // persist new one, remove old ones and update existing ones
            ArrayList<Recommendation> toAdd = new ArrayList<>();
            for (Recommendation rec : recos) {
                if (rec.getRecommendationId() == -1) { // new
                    // persist new
                    Recommendation newReco = new Recommendation(rec.getName(), rec.getPhone(), rec.getEmail(), rec.getRelationship());
                    Recommendation savedReco = recommendationRepository.saveAndFlush(newReco);
                    toAdd.add(savedReco);
//                    System.out.println("added one new work experience");
                } else if (existingRecoIds.contains(rec.getRecommendationId())) {
                    // update
                    for (Recommendation r : existingRecos) {
                        if (r.getRecommendationId().equals(rec.getRecommendationId())) {
                            r.setName(rec.getName());
                            r.setPhone(rec.getPhone());
                            r.setEmail(rec.getEmail());
                            r.setRelationship(rec.getRelationship());
                            recommendationRepository.save(r);
                            break;
                        }
                    }
                }
            }

            applicant = userRepository.findById(userId).get();

            List<Recommendation> toRemove = new ArrayList<>();
            for (Recommendation r : applicant.getQualificationInformation().getRecommendations()) {
                if (!sentRecoIds.contains(r.getRecommendationId())) {
                    toRemove.add(r);
                }
            }

            existingRecos.removeAll(toRemove);
            existingRecos.addAll(toAdd);
            qualificationRepository.saveAndFlush(applicant.getQualificationInformation());
            return "Recommendations saved";
        }
    }

    private EducationEnum getEduEnum(String educationLevel) {
        System.out.println("QualificationService.getEduEnum");
        System.out.println("educationLevel = " + educationLevel);
        EducationEnum edu = switch (educationLevel) {
            case "O LEVEL" -> EducationEnum.O;
            case "N LEVEL" -> EducationEnum.N;
            case "A LEVEL" -> EducationEnum.A;
            default -> EducationEnum.valueOf(educationLevel);
        };

        System.out.println("education level is " + edu);
        return edu;
    }

    public User updateApplicantProfileDetails(User user, String aboutMe, EducationEnum education, CitizenshipEnum citizenship, RaceEnum race, String schoolName, Integer gradYear, List<String> languages) {
        System.out.println("QualificationService.updateApplicantProfileDetails");

        User applicant = checkQIExists(user);
        QualificationInformation qi = applicant.getQualificationInformation();

        qi.setPersonalStatement(aboutMe);
        qi.setLanguagesSpoken(languages);
        qi.setHighestEducation(education);
        qi.setSchoolName(schoolName);
        qi.setSchoolGradYear(gradYear);
        qi.setCitizenship(citizenship);
        qi.setRace(race);

        qualificationRepository.saveAndFlush(qi);
        return applicant;
    }

    public User checkQIExists(User u1) {
        System.out.println("QualificationService.checkQIExists");

        if (u1.getQualificationInformation() == null){
            QualificationInformation qi = new QualificationInformation(u1);

            QualificationInformation q1 = qualificationRepository.saveAndFlush(qi);
            u1.setQualificationInformation(q1);
            userRepository.saveAndFlush(u1);
        }

        return u1;
    }

    public String saveUserSkillsets(Long userId, List<UserSkillset> userSkills) {
        System.out.println("QualificationService.saveUserSkillsets");

        User a = userRepository.findById(userId).get();
        User applicant = checkQIExists(a);
        List<UserSkillset> existingUserskills = applicant.getQualificationInformation().getUserSkills();
        List<Long> existingUserSkillsIds = existingUserskills.stream().map(x -> x.getUserSkillsetId()).toList();
        List<Long> sentUserSkillsIds = userSkills.stream().filter(x -> x.getUserSkillsetId() != -1).map(x -> x.getUserSkillsetId()).toList();

        if (userSkills.isEmpty()) {
            applicant.getQualificationInformation().setUserSkills(new ArrayList<>());
            qualificationRepository.saveAndFlush(applicant.getQualificationInformation());
            return "No user skills to save. List has been cleared";
        } else {
            // persist new one, remove old ones and update existing ones
            ArrayList<UserSkillset> toAdd = new ArrayList<>();
            for (UserSkillset skill : userSkills) {
                if (skill.getUserSkillsetId() == -1) { // new
                    // persist new
                    Long newUId = userSkillsetService.addUserSkillset(userId, skill.getSkillset().getSkillsetId(), skill.getSkillLevel());
                    UserSkillset newUserSkill = userSkillsetRepositoy.findById(newUId).get();
                    toAdd.add(newUserSkill);
//                    System.out.println("added one new work experience");
                } else if (existingUserSkillsIds.contains(skill.getUserSkillsetId())) {
                    // update
                    for (UserSkillset uss : existingUserskills) {
                        if (uss.getUserSkillsetId().equals(skill.getUserSkillsetId())) {
                            uss.setSkillLevel(skill.getSkillLevel());
                            userSkillsetRepositoy.saveAndFlush(uss);
                            break;
                        }
                    }
                }
            }

            applicant = userRepository.findById(userId).get();

            List<UserSkillset> toRemove = new ArrayList<>();
            for (UserSkillset uss : applicant.getQualificationInformation().getUserSkills()) {
                if (!sentUserSkillsIds.contains(uss.getUserSkillsetId())) {
                    toRemove.add(uss);
                }
            }

            existingUserskills.removeAll(toRemove);
            existingUserskills.addAll(toAdd);
            qualificationRepository.saveAndFlush(applicant.getQualificationInformation());
            return "User skills saved";
        }

    }


    public List<JobPosting> getUserBookmarks(Long userId) {
        System.out.println("QualificationService.getUserBookmarks");
        System.out.println("userId = " + userId);

        User a = userRepository.findById(userId).get();
        User applicant = checkQIExists(a);
        QualificationInformation qi = applicant.getQualificationInformation();

        for (JobPosting jp : qi.getBookmarks()) {
            jp.setJobRequest(null);
            jp.getPostedBy().nullify();
            for (Skillset ss : jp.getJobPostRequirements()) {
                ss.setJobRequests(new ArrayList<>());
                ss.setJobPostings(new ArrayList<>());
            }
        }
        return qi.getBookmarks();
    }

    public boolean addUserBookmark(Long userId, Long jobPostId) {
        System.out.println("QualificationService.addUserBookmark");
        System.out.println("userId = " + userId + ", jobPostId = " + jobPostId);

        User a = userRepository.findById(userId).get();
        User applicant = checkQIExists(a);
        QualificationInformation qi = applicant.getQualificationInformation();

        Optional<JobPosting> jobPostingOptional = jobPostingRepository.findById(jobPostId);
        if (jobPostingOptional.isEmpty()) {
            throw new IllegalStateException("Job Posting does not exist");
        }

        JobPosting jp = jobPostingOptional.get();

        if (!jp.getIsActive()) {
            throw new IllegalStateException("Job Posting is not active anymore");
        }

        if (jp.getStatus().equals(JobStatusEnum.CLOSED)) {
            throw new IllegalStateException("Job Posting is not open for application anymore");
        }

        qi.addBookmark(jp);
        qualificationRepository.save(qi);

        return true;
    }

    public boolean removeUserBookmark(Long userId, Long jobPostId) {
        System.out.println("QualificationService.removeUserBookmark");
        System.out.println("userId = " + userId + ", jobPostId = " + jobPostId);

        User a = userRepository.findById(userId).get();
        User applicant = checkQIExists(a);
        QualificationInformation qi = applicant.getQualificationInformation();

        Optional<JobPosting> jobPostingOptional = jobPostingRepository.findById(jobPostId);
        if (jobPostingOptional.isEmpty()) {
            throw new IllegalStateException("Job Posting does not exist");
        }

        JobPosting jp = jobPostingOptional.get();

        if (!qi.getBookmarks().contains(jp)) {
            throw new IllegalStateException("User does not have this bookmark in his list");
        }

        qi.removeBookmark(jp);
        qualificationRepository.save(qi);

        return true;
    }
}
