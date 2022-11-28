package com.conceiversolutions.hrsystem.organizationstructure.organization;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.conceiversolutions.hrsystem.organizationstructure.department.Department;
import com.conceiversolutions.hrsystem.user.user.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, Long> {
    @Query("SELECT o FROM Organization o WHERE o.organizationName=?1")
    Optional<Organization> findOrgByName(String name);

    @Query("SELECT o.departments FROM Organization o WHERE o.organizationHead.userId = ?1")
    List<Department> findDepartmentsByOrganizationHead(Long userId);

    @Query("SELECT o FROM Organization o WHERE o.organizationHead.userId =?1")
    Optional<Organization> findOrganizationByHead(Long userId);

    @Query("SELECT o.organizationHead FROM Organization o WHERE o.organizationId = ?1")
    Optional<User> findOrganizationHead(Long organizationId);

}
