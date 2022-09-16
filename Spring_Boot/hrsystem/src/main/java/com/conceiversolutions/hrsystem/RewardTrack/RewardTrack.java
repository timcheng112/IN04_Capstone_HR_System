package com.conceiversolutions.hrsystem.RewardTrack;

import javax.persistence.*;
import java.time.LocalDate;

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

    //constructors
    public RewardTrack() {
    }

    public RewardTrack(LocalDate startDate, LocalDate endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
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
