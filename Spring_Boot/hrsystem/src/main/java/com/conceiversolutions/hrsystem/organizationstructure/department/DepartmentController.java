package com.conceiversolutions.hrsystem.organizationstructure.department;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
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


}
