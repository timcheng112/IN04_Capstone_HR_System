package com.conceiversolutions.hrsystem.skillset;

import javax.persistence.*;

@Entity
@Table(name="jobSkillsets")
public class JobSkillset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long jobSkillsetId;
    @Column(nullable = true, length = 1)
    private Integer skillLevel;
    @Column(nullable = true, length = 255)
    private String skillDescription;
    @OneToOne(targetEntity = Skillset.class, fetch = FetchType.LAZY, optional = false)
    private Skillset skillset;

    public JobSkillset() {
    }

    public JobSkillset(Long jobSkillsetId, Integer skillLevel, String skillDescription, Skillset skillset) {
        this.jobSkillsetId = jobSkillsetId;
        this.skillLevel = skillLevel;
        this.skillDescription = skillDescription;
        this.skillset = skillset;
    }

    public Long getJobSkillsetId() {
        return jobSkillsetId;
    }

    public void setJobSkillsetId(Long jobSkillsetId) {
        this.jobSkillsetId = jobSkillsetId;
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
        return "JobSkillset{" +
                "jobSkillsetId=" + jobSkillsetId +
                ", skillLevel=" + skillLevel +
                ", skillDescription='" + skillDescription + '\'' +
                ", skillset=" + skillset +
                '}';
    }
}
