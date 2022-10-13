package com.conceiversolutions.hrsystem.training.video;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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

}