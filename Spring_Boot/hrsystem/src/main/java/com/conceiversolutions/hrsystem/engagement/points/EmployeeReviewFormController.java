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
                               @RequestParam("departmentName") String departmentName,
                               @RequestParam("teamName") String teamName) {
        return employeeReviewFormService.submitReviewForm(employeeName, rating, justification, departmentName, teamName);
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
                                 @RequestParam("departmentId") Long departmentId,
                                 @RequestParam("teamId") Long teamId) {
        return employeeReviewFormService.vetReviewForm(employeeId, reviewFormId, departmentId, teamId);
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
}
