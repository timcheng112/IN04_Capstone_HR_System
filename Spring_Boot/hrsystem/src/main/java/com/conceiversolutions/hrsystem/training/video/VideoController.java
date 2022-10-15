package com.conceiversolutions.hrsystem.training.video;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/video")
public class VideoController {

    private final VideoService videoService;

    public VideoController(VideoService videoService) {
        this.videoService = videoService;
    }

    @GetMapping
    public Iterable<Video> getVideos() {
        return videoService.getVideos();
    }

    @GetMapping(path = "{videoId}")
    public Video getVideo(@PathVariable("videoId") Long videoId) throws Exception {
        return videoService.getVideo(videoId);
    }

    @PutMapping(path = "{videoId}")
    public String editVideo(@PathVariable("videoId") Long videoId, @RequestBody Video video) throws Exception {
        return videoService.editVideo(videoId, video);
    }

    @DeleteMapping(path = "{videoId}")
    public void deleteVideo(@PathVariable("videoId") Long videoId) {
        videoService.deleteVideo(videoId);
    }

    @PostMapping(path = "{videoId}/user/{userId}")
    public String markAsWatched(@PathVariable("videoId") Long videoId, @PathVariable("userId") Long userId) throws Exception {
        return videoService.markAsWatched(videoId, userId);
    }

    @GetMapping(path = "{videoId}/user/{userId}")
    public Boolean getWatched(@PathVariable("videoId") Long videoId, @PathVariable("userId") Long userId) throws Exception {
        return videoService.getWatched(videoId, userId);
    }

}