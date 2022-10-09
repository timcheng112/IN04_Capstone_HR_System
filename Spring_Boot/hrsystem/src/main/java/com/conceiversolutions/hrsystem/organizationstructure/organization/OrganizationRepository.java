package com.conceiversolutions.hrsystem.organizationstructure.organization;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, Long> {
    @Query("SELECT o FROM Organization o WHERE o.organizationName=?1")
    Optional<Organization> findOrgByName(String name);

}
