package com.conceiversolutions.hrsystem.administration.task;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.conceiversolutions.hrsystem.administration.tasklistitem.TaskListItem;
import com.conceiversolutions.hrsystem.administration.tasklistitem.TaskListItemService;

import lombok.AllArgsConstructor;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/task")
@AllArgsConstructor
public class TaskController {

    private final TaskService taskService;
    private final TaskListItemService taskListItemService;

    @GetMapping
    public List<Task> getTasks() {
        return taskService.getTasks();
    }

    @GetMapping(path = "{taskId}")
    public Task getTaskById(@PathVariable("taskId") Long taskId) {
        return taskService.getTaskById(taskId);
    }

    @GetMapping(path = "/get-task-by-name")
    public Task getTaskByName(@RequestParam(name = "taskName") String taskName) {
        return taskService.getTaskByName(taskName);
    }

    @GetMapping(path = "/onboarding-tasks")
    public List<Task> getOnboardingTasks() {
        return taskService.getOnboardingTasks();
    }

    @GetMapping(path = "/offboarding-tasks")
    public List<Task> getOffboardingTasks() {
        return taskService.getOffboardingTasks();
    }

    @PostMapping
    public Long addNewTask(@RequestBody Task task,
            @RequestParam(name = "categoryId", required = true) Long categoryId) {
        return taskService.addNewTask(task, categoryId);
    }

    @DeleteMapping(path = "{taskId}")
    public void deleteTask(@PathVariable("taskId") Long taskId) {
        taskService.deleteTask(taskId);
    }

    // @PutMapping(path = "{taskId}")
    // public void editTask(@PathVariable("taskId") Long taskId,
    // @RequestParam(name = "taskName", required = false) String taskName,
    // @RequestParam(name = "taskDescription", required = false) String
    // taskDescription,
    // @RequestParam(name = "employeeIds", required = false) Integer[] employeeIds)
    // {
    // taskService.editTask(taskId, taskName, taskDescription);
    // if (employeeIds.length != 0) {
    // for (Integer employeeId : employeeIds) {
    // taskListItemService.addNewTaskListItem(new TaskListItem(false),
    // Long.valueOf(employeeId), taskId);
    // }
    // }
    // }

    @PutMapping(path = "{taskId}")
    public void editTask(@PathVariable("taskId") Long taskId,
            @RequestParam(name = "taskName", required = false) String taskName,
            @RequestParam(name = "taskDescription", required = false) String taskDescription,
            @RequestParam(name = "autoAssign", required = false) Boolean autoAssign) {
        taskService.editTask(taskId, taskName, taskDescription, autoAssign);
    }

    @PutMapping(path = "/assignTaskToEmployee")
    public void assignTaskToEmployee(@RequestParam(name = "employeeId", required = true) Long employeeId,
            @RequestParam(name = "taskId", required = true) Long taskId) {
        taskService.assignTaskToEmployee(employeeId, taskId);
    }

}
