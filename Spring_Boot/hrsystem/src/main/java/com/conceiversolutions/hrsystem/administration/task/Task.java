package com.conceiversolutions.hrsystem.administration.task;

import com.conceiversolutions.hrsystem.administration.category.Category;
import com.conceiversolutions.hrsystem.administration.tasklistitem.TaskListItem;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_id")
    private Long taskId;

    @Column(nullable = true, unique = true)
    private String name;
    @Column(nullable = true)
    private String description;
    @Column(nullable = true, name = "is_onboarding")
    private Boolean isOnboarding;
    @Column(nullable = true, name = "auto_assign")
    private Boolean autoAssign;

    public Boolean getAutoAssign() {
        return autoAssign;
    }

    public void setAutoAssign(Boolean autoAssign) {
        this.autoAssign = autoAssign;
    }

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = Category.class)
    @JoinColumn(name = "category_id")
    private Category category;
    @OneToMany(fetch = FetchType.LAZY, targetEntity = TaskListItem.class, mappedBy = "task")
    @Column(name = "task_list_items")
    private List<TaskListItem> taskListItems;

    public Task() {
    }

    public Task(String name, String description, Boolean isOnboarding, Boolean autoAssign ) {
        this.name = name;
        this.description = description;
        this.isOnboarding = isOnboarding;
        this.autoAssign = autoAssign;
        this.taskListItems = new ArrayList<>();
    }

    public Task(String name, String description, Boolean isOnboarding, Boolean autoAssign, Category category,
            List<TaskListItem> taskListItems) {
        this.name = name;
        this.description = description;
        this.isOnboarding = isOnboarding;
        this.autoAssign = autoAssign;
        this.category = category;
        this.taskListItems = taskListItems;
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getIsOnboarding() {
        return isOnboarding;
    }

    public void setIsOnboarding(Boolean isOnboarding) {
        this.isOnboarding = isOnboarding;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<TaskListItem> getTaskListItems() {
        return taskListItems;
    }

    public void setTaskListItems(List<TaskListItem> taskListItems) {
        this.taskListItems = taskListItems;
    }

    public List<TaskListItem> addTaskListItem(TaskListItem taskListItem) {
        this.taskListItems.add(taskListItem);
        return this.taskListItems;
    }

    public List<TaskListItem> removeTaskListItem(TaskListItem taskListItem) {
        this.taskListItems.remove(taskListItem);
        return this.taskListItems;
    }

    @Override
    public String toString() {
        return "Task [category=" + category + ", description=" + description + ", isOnboarding=" + isOnboarding
                + ", name=" + name + ", taskId=" + taskId + ", taskListItems=" + taskListItems + "]";
    }

}