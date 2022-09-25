package com.conceiversolutions.hrsystem.organization_structure.department;


import com.conceiversolutions.hrsystem.pay.entities.PayInformation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/department")
public class DepartmentController {

    private final DepartmentService departmentService;

    @Autowired
    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @GetMapping
    public List<Department> getAllPayInformation() {
        return departmentService.getAllOrganizations();
    }

    @GetMapping(path = "{payInformationId}")
    public Department getDepartment(@PathVariable("payInformationId") Long id){
        return departmentService.getDepartment(id);
    }


}
