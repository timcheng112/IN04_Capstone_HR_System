package com.conceiversolutions.hrsystem.performance.reviewPeriod;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.conceiversolutions.hrsystem.organizationstructure.department.Department;
import com.conceiversolutions.hrsystem.organizationstructure.department.DepartmentRepository;
import com.conceiversolutions.hrsystem.organizationstructure.department.DepartmentService;
import com.conceiversolutions.hrsystem.organizationstructure.organization.OrganizationRepository;
import com.conceiversolutions.hrsystem.organizationstructure.organization.OrganizationService;
import com.conceiversolutions.hrsystem.organizationstructure.team.Team;
import com.conceiversolutions.hrsystem.organizationstructure.team.TeamRepository;
import com.conceiversolutions.hrsystem.organizationstructure.team.TeamService;
import com.conceiversolutions.hrsystem.performance.appraisal.AppraisalService;
import com.conceiversolutions.hrsystem.performance.review.Review;
import com.conceiversolutions.hrsystem.performance.review.ReviewService;
import com.conceiversolutions.hrsystem.user.user.User;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ReviewPeriodService {

    private final AppraisalService appraisalService;
    private final ReviewPeriodRepository reviewPeriodRepository;
    private final TeamService teamService;
    private final TeamRepository teamRepository;
    private final ReviewService reviewService;
    private final DepartmentService departmentService;
    private final DepartmentRepository departmentRepository;
    private final OrganizationService organizationService;
    private final OrganizationRepository organizationRepository;

    public String addReviewPeriod(ReviewPeriod reviewPeriod) throws Exception {
        ReviewPeriod newPeriod = reviewPeriodRepository.save(reviewPeriod);

        List<User> managers = teamService.getManagers();

        for (User manager : managers) {
            List<User> team = teamRepository.findTeamMembersByTeamHead(manager.getUserId());
            for (User employee : team) {
                if (employee.getUserId() != manager.getUserId()) {
                    reviewService.createManagerReviews(newPeriod.getYear(), employee.getUserId(), manager.getUserId());
                }
            }
        }

        List<User> departmentHeads = departmentService.getDepartmentHeads();

        for (User departmentHead : departmentHeads) {
            List<Team> department = departmentRepository.findTeamsByDepartmentHead(departmentHead.getUserId());
            for (Team team : department) {
                if (team.getTeamHead() != null) {
                    reviewService.createManagerReviews(newPeriod.getYear(), team.getTeamHead().getUserId(),
                        departmentHead.getUserId());
                }   
            }
        }

        User organizationHead = organizationService.getOrganizationHead();

        List<Department> departments = organizationRepository.findDepartmentsByOrganizationHead(organizationHead.getUserId());
        for (Department department : departments) {
            reviewService.createManagerReviews(newPeriod.getYear(), department.getDepartmentHead().getUserId(), organizationHead.getUserId());
        }

        return "Review period for " + reviewPeriod.getYear() + " has been created";
    }

    public ReviewPeriod getReviewPeriodByYear(String year) throws Exception {
        Optional<ReviewPeriod> existingPeriod = reviewPeriodRepository.findReviewPeriodByYear(year);
        if (existingPeriod.isPresent()) {
            ReviewPeriod reviewPeriod = existingPeriod.get();
            return reviewPeriod;
        } else {
            throw new IllegalStateException("Unable to find review period");
        }
    }

    public List<ReviewPeriod> getReviewPeriods() throws Exception {
        return reviewPeriodRepository.findAll();
    }

    @Transactional
    public String updateReviewPeriod(String startDate, String endDate) {
        Optional<ReviewPeriod> existingPeriod = reviewPeriodRepository
                .findReviewPeriodByYear(endDate.substring(0, 4));

        if (existingPeriod.isPresent()) {
            ReviewPeriod reviewPeriod = existingPeriod.get();
            reviewPeriod.setStartDate(LocalDate.parse(startDate));
            reviewPeriod.setEndDate(LocalDate.parse(endDate));
            return "Review period for " + reviewPeriod.getYear() + " has been changed";
        } else {
            throw new IllegalStateException("Review period does not exist");
        }
    }

}
