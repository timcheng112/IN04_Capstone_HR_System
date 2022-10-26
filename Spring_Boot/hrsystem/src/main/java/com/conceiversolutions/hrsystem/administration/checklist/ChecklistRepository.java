package com.conceiversolutions.hrsystem.administration.checklist;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ChecklistRepository extends JpaRepository<Checklist, Long>{
  
  @Query("SELECT c FROM Checklist c WHERE c.title = ?1")
    Optional<Checklist> findChecklistByTitle(String title);
  
}
