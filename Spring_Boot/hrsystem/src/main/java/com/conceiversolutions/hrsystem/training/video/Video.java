package com.conceiversolutions.hrsystem.training.video;

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
import javax.persistence.Table;

import com.conceiversolutions.hrsystem.training.module.Module;
import com.conceiversolutions.hrsystem.user.docdata.DocData;
import com.conceiversolutions.hrsystem.user.user.User;

@Entity
@Table(name = "videos")
public class Video {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "video_id")
    private Long videoId;
    private String title;
    private String description;
    private String video;
    private Integer position; //position of video in the module

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "user_id")
    private List<User> watchedBy;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = Module.class)
    @JoinColumn(name = "module_id")
    private Module module;

    public Video() {

    }

    public Video(String title, String description, String video, Integer position, List<User> watchedBy, Module module) {
        this.title = title;
        this.description = description;
        this.video = video;
        this.position = position;
        this.watchedBy = watchedBy;
        this.module = module;
    }

    public Long getVideoId() {
        return videoId;
    }

    public void setVideoId(Long videoId) {
        this.videoId = videoId;
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

    public String getVideo() {
        return video;
    }

    public void setVideo(String video) {
        this.video = video;
    }

    public Module getModule() {
        return module;
    }

    public void setModule(Module module) {
        this.module = module;
    }

    public List<User> getWatchedBy() {
        return watchedBy;
    }

    public void setWatchedBy(List<User> watchedBy) {
        this.watchedBy = watchedBy;
    }

    public Integer getPosition() {
        return position;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }

    @java.lang.Override
    public java.lang.String toString() {
        return "Video{" +
                "videoId=" + videoId +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", video=" + video +
                ", position=" + position +
                ", watchedBy=" + watchedBy +
                ", module=" + module +
                '}';
    }
}