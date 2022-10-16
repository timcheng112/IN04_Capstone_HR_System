package com.conceiversolutions.hrsystem.skillset.skillset;

import com.conceiversolutions.hrsystem.jobmanagement.jobposting.JobPosting;
import com.conceiversolutions.hrsystem.jobmanagement.jobrequest.JobRequest;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="skillsets")
@Getter
@Setter
@EqualsAndHashCode
public class Skillset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "skillset_id")
    private Long skillsetId;
    @Column(name = "skillset_name", nullable = false, length = 64, unique = true)
    private String skillsetName;
//    @Column(name = "open_ended", nullable = false)
//    private Boolean openEnded;
    @ManyToMany(mappedBy = "jobRequirements")
    private List<JobRequest> jobRequests;
    @ManyToMany(mappedBy = "jobPostRequirements")
    private List<JobPosting> jobPostings;

    public Skillset() {
    }

    public Skillset(String skillsetName/*, Boolean openEnded*/) {
        this.skillsetName = skillsetName;
//        this.openEnded = openEnded;
        this.jobRequests = new ArrayList<>();
        this.jobPostings = new ArrayList<>();
    }

    @Override
    public String toString() {
        return "Skillset{" +
                "skillsetId=" + skillsetId +
                ", skillsetName='" + skillsetName + '\'' +
//                ", openEnded=" + openEnded +
                '}';
    }
}
