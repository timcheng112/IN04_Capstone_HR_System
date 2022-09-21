package com.conceiversolutions.hrsystem.administration.category;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.conceiversolutions.hrsystem.administration.task.Task;

@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long categoryId;
    private String description;

    @OneToMany(fetch = FetchType.LAZY, targetEntity = Task.class, mappedBy = "taskId")
    @Column(name = "task_id")
    private List<Task> tasks;

    public Category() {

    }

    public Category(String description, List<Task> tasks) {
        this.description = description;
        this.tasks = tasks;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    @Override
    public String toString() {
        return "Category{" +
                "categoryId=" + categoryId +
                ", description='" + description + '\'' +
                ", tasks=" + tasks +
                '}';
    }
}