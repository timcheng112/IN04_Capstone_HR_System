package com.conceiversolutions.hrsystem.administration.tasklistitem;

import javax.persistence.*;

import com.conceiversolutions.hrsystem.administration.task.Task;
import com.conceiversolutions.hrsystem.user.user.User;

public class TaskListItem {
    private Long taskListItemId;
    private Boolean isDone;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = Task.class)
    @JoinColumn(name = "task_id")
    private Task tasks;

    public TaskListItem() {
    }

    public TaskListItem(Boolean isDone, User user, Task tasks) {
        this.isDone = isDone;
        this.user = user;
        this.tasks = tasks;
    }

    public Long getTaskListItemId() {
        return taskListItemId;
    }

    public void setTaskListItemId(Long taskListItemId) {
        this.taskListItemId = taskListItemId;
    }

    public Boolean getIsDone() {
        return isDone;
    }

    public void setIsDone(Boolean isDone) {
        this.isDone = isDone;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Task getTasks() {
        return tasks;
    }

    public void setTasks(Task tasks) {
        this.tasks = tasks;
    }

    @Override
    public String toString() {
        return "TaskListItem [isDone=" + isDone + ", taskListItemId=" + taskListItemId + ", tasks=" + tasks + ", user="
                + user + "]";
    }

}
