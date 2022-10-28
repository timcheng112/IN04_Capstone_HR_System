package com.conceiversolutions.hrsystem.administration.tasklistitem;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.conceiversolutions.hrsystem.administration.task.Task;
import com.conceiversolutions.hrsystem.administration.task.TaskRepository;
import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TaskListItemService {

    private final TaskListItemRepository taskListItemRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public List<TaskListItem> getTaskListItems() {
        List<TaskListItem> taskListItems = taskListItemRepository.findAll();
        for (TaskListItem taskListItem : taskListItems) {
            taskListItem.getTask().setTaskListItems(new ArrayList<>());
            // taskListItem.getTask().setCategory(null);
            taskListItem.getTask().getCategory().setTasks(new ArrayList<>());
            taskListItem.getUser().setTaskListItems(new ArrayList<>());
        }
        return taskListItems;
    }

    public TaskListItem getTaskListItemById(Long taskListItemId) {
        TaskListItem taskListItem = taskListItemRepository.findById(taskListItemId)
                .orElseThrow(() -> new IllegalStateException(
                        "TaskListItem with ID: " + taskListItemId + " does not exist!"));
        taskListItem.getTask().setTaskListItems(new ArrayList<>());
        // taskListItem.getTask().setCategory(null);
        taskListItem.getTask().getCategory().setTasks(new ArrayList<>());
        taskListItem.getUser().setTaskListItems(new ArrayList<>());
        return taskListItem;
    }

    public void addNewTaskListItem(TaskListItem taskListItem, Long employeeId, Long taskId) {
        User assignedEmployee = userRepository.findById(employeeId)
                .orElseThrow(() -> new IllegalStateException("User with ID: " + employeeId + " does not exist!"));
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalStateException("Task with ID: " + taskId + " does not exist!"));
        taskListItem.setUser(assignedEmployee);
        taskListItem.setTask(task);
        TaskListItem savedTaskListItem = taskListItemRepository.saveAndFlush(taskListItem);
        task.addTaskListItem(savedTaskListItem);
        taskRepository.saveAndFlush(task);
        assignedEmployee.addTaskListItem(savedTaskListItem);
        userRepository.saveAndFlush(assignedEmployee);
    }

    public void deleteTaskListItem(Long taskListItemId) {
        TaskListItem taskListItem = taskListItemRepository.findById(taskListItemId)
                .orElseThrow(() -> new IllegalStateException(
                        "TaskListItem with ID: " + taskListItemId + " does not exist!"));
        taskListItem.setUser(null);
        taskListItem.setTask(null);
        taskListItemRepository.deleteById(taskListItemId);
    }

    public void markTaskListItemAsComplete(Long taskListItemId) {
        TaskListItem taskListItem = taskListItemRepository.findById(taskListItemId)
                .orElseThrow(() -> new IllegalStateException(
                        "TaskListItem with ID: " + taskListItemId + " does not exist!"));
        if (!taskListItem.getDone()) {
            taskListItem.setIsDone(true);
        } else {
            throw new IllegalStateException("Already checked!");
        }
        taskListItemRepository.saveAndFlush(taskListItem);
    }

    public List<TaskListItem> getTaskListItemsByTask(Long taskId) {
        return taskListItemRepository.findTaskListItemByTask(taskId).get();
    }

    public List<TaskListItem> getTaskListItemsByEmployee(Long employeeId) {
        List<TaskListItem> taskListItems = taskListItemRepository.findTaskListItemByEmployee(employeeId).get();
        for (TaskListItem t : taskListItems) {
            // t.getUser().setTaskListItems(new ArrayList<>());
            t.setUser(null);
            t.getTask().setTaskListItems(new ArrayList<>());
            t.getTask().getCategory().setTasks(new ArrayList<>());
        }
        return taskListItems;
    }

    public List<TaskListItem> getOnboardingTaskListItemsByEmployee(Long employeeId) {
        List<TaskListItem> taskListItems = new ArrayList<>();
        for (TaskListItem t : this.getTaskListItemsByEmployee(employeeId)) {
            if (t.getTask().getIsOnboarding()) {
                taskListItems.add(t);
            }
        }
        return taskListItems;
    }

    public List<TaskListItem> getOffboardingTaskListItemsByEmployee(Long employeeId) {
        List<TaskListItem> taskListItems = new ArrayList<>();
        for (TaskListItem t : this.getTaskListItemsByEmployee(employeeId)) {
            if (!t.getTask().getIsOnboarding()) {
                taskListItems.add(t);
            }
        }
        return taskListItems;
    }
}
