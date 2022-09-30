package com.conceiversolutions.hrsystem.organizationstructure.department;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public List<Department> getAllDepartment() {
        return departmentService.getAllDepartment();
    }

    @GetMapping(path = "{departmentId}")
    public Department getDepartment(@PathVariable("departmentId") Long id) {
        return departmentService.getDepartment(id);
    }

    @PostMapping
    public void addNewDepartment(@RequestBody Department department) {
        departmentService.addNewDepartment(department);
    }

    @PutMapping(path = "{departmentId}")
    public void updateDepartment(@RequestBody Department department, @PathVariable("payslipId") Long departmentId) {
        departmentService.updateDepartment(department, departmentId);
    }

    @DeleteMapping(path = "{departmentId}")
    public void deletePayslip(@PathVariable("departmentId") Long id) {
        departmentService.deleteDepartment(id);
    }


    @DeleteMapping
    public void deleteAllPayslips() {
        departmentService.deleteAllDepartments();
    }


}
