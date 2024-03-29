package com.conceiversolutions.hrsystem.organizationstructure.department;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.conceiversolutions.hrsystem.user.user.User;

import java.util.List;


@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/department")
public class DepartmentController {

    private final DepartmentService departmentService;

    @Autowired
    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @GetMapping(path = "/getAllDepartments")
    public List<Department> getAllDepartment() {
        return departmentService.getAllDepartment();
    }

    @GetMapping(path = "{departmentId}")
    public Department getDepartment(@PathVariable("departmentId") Long id) {
        return departmentService.getDepartment(id);
    }

    @PostMapping(path = "/addDepartment")
    public Long addNewDepartment(@RequestParam("deptName") String deptName,
                                 @RequestParam("deptHeadId") Integer deptHeadId) {
        return departmentService.addNewDepartment(deptName, deptHeadId);
    }

    @PutMapping(path = "/changeDepartmentHead")
    public String changeDeptHead(@RequestParam("deptId") Integer deptId,
                                 @RequestParam("newHeadId") Integer newHeadId) {
        return departmentService.changeDeptHead(deptId, newHeadId);
    }

    @PutMapping(path = "{departmentId}")
    public void updateDepartment(@RequestBody Department department, @PathVariable("departmentId") Long departmentId) {
        departmentService.updateDepartment(department, departmentId);
    }

    // can only delete if the dept has no teams
    @DeleteMapping(path = "{departmentId}")
    public boolean deleteDepartment(@PathVariable("departmentId") Long id) {
        return departmentService.deleteDepartment(id);
    }

//    @DeleteMapping(path = "/deleteAllDepartments")
//    public void deleteAllDepartments() {
//        departmentService.deleteAllDepartments();
//    }

    @GetMapping(path = "/getDepartmentByEmployeeId")
    public Department getDepartmentByEmployeeId(@RequestParam("employeeId") Long employeeId) {
        return departmentService.getDepartmentByEmployeeId(employeeId);
    }

    @GetMapping(path = "{employeeId}/isHead")
    public Long isEmployeeDepartmentHead(@PathVariable("employeeId") Long employeeId) throws Exception {
        return departmentService.isEmployeeDepartmentHead(employeeId);
    }

    @GetMapping(path = "/heads")
    public List<User> getDepartmentHeads() {
        return departmentService.getDepartmentHeads();
    }

    
}
