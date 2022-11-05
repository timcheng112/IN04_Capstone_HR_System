package com.conceiversolutions.hrsystem.jobmanagement.jobposting;

import com.conceiversolutions.hrsystem.enums.JobStatusEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobPostingRepository extends JpaRepository<JobPosting, Long> {
    @Query("SELECT jp FROM JobPosting jp WHERE jp.isActive = TRUE AND jp.status =?1")
    List<JobPosting> findOpenPostings(JobStatusEnum enum1);

    @Query("SELECT jp FROM JobPosting jp WHERE jp.postingId =? 1 AND jp.isActive = TRUE AND jp.status =?2")
    Optional<JobPosting> getValidPosting(Long postingId, JobStatusEnum enum1);
}
