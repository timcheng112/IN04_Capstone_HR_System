package com.conceiversolutions.hrsystem.organization_structure.department;


import com.conceiversolutions.hrsystem.organization_structure.organization.Organization;
import com.conceiversolutions.hrsystem.pay.entities.PayInformation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    @Autowired
    public DepartmentService(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    public List<Department> getAllOrganizations() {
        return departmentRepository.findAll();
    }

    public Department getDepartment(Long id){
        Optional<Department> dept = departmentRepository.findById(id);
        if(dept.isPresent()){
            return dept.get();
        }else{
            throw new IllegalStateException("Pay Information does not exist.");
        }
    }

}
