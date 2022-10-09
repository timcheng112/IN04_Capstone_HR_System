package com.conceiversolutions.hrsystem.organizationstructure.organization;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.conceiversolutions.hrsystem.enums.RoleEnum;
import com.conceiversolutions.hrsystem.organizationstructure.department.Department;
import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;
import com.conceiversolutions.hrsystem.user.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class OrganizationService {

    private final OrganizationRepository organizationRepository;
    private final UserRepository userRepository;
    private final UserService userService;


//    @Autowired
//    public OrganizationService(OrganizationRepository organizationRepository) {
//        this.organizationRepository = organizationRepository;
//    }

    public List<Organization> getOrganizations() {
        List<Organization> organizations = organizationRepository.findAll();

        if (organizations.isEmpty()) {
            throw new IllegalStateException("Organization entities do not exist, cannot proceed");
        }

        for (Organization org : organizations) {
            List<Department> departments = org.getDepartments();
            org.getOrganizationHead().setTeams(new ArrayList<>());

            for (Department d : departments) {
                d.setOrganization(null);
                d.setTeams(new ArrayList<>());
                d.getDepartmentHead().setTeams(new ArrayList<>());
            }
        }

        return organizations;
    }

    public Organization getOrganization(Long id) {
        Optional<Organization> o = organizationRepository.findById(id);

        if (o.isEmpty()) {
            throw new IllegalStateException("Organization entity does not exist, cannot proceed");
        }

        Organization org = o.get();

        List<Department> departments = org.getDepartments();
        org.getOrganizationHead().setTeams(new ArrayList<>());

        for (Department d : departments) {
            d.setOrganization(null);
            d.setTeams(new ArrayList<>());
            d.getDepartmentHead().setTeams(new ArrayList<>());
        }

        return org;
    }

    public Long addNewOrganization(String name, Long userId) {
        Optional<User> orgHead = userRepository.findById(userId);

        if(orgHead.isPresent()){
            System.out.println("potato3");
            User us = orgHead.get();

            if (!us.getUserRole().equals(RoleEnum.MANAGER)) {
                throw new IllegalStateException("User selected is not a Manager, please appoint a manager instead");
            } else if (!us.isEnabled()) {
                throw new IllegalStateException("Manager selected is not an active employee, please appoint an active employee instead");
            }
//            Organization org = new Organization(Long.valueOf(50), name, new ArrayList<>(), us);
            Organization org = new Organization(name,new ArrayList<>(), us);
            //save and flush returns entity
            organizationRepository.saveAndFlush(org);

        }
        return organizationRepository.findOrgByName(name).get().getOrganizationId();

    }

    public String changeOrgHead(String orgName, Integer newOrgId) {
        Optional<Organization> o = organizationRepository.findOrgByName(orgName);
        if (o.isEmpty()) {
            throw new IllegalStateException("Organization entity does not exist, cannot proceed");
        }

        Organization org = o.get();
        User newOrgHead = userService.getUser(Long.valueOf(newOrgId));

        if (!newOrgHead.getUserRole().equals(RoleEnum.MANAGER)) {
            throw new IllegalStateException("User selected is not a Manager, please appoint a manager instead");
        } else if (!newOrgHead.isEnabled()) {
            throw new IllegalStateException("Manager selected is not an active employee, please appoint an active employee instead");
        }

        org.setOrganizationHead(newOrgHead);

        organizationRepository.saveAndFlush(org);

        return "Organization " + org.getOrganizationName() + " head has been successfully updated to be " + newOrgHead.getFirstName() + " " + newOrgHead.getLastName();
    }
}
