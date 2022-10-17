package com.conceiversolutions.hrsystem.training.video;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.conceiversolutions.hrsystem.training.video.Video;

@Service
public class VideoService {

    @Autowired
    private final VideoRepository videoRepository;

    public VideoService(VideoRepository videoRepository) {
        this.videoRepository = videoRepository;
    }

    public List<Video> getVideos() {
        return videoRepository.findAll();
    }
}