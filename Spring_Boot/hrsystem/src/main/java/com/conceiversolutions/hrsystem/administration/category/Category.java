package com.conceiversolutions.hrsystem.administration.category;

import java.util.ArrayList;
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
    private String name;

    @OneToMany(fetch = FetchType.LAZY, targetEntity = Task.class, mappedBy = "category")
    @Column(name = "task_id")
    private List<Task> tasks;

    public Category() {

    }

    public Category(String name) {
        this.name = name;
        this.tasks = new ArrayList<>();
    }

    public Category(String name, List<Task> tasks) {
        this.name = name;
        this.tasks = tasks;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public List<Task> addTask(Task task) {
        this.tasks.add(task);
        return this.tasks;
    }

    public List<Task> removeTask(Task task) {
        this.tasks.remove(task);
        return this.tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    @Override
    public String toString() {
        return "Category{" +
                "categoryId=" + categoryId +
                ", name='" + name + '\'' +
                ", tasks=" + tasks +
                '}';
    }
}