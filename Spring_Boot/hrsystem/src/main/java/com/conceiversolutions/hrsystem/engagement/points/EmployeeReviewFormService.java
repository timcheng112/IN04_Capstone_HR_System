package com.conceiversolutions.hrsystem.engagement.points;

import com.conceiversolutions.hrsystem.engagement.rewardtrack.RewardTrack;
import com.conceiversolutions.hrsystem.engagement.rewardtrack.RewardTrackRepository;
import com.conceiversolutions.hrsystem.organizationstructure.department.Department;
import com.conceiversolutions.hrsystem.organizationstructure.department.DepartmentRepository;
import com.conceiversolutions.hrsystem.organizationstructure.team.Team;
import com.conceiversolutions.hrsystem.organizationstructure.team.TeamRepository;
import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class EmployeeReviewFormService {
    private final EmployeeReviewFormRepository employeeReviewFormRepository;
    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final TeamRepository teamRepository;
    private final RewardTrackRepository rewardTrackRepository;

    public Long submitReviewForm(String employeeName, Integer rating, String justification, String departmentName, String teamName) {
        System.out.println("EmployeeReviewFormService.submitReviewForm");
        System.out.println("employeeName = " + employeeName + ", rating = " + rating + ", justification = " + justification + ", departmentName = " + departmentName + ", teamName = " + teamName);

        EmployeeReviewForm newForm = new EmployeeReviewForm(employeeName, rating, LocalDate.now(), justification, departmentName, teamName);
        EmployeeReviewForm savedForm = employeeReviewFormRepository.saveAndFlush(newForm);

        return savedForm.getReviewFormId();
    }

    public List<EmployeeReviewForm> getAllReviewForms() {
        System.out.println("EmployeeReviewFormService.getAllReviewForms");

        return employeeReviewFormRepository.findAll();
    }

    public EmployeeReviewForm getReviewForm(Long formId) {
        System.out.println("EmployeeReviewFormService.getReviewForm");
        System.out.println("formId = " + formId);
        Optional<EmployeeReviewForm> opt = employeeReviewFormRepository.findById(formId);

        if (opt.isEmpty()) {
            throw new IllegalStateException("Review Form not found");
        }
        return opt.get();
    }

    public String vetReviewForm(Long employeeId, Long reviewFormId, Long departmentId, Long teamId) {
        System.out.println("EmployeeReviewFormService.vetReviewForm");
        System.out.println("employeeId = " + employeeId + ", reviewFormId = " + reviewFormId + ", departmentId = " + departmentId + ", teamId = " + teamId);

        User employee = userRepository.findById(employeeId).get();
        if (employee.getIsBlackListed() || !employee.isEnabled() || employee.getIsDisabled()) {
            throw new IllegalStateException("Employee is currently not active in the company");
        }

        EmployeeReviewForm form = getReviewForm(reviewFormId);

        if (form.getVetted()) {
            throw new IllegalStateException("Review form has already been vetted before");
        }

        Department dept = departmentRepository.findById(departmentId).get();
        Team team = teamRepository.findById(teamId).get();


        // TODO : give points accordingly to the dept.
        List<RewardTrack> rt = rewardTrackRepository.findActiveByDepartmentName(dept.getDepartmentName());
        if (rt.isEmpty()) {
            throw new IllegalStateException("No Active reward tracks for this department");
        } else if (rt.size() > 1) {
            throw new IllegalStateException("More than 1 active reward tracks identified. Please ensure only one is active");
        }
        double points = rt.get(0).getPointsRatio() * form.getRating();

        employee.setRewardPoints(employee.getRewardPoints() + (int) points);
        User savedEmployee = userRepository.saveAndFlush(employee);
        System.out.println("Employee ID is " + savedEmployee);
        form.setVetted(true);
        form.setEmployee(savedEmployee);
        employeeReviewFormRepository.save(form);
        System.out.println("Form saved " + form.getEmployee().getFirstName());

        return "Employee Review Form has been vetted and awarded + " + points + " reward points";
    }

    public List<EmployeeReviewForm> getEmployeeReviewForms(Long employeeId) {
        System.out.println("EmployeeReviewFormService.getEmployeeReviewForms");
        System.out.println("employeeId = " + employeeId);

        return employeeReviewFormRepository.findByEmployeeId(employeeId);
    }

    public String voidReviewForm(Long reviewFormId) {
        System.out.println("EmployeeReviewFormService.voidReviewForm");
        System.out.println("reviewFormId = " + reviewFormId);
        employeeReviewFormRepository.deleteById(reviewFormId);
        return "Employee Review Form Id " + reviewFormId + "has been voided";
    }
}
