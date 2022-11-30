package com.conceiversolutions.hrsystem.organizationstructure.organization;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.conceiversolutions.hrsystem.engagement.leavequota.LeaveQuota;
import com.conceiversolutions.hrsystem.enums.RoleEnum;
import com.conceiversolutions.hrsystem.organizationstructure.department.Department;
import com.conceiversolutions.hrsystem.user.position.Position;
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

    // @Autowired
    // public OrganizationService(OrganizationRepository organizationRepository) {
    // this.organizationRepository = organizationRepository;
    // }

    public List<Organization> getOrganizations() {
        List<Organization> organizations = organizationRepository.findAll();

        if (organizations.isEmpty()) {
            throw new IllegalStateException("Organization entities do not exist, cannot proceed");
        }

        for (Organization org : organizations) {
            List<Department> departments = org.getDepartments();
            org.getOrganizationHead().setTeams(new ArrayList<>());
            org.getOrganizationHead().setQualificationInformation(null);
            org.getOrganizationHead().setBlocks(new ArrayList<>());
            org.getOrganizationHead().setShiftListItems(new ArrayList<>());
            org.getOrganizationHead().setSwapRequestsReceived(new ArrayList<>());
            org.getOrganizationHead().setSwapRequestsRequested(new ArrayList<>());
            org.getOrganizationHead().setReactivationRequest(null);
            org.getOrganizationHead().setAttendances(new ArrayList<>());
            org.getOrganizationHead().setCurrentPayInformation(null);
            org.getOrganizationHead().setPayslips(new ArrayList<>());
            org.getOrganizationHead().setEmployeeAppraisals(new ArrayList<>());
            org.getOrganizationHead().setManagerAppraisals(new ArrayList<>());
            org.getOrganizationHead().setManagerReviews(new ArrayList<>());
            org.getOrganizationHead().setEmployeeReviews(new ArrayList<>());
            org.getOrganizationHead().setApplications(new ArrayList<>());
            org.getOrganizationHead().setGoals(new ArrayList<>());
            org.getOrganizationHead().setPositions(new ArrayList<>());
            org.getOrganizationHead().setJobRequests(new ArrayList<>());
            org.getOrganizationHead().setLeaves(new ArrayList<>());
            org.getOrganizationHead().setLeaveQuotas(new ArrayList<>());
            org.getOrganizationHead().setCurrentLeaveQuota(null);
            org.getOrganizationHead().setTaskListItems(new ArrayList<>());
            org.getOrganizationHead().setBenefitPlanInstances(new ArrayList<>());

            for (Department d : departments) {
                d.setOrganization(null);
                d.setTeams(new ArrayList<>());
                d.getDepartmentHead().setTeams(new ArrayList<>());
                d.getDepartmentHead().setQualificationInformation(null);
                d.getDepartmentHead().setBlocks(new ArrayList<>());
                d.getDepartmentHead().setShiftListItems(new ArrayList<>());
                d.getDepartmentHead().setSwapRequestsReceived(new ArrayList<>());
                d.getDepartmentHead().setSwapRequestsRequested(new ArrayList<>());
                d.getDepartmentHead().setReactivationRequest(null);
                d.getDepartmentHead().setAttendances(new ArrayList<>());
                d.getDepartmentHead().setCurrentPayInformation(null);
                d.getDepartmentHead().setPayslips(new ArrayList<>());
                d.getDepartmentHead().setEmployeeAppraisals(new ArrayList<>());
                d.getDepartmentHead().setManagerAppraisals(new ArrayList<>());
                d.getDepartmentHead().setManagerReviews(new ArrayList<>());
                d.getDepartmentHead().setEmployeeReviews(new ArrayList<>());
                d.getDepartmentHead().setApplications(new ArrayList<>());
                d.getDepartmentHead().setGoals(new ArrayList<>());
                d.getDepartmentHead().setPositions(new ArrayList<>());
                d.getDepartmentHead().setJobRequests(new ArrayList<>());
                d.getDepartmentHead().setLeaves(new ArrayList<>());
                d.getDepartmentHead().setLeaveQuotas(new ArrayList<>());
                d.getDepartmentHead().setCurrentLeaveQuota(null);
                d.getDepartmentHead().setTaskListItems(new ArrayList<>());
                d.getDepartmentHead().setBenefitPlanInstances(new ArrayList<>());
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
        org.getOrganizationHead().setQualificationInformation(null);
        org.getOrganizationHead().setBlocks(new ArrayList<>());
        org.getOrganizationHead().setShiftListItems(new ArrayList<>());
        org.getOrganizationHead().setTaskListItems(new ArrayList<>());
        org.getOrganizationHead().setSwapRequestsReceived(new ArrayList<>());
        org.getOrganizationHead().setSwapRequestsRequested(new ArrayList<>());
        org.getOrganizationHead().setReactivationRequest(null);
        org.getOrganizationHead().setAttendances(new ArrayList<>());
        org.getOrganizationHead().setCurrentPayInformation(null);
        org.getOrganizationHead().setPayslips(new ArrayList<>());
        org.getOrganizationHead().setEmployeeAppraisals(new ArrayList<>());
        org.getOrganizationHead().setManagerAppraisals(new ArrayList<>());
        org.getOrganizationHead().setManagerReviews(new ArrayList<>());
        org.getOrganizationHead().setEmployeeReviews(new ArrayList<>());
        org.getOrganizationHead().setApplications(new ArrayList<>());
        org.getOrganizationHead().setGoals(new ArrayList<>());
        org.getOrganizationHead().setPositions(new ArrayList<>());
        org.getOrganizationHead().setJobRequests(new ArrayList<>());
        org.getOrganizationHead().setLeaves(new ArrayList<>());
        org.getOrganizationHead().setLeaveQuotas(new ArrayList<>());
        org.getOrganizationHead().setCurrentLeaveQuota(null);
        org.getOrganizationHead().setBenefitPlanInstances(new ArrayList<>());

        // come back and add relationship - S&A
        for (Department d : departments) {
            d.setOrganization(null);
            d.setTeams(new ArrayList<>());
            d.getDepartmentHead().setTeams(new ArrayList<>());
            d.getDepartmentHead().setQualificationInformation(null);
            d.getDepartmentHead().setBlocks(new ArrayList<>());
            d.getDepartmentHead().setShiftListItems(new ArrayList<>());
            d.getDepartmentHead().setSwapRequestsReceived(new ArrayList<>());
            d.getDepartmentHead().setSwapRequestsRequested(new ArrayList<>());
            d.getDepartmentHead().setReactivationRequest(null);
            d.getDepartmentHead().setAttendances(new ArrayList<>());
            d.getDepartmentHead().setCurrentPayInformation(null);
            d.getDepartmentHead().setPayslips(new ArrayList<>());
            d.getDepartmentHead().setEmployeeAppraisals(new ArrayList<>());
            d.getDepartmentHead().setManagerAppraisals(new ArrayList<>());
            d.getDepartmentHead().setManagerReviews(new ArrayList<>());
            d.getDepartmentHead().setEmployeeReviews(new ArrayList<>());
            d.getDepartmentHead().setApplications(new ArrayList<>());
            d.getDepartmentHead().setGoals(new ArrayList<>());
            d.getDepartmentHead().setPositions(new ArrayList<>());
            d.getDepartmentHead().setJobRequests(new ArrayList<>());
            d.getDepartmentHead().setLeaves(new ArrayList<>());
            d.getDepartmentHead().setLeaveQuotas(new ArrayList<>());
            d.getDepartmentHead().setCurrentLeaveQuota(null);
            d.getDepartmentHead().setTaskListItems(new ArrayList<>());
            d.getDepartmentHead().setBenefitPlanInstances(new ArrayList<>());
        }

        return org;
    }

    public Long addNewOrganization(String name, Long userId) {
        Optional<User> orgHead = userRepository.findById(userId);

        if (orgHead.isPresent()) {
            System.out.println("potato3");
            User us = orgHead.get();

            if (!us.getUserRole().equals(RoleEnum.MANAGER)) {
                throw new IllegalStateException("User selected is not a Manager, please appoint a manager instead");
            } else if (!us.isEnabled()) {
                throw new IllegalStateException(
                        "Manager selected is not an active employee, please appoint an active employee instead");
            }
            // Organization org = new Organization(Long.valueOf(50), name, new
            // ArrayList<>(), us);
            Organization org = new Organization(name, new ArrayList<>(), us);
            // save and flush returns entity
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
            throw new IllegalStateException(
                    "Manager selected is not an active employee, please appoint an active employee instead");
        }

        org.setOrganizationHead(newOrgHead);

        organizationRepository.saveAndFlush(org);

        return "Organization " + org.getOrganizationName() + " head has been successfully updated to be "
                + newOrgHead.getFirstName() + " " + newOrgHead.getLastName();
    }

    public Long isEmployeeOrganizationHead(Long employeeId) {
        List<Organization> allOrganizations = organizationRepository.findAll();

        for (Organization o : allOrganizations) {
            if (o.getOrganizationHead().getUserId() == employeeId) {
                return o.getOrganizationId();
            }
        }
        return Long.valueOf(-1);
    }

    public User getOrganizationHead() throws Exception {
        System.out.println("OrganizationService.getOrganizationHead");

        List<Organization> allOrganizations = organizationRepository.findAll();

        for (Organization o : allOrganizations) {
            System.out.println(o.getOrganizationHead());
            
            Position currentPosition = o.getOrganizationHead().getCurrentPosition();
            LeaveQuota quota = o.getOrganizationHead().getCurrentLeaveQuota();
            User u = o.getOrganizationHead().nullify();
            u.setCurrentPosition(currentPosition);
            u.setCurrentLeaveQuota(quota);

            return u;
        }

        throw new IllegalStateException("Unable to find organization head");
    }

    
}
