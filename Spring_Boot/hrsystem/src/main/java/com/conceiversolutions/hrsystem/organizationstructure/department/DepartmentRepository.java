package com.conceiversolutions.hrsystem.organizationstructure.department;

import com.conceiversolutions.hrsystem.user.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.conceiversolutions.hrsystem.organizationstructure.team.Team;

import java.util.List;
import java.util.Optional;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
    @Query("SELECT d FROM Department d JOIN d.teams t JOIN t.users u WHERE d.departmentHead.userId = ?1 OR u.userId = ?1")
    Optional<Department> findDepartmentByEmployeeId(Long employeeId);

    @Query("SELECT d.teams FROM Department d WHERE d.departmentHead.userId = ?1")
    List<Team> findTeamsByDepartmentHead(Long userId);

    @Query("SELECT d FROM Department d WHERE d.departmentName =?1")
    Optional<Department> findByDepartmentName(String deptName);
}
