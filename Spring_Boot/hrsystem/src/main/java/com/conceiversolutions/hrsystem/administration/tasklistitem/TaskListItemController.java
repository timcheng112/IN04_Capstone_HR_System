package com.conceiversolutions.hrsystem.administration.tasklistitem;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/task_list_item")
public class TaskListItemController {

    private final TaskListItemService taskListItemService;

    @Autowired
    public TaskListItemController(TaskListItemService taskListItemService) {
        this.taskListItemService = taskListItemService;
    }

    @GetMapping
    public List<TaskListItem> getTaskListItems() {
        return taskListItemService.getTaskListItems();
    }

    @PutMapping(path = "{taskListItemId}")
    public void markTaskListItemAsComplete(@PathVariable("taskListItemId") Long taskListItemId) {
        taskListItemService.markTaskListItemAsComplete(taskListItemId);
    }
}
