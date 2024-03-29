package com.conceiversolutions.hrsystem.engagement.leave;

import com.conceiversolutions.hrsystem.enums.StatusEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeaveRepository extends JpaRepository<Leave,Long> {

    List<Leave> findJobRequestsByStatus(StatusEnum status);

    @Query("SELECT l FROM Leave l WHERE l.employee.userId = ?1")
    List<Leave> findLeavesByEmployeeId(Long employeeId);

}
