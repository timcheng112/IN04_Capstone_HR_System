package com.conceiversolutions.hrsystem.training.video;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;

@Service
public class VideoService {

    @Autowired
    private final VideoRepository videoRepository;
    @Autowired
    private final UserRepository userRepository;

    public VideoService(VideoRepository videoRepository, UserRepository userRepository) {
        this.videoRepository = videoRepository;
        this.userRepository = userRepository;
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
        v.setTitle(video.getTitle());
        v.setDescription(video.getDescription());
        v.setVideo(video.getVideo());
        return v.getTitle() + " has been successfully edited";
    }

    public void deleteVideo(Long videoId) {
        if (!videoRepository.existsById(videoId)) {
            throw new IllegalStateException("Video with id " + videoId + " does not exist");
        }
        videoRepository.deleteById(videoId);
    }

    public String markAsWatched(Long videoId, Long userId) throws Exception {
        Optional<Video> optionalVideo = videoRepository.findById(videoId);
        if (optionalVideo.isPresent()) {
            Video v = optionalVideo.get();
            Optional<User> employeeOptional = userRepository.findById(userId);
            if (employeeOptional.isPresent()) {
                User employee = employeeOptional.get();
                List<User> watchedBy = v.getWatchedBy();
                if (watchedBy == null) {
                    v.setWatchedBy(new ArrayList<>());
                    System.out.println("watchedBy" + watchedBy);
                } 
                v.getWatchedBy().add(employee);
                System.out.println("v get " + v.getWatchedBy());
                videoRepository.save(v);
                return employee.getFirstName() + " " + employee.getLastName() + "'s view of " + v.getTitle()
                        + " has been recorded";
            } else {
                throw new IllegalStateException("User does not exist");
            }
        } else

        {
            throw new IllegalStateException("Video does not exist");
        }
    }

    public Boolean getWatched(Long videoId, Long userId) throws Exception {
        Video v = getVideo(videoId);
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            return v.getWatchedBy().contains(optionalUser.get());
        } else {
            throw new IllegalStateException("User does not exist");
        }
    }

}