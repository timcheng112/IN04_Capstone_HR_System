package com.conceiversolutions.hrsystem.training.video;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import com.conceiversolutions.hrsystem.training.module.Module;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.conceiversolutions.hrsystem.training.module.ModuleRepository;

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

    public Video getVideo(Long videoId) throws Exception {
        Optional<Video> optionalVideo = videoRepository.findById(videoId);
        if (optionalVideo.isPresent()) {
            return optionalVideo.get();
        } else {
            throw new IllegalStateException("Video doesn't exist");
        }
    }
}