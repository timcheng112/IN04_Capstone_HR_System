package com.conceiversolutions.hrsystem.organizationstructure.outlet;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OutletRepository extends JpaRepository<Outlet, Long> {
    @Query("SELECT o FROM Outlet o WHERE o.outletName =?1")
    Optional<Outlet> findOutletByName(String name);
}
