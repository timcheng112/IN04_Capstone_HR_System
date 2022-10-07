package com.conceiversolutions.hrsystem.engagement.leave;

import com.conceiversolutions.hrsystem.enums.StatusEnum;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "leaves")
@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
public class Leave {
    //attributes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="leave_id")
    private Long leaveId;
    @Column(name="leave_dates")
    @ElementCollection(targetClass = LocalDate.class)
    private List<LocalDate> dates;
    @Column(name="remarks", nullable = false)
    private String remarks;
    @Column(name="approval_remarks", nullable = true)
    private String approvalRemarks;
    @Column(name="approval_status", nullable = false)
    @Enumerated(EnumType.STRING)
    private StatusEnum approvalStatus;

    public Leave(List<LocalDate> dates, String remarks) {
        this.dates = dates;
        this.remarks = remarks;
        this.approvalStatus = StatusEnum.PENDING;
        this.approvalRemarks = null;
    }
}
