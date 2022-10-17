package com.conceiversolutions.hrsystem.training.module;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ModuleRepository extends JpaRepository<Module, Long> {
    @Query("SELECT m FROM Module m WHERE m.title = ?1")
    Optional<Module> findModuleByTitle(String moduleTitle);
}