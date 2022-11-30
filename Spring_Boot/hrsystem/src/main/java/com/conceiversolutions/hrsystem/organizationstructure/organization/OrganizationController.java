package com.conceiversolutions.hrsystem.organizationstructure.organization;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.conceiversolutions.hrsystem.user.user.User;

@RestController
@CrossOrigin("*")
@RequestMapping(path = "api/organization")
public class OrganizationController {

    private final OrganizationService organizationService;

    @Autowired
    public OrganizationController(OrganizationService organizationService) {
        this.organizationService = organizationService;
    }

    @GetMapping
    public List<Organization> getOrganizations() {
        return organizationService.getOrganizations();
    }

    @GetMapping(path = "{orgId}")
    public Organization getOrganization(@PathVariable("orgId") Long id) {
        return organizationService.getOrganization(id);
    }

    @PostMapping(path = "/addOrg")
    public Long addNewOrganization(@RequestParam("organizationName") String organisationName,
                                   @RequestParam("userId") Integer id) {
        return organizationService.addNewOrganization(organisationName, Long.valueOf(id));
    }

    @PutMapping(path = "/changeOrganizationHead")
    public String changeDeptHead(@RequestParam("orgName") String orgName,
                                 @RequestParam("newOrgId") Integer newOrgId) {
        return organizationService.changeOrgHead(orgName, newOrgId);
    }

    @GetMapping(path = "{employeeId}/isHead")
    public Long isEmployeeOrganizationHead(@PathVariable("employeeId") Long employeeId) {
        return organizationService.isEmployeeOrganizationHead(employeeId);
    }

    @GetMapping(path = "head")
    public User getOrganizationHead() throws Exception {
        return organizationService.getOrganizationHead();
    }
}
