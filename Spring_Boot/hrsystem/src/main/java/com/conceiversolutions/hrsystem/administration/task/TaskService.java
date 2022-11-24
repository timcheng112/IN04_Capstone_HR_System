package com.conceiversolutions.hrsystem.administration.task;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.conceiversolutions.hrsystem.administration.category.Category;
import com.conceiversolutions.hrsystem.administration.category.CategoryRepository;
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
    private final CategoryRepository categoryRepository;

    public List<Task> getTasks() {
        List<Task> tasks = taskRepository.findAll();
        for (Task task : tasks) {
            task.getCategory().setTasks(new ArrayList<>());
            for (TaskListItem taskListItem : task.getTaskListItems()) {
                taskListItem.setTask(null);
                taskListItem.setUser(null);
            }
        }
        return tasks;
    }

    public Task getTaskById(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalStateException("Task with ID: " + taskId + " does not exist!"));
        task.getCategory().setTasks(new ArrayList<>());
        for (TaskListItem taskListItem : task.getTaskListItems()) {
            taskListItem.setTask(null);
            taskListItem.setUser(null);
        }
        return task;
    }

    public Task getTaskByName(String taskName) {
        Task task = taskRepository.findTaskByName(taskName)
                .orElseThrow(() -> new IllegalStateException("Task with name: " + taskName + " does not exist!"));
        task.getCategory().setTasks(new ArrayList<>());
        for (TaskListItem taskListItem : task.getTaskListItems()) {
            taskListItem.setTask(null);
            taskListItem.setUser(null);
        }
        return task;
    }

    public Long addNewTask(Task task, Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalStateException("Category with ID: " + categoryId + " does not exist!"));
        Optional<Task> taskOptional = taskRepository.findTaskByName(task.getName());
        if (taskOptional.isPresent()) {
            throw new IllegalStateException("Name has been taken");
        }
        task.setCategory(category);
        Task savedTask = taskRepository.saveAndFlush(task);
        category.addTask(savedTask);
        categoryRepository.saveAndFlush(category);
        return savedTask.getTaskId();
    }

    public void deleteTask(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalStateException("Task with ID: " + taskId + " does not exist!"));
        List<TaskListItem> taskListItems = task.getTaskListItems();
        for (TaskListItem taskListItem : taskListItems) {
            taskListItemService.deleteTaskListItem(taskListItem.getTaskListItemId());
        }
        if (task.getCategory() != null) {
            task.getCategory().removeTask(task);
            task.setCategory(null);
        }
        taskRepository.deleteById(taskId);
    }

    @Transactional
    public void editTask(Long taskId, String taskName, String taskDescription, Boolean autoAssign) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalStateException("Task with ID: " + taskId + " does not exist!"));

        Boolean isTaskNameChanged = false, isTaskDescriptionChanged = false;
        Boolean isTaskNameValid = true, isTaskDescriptionValid = true;
        String errMsg = "";

        if (taskName != null) {
            if (taskName.length() > 0) {
                if (!Objects.equals(task.getName(), taskName)) {
                    task.setName(taskName);
                    isTaskNameChanged = true;
                }
            } else {
                errMsg = errMsg.concat("Task Name cannot be empty!\n");
                isTaskNameValid = false;
            }
        } else {
            errMsg = errMsg.concat("Task Name is null!\n");
            isTaskNameValid = false;
        }

        if (taskDescription != null) {
            if (taskDescription.length() > 0) {
                if (!Objects.equals(task.getDescription(), taskDescription)) {
                    task.setDescription(taskDescription);
                    isTaskDescriptionChanged = true;
                }
            } else {
                errMsg = errMsg.concat("Task Description cannot be empty!\n");
                isTaskDescriptionValid = false;
            }
        } else {
            errMsg = errMsg.concat("Task Description is null!\n");
            isTaskDescriptionValid = false;
        }

        task.setAutoAssign(autoAssign);

        if (errMsg != "" && !(isTaskNameChanged && isTaskDescriptionChanged)) {
            if (isTaskNameChanged && isTaskDescriptionValid || isTaskDescriptionChanged && isTaskNameValid) {
                System.out.println("Changes are valid");
            } else {
                throw new IllegalStateException(errMsg);
            }
        }
    }

    public List<Task> getOnboardingTasks() {
        return taskRepository.findTaskByIsOnboarding(true);
    }

    public List<Task> getOffboardingTasks() {
        return taskRepository.findTaskByIsOnboarding(false);
    }

    public List<Task> getAutoAssignTasks(){
        return taskRepository.findTaskByAutoAssign(true);
    }

    public void assignTaskToEmployee(Long employeeId, Long taskId) {
        taskListItemService.addNewTaskListItem(new TaskListItem(false), employeeId, taskId);
    }

}
