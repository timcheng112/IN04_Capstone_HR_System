package com.conceiversolutions.hrsystem.administration.task;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.conceiversolutions.hrsystem.administration.tasklistitem.TaskListItem;
import com.conceiversolutions.hrsystem.administration.tasklistitem.TaskListItemService;
import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final TaskListItemService taskListItemService;
    private final UserRepository userRepository;

    public List<Task> getTasks() {
        List<Task> tasks = taskRepository.findAll();
        for (Task task : tasks) {
            task.getCategory();
            task.getTaskListItems();
        }
        return tasks;
    }

    public Task getTaskById(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalStateException("Task with ID: " + taskId + " does not exist!"));
        task.getCategory();
        task.getTaskListItems();
        return task;
    }

    public void addNewTask(Task task) {
        Optional<Task> taskOptional = taskRepository.findTaskByName(task.getName());
        if (taskOptional.isPresent()) {
            throw new IllegalStateException("Name has been taken");
        }
        taskRepository.save(task);
    }

    public void deleteTask(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalStateException("Task with ID: " + taskId + " does not exist!"));
        List<TaskListItem> taskListItems = task.getTaskListItems();
        for (TaskListItem taskListItem : taskListItems) {
            taskListItemService.deleteTaskListItem(taskListItem.getTaskListItemId());
        }
        if (task.getCategory() != null) {
            task.getCategory().getTasks().remove(task);
            task.setCategory(null);
        }
        taskRepository.deleteById(taskId);
    }

    @Transactional
    public void editTask(Long taskId, String taskName, String taskDescription) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalStateException("Task with ID: " + taskId + " does not exist!"));

        if (taskName != null && taskName.length() > 0 && !Objects.equals(task.getName(), taskName)) {
            task.setName(taskName);
        }

        if (taskDescription != null && taskDescription.length() > 0
                && !Objects.equals(task.getDescription(), taskDescription)) {
            task.setDescription(taskDescription);
        }
    }

    public void assignTaskToEmployee(Long employeeId, Long taskId) {
        User employee = userRepository.findById(employeeId).get();
        TaskListItem taskListItem = new TaskListItem();
        Task task = this.getTaskById(taskId);
        taskListItem.setTask(task);
        taskListItemService.addNewTaskListItem(taskListItem, employee, taskId);
    }

}
