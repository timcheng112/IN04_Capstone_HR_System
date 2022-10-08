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
import javax.persistence.ManyToMany;
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
    private String thumbnail;

    @OneToMany(fetch = FetchType.LAZY, targetEntity = Video.class, mappedBy = "videoId")
    @Column(name = "videos")
    private List<String> videoList;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "assigned_to", referencedColumnName = "user_id")
    private List<User> employees;

    public Module() {

    }

    public Module(String title, String description, String thumbnail, List<String> videoList, List<User> employees) {
        this.title = title;
        this.description = description;
        this.thumbnail = thumbnail;
        this.videoList = videoList;
        this.employees = employees;
    }

    public Module(String title, String description, String thumbnail, List<String> videoList) {
        this.title = title;
        this.description = description;
        this.thumbnail = thumbnail;
        this.videoList = videoList;
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

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public List<String> getVideoList() {
        return videoList;
    }

    public void setVideoList(List<String> videoList) {
        this.videoList = videoList;
    }

    public List<User> getEmployees() {
        return employees;
    }

    public void setEmployees(List<User> employees) {
        this.employees = employees;
    }

    @java.lang.Override
    public java.lang.String toString() {
        return "Module{" +
                "moduleId=" + moduleId +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", videoList=" + videoList +
                ", employees=" + employees +
                '}';
    }
}