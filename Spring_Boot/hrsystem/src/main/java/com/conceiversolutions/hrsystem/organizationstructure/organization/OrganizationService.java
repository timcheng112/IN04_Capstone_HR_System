package com.conceiversolutions.hrsystem.organizationstructure.organization;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.conceiversolutions.hrsystem.organizationstructure.department.Department;
import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class OrganizationService {

    private final OrganizationRepository organizationRepository;
    private final UserRepository userRepository;


//    @Autowired
//    public OrganizationService(OrganizationRepository organizationRepository) {
//        this.organizationRepository = organizationRepository;
//    }

    public List<Organization> getOrganizations() {
        return organizationRepository.findAll();
    }

    public Long addNewOrganization(String name, Long userId) {
        Optional<User> orgHead = userRepository.findById(userId);

        if(orgHead.isPresent()){
            System.out.println("potato3");
            User us = orgHead.get();
            Organization org = new Organization(name,new ArrayList<>(), us);
            //save and flush returns entity
            organizationRepository.saveAndFlush(org);

        }
        return organizationRepository.findOrgByName(name).get().getOrganizationId();

    }
}
