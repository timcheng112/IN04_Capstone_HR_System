package com.conceiversolutions.hrsystem.engagement.reward;

import com.conceiversolutions.hrsystem.engagement.reward.Reward;
import com.conceiversolutions.hrsystem.user.user.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name="rt_reward_instance")
public class RTRewardInstance {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    @Column(name="rt_reward_id")
    private Long rtRewardId;

    @Column(name="date_claimed")
    private LocalDate dateClaimed;

//    @Column(name = "is_claimed")
//    private Boolean isClaimed;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = Reward.class, optional = false)
    private Reward reward;
    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class, optional = false)
    private User recipient;

    public RTRewardInstance() {
        this.dateClaimed = LocalDate.now();
    }

    public RTRewardInstance(Reward reward, User recipient) {
        this();
        this.reward = reward;
        this.recipient = recipient;
    }
}
