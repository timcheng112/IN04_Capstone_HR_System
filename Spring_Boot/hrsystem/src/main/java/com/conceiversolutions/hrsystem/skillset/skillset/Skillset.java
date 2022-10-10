package com.conceiversolutions.hrsystem.skillset.skillset;

import javax.persistence.*;

@Entity
@Table(name="skillsets")
public class Skillset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "skillset_id")
    private Long skillsetId;
    @Column(name = "skillset_name", nullable = false, length = 64, unique = true)
    private String skillsetName;
//    @Column(name = "open_ended", nullable = false)
//    private Boolean openEnded;

    public Skillset() {
    }

    public Skillset(String skillsetName/*, Boolean openEnded*/) {
        this.skillsetName = skillsetName;
//        this.openEnded = openEnded;
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

//    public Boolean getOpenEnded() {
//        return openEnded;
//    }
//
//    public void setOpenEnded(Boolean openEnded) {
//        this.openEnded = openEnded;
//    }

    @Override
    public String toString() {
        return "Skillset{" +
                "skillsetId=" + skillsetId +
                ", skillsetName='" + skillsetName + '\'' +
//                ", openEnded=" + openEnded +
                '}';
    }
}
