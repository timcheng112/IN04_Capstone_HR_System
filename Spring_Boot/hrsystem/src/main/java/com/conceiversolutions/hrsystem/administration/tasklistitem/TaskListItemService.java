package com.conceiversolutions.hrsystem.administration.tasklistitem;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.conceiversolutions.hrsystem.administration.task.TaskRepository;
import com.conceiversolutions.hrsystem.user.user.User;

@Service
public class TaskListItemService {

    private final TaskListItemRepository taskListItemRepository;
    private final TaskRepository taskRepository;

    @Autowired
    public TaskListItemService(TaskListItemRepository taskListItemRepository, TaskRepository taskRepository) {
        this.taskListItemRepository = taskListItemRepository;
        this.taskRepository = taskRepository;
    }

    public List<TaskListItem> getTaskListItems() {
        List<TaskListItem> taskListItems = taskListItemRepository.findAll();
        for (TaskListItem taskListItem : taskListItems) {
            taskListItem.getTask();
            taskListItem.getUser();
        }
        return taskListItems;
    }

    public void addNewTaskListItem(TaskListItem taskListItem, User assignedEmployee, Long taskId) {
        taskListItem.setUser(assignedEmployee);
        taskRepository.findById(taskId);
        taskListItemRepository.save(taskListItem);
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
    }
}
