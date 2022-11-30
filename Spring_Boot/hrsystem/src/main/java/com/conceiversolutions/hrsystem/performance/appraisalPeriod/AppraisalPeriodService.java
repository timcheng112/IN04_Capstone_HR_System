package com.conceiversolutions.hrsystem.performance.appraisalPeriod;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.conceiversolutions.hrsystem.organizationstructure.department.DepartmentService;
import com.conceiversolutions.hrsystem.organizationstructure.organization.OrganizationService;
import com.conceiversolutions.hrsystem.organizationstructure.team.TeamService;
import com.conceiversolutions.hrsystem.performance.appraisal.AppraisalService;
import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;

@Service
public class AppraisalPeriodService {

    @Autowired
    private final AppraisalPeriodRepository appraisalPeriodRepository;

    @Autowired
    private final AppraisalService appraisalService;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final OrganizationService organizationService;

    @Autowired
    private final DepartmentService departmentService;

    @Autowired
    private final TeamService teamService;

    public AppraisalPeriodService(AppraisalPeriodRepository appraisalPeriodRepository,
            AppraisalService appraisalService, UserRepository userRepository, OrganizationService organizationService,
            DepartmentService departmentService, TeamService teamService) {
        this.appraisalPeriodRepository = appraisalPeriodRepository;
        this.appraisalService = appraisalService;
        this.userRepository = userRepository;
        this.organizationService = organizationService;
        this.departmentService = departmentService;
        this.teamService = teamService;
    }

    public Long addAppraisalPeriod(AppraisalPeriod appraisalPeriod) throws Exception {
        Optional<AppraisalPeriod> existingPeriod = appraisalPeriodRepository
                .findAppraisalPeriodByYear(appraisalPeriod.getYear());
        if (existingPeriod.isPresent()) {
            throw new IllegalStateException("Appraisal period for year " + appraisalPeriod.getYear());
        } else {
            AppraisalPeriod ap = appraisalPeriodRepository.save(appraisalPeriod);

            List<User> organizationHeads = organizationService.getOrganizationHeads();

            for (User u : organizationHeads) {
                appraisalService.getOrganizationAppraisals(appraisalPeriod.getYear(), u.getUserId());
            }

            List<User> departmentHeads = departmentService.getDepartmentHeads();

            for (User u : departmentHeads) {
                appraisalService.getDepartmentAppraisals(appraisalPeriod.getYear(), u.getUserId());
            }

            List<User> managers = teamService.getManagers();

            for (User u : managers) {
                appraisalService.getManagerAppraisals(appraisalPeriod.getYear(), u.getUserId());
            }

            return ap.getAppraisalPeriodId();
        }
    }

    public AppraisalPeriod getAppraisalPeriodByYear(String year) {
        Optional<AppraisalPeriod> existingAppraisal = appraisalPeriodRepository.findAppraisalPeriodByYear(year);
        if (existingAppraisal.isPresent()) {
            AppraisalPeriod appraisalPeriod = existingAppraisal.get();
            return appraisalPeriod;
        } else {
            throw new IllegalStateException("Appraisal period for year " + year + " does not exist");
        }
    }

    public List<AppraisalPeriod> getAppraisalPeriods() {
        return appraisalPeriodRepository.findAll();
    }

    public String deleteAppraisalPeriod(String year) throws Exception {
        AppraisalPeriod ap = getAppraisalPeriodByYear(year);
        appraisalPeriodRepository.deleteById(ap.getAppraisalPeriodId());

        appraisalService.deleteAppraisalsByYear(year);

        return "Appraisal period for " + ap.getYear() + " has been deleted";
    }

    @Transactional
    public String updateAppraisalPeriod(String startDate, String endDate) throws Exception {

        Optional<AppraisalPeriod> existingAp = appraisalPeriodRepository
                .findAppraisalPeriodByYear(endDate.substring(0, 4));

        if (existingAp.isPresent()) {
            AppraisalPeriod ap = existingAp.get();
            ap.setStartDate(LocalDate.parse(startDate));
            ap.setEndDate(LocalDate.parse(endDate));
            return "Appraisal period for " + ap.getYear() + " has been changed";
        } else {
            throw new IllegalStateException("Appraisal period does not exist");
        }
    }

}
