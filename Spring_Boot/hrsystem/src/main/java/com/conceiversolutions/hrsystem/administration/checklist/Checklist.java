package com.conceiversolutions.hrsystem.administration.checklist;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.conceiversolutions.hrsystem.administration.task.Task;
import com.conceiversolutions.hrsystem.user.user.User;

@Entity
@Table(name = "checklists")
public class Checklist {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "checklist_id")
  private Long checklistId;
  private String title;

  private String description;

  // @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval =
  // true)
  // private List<Task> tasks = new ArrayList<>();

  @ManyToMany(cascade = CascadeType.ALL)
  @JoinTable(name = "checklist_task", joinColumns = @JoinColumn(name = "task_id"), inverseJoinColumns = @JoinColumn(name = "checklist_id"))
  public List<Task> tasks = new ArrayList<>();

  public Checklist() {

  }

  public Checklist(String title, String description) {
    this.title = title;
    this.description = description;
    this.tasks = new ArrayList<>();
  }

  public Checklist(String title, String description, List<Task> tasks) {
    this.title = title;
    this.description = description;
    this.tasks = tasks;
  }

  public Long getChecklistId() {
    return checklistId;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
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

  public List<Task> addTask(Task task) {
    this.tasks.add(task);
    return this.tasks;
  }

  public List<Task> removeTask(Task task) {
    this.tasks.remove(task);
    return this.tasks;
  }

  @Override
  public String toString() {
    return "Checklist{" +
        "checklistId=" + checklistId +
        ", title='" + title + '\'' +
        ", description='" + description + '\'' +
        ", tasks=" + tasks +
        '}';
  }

}
