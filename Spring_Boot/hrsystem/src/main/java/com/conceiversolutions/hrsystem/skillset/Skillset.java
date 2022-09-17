package com.conceiversolutions.hrsystem.skillset;

import javax.persistence.*;

@Entity
@Table(name="skillsets")
public class Skillset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long skillsetId;
    @Column(nullable = false, length = 64)
    private String skillsetName;
    @Column(nullable = false)
    private Boolean openEnded;

    public Skillset() {
    }

    public Skillset(Long skillsetId, String skillsetName, Boolean openEnded) {
        this.skillsetId = skillsetId;
        this.skillsetName = skillsetName;
        this.openEnded = openEnded;
    }

    public Long getSkillsetId() {
        return skillsetId;
    }

    public void setSkillsetId(Long skillsetId) {
        this.skillsetId = skillsetId;
    }

    public String getSkillsetName() {
        return skillsetName;
    }

    public void setSkillsetName(String skillsetName) {
        this.skillsetName = skillsetName;
    }

    public Boolean getOpenEnded() {
        return openEnded;
    }

    public void setOpenEnded(Boolean openEnded) {
        this.openEnded = openEnded;
    }

    @Override
    public String toString() {
        return "Skillset{" +
                "skillsetId=" + skillsetId +
                ", skillsetName='" + skillsetName + '\'' +
                ", openEnded=" + openEnded +
                '}';
    }
}
