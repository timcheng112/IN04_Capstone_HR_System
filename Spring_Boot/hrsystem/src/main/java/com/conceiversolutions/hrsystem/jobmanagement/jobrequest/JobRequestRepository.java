package com.conceiversolutions.hrsystem.jobmanagement.jobrequest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRequestRepository extends JpaRepository<JobRequest, Long> {
    @Query("SELECT jr FROM JobRequest jr WHERE jr.jobTitle LIKE %:title%")
    List<JobRequest> findJobRequestsByIncludeTitle(@Param("title") String title);

    @Query("SELECT jr FROM JobRequest jr WHERE jr.jobDescription LIKE %:description%")
    List<JobRequest> findJobRequestsByIncludeDescription(@Param("description") String description);

    @Query("SELECT jr FROM JobRequest jr WHERE jr.department.departmentId = ?1")
    List<JobRequest> findJobRequestsByDepartmentId(Long departmentId);

    @Query("SELECT jr FROM JobRequest jr WHERE jr.requestor.userId = ?1")
    List<JobRequest> findJobRequestsByRequestorId(Long requestorId);

    @Query("SELECT jr FROM JobRequest jr WHERE jr.approver.userId = ?1")
    List<JobRequest> findJobRequestsByApproverId(Long approverId);
}
