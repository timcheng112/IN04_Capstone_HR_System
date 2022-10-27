package com.conceiversolutions.hrsystem.organizationstructure.department;


import com.conceiversolutions.hrsystem.enums.RoleEnum;
import com.conceiversolutions.hrsystem.organizationstructure.organization.Organization;
import com.conceiversolutions.hrsystem.organizationstructure.organization.OrganizationRepository;

import com.conceiversolutions.hrsystem.organizationstructure.team.Team;
import com.conceiversolutions.hrsystem.organizationstructure.team.TeamRepository;
import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;
import com.conceiversolutions.hrsystem.user.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final OrganizationRepository organizationRepository;
    private final UserService userService;
    private final TeamRepository teamRepository;
    private final UserRepository userRepository;

//    @Autowired
//    public DepartmentService(DepartmentRepository departmentRepository, OrganizationRepository organizationRepository) {
//        this.departmentRepository = departmentRepository;
//        this.organizationRepository = organizationRepository;
//    }

    public List<Department> getAllDepartment() {
        System.out.println("DepartmentService.getAllDepartment");
        List<Department> dept = departmentRepository.findAll();
//        System.out.println(dept.isEmpty());
        if (dept.isEmpty()) {
            throw new IllegalStateException("Unable to retrieve, no departments exist");
        }

        for(Department d : dept){
            //get org, dept, team
            System.out.println("Department ID is : " + d.getDepartmentId() + ", Department name is : " + d.getDepartmentName());
            Organization org = d.getOrganization();
            org.setDepartments(new ArrayList<>());
            org.setOrganizationHead(null);
            User deptHead = d.getDepartmentHead();

            deptHead.setTeams(new ArrayList<>());
            deptHead.setQualificationInformation(null);
            deptHead.setBlocks(new ArrayList<>());
            deptHead.setShiftListItems(new ArrayList<>());
            deptHead.setSwapRequestsReceived(new ArrayList<>());
            deptHead.setSwapRequestsRequested(new ArrayList<>());
            deptHead.setReactivationRequest(null);
            deptHead.setAttendances(new ArrayList<>());
            deptHead.setCurrentPayInformation(null);
            deptHead.setEmployeeAppraisals(new ArrayList<>());
            deptHead.setManagerAppraisals(new ArrayList<>());
            deptHead.setManagerReviews(new ArrayList<>());
            deptHead.setEmployeeReviews(new ArrayList<>());
            deptHead.setApplications(new ArrayList<>());
            deptHead.setGoals(new ArrayList<>());
            deptHead.setPositions(new ArrayList<>());
            deptHead.setJobRequests(new ArrayList<>());
            deptHead.setLeaves(new ArrayList<>());
            deptHead.setLeaveQuotas(new ArrayList<>());
            deptHead.setCurrentLeaveQuota(null);
            deptHead.setTaskListItems(new ArrayList<>());

            List<Team> deptTeams = d.getTeams();

//            d.getOrganization().getOrganizationHead();
            for(Team t : deptTeams){
                System.out.println("for each team " + t.getTeamName());
                t.setRoster(null);
                t.setUsers(new ArrayList<>());
                t.setDepartment(null);
                t.setOutlet(null);
                t.setTeamHead(null);
            }
        }

        return dept;
    }

    public Department getDepartment(Long id){
        System.out.println("DepartmentService.getDepartment");
        Optional<Department> dept = departmentRepository.findById(id);
        if(dept.isPresent()){
            Department d = dept.get();
            System.out.println("Department ID is : " + d.getDepartmentId() + ", Department name is : " + d.getDepartmentName());
            Organization org = d.getOrganization();
            org.setDepartments(new ArrayList<>());
            org.setOrganizationHead(null);
            User deptHead = d.getDepartmentHead();

            deptHead.setTeams(new ArrayList<>());
            deptHead.setQualificationInformation(null);
            deptHead.setBlocks(new ArrayList<>());
            deptHead.setShiftListItems(new ArrayList<>());
            deptHead.setSwapRequestsReceived(new ArrayList<>());
            deptHead.setSwapRequestsRequested(new ArrayList<>());
            deptHead.setReactivationRequest(null);
            deptHead.setAttendances(new ArrayList<>());
            deptHead.setCurrentPayInformation(null);
            deptHead.setEmployeeAppraisals(new ArrayList<>());
            deptHead.setManagerAppraisals(new ArrayList<>());
            deptHead.setManagerReviews(new ArrayList<>());
            deptHead.setEmployeeReviews(new ArrayList<>());
            deptHead.setApplications(new ArrayList<>());
            deptHead.setGoals(new ArrayList<>());
            deptHead.setPositions(new ArrayList<>());
            deptHead.setJobRequests(new ArrayList<>());
            deptHead.setLeaves(new ArrayList<>());
            deptHead.setLeaveQuotas(new ArrayList<>());
            deptHead.setCurrentLeaveQuota(null);
            deptHead.setTaskListItems(new ArrayList<>());

            List<Team> deptTeams = d.getTeams();


//            d.getOrganization().getOrganizationHead();
            for(Team t : deptTeams){
                System.out.println("for each team " + t.getTeamName());
                t.setRoster(null);
                t.setUsers(new ArrayList<>());
                t.setDepartment(null);
                t.setOutlet(null);
                t.setTeamHead(null);
            }
            return d;
        }else{
            throw new IllegalStateException("Department does not exist.");
        }
    }

    public Long addNewDepartment(String deptName, Integer deptHeadId) {
        System.out.println("DepartmentService.addNewDepartment");
        System.out.println("deptName = " + deptName + ", deptHeadId = " + deptHeadId);

        Optional<Organization> orgOptional = organizationRepository.findOrgByName("Libro");
        if (orgOptional.isEmpty()) {
            throw new IllegalStateException("Libro organization entity does not exist, cannot proceed");
        }
        Organization org = orgOptional.get();

        User deptHead = userRepository.findById(Long.valueOf(deptHeadId)).get();
        if (!deptHead.getUserRole().equals(RoleEnum.MANAGER)) {
            throw new IllegalStateException("User selected is not a Manager, please appoint a manager instead");
        } else if (!deptHead.isEnabled()) {
            throw new IllegalStateException("Manager selected is not an active employee, please appoint an active employee instead");
        }

//        Department newDept = new Department(Long.valueOf(4), deptName, org, new ArrayList<>(), deptHead);
        Department newDept = new Department(deptName, org, new ArrayList<>(), deptHead, false);
//        System.out.println(newDept.getDepartmentName());
        Department savedDept = departmentRepository.saveAndFlush(newDept);
//        System.out.println(savedDept.getDepartmentId());
        List<Department> orgDepts = org.getDepartments();
        orgDepts.add(savedDept);
        org.setDepartments(orgDepts);
        organizationRepository.save(org);

        return savedDept.getDepartmentId();
    }

    public void updateDepartment(Department department, Long departmentId) {
        Department d1 = getDepartment(departmentId);
        d1.setDepartmentHead(department.getDepartmentHead());
        d1.setDepartmentName(department.getDepartmentName());
        d1.setOrganization(department.getOrganization());
        d1.setTeams(department.getTeams());
        departmentRepository.save(d1);
    }
    public boolean deleteDepartment(Long departmentId) {
        Optional<Department> d = departmentRepository.findById(departmentId);
        if (d.isEmpty()) {
            throw new IllegalStateException("Department entity record does not exist, can't proceed");
        }

        Department dept = d.get();

        if (!dept.getTeams().isEmpty()) {
            throw new IllegalStateException("Department still has teams, unable to delete now");
        }

        String organizationName = dept.getOrganization().getOrganizationName();
        Optional<Organization> o = organizationRepository.findOrgByName(organizationName);
        if (o.isEmpty()) {
            throw new IllegalStateException("Organization entity record does not exist, can't proceed");
        }
        Organization org = o.get();

        List<Department> tempDepts = org.getDepartments();
        tempDepts.remove(dept);
        org.setDepartments(tempDepts);

        organizationRepository.save(org);
        departmentRepository.deleteById(departmentId);

        return true;
    }
//    public void deleteAllDepartments(){
//        departmentRepository.deleteAll();
//    }


    public String changeDeptHead(Integer deptId, Integer newHeadId) {
        Optional<Department> d = departmentRepository.findById(Long.valueOf(deptId));
        if (d.isEmpty()) {
            throw new IllegalStateException("Department entity does not exist, cannot proceed");
        }

        Department dept = d.get();
        User newDeptHead = userService.getUser(Long.valueOf(newHeadId));

        if (!newDeptHead.getUserRole().equals(RoleEnum.MANAGER)) {
            throw new IllegalStateException("User selected is not a Manager, please appoint a manager instead");
        } else if (!newDeptHead.isEnabled()) {
            throw new IllegalStateException("Manager selected is not an active employee, please appoint an active employee instead");
        }

        dept.setDepartmentHead(newDeptHead);

        departmentRepository.saveAndFlush(dept);

        return "Department " + dept.getDepartmentName() + " head has been successfully updated to be " + newDeptHead.getFirstName() + " " + newDeptHead.getLastName();
    }

    public Department getDepartmentByEmployeeId(Long employeeId) {
        Optional<Department> dept = departmentRepository.findDepartmentByEmployeeId(employeeId);
        if(dept.isPresent()){
            Department d = dept.get();
            System.out.println("Department ID is : " + d.getDepartmentId() + ", Department name is : " + d.getDepartmentName());
            Organization org = d.getOrganization();
            org.setDepartments(new ArrayList<>());
            org.setOrganizationHead(null);
            d.setDepartmentHead(null);



            List<Team> deptTeams = d.getTeams();

            for(Team t : deptTeams){
                System.out.println("for each team " + t.getTeamName());
                t.setRoster(null);
                t.setUsers(new ArrayList<>());
                t.setDepartment(null);
                t.setOutlet(null);
                t.setTeamHead(null);
            }
            return d;
        } else {
            throw new IllegalStateException("Department does not exist.");
        }
    }
}
