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
            taskListItem.getTask().setCategory(null);
            taskListItem.getUser().setTaskListItems(new ArrayList<>());
        }
        return taskListItems;
    }

    public TaskListItem getTaskListItemById(Long taskListItemId) {
        TaskListItem taskListItem = taskListItemRepository.findById(taskListItemId)
                .orElseThrow(() -> new IllegalStateException(
                        "TaskListItem with ID: " + taskListItemId + " does not exist!"));
        taskListItem.getTask().setTaskListItems(new ArrayList<>());
        taskListItem.getTask().setCategory(null);
        taskListItem.getUser().setTaskListItems(new ArrayList<>());
        return taskListItem;
    }

    public void addNewTaskListItem(TaskListItem taskListItem, Long employeeId, Long taskId) {
        User assignedEmployee = userRepository.findById(employeeId).get();
        Task task = taskRepository.findById(taskId).get();
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
        taskListItem.setIsDone(true);
        taskListItemRepository.saveAndFlush(taskListItem);
    }

    public List<TaskListItem> getTaskListItemsByTask(Long taskId) {
        return taskListItemRepository.findTaskListItemByTask(taskId).get();
    }

    public List<TaskListItem> getTaskListItemsByEmployee(Long employeeId) {
        return taskListItemRepository.findTaskListItemByEmployee(employeeId).get();
    }
}
