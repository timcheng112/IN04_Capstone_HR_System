package com.conceiversolutions.hrsystem.Reward;

import javax.persistence.*;
import java.sql.Blob;
import java.time.LocalDate;

@Entity
@Table
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
    @Column(name="reward_image")
    private Blob image;
    @Column(name="date_claimed")
    private LocalDate dateClaimed;

    @Column(name="expiry_date")
    private LocalDate expiryDate;

    //relationships

    //constructors
    public Reward(String name, String description, Blob image, LocalDate dateClaimed, LocalDate expiryDate) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.dateClaimed = dateClaimed;
        this.expiryDate = expiryDate;
    }

    public Reward() {
    }

    public Reward(Long rewardId, String name, String description, Blob image, LocalDate dateClaimed, LocalDate expiryDate) {
        this.rewardId = rewardId;
        this.name = name;
        this.description = description;
        this.image = image;
        this.dateClaimed = dateClaimed;
        this.expiryDate = expiryDate;
    }

    //getters and setters
    public Long getRewardId() {
        return rewardId;
    }

    public void setRewardId(Long rewardId) {
        this.rewardId = rewardId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Blob getImage() {
        return image;
    }

    public void setImage(Blob image) {
        this.image = image;
    }

    public LocalDate getDateClaimed() {
        return dateClaimed;
    }

    public void setDateClaimed(LocalDate dateClaimed) {
        this.dateClaimed = dateClaimed;
    }

    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }

    @Override
    public String toString() {
        return "Reward{" +
                "id=" + rewardId +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", image=" + image +
                ", dateClaimed=" + dateClaimed +
                '}';
    }
}
