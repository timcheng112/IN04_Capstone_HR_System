package com.conceiversolutions.hrsystem.user.reactivationrequest;

import com.conceiversolutions.hrsystem.user.user.User;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reactivation_requests")
@ToString
@Getter
@Setter
public class ReactivationRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reactivation_request_id")
    private Long reactivationRequestId;
    @Column(nullable = false, name = "request_date")
    private LocalDateTime requestDate;
    @Column(nullable = false)
    private String reason;
    @OneToOne(mappedBy = "reactivationRequest", optional = true)
    private User user;
    @Column(nullable = false)
    private Boolean closed;

    public ReactivationRequest() {
    }

    public ReactivationRequest(LocalDateTime requestDate, String reason, User user) {
        this.requestDate = requestDate;
        this.reason = reason;
        this.user = user;
        this.closed = false;
    }
}
