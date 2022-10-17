package com.conceiversolutions.hrsystem.training.video;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {
    @Query("SELECT v FROM Video v WHERE v.title = ?1 OR v.description = ?1")
    Iterable<Video> searchVideos(String searchTerm);
}
