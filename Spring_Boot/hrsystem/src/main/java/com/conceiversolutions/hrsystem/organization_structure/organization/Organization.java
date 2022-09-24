package com.conceiversolutions.hrsystem.organization_structure.organization;

import java.util.List;

import javax.persistence.*;

import com.conceiversolutions.hrsystem.organization_structure.department.Department;
import com.conceiversolutions.hrsystem.user.user.User;

@Entity
@Table(name = "organizations")
public class Organization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "organization_id", nullable = false)
    private Long organizationId;
    @Column(name = "organization_name", nullable = false, length = 64)
    private String organizationName;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "organization")
    private List<Department> departments;

    @OneToOne(targetEntity = User.class, fetch = FetchType.LAZY, optional = false)
    private User organizationHead;

    public Organization() {
    }

    public Organization(String organizationName, List<Department> departments, User organizationHead) {
        this.organizationName = organizationName;
        this.departments = departments;
        this.organizationHead = organizationHead;
    }

    public Long getOrganizationId() {
        return organizationId;
    }

    public void setOrganizationId(Long organizationId) {
        this.organizationId = organizationId;
    }

    public String getOrganizationName() {
        return organizationName;
    }

    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }

    public List<Department> getDepartments() {
        return departments;
    }

    public void setDepartments(List<Department> departments) {
        this.departments = departments;
    }

    public User getOrganizationHead() {
        return organizationHead;
    }

    public void setOrganizationHead(User organizationHead) {
        this.organizationHead = organizationHead;
    }

    @Override
    public String toString() {
        return "Organization [departments=" + departments + ", organizationHead=" + organizationHead
                + ", organizationId=" + organizationId + ", organizationName=" + organizationName + "]";
    }

}
