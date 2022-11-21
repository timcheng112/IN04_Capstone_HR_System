package com.conceiversolutions.hrsystem.engagement.reward;

import com.conceiversolutions.hrsystem.engagement.rewardtrack.RewardTrack;
import com.conceiversolutions.hrsystem.engagement.rewardtrack.RTRewardInstance;
import com.conceiversolutions.hrsystem.user.docdata.DocData;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
//import java.sql.Blob;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name="rewards")
public class Reward {

    //attributes
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    @Column(name="reward_id")
    private Long rewardId;
    @Column(name="reward_name")
    private String name;
    @Column(name="reward_description")
    private String description;
    @Column(name = "points_required")
    private Integer pointsRequired;
    @Column(name="expiry_date")
    private LocalDate expiryDate;

    //relationships
    @ManyToOne
    @JoinColumn(name="reward_track_id")
    private RewardTrack rewardTrack;
    @OneToOne(fetch = FetchType.LAZY, targetEntity = DocData.class)
    @JoinColumn(name="reward_image")
    private DocData image;
    @OneToMany(targetEntity = RTRewardInstance.class, fetch = FetchType.LAZY, mappedBy = "reward")
    private List<RTRewardInstance> rewardInstances;

    //constructors
    public Reward(String name, String description, Integer pointsRequired, LocalDate expiryDate, DocData image, RewardTrack rewardTrack) {
        this();
        this.name = name;
        this.description = description;
        this.image = image;
        this.expiryDate = expiryDate;
        this.rewardTrack = rewardTrack;
        this.pointsRequired = pointsRequired;

    }

    public Reward() {
        this.rewardInstances = new ArrayList<>();
    }

    @Override
    public String toString() {
        return "Reward{" +
                "rewardId=" + rewardId +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", pointsRequired=" + pointsRequired +
                ", expiryDate=" + expiryDate +
                '}';
    }
}
