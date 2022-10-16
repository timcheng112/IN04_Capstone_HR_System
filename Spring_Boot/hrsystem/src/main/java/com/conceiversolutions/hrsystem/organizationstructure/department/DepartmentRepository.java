package com.conceiversolutions.hrsystem.organizationstructure.department;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
    @Query("SELECT d FROM Department d JOIN d.teams t JOIN t.users u WHERE d.departmentHead.userId = ?1 OR u.userId = ?1")
    Optional<Department> findDepartmentByEmployeeId(Long employeeId);
}
