package com.conceiversolutions.hrsystem.administration.task;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    @Query("SELECT t FROM Task t WHERE t.name = ?1")
    Optional<Task> findTaskByName(String name);

    @Query("SELECT t FROM Task t WHERE t.isOnboarding = ?1")
    List<Task> findTaskByIsOnboarding(Boolean isOnboarding);

    @Query("SELECT t FROM Task t WHERE t.autoAssign = ?1")
    List<Task> findTaskByAutoAssign(Boolean autoAssign);
}
