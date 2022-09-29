package com.conceiversolutions.hrsystem.administration.tasklistitem;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TaskListItemRepository extends JpaRepository<TaskListItem, Long> {

    @Query("SELECT t FROM TaskListItem t WHERE t.task.taskId = ?1")
    Optional<List<TaskListItem>> findTaskListItemByTask(Long taskId);

    @Query("SELECT t FROM TaskListItem t WHERE t.user.userId = ?1")
    Optional<List<TaskListItem>> findTaskListItemByEmployee(Long employeeId);
}