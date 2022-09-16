package com.conceiversolutions.hrsystem.Reward;

import javax.persistence.*;
import java.sql.Blob;
import java.time.LocalDate;

@Entity
@Table
public class Reward {
    @Id
    @SequenceGenerator(
            name="reward_sequence",
            sequenceName = "reward_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.IDENTITY,
            generator = "rewards_reward_sequence"
    )
    private Long id;
    private String name;
    private String description;
    private Blob image;
    private LocalDate dateClaimed;

    public Reward(String name, String description, Blob image, LocalDate dateClaimed) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.dateClaimed = dateClaimed;
    }

    public Reward(Long id, String name, String description, Blob image, LocalDate dateClaimed) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.dateClaimed = dateClaimed;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    @Override
    public String toString() {
        return "Reward{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", image=" + image +
                ", dateClaimed=" + dateClaimed +
                '}';
    }
}
