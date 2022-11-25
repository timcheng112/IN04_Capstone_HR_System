package com.conceiversolutions.hrsystem.performance.appraisal;

import com.conceiversolutions.hrsystem.jobchange.promotionrequest.PromotionRepository;
import com.conceiversolutions.hrsystem.jobchange.promotionrequest.PromotionRequest;
import com.conceiversolutions.hrsystem.jobchange.promotionrequest.PromotionService;
import com.conceiversolutions.hrsystem.organizationstructure.department.Department;
import com.conceiversolutions.hrsystem.organizationstructure.department.DepartmentRepository;
import com.conceiversolutions.hrsystem.organizationstructure.organization.Organization;
import com.conceiversolutions.hrsystem.organizationstructure.organization.OrganizationRepository;
import com.conceiversolutions.hrsystem.organizationstructure.team.Team;
import com.conceiversolutions.hrsystem.organizationstructure.team.TeamRepository;
import com.conceiversolutions.hrsystem.performance.appraisalPeriod.AppraisalPeriod;
import com.conceiversolutions.hrsystem.performance.appraisalPeriod.AppraisalPeriodRepository;
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
@AllArgsConstructor
public class AppraisalService {

    private final AppraisalRepository appraisalRepository;

    private final UserRepository userRepository;

    private final TeamRepository teamRepository;

    private final AppraisalPeriodRepository appraisalPeriodRepository;

    private final DepartmentRepository departmentRepository;

    private final OrganizationRepository organizationRepository;

    private final PromotionService promotionService;

    private final PromotionRepository promotionRepository;

    public User breakRelationships(User user) {
        User u = new User();

        u.setUserId(user.getUserId());
        u.setFirstName(user.getFirstName());
        u.setLastName(user.getLastName());
        u.setWorkEmail(user.getWorkEmail());
        u.setUserRole(user.getUserRole());
        u.setProfilePic(user.getProfilePic());
        u.setIsBlackListed(user.getIsBlackListed());
        u.setCitizenship(user.getCitizenship());
        u.setDateJoined(user.getDateJoined());
        u.setDob(user.getDob());
        u.setEmail(user.getEmail());
        u.setGender(user.getGender());
        u.setIsEnabled(user.getIsEnabled());
        u.setIsHrEmployee(user.getIsHrEmployee());
        u.setIsPartTimer(user.getIsPartTimer());
        u.setPassword(user.getPassword());
        u.setPhone(user.getPhone());
        u.setRace(user.getRace());

        return u;
    }

    public Long addAppraisal(String appraisalYear, String status, String strengths, String weaknesses, Integer rating,
            Boolean promotion,
            String promotionJustification, Boolean submitted, Long employeeId, Long managerId) throws Exception {

        Optional<User> employeeOptional = userRepository.findById(employeeId);
        Optional<User> managerOptional = userRepository.findById(managerId);

        if (employeeOptional.isPresent() && managerOptional.isPresent()) {

            User employee = employeeOptional.get();

            User user = breakRelationships(employee);

            User manager = managerOptional.get();

            User ro = breakRelationships(manager);

            Appraisal appraisal = new Appraisal(appraisalYear, status, strengths, weaknesses, rating, promotion,
                    promotionJustification, submitted, user, ro);

            Appraisal newAppraisal = appraisalRepository.save(appraisal);
            return newAppraisal.getAppraisalId();

        } else {
            throw new IllegalStateException("Users does not exist");
        }
    }

    public List<Appraisal> getAllAppraisalsByYear(String year) {
        List<Appraisal> appraisals = appraisalRepository.findAllAppraisalsByYear(year);
        for (Appraisal a : appraisals) {
            User manager = breakRelationships(a.getManagerAppraising());
            User employee = breakRelationships(a.getEmployee());

            a.setManagerAppraising(manager);
            a.setEmployee(employee);
        }
        return appraisals;
    }

    public String deleteAppraisalsByYear(String year) throws Exception {
        System.out.println("AppraisalService.deleteAppraisalsByYear");
        List<Appraisal> appraisals = appraisalRepository.findAllAppraisalsByYear(year);

        for (Appraisal a : appraisals) {
            System.out.println("delete appraisal " + a.getAppraisalId());
            hardDeleteAppraisal(a.getAppraisalId());
        }
        return "";
    }

    // returns appraisal that is about the employee
    public List<Appraisal> getEmployeeAppraisals(String year, Long userId) {
        System.out.println("AppraisalService.getEmployeeAppraisals");
        List<Appraisal> appraisals = appraisalRepository.findAppraisalsByEmployee(year, userId);

        for (Appraisal a : appraisals) {
            User employee = breakRelationships(a.getEmployee());
            User manager = breakRelationships(a.getManagerAppraising());

            a.setEmployee(employee);
            a.setManagerAppraising(manager);
        }

        return appraisals;
    }

    // returns appraisals that manager has to do / completed for the period
    public List<Appraisal> getManagerAppraisals(String year, Long userId) throws Exception {

        System.out.println("AppraisalService.getManagerAppraisals");

        List<Appraisal> managerAppraisals = new ArrayList<>();

        List<User> team = teamRepository.findTeamByTeamHead(userId);

        Optional<AppraisalPeriod> optionalAppraisalPeriod = appraisalPeriodRepository.findAppraisalPeriodByYear(year);

        if (optionalAppraisalPeriod.isPresent()) {

            AppraisalPeriod appraisalPeriod = optionalAppraisalPeriod.get();

            for (User u : team) {
                // filter manager out
                if (u.getUserId() != userId) {
                    Optional<Appraisal> optionalAppraisal = appraisalRepository.findAppraisalByEmployeeManager(
                            u.getUserId(),
                            userId, year);
                    if (optionalAppraisal.isPresent()) {
                        Appraisal appraisal = optionalAppraisal.get();

                        System.out.println(
                                "Past appraisal period? " + LocalDate.now().isAfter(appraisalPeriod.getEndDate()));
                        System.out.println("Not completed? " + !appraisal.getStatus().equals("Completed"));
                        if (LocalDate.now().isAfter(appraisalPeriod.getEndDate())
                                && !appraisal.getStatus().equals("Completed")) {
                            appraisal.setStatus("Overdue");
                        }

                        User e = breakRelationships(appraisal.getEmployee());
                        User m = breakRelationships(appraisal.getManagerAppraising());

                        appraisal.setEmployee(e);
                        appraisal.setManagerAppraising(m);

                        managerAppraisals.add(appraisal);
                    } else {
                        // appraisals not created yet, creates a blank appraisal for each member
                        // of their team
                        Appraisal appraisal = new Appraisal(year + "", "Incomplete", "", "", null,
                                false, "", null, null, null);
                        appraisal.setAppraisalYear(year + "");

                        if (LocalDate.now().isAfter(appraisalPeriod.getEndDate())
                                && !appraisal.getStatus().equals("Completed")) {
                            appraisal.setStatus("Overdue");
                        } else {
                            appraisal.setStatus("Incomplete");
                        }

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

                            managerAppraisals.add(appraisal);
                        } else {
                            throw new IllegalStateException("Manager not found");
                        }
                    }
                }
            }
        } else {
            throw new IllegalStateException("Appraisal period not found");
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
                if (promotion) {
                    appraisal.setPromotion(promotion);
                    appraisal.setPromotionJustification(promotionJustification);

                    System.out.println("employee id " + appraisal.getEmployee().getUserId());
                    System.out.println("manager id " + appraisal.getManagerAppraising().getUserId());

                    promotionService.createPromotionRequest(LocalDate.now(), appraisalId, appraisal.getEmployee().getUserId(), appraisal.getManagerAppraising().getUserId(), 
                    promotionJustification, "");
                } else {
                    appraisal.setPromotionJustification("");
                }
                appraisal.setSubmitted(true);
                appraisal.setStatus("Completed");
                return "Appraisal for " + appraisal.getEmployee().getFirstName() + " "
                        + appraisal.getEmployee().getLastName() + " has been submitted";
            } else {
                throw new IllegalStateException("Appraisal not found");
            }
        } catch (Exception e) {
            throw new IllegalStateException("There was a problem saving the appraisal");
        }
    }

    public List<Appraisal> getDepartmentAppraisals(String year, Long userId) throws Exception {
        System.out.println("AppraisalService.getDepartmentAppraisals");

        List<Appraisal> managerAppraisals = new ArrayList<>();

        List<Team> teams = departmentRepository.findTeamsByDepartmentHead(userId);

        Optional<AppraisalPeriod> optionalAppraisalPeriod = appraisalPeriodRepository.findAppraisalPeriodByYear(year);

        if (optionalAppraisalPeriod.isPresent()) {

            AppraisalPeriod appraisalPeriod = optionalAppraisalPeriod.get();

            for (Team t : teams) {
                System.out.println("Team head: " + t.getTeamHead().getFirstName());

                Optional<Appraisal> optionalAppraisal = appraisalRepository
                        .findAppraisalByEmployeeManager(t.getTeamHead().getUserId(), userId, year);

                if (optionalAppraisal.isPresent()) {
                    Appraisal appraisal = optionalAppraisal.get();

                    if (LocalDate.now().isAfter(appraisalPeriod.getEndDate())
                            && !appraisal.getStatus().equals("Completed")) {
                        appraisal.setStatus("Overdue");
                    }

                    User e = breakRelationships(appraisal.getEmployee());
                    User m = breakRelationships(appraisal.getManagerAppraising());

                    appraisal.setEmployee(e);
                    appraisal.setManagerAppraising(m);

                    managerAppraisals.add(appraisal);

                } else {
                    Appraisal appraisal = new Appraisal(year + "", "Incomplete", "", "", null,
                            false, "", null, null, null);

                    appraisal.setAppraisalYear(year + "");

                    if (LocalDate.now().isAfter(appraisalPeriod.getEndDate())
                            && !appraisal.getStatus().equals("Completed")) {
                        appraisal.setStatus("Overdue");
                    } else {
                        appraisal.setStatus("Incomplete");
                    }

                    User employee = breakRelationships(t.getTeamHead());
                    appraisal.setEmployee(employee);

                    Optional<User> optionalManager = userRepository.findById(userId);

                    if (optionalManager.isPresent()) {
                        User manager = breakRelationships(optionalManager.get());

                        appraisal.setManagerAppraising(manager);

                        appraisalRepository.save(appraisal);

                        // managerAppraisals.add(appraisal);
                    } else {
                        throw new IllegalStateException("Manager not found");
                    }
                }
            }

        } else {
            throw new IllegalStateException("Appraisal period not found");
        }

        return managerAppraisals;
    }

    public List<Appraisal> getOrganizationAppraisals(String year, Long userId) {
        System.out.println("AppraisalService.getOrganizationAppraisals");

        List<Appraisal> managerAppraisals = new ArrayList<>();

        List<Department> departments = organizationRepository.findDepartmentsByOrganizationHead(userId);

        System.out.println("getOrganizationAppraisals " + departments);
        System.out.println();
        Optional<AppraisalPeriod> optionalAppraisalPeriod = appraisalPeriodRepository
                .findAppraisalPeriodByYear(year);

        if (optionalAppraisalPeriod.isPresent()) {

            AppraisalPeriod appraisalPeriod = optionalAppraisalPeriod.get();

            for (Department d : departments) {
                Optional<Appraisal> optionalAppraisal = appraisalRepository
                        .findAppraisalByEmployeeManager(d.getDepartmentHead().getUserId(), userId, year);

                if (optionalAppraisal.isPresent()) {

                    Appraisal appraisal = optionalAppraisal.get();

                    if (LocalDate.now().isAfter(appraisalPeriod.getEndDate())
                            && !appraisal.getStatus().equals("Completed")) {
                        appraisal.setStatus("Overdue");
                    }

                    User e = breakRelationships(appraisal.getEmployee());
                    User m = breakRelationships(appraisal.getManagerAppraising());

                    appraisal.setEmployee(e);
                    appraisal.setManagerAppraising(m);

                    managerAppraisals.add(appraisal);

                } else {

                    Appraisal appraisal = new Appraisal(year + "", "Incomplete", "", "", null,
                            false, " ", null, null, null);

                    appraisal.setAppraisalYear(year + "");

                    if (LocalDate.now().isAfter(appraisalPeriod.getEndDate())
                            && !appraisal.getStatus().equals("Completed")) {
                        appraisal.setStatus("Overdue");
                    } else {
                        appraisal.setStatus("Incomplete");
                    }

                    User employee = breakRelationships(d.getDepartmentHead());
                    appraisal.setEmployee(employee);

                    Optional<User> optionalManager = userRepository.findById(userId);

                    if (optionalManager.isPresent()) {
                        User manager = breakRelationships(optionalManager.get());

                        appraisal.setManagerAppraising(manager);

                        appraisalRepository.save(appraisal);

                    }
                }
            }

        } else {
            throw new IllegalStateException("Appraisal period not found");
        }

        return managerAppraisals;

    }

    @Transactional
    public String deleteAppraisal(Long appraisalId) throws Exception {
        Optional<Appraisal> optionalAppraisal = appraisalRepository.findById(appraisalId);

        if (optionalAppraisal.isPresent()) {
            Appraisal appraisal = optionalAppraisal.get();
            appraisal.setStrengths("");
            appraisal.setWeaknesses("");
            appraisal.setRating(null);
            appraisal.setPromotion(false);
            appraisal.setPromotionJustification("");
            appraisal.setSubmitted(false);
            appraisal.setStatus("Incomplete");

            Optional<PromotionRequest> optionalPromotionRequest = promotionRepository.findPromotionRequestByAppraisal(appraisalId);

            if (optionalPromotionRequest.isPresent()) {
                PromotionRequest pr = optionalPromotionRequest.get();
                promotionRepository.deleteById(pr.getPromotionId());
            }

            return "Appraisal for " + appraisal.getEmployee().getFirstName() + " "
                    + appraisal.getEmployee().getLastName() + " has been deleted";
        } else {
            throw new IllegalStateException("Appraisal not found");
        }

    }

    public String hardDeleteAppraisal(Long appraisalId) throws Exception {
        Optional<Appraisal> optionalAppraisal = appraisalRepository.findById(appraisalId);

        if (optionalAppraisal.isPresent()) {
            appraisalRepository.deleteById(appraisalId);
            return "Appraisal with id " + appraisalId + " has been deleted";
        } else {
            throw new IllegalStateException("Appraisal not found");
        }
    }

    public Integer eligibleForPromotion(Long userId) {

        System.out.println("AppraisalService.eligibleForPromotion");

        List<Appraisal> appraisals = appraisalRepository.findEligibleForPromotion(userId);

        System.out.println("Recommended for promotion " + appraisals.size());

        // Integer consecutiveCount = 0;
        // Integer year = 0;

        // for (Appraisal a : appraisals) {
        //     // System.out.println("Year " + a.getAppraisalYear());
        //     if (year == 0) {
        //         year = Integer.parseInt(a.getAppraisalYear());
        //         consecutiveCount++;
        //     } else {

        //         if (Integer.parseInt(a.getAppraisalYear()) + 1 == year) {
        //             consecutiveCount++;
        //             year = Integer.parseInt(a.getAppraisalYear());
        //             // System.out.println("Next year " + year);
        //         } else {
        //             break;
        //         }
        //     }
        // }
        return appraisals.size();
    }

    public List<Appraisal> getAllEmployeeAppraisals(Long userId) {
        List<Appraisal> appraisals = appraisalRepository.findAllEmployeeAppraisals(userId);
        for (Appraisal a : appraisals) {
            a.getEmployee().nullify();
            a.getManagerAppraising().nullify();
        }
        return appraisals;
    }

}
