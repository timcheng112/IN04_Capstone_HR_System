package com.conceiversolutions.hrsystem.skillset.userskillset;

import com.conceiversolutions.hrsystem.skillset.skillset.Skillset;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
@Getter
@Table(name="user_skillsets")
public class UserSkillset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_skillset_id")
    private Long userSkillsetId;
    @Column(name = "skill_level", nullable = false, length = 1)
    private Integer skillLevel;
    @ManyToOne(targetEntity = Skillset.class, fetch = FetchType.LAZY, optional = false)
    private Skillset skillset;

    public UserSkillset() {
    }

    public UserSkillset(Integer skillLevel, Skillset skillset) {
        this.skillLevel = skillLevel;
        this.skillset = skillset;
    }

    @Override
    public String toString() {
        return "UserSkillset{" +
                "userSkillsetId=" + userSkillsetId +
                ", skillLevel=" + skillLevel +
                ", skillset=" + skillset +
                '}';
    }
}
