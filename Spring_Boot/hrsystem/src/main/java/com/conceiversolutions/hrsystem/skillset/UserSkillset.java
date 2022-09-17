package com.conceiversolutions.hrsystem.skillset;

import com.conceiversolutions.hrsystem.jobManagement.JobRequest;

import javax.persistence.*;

@Entity
@Table(name="userSkillsets")
public class UserSkillset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userSkillsetId;
    @Column(nullable = true, length = 1)
    private Integer skillLevel;
    @Column(nullable = true, length = 255)
    private String skillDescription;
    @OneToOne(targetEntity = Skillset.class, fetch = FetchType.LAZY, optional = false)
    private Skillset skillset;

    public UserSkillset() {
    }

    public UserSkillset(Long userSkillsetId, Integer skillLevel, String skillDescription, Skillset skillset) {
        this.userSkillsetId = userSkillsetId;
        this.skillLevel = skillLevel;
        this.skillDescription = skillDescription;
        this.skillset = skillset;
    }

    public Long getUserSkillsetId() {
        return userSkillsetId;
    }

    public void setUserSkillsetId(Long userSkillsetId) {
        this.userSkillsetId = userSkillsetId;
    }

    public Integer getSkillLevel() {
        return skillLevel;
    }

    public void setSkillLevel(Integer skillLevel) {
        this.skillLevel = skillLevel;
    }

    public String getSkillDescription() {
        return skillDescription;
    }

    public void setSkillDescription(String skillDescription) {
        this.skillDescription = skillDescription;
    }

    public Skillset getSkillset() {
        return skillset;
    }

    public void setSkillset(Skillset skillset) {
        this.skillset = skillset;
    }

    @Override
    public String toString() {
        return "UserSkillset{" +
                "userSkillsetId=" + userSkillsetId +
                ", skillLevel=" + skillLevel +
                ", skillDescription='" + skillDescription + '\'' +
                ", skillset=" + skillset +
                '}';
    }
}
