package com.conceiversolutions.hrsystem.administration.checklist;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.conceiversolutions.hrsystem.administration.task.Task;
import com.conceiversolutions.hrsystem.user.user.User;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ChecklistService {

  private final ChecklistRepository checklistRepository;

  public List<Checklist> getChecklists() {
    List<Checklist> checklists = checklistRepository.findAll();
    return checklists;
  }

  public Checklist getChecklistById(Long checklistId) {
    Checklist checklist = checklistRepository.findById(checklistId)
        .orElseThrow(() -> new IllegalStateException("Checklist with ID: " + checklistId + " does not exist!"));
    return checklist;
  }

  public void addNewChecklist(Checklist checklist) {
    Optional<Checklist> checklistOptional = checklistRepository.findChecklistByTitle(checklist.getTitle());
    if (checklistOptional.isPresent()) {
      throw new IllegalStateException("Checklist title already exists!");
    }
    checklistRepository.saveAndFlush(checklist);
  }

  @Transactional
  public void editChecklist(Long checklistId, String checklistTitle, String checklistDescription, List<Task> tasks,
      List<User> users) {
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
    if (tasks != null){
      checklist.setTasks(tasks);
    }
    if (users != null){
      checklist.setUsers(users);
    }
  
  }

  public void deleteChecklist(Long checklistId) {
    Checklist checklist = checklistRepository.findById(checklistId)
        .orElseThrow(() -> new IllegalStateException("Checklist with ID: " + checklistId + " does not exist!"));
    if (!checklist.getUsers().isEmpty()) {
      throw new IllegalStateException("Unable to delete as checklist has assigned to emloyees");
    }
    checklistRepository.deleteById(checklistId);
  }
}
