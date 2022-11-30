package com.conceiversolutions.hrsystem.engagement.points;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/rewards")
@AllArgsConstructor
public class EmployeeReviewFormController {
    private final EmployeeReviewFormService employeeReviewFormService;

    @PostMapping("submitReviewForm")
    public Long submitReviewForm(@RequestParam("employeeName") String employeeName,
                               @RequestParam("rating") Integer rating,
                               @RequestParam("justification") String justification,
                               @RequestParam("departmentId") Long departmentId,
                               @RequestParam("teamName") String teamName) {
        return employeeReviewFormService.submitReviewForm(employeeName, rating, justification, departmentId, teamName);
    }

    @GetMapping("getAllReviewForms")
    public List<EmployeeReviewForm> getAllReviewForms() {
        List<EmployeeReviewForm> forms = employeeReviewFormService.getAllReviewForms();

        for (EmployeeReviewForm form : forms) {
            if (form.getEmployee() != null) {
                form.getEmployee().nullify();
            }
        }

        return forms;
    }

    @GetMapping("getAllUnvettedReviewForms")
    public List<EmployeeReviewForm> getAllUnvettedReviewForms() {
        List<EmployeeReviewForm> forms = employeeReviewFormService.getAllReviewForms();
        List<EmployeeReviewForm> unvettedForms = new ArrayList<>();
        for (EmployeeReviewForm form : forms) {
            if (form.getEmployee() != null) {
                form.getEmployee().nullify();
            }
            if (!form.getVetted()) {
                unvettedForms.add(form);
            }
        }
        return unvettedForms;
    }

    @PostMapping("vetReviewForm")
    public String vetReviewForm(@RequestParam("employeeId") Long employeeId,
                                 @RequestParam("reviewFormId") Long reviewFormId,
                                 @RequestParam("teamId") Long teamId) {
        return employeeReviewFormService.vetReviewForm(employeeId, reviewFormId, teamId);
    }

    @PostMapping("voidReviewForm")
    public String voidReviewForm(@RequestParam("reviewFormId") Long reviewFormId) {
        return employeeReviewFormService.voidReviewForm(reviewFormId);
    }

    @GetMapping("getEmployeeReviewForms")
    public List<EmployeeReviewForm> getEmployeeReviewForms(@RequestParam("employeeId") Long employeeId) {
        List<EmployeeReviewForm> forms = employeeReviewFormService.getEmployeeReviewForms(employeeId);

        for (EmployeeReviewForm form : forms) {
            form.getEmployee().nullify();
        }

        return forms;
    }

    @GetMapping("getReviewFormByDepartmentHead")
    public List<EmployeeReviewForm> getReviewFormByDepartmentHead(@RequestParam("userId") Long userId) {
        List<EmployeeReviewForm> forms = employeeReviewFormService.getReviewFormByDepartmentHead(userId);
        for (EmployeeReviewForm form : forms) {
            if (form.getEmployee() != null) {
                form.getEmployee().nullify();
            }
            form.setDepartment(null);
        }
        return forms;
    }
}
