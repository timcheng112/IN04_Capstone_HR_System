package com.conceiversolutions.hrsystem.administration.tasklistitem;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;

import com.conceiversolutions.hrsystem.administration.task.Task;
import com.conceiversolutions.hrsystem.user.user.User;
import org.springframework.web.bind.annotation.DeleteMapping;

@CrossOrigin("*")
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

    @GetMapping(path = "/task-list-items-by-task")
    public List<TaskListItem> getTaskListItemsByTask(@RequestParam("taskId") Long taskId) {
        return taskListItemService.getTaskListItemsByTask(taskId);
    }

    @GetMapping(path = "/task-list-items-by-employee")
    public List<TaskListItem> getTaskListItemsByEmployee(@RequestParam("employeeId") Long employeeId) {
        return taskListItemService.getTaskListItemsByEmployee(employeeId);
    }

    @PutMapping(path = "{taskListItemId}")
    public void markTaskListItemAsComplete(@PathVariable("taskListItemId") Long taskListItemId) {
        taskListItemService.markTaskListItemAsComplete(taskListItemId);
    }

    @PostMapping
    public void addNewTaskListItem(@RequestBody TaskListItem taskListItem, @RequestParam Long employeeId,
            @RequestParam Long taskId) {
        taskListItemService.addNewTaskListItem(taskListItem, employeeId, taskId);
    }

    @DeleteMapping(path = "{taskListItemId}")
    public void deleteTaskListItem(@PathVariable("taskListItemId") Long taskListItemId) {
        taskListItemService.deleteTaskListItem(taskListItemId);
    }
}
