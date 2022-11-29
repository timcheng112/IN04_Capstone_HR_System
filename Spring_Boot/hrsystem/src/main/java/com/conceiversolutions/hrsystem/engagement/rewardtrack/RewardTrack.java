package com.conceiversolutions.hrsystem.engagement.rewardtrack;

import com.conceiversolutions.hrsystem.engagement.reward.Reward;
import com.conceiversolutions.hrsystem.organizationstructure.department.Department;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name="reward_track")
public class RewardTrack {
    //attributes
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    @Column(name="reward_track_id")
    private Long rewardTrackId;
    @Column(name = "name")
    private String name;
    @Column(name="start_date")
    private LocalDate startDate;
    @Column(name="end_date")
    private LocalDate endDate;

    //relationships
    @OneToMany(mappedBy ="rewardTrack", fetch = FetchType.LAZY, targetEntity = Reward.class)
    private List<Reward> rewards;
    @ManyToOne(fetch = FetchType.LAZY, targetEntity = Department.class, optional = false)
    private Department department;

    //constructors
    public RewardTrack() {
        this.rewards = new ArrayList<>();
    }

    public RewardTrack(String name, LocalDate startDate, LocalDate endDate, Department department) {
        this();
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.department = department;
    }

    @Override
    public String toString() {
        return "RewardTrack{" +
                "rewardTrackId=" + rewardTrackId +
                ", name=" + name +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                '}';
    }
}
