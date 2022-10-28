package com.conceiversolutions.hrsystem.administration.checklist;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.conceiversolutions.hrsystem.administration.task.Task;
import com.conceiversolutions.hrsystem.administration.task.TaskRepository;
import com.conceiversolutions.hrsystem.administration.tasklistitem.TaskListItem;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ChecklistService {

  private final ChecklistRepository checklistRepository;
  private final TaskRepository taskRepository;

  public List<Checklist> getChecklists() {
    List<Checklist> checklists = checklistRepository.findAll();
    for (Checklist checklist : checklists) {
      for (Task task : checklist.getTasks()) {
        task.getCategory().setTasks(new ArrayList<>());
        for (TaskListItem taskListItem : task.getTaskListItems()) {
          taskListItem.setTask(null);
          taskListItem.setUser(null);
        }
      }
    }
    return checklists;
  }

  public Checklist getChecklistById(Long checklistId) {
    Checklist checklist = checklistRepository.findById(checklistId)
        .orElseThrow(() -> new IllegalStateException("Checklist with ID: " + checklistId + " does not exist!"));
    return checklist;
  }

  public void addNewChecklist(Checklist checklist, List<Long> taskIds) {
    Optional<Checklist> checklistOptional = checklistRepository.findChecklistByTitle(checklist.getTitle());
    if (checklistOptional.isPresent()) {
      throw new IllegalStateException("Checklist title already exists!");
    }
    if (taskIds != null) {
      for (Long taskId : taskIds) {
        Task task = taskRepository.findById(taskId)
            .orElseThrow(() -> new IllegalStateException("Task with ID: " + taskId + " does not exist!"));
        checklist.addTask(task);
      }
    }
    checklistRepository.saveAndFlush(checklist);
  }

  @Transactional
  public void editChecklist(Long checklistId, String checklistTitle, String checklistDescription, List<Long> taskIds) {
    Checklist checklist = checklistRepository.findById(checklistId)
        .orElseThrow(() -> new IllegalStateException("Checklist with ID: " + checklistId + " does not exist!"));
    if (checklistTitle != null && checklistTitle.length() > 0
        && !Objects.equals(checklist.getTitle(), checklistTitle)) {
      checklist.setTitle(checklistTitle);
    }
    if (checklistDescription != null && checklistDescription.length() > 0
        && !Objects.equals(checklist.getDescription(), checklistDescription)) {
      checklist.setDescription(checklistDescription);
    }
    if (taskIds != null) {
      for (Long taskId : taskIds) {
        Task task = taskRepository.findById(taskId)
            .orElseThrow(() -> new IllegalStateException("Task with ID: " + taskId + " does not exist!"));
        checklist.addTask(task);
      }
    }
    checklistRepository.save(checklist);
  }

  public void deleteChecklist(Long checklistId) {
    Checklist checklist = checklistRepository.findById(checklistId)
        .orElseThrow(() -> new IllegalStateException("Checklist with ID: " + checklistId + " does not exist!"));
    checklistRepository.deleteById(checklistId);
  }
}
