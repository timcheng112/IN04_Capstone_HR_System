package com.conceiversolutions.hrsystem.training.video;

import java.sql.Blob;
import java.util.List;
import javax.persistence.*;

import com.conceiversolutions.hrsystem.training.module.Module;
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
    private Blob video;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "user_id")
    private List<User> watchedBy;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = Module.class)
    @JoinColumn(name = "module_id")
    private Module module;

    public Video() {

    }

    public Video(String title, String description, Blob video, List<User> watchedBy, Module module) {
        this.title = title;
        this.description = description;
        this.video = video;
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

    public Blob getVideo() {
        return video;
    }

    public void setVideo(Blob video) {
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

    @Override
    public String toString() {
        return "Video{" +
                "videoId=" + videoId +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", video=" + video +
                ", watchedBy=" + watchedBy +
                ", module=" + module +
                '}';
    }
}