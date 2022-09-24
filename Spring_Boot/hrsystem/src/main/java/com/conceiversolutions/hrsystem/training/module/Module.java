package com.conceiversolutions.hrsystem.training.module;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.conceiversolutions.hrsystem.training.video.Video;
import com.conceiversolutions.hrsystem.user.user.User;

@Entity
@Table(name = "modules")
public class Module {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "module_id")
    private Long moduleId;
    private String title;
    private String description;

    @OneToMany(fetch = FetchType.LAZY, targetEntity = Video.class, mappedBy = "videoId")
    @Column(name = "videos")
    private List<Video> videoList;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "employee")
    private User employee;

    public Module() {

    }

    public Module(String title, String description, List<Video> videoList) {
        this.title = title;
        this.description = description;
        this.videoList = videoList;
    }

    public Module(String title, String description, List<Video> videoList, User employee) {
        this.title = title;
        this.description = description;
        this.videoList = videoList;
        this.employee = employee;
    }

    public Long getModuleId() {
        return moduleId;
    }

    public void setModuleId(Long moduleId) {
        this.moduleId = moduleId;
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

    public List<Video> getVideoList() {
        return videoList;
    }

    public void setVideoList(List<Video> videoList) {
        this.videoList = videoList;
    }

    public User getEmployee() {
        return employee;
    }

    public void setEmployee(User employee) {
        this.employee = employee;
    }

    @Override
    public String toString() {
        return "Module{" +
                "moduleId=" + moduleId +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", videoList=" + videoList +
                ", employee=" + employee +
                '}';
    }
}