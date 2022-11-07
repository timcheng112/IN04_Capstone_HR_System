package com.conceiversolutions.hrsystem.performance.appraisal;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.conceiversolutions.hrsystem.user.user.User;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/appraisal")
public class AppraisalController {

    private final AppraisalService appraisalService;

    public AppraisalController(AppraisalService appraisalService) {
        this.appraisalService = appraisalService;
    }

    @PostMapping
    public Long addAppraisal(@RequestParam("appraisalYear") String appraisalYear, @RequestParam("status") String status,
            @RequestParam("strengths") String strengths, @RequestParam("weaknesses") String weaknesses,
            @RequestParam("rating") Integer rating, @RequestParam("promotion") Boolean promotion,
            @RequestParam("promotionJustification") String promotionJustification,
            @RequestParam("submitted") Boolean submitted, @RequestParam("employeeId") Long employeeId,
            @RequestParam("managerId") Long managerId) throws Exception {

        return appraisalService.addAppraisal(appraisalYear, status, strengths, weaknesses, rating, promotion,
                promotionJustification, submitted, employeeId, managerId);
    }

    @GetMapping(path = "year/{year}")
    public List<Appraisal> getAllAppraisalsByYear(@PathVariable("year") String year) throws Exception {
        return appraisalService.getAllAppraisalsByYear(year);
    }

    @GetMapping(path = "{year}/manager/{userId}")
    public List<Appraisal> getManagerAppraisals(@PathVariable("year") String year,
            @PathVariable("userId") Long userId) throws Exception {
        return appraisalService.getManagerAppraisals(year, userId);
    }

    @GetMapping(path = "{year}/department/{userId}")
    public List<Appraisal> getDepartmentAppraisals(@PathVariable("year") String year,
            @PathVariable("userId") Long userId) throws Exception {
        return appraisalService.getDepartmentAppraisals(year, userId);
    }

    @GetMapping(path = "{year}/organization/{userId}")
    public List<Appraisal> getOrganizationAppraisals(@PathVariable("year") String year,
            @PathVariable("userId") Long userId) throws Exception {
        return appraisalService.getOrganizationAppraisals(year, userId);
    }

    @GetMapping(path = "{year}/employee/{userId}")
    public List<Appraisal> getEmployeeAppraisals(@PathVariable("year") String year,
            @PathVariable("userId") Long userId) {
        return appraisalService.getEmployeeAppraisals(year, userId);
    }

    @GetMapping(path = "/{year}/team/{teamId}")
    public List<User> getTeamAppraisals(@PathVariable("year") String year, @PathVariable("teamId") Long teamId) {
        return appraisalService.getTeamAppraisals(year, teamId);
    }

    @GetMapping(path = "{appraisalId}")
    public Appraisal getAppraisal(@PathVariable("appraisalId") Long appraisalId) throws Exception {
        return appraisalService.getAppraisal(appraisalId);
    }

    @PutMapping(path = "{appraisalId}")
    public String saveAppraisal(@PathVariable("appraisalId") Long appraisalId,
            @RequestParam("strengths") String strengths, @RequestParam("weaknesses") String weaknesses,
            @RequestParam("rating") Integer rating, @RequestParam("promotion") Boolean promotion,
            @RequestParam("promotionJustification") String promotionJustification) throws Exception {
        return appraisalService.saveAppraisal(appraisalId, strengths, weaknesses, rating, promotion,
                promotionJustification);
    }

    @PostMapping(path = "{appraisalId}")
    public String submitAppraisal(@PathVariable("appraisalId") Long appraisalId,
            @RequestParam("strengths") String strengths, @RequestParam("weaknesses") String weaknesses,
            @RequestParam("rating") Integer rating, @RequestParam("promotion") Boolean promotion,
            @RequestParam("promotionJustification") String promotionJustification) throws Exception {

        return appraisalService.submitAppraisal(appraisalId, strengths, weaknesses, rating, promotion,
                promotionJustification);
    }

    @DeleteMapping(path = "{appraisalId}")
    public String deleteAppraisal(@PathVariable("appraisalId") Long appraisalId) throws Exception {
        return appraisalService.deleteAppraisal(appraisalId);
    }

}