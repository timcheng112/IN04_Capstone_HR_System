package com.conceiversolutions.hrsystem.RewardTrack;

import com.conceiversolutions.hrsystem.Reward.Reward;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table
public class RewardTrack {
    //attributes
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    @Column(name="reward_track_id")
    private Long rewardTrackId;
    @Column(name="start_date")
    private LocalDate startDate;
    @Column(name="end_date")
    private LocalDate endDate;

    //relationships
    @OneToMany(mappedBy ="rewardTrack", targetEntity = Reward.class)
    private List<Reward> rewards;

    //constructors
    public RewardTrack() {
        this.rewards = new ArrayList<>();
    }

    public RewardTrack(LocalDate startDate, LocalDate endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.rewards = new ArrayList<>();
    }

    //getters and setters
    public Long getRewardTrackId() {
        return rewardTrackId;
    }

    public void setRewardTrackId(Long rewardTrackId) {
        this.rewardTrackId = rewardTrackId;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    @Override
    public String toString() {
        return "RewardTrack{" +
                "rewardTrackId=" + rewardTrackId +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                '}';
    }
}
