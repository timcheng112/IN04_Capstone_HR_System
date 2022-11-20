package com.conceiversolutions.hrsystem.jobmanagement.jobapplication;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

    @Query("SELECT ja FROM JobApplication ja WHERE ja.jobPosting.postingId =?1")
    List<JobApplication> findApplicationsByPostingId(Long postingId);

    @Query("SELECT ja FROM JobApplication ja WHERE ja.applicant.userId =?1")
    List<JobApplication> findApplicationsByApplicantId(Long applicantId);

    @Query("SELECT ja FROM JobApplication ja WHERE ja.jobPosting.postingId =?1 AND ja.applicant.userId =?2")
    Optional<JobApplication> findApplicantApplication(Long postingId, Long applicantId);
}
