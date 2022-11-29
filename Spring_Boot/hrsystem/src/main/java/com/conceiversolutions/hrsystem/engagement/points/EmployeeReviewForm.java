package com.conceiversolutions.hrsystem.engagement.points;

import com.conceiversolutions.hrsystem.organizationstructure.department.Department;
import com.conceiversolutions.hrsystem.user.user.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name="review_forms")
public class EmployeeReviewForm {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    @Column(name="review_form_id")
    private Long reviewFormId;
    @Column(name = "employee_name")
    private String employeeName;
    @Column(nullable = false, length = 1)
    private Integer rating;
    @Column(name = "date")
    private LocalDate date;
    @Column(name = "justification")
    private String justification;
    @ManyToOne(fetch = FetchType.LAZY, targetEntity = Department.class)
    private Department department;
    @Column(name = "team_name")
    private String teamName;
    @Column(name = "vetted")
    private Boolean vetted;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
    private User employee;

    public EmployeeReviewForm() {
        this.vetted = false;
        this.employee = null;
    }

    public EmployeeReviewForm(String employeeName, Integer rating, LocalDate date, String justification, Department dept, String teamName) {
        this();
        this.employeeName = employeeName;
        this.rating = rating;
        this.date = date;
        this.justification = justification;
        this.department = dept;
        this.teamName = teamName;
    }

    @Override
    public String toString() {
        return "EmployeeReviewForm{" +
                "reviewFormId=" + reviewFormId +
                ", employeeName='" + employeeName + '\'' +
                ", rating=" + rating +
                ", date=" + date +
                ", justification='" + justification + '\'' +
                ", departmentName='" + department.getDepartmentName() + '\'' +
                ", teamName='" + teamName + '\'' +
                '}';
    }
}
