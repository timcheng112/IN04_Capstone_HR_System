package com.conceiversolutions.hrsystem.organizationstructure.organization;

import java.util.List;

import com.conceiversolutions.hrsystem.organizationstructure.department.Department;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
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
}
