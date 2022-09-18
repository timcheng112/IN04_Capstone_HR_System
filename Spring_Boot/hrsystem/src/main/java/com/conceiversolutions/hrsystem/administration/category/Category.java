package com.conceiversolutions.hrsystem.administration.category;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.conceiversolutions.hrsystem.administration.task.Task;

import java.util.List;

@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long cateogryId;
    private String description;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = Task.class)
    @JoinColumn(name = "task_id")
    private List<Task> tasks;

    public Category() {

    }

    public Category(String description, List<Task> tasks) {
        this.description = description;
        this.tasks = tasks;
    }

    public Long getCateogryId() {
        return cateogryId;
    }

    public void setCateogryId(Long cateogryId) {
        this.cateogryId = cateogryId;
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
                "cateogryId=" + cateogryId +
                ", description='" + description + '\'' +
                ", tasks=" + tasks +
                '}';
    }
}
