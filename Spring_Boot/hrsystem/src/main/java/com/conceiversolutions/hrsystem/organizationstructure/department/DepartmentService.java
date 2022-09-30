package com.conceiversolutions.hrsystem.organizationstructure.department;


import com.conceiversolutions.hrsystem.organizationstructure.organization.OrganizationRepository;

import com.conceiversolutions.hrsystem.organizationstructure.team.Team;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final OrganizationRepository organizationRepository;

    @Autowired
    public DepartmentService(DepartmentRepository departmentRepository, OrganizationRepository organizationRepository) {
        this.departmentRepository = departmentRepository;
        this.organizationRepository = organizationRepository;
    }

    public List<Department> getAllDepartment() {
        System.out.println("DepartmentService.getAllDepartment");
        List<Department> dept = departmentRepository.findAll();
        System.out.println(dept.isEmpty());
        for(Department d : dept){
            //get org, dept, team
            System.out.println(d.getDepartmentName());
            d.getOrganization().setDepartments(new ArrayList<>());
            d.getTeams();
            d.getOrganization().getOrganizationHead();
            d.getDepartmentHead();
            for(Team t : d.getTeams()){
                t.getUsers().clear();
                t.setDepartment(null);
            }
        }

        return dept;
    }

    public Department getDepartment(Long id){
        Optional<Department> dept = departmentRepository.findById(id);
        if(dept.isPresent()){
            return dept.get();
        }else{
            throw new IllegalStateException("Department does not exist.");
        }
    }

    public void addNewDepartment(Department department) {
//        department.setOrganization(organizationRepository.findById(1L).get());
//        List<Department> d = department.getOrganization().getDepartments();
//        d.add(department);
//        department.getOrganization().setDepartments(d);
//        departmentRepository.save(department);
//        organizationRepository.save(department.getOrganization());
//        departmentRepository.flush();
//        organizationRepository.flush();

    }

    public void updateDepartment(Department department, Long departmentId) {
        Department d1 = getDepartment(departmentId);
        d1.setDepartmentHead(department.getDepartmentHead());
        d1.setDepartmentName(department.getDepartmentName());
        d1.setOrganization(department.getOrganization());
        d1.setTeams(department.getTeams());

    }
    public void deleteDepartment(Long departmentId) {
        departmentRepository.deleteById(departmentId);
    }
    public void deleteAllDepartments(){
        departmentRepository.deleteAll();
    }






}
