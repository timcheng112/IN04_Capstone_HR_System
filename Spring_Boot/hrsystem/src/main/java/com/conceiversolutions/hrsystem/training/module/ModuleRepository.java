package com.conceiversolutions.hrsystem.training.module;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.conceiversolutions.hrsystem.training.video.Video;

@Repository
public interface ModuleRepository extends JpaRepository<Module, Long> {
    @Query("SELECT m FROM Module m WHERE m.title = ?1")
    Optional<Module> findModuleByTitle(String moduleTitle);

    @Query("SELECT m.videoList FROM Module m WHERE m.moduleId = ?1")
    Iterable<Video> getVideosInModule(Long moduleId);
}