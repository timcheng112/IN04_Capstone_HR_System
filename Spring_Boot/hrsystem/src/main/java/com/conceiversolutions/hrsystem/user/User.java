package com.conceiversolutions.hrsystem.user;

import com.conceiversolutions.hrsystem.enums.RoleEnum;

import java.time.LocalDate;

public class User {
    private Long userId;
    private String firstName;
    private String lastName;
    private String password;
    private Integer phone;
    private String email;
    private String workEmail;
    private LocalDate dob;
    private Character gender;

    private RoleEnum role;
    private Boolean isPartTimer;
    private Boolean isHrEmployee;

    private Boolean isBlackListed;
    private Boolean isEnabled;
    private LocalDate dateJoined;

    private byte[] profilePic;
    private Position[] positions;
    private QualificationInformation qualificationInformation;

    public User() {
    }


}
