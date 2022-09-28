package com.conceiversolutions.hrsystem.administration.tasklistitem;

import javax.persistence.*;

import com.conceiversolutions.hrsystem.administration.task.Task;
import com.conceiversolutions.hrsystem.user.user.User;

@Entity
@Table(name = "task_list_items")
public class TaskListItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_list_item_id", nullable = false)
    private Long taskListItemId;
    @Column(name = "is_done", nullable = false)
    private Boolean isDone;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = Task.class)
    @JoinColumn(name = "task_id")
    private Task task;

    public TaskListItem() {
    }

    public TaskListItem(Boolean isDone, User user, Task task) {
        this.isDone = isDone;
        this.user = user;
        this.task = task;
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

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    @Override
    public String toString() {
        return "TaskListItem [isDone=" + isDone + ", task=" + task + ", taskListItemId=" + taskListItemId + ", user="
                + user + "]";
    }
}
