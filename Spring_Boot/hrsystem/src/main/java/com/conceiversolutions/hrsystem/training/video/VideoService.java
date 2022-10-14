package com.conceiversolutions.hrsystem.training.video;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    @Transactional
    public String editVideo(Long videoId, Video video) throws Exception {
        System.out.println("VideoService.editVideo");
        Video v = getVideo(videoId);
        System.out.println("get Vid " + v.getTitle());
        v.setTitle(video.getTitle());
        v.setDescription(video.getDescription());
        v.setVideo(video.getVideo());
        System.out.println("get Vid 2 " + v.getTitle());
        return v.getTitle() + " has been successfully edited";
    }

    public void deleteVideo(Long videoId) {
        if(!videoRepository.existsById(videoId)) {
            throw new IllegalStateException("Video with id " + videoId + " does not exist");
        } 
        videoRepository.deleteById(videoId);
    }

}