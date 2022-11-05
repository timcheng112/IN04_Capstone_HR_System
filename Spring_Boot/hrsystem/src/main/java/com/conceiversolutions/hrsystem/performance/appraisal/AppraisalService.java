package com.conceiversolutions.hrsystem.performance.appraisal;

import com.conceiversolutions.hrsystem.organizationstructure.team.TeamRepository;
import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;
import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

@Service
public class AppraisalService {

    @Autowired
    private final AppraisalRepository appraisalRepository;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final TeamRepository teamRepository;

    public AppraisalService(AppraisalRepository appraisalRepository, UserRepository userRepository,
            TeamRepository teamRepository) {
        this.appraisalRepository = appraisalRepository;
        this.userRepository = userRepository;
        this.teamRepository = teamRepository;
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

        return u;
    }

    public Long addAppraisal(String appraisalYear, String status, String strengths, String weaknesses, Integer rating,
            Boolean promotion,
            String promotionJustification, Boolean submitted, Long employeeId, Long managerId) throws Exception {

        Optional<User> employeeOptional = userRepository.findById(employeeId);
        Optional<User> managerOptional = userRepository.findById(managerId);

        if (employeeOptional.isPresent() && managerOptional.isPresent()) {

            User employee = employeeOptional.get();

            User user = new User();

            user.setUserId(employee.getUserId());
            user.setFirstName(employee.getFirstName());
            user.setLastName(employee.getLastName());
            user.setWorkEmail(employee.getWorkEmail());
            user.setUserRole(employee.getUserRole());
            user.setIsBlackListed(employee.getBlackListed());

            User manager = managerOptional.get();

            User ro = new User();

            ro.setUserId(manager.getUserId());
            ro.setFirstName(manager.getFirstName());
            ro.setLastName(manager.getLastName());
            ro.setWorkEmail(manager.getWorkEmail());
            ro.setUserRole(manager.getUserRole());
            ro.setIsBlackListed(manager.getBlackListed());

            Appraisal appraisal = new Appraisal(appraisalYear, status, strengths, weaknesses, rating, promotion,
                    promotionJustification, submitted, user, ro);

            Appraisal newAppraisal = appraisalRepository.save(appraisal);
            return newAppraisal.getAppraisalId();

        } else {
            throw new IllegalStateException("Users does not exist");
        }
    }

    public List<User> getTeamAppraisals(String year, Long teamId) {

        return null;
    }

    public List<Appraisal> getAllAppraisalsByYear(String year) {
        List<Appraisal> appraisals = appraisalRepository.findAllAppraisalsByYear(year);
        for (Appraisal a : appraisals) {
            a.setManagerAppraising(null);
            a.setEmployee(null);
        }
        return appraisals;
    }

    // returns appraisals that are about the employee
    public List<Appraisal> getEmployeeAppraisals(String year, Long userId) {
        List<Appraisal> appraisals = appraisalRepository.findAllAppraisalsByYear(year);

        List<Appraisal> userAppraisals = new ArrayList<>();

        for (Appraisal a : appraisals) {

        }

        return null;
    }

    // returns appraisals that manager has to do / completed for the period
    public List<Appraisal> getManagerAppraisals(String year, Long userId) throws Exception {

        System.out.println("AppraisalService.getManagerAppraisals");

        List<Appraisal> managerAppraisals = new ArrayList<>();

        List<User> team = teamRepository.findTeamByTeamHead(userId);

        for (User u : team) {
            // filter manager out
            if (u.getUserId() != userId) {
                Optional<Appraisal> optionalAppraisal = appraisalRepository.findAppraisalByEmployeeManager(
                        u.getUserId(),
                        userId);
                if (optionalAppraisal.isPresent()) {
                    Appraisal appraisal = optionalAppraisal.get();
                    // System.out.println("Found manager with id " +
                    // appraisal.getManagerAppraising().getUserId());
                    User e = breakRelationships(appraisal.getEmployee());
                    User m = breakRelationships(appraisal.getManagerAppraising());

                    appraisal.setEmployee(e);
                    appraisal.setManagerAppraising(m);

                    managerAppraisals.add(appraisal);
                } else {
                    // appraisals not created yet, creates a blank appraisal for each member
                    // of their team
                    Appraisal appraisal = new Appraisal(LocalDate.now().getYear() + "", "Incomplete", "", "", null,
                            null, "", null, null, null);
                    appraisal.setAppraisalYear(LocalDate.now().getYear() + "");
                    appraisal.setStatus("Incomplete");
                    appraisal.setEmployee(u);

                    Optional<User> optionalManager = userRepository.findById(userId);
                    if (optionalManager.isPresent()) {
                        User manager = optionalManager.get();

                        User m = new User();

                        m.setUserId(manager.getUserId());
                        m.setFirstName(manager.getFirstName());
                        m.setLastName(manager.getLastName());
                        m.setWorkEmail(manager.getWorkEmail());
                        m.setUserRole(manager.getUserRole());
                        m.setIsBlackListed(manager.getIsBlackListed());

                        appraisal.setManagerAppraising(m);

                        appraisalRepository.save(appraisal);
                    } else {
                        throw new IllegalStateException("Manager not found");
                    }
                }
            }
        }
        return managerAppraisals;
    }

    public Appraisal getAppraisal(Long appraisalId) throws Exception {
        Optional<Appraisal> optionalAppraisal = appraisalRepository.findById(appraisalId);
        if (optionalAppraisal.isPresent()) {
            Appraisal appraisal = optionalAppraisal.get();
            User employee = breakRelationships(appraisal.getEmployee());
            User manager = breakRelationships(appraisal.getManagerAppraising());
            appraisal.setEmployee(employee);
            appraisal.setManagerAppraising(manager);
            return appraisal;
        } else {
            throw new IllegalStateException("Appraisal not found");
        }
    }

    @Transactional
    public String saveAppraisal(Long appraisalId, String strengths, String weaknesses, Integer rating,
            Boolean promotion, String promotionJustification) throws Exception {

        System.out.println("AppraisalService.saveAppraisal");
        Optional<Appraisal> optionalAppraisal = appraisalRepository.findById(appraisalId);

        if (optionalAppraisal.isPresent()) {
            Appraisal appraisal = optionalAppraisal.get();
            appraisal.setStrengths(strengths);
            appraisal.setWeaknesses(weaknesses);
            appraisal.setRating(rating);
            appraisal.setPromotion(promotion);
            if (!promotion) {
                appraisal.setPromotionJustification("");
            } else {
                appraisal.setPromotionJustification(promotionJustification);
            }
            appraisal.setStatus("In Progress");
            return "Appraisal for " + appraisal.getEmployee().getFirstName() + " "
                    + appraisal.getEmployee().getLastName() + " has been saved successfully";

        } else {
            throw new IllegalStateException("Appraisal not found");
        }
    }

    @Transactional
    public String submitAppraisal(Long appraisalId, String strengths,
            String weaknesses, Integer rating, Boolean promotion, String promotionJustification) {
        System.out.println("AppraisalService.submitAppraisal");
        try {
            Optional<Appraisal> optionalAppraisal = appraisalRepository.findById(appraisalId);
            if (optionalAppraisal.isPresent()) {
                Appraisal appraisal = optionalAppraisal.get();
                appraisal.setStrengths(strengths);
                appraisal.setWeaknesses(weaknesses);
                appraisal.setRating(rating);
                appraisal.setPromotion(promotion);
                appraisal.setPromotionJustification(promotionJustification);
                appraisal.setSubmitted(true);
                appraisal.setStatus("Complete");
                return "Appraisal for " + appraisal.getEmployee().getFirstName() + " "
                        + appraisal.getEmployee().getLastName() + " has been submitted";
            } else {
                throw new IllegalStateException("Appraisal not found");
            }
        } catch (Exception e) {
            throw new IllegalStateException("There was a problem saving the appraisal");
        }
    }

}
