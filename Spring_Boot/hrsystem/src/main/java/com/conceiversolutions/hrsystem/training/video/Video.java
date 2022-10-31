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
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

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
    @OneToOne(fetch = FetchType.LAZY, targetEntity = DocData.class)
    @JoinColumn(name = "video")
    private DocData video;
    private Integer position; //position of video in the module

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = Video.class)
    @JoinColumn(name = "module_id")
    private Video moduleVideo;

    @ManyToMany(fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "user_id")
    private List<User> watchedBy;

    public Video() {

    }

    public Video(String title, String description, DocData video, Integer position, List<User> watchedBy) {
        this.title = title;
        this.description = description;
        this.video = video;
        this.position = position;
        this.watchedBy = watchedBy;
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

    public DocData getVideo() {
        return video;
    }

    public void setVideo(DocData video) {
        this.video = video;
    }

    public com.conceiversolutions.hrsystem.training.video.Video getModuleVideo() {
        return moduleVideo;
    }

    public void setModuleVideo(com.conceiversolutions.hrsystem.training.video.Video moduleVideo) {
        this.moduleVideo = moduleVideo;
    }

    @java.lang.Override
    public java.lang.String toString() {
        return "Video{" +
                "videoId=" + videoId +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", video=" + video +
                ", position=" + position +
                ", moduleVideo=" + moduleVideo +
                ", watchedBy=" + watchedBy +
                '}';
    }
}