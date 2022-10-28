package com.conceiversolutions.hrsystem.administration.checklist;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.conceiversolutions.hrsystem.administration.task.Task;

import lombok.AllArgsConstructor;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/checklist")
@AllArgsConstructor
public class ChecklistController {

  private final ChecklistService checklistService;

  @GetMapping
  public List<Checklist> getChecklists() {
    return checklistService.getChecklists();
  }

  @GetMapping(path = "{checklistId}")
  public Checklist getChecklistById(@PathVariable Long checklistId) {
    return checklistService.getChecklistById(checklistId);
  }

  @PostMapping
  public void addNewChecklist(@RequestBody Checklist checklist,
      @RequestParam(name = "taskIds", required = false) List<Long> taskIds) {
    checklistService.addNewChecklist(checklist, taskIds);
  }

  @PutMapping(path = "{checklistId}")
  public void editChecklist(@PathVariable("checklistId") Long checklistId,
      @RequestParam(name = "checklistTitle", required = false) String checklistTitle,
      @RequestParam(name = "checklistDescription", required = false) String checklistDescription,
      @RequestParam(name = "taskIds", required = false) List<Long> taskIds) {
    checklistService.editChecklist(checklistId, checklistTitle, checklistDescription, taskIds);
  }

  @DeleteMapping(path = "{checklistId}")
  public void deleteChecklist(@PathVariable("checklistyId") Long checklistId) throws IllegalStateException {
    checklistService.deleteChecklist(checklistId);
  }
}
