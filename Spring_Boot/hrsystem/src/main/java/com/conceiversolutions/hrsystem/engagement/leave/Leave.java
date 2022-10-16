package com.conceiversolutions.hrsystem.engagement.leave;

import com.conceiversolutions.hrsystem.enums.LeaveTypeEnum;
import com.conceiversolutions.hrsystem.enums.StatusEnum;
import com.conceiversolutions.hrsystem.user.docdata.DocData;
import com.conceiversolutions.hrsystem.user.user.User;
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
    @Column(name = "leave_id")
    private Long leaveId;
//    @Column(name="leave_dates")
//    @ElementCollection(targetClass = LocalDate.class)
//    private List<LocalDate> dates;
//    @Column(name="remarks", nullable = false)
//    private String remarks;
//    @Column(name="approval_remarks", nullable = true)
//    private String approvalRemarks;
//    @Column(name="approval_status", nullable = false)
//    @Enumerated(EnumType.STRING)
//    private StatusEnum approvalStatus;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;
    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;
    @Column(name = "application_date", nullable = false)
    private LocalDate applicationDate;
    @Column(name = "approval_date")
    private LocalDate approvalDate;
    @Column(name = "application_remarks")
    private String applicationRemarks;
    @Column(name = "approver_remarks")
    private String approverRemarks;
    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private StatusEnum status;
    @OneToOne(fetch = FetchType.LAZY, targetEntity = DocData.class)
    @JoinColumn(name = "supporting_document")
    private DocData supportingDocument;
    @Column(name = "leave_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private LeaveTypeEnum leaveType;
    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class, optional = false)
    private User employee;

    public Leave(LocalDate startDate, LocalDate endDate, String applicationRemarks, DocData supportingDocument, LeaveTypeEnum leaveType, User employee) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.applicationRemarks = applicationRemarks;
        this.supportingDocument = supportingDocument;
        this.leaveType = leaveType;
        this.employee = employee;
        this.applicationDate = LocalDate.now();
    }
}
