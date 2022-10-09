package com.conceiversolutions.hrsystem.organizationstructure.organization;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.conceiversolutions.hrsystem.organizationstructure.department.Department;
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
        this.departments = new ArrayList<>();
    }

    public Organization(String organizationName, List<Department> departments, User organizationHead) {
        this.organizationName = organizationName;
        this.departments = new ArrayList<>();
        this.organizationHead = organizationHead;
    }

    public Organization(Long organizationId, String organizationName, List<Department> departments, User organizationHead) {
        this.organizationId = organizationId;
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

    public List<Department> addDepartment(Department newDept) {
        this.departments.add(newDept);
        return this.departments;
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
