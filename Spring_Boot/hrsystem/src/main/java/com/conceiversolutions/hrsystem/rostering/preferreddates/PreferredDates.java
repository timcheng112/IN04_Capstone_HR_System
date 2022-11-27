package com.conceiversolutions.hrsystem.rostering.preferreddates;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.conceiversolutions.hrsystem.user.user.User;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Entity
@Table(name = "preferred_dates")
public class PreferredDates {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "preferred_dates_id")
    private Long preferredDatesId;
    @Column(nullable = false)
    @ElementCollection(targetClass = LocalDate.class)
    private List<LocalDate> dates;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;

    public PreferredDates() {
    }

    public PreferredDates(User user) {
        this.user = user;
        this.dates = new ArrayList<>();
    }

    public Long getPreferredDatesId() {
        return preferredDatesId;
    }

    public void setPreferredDatesId(Long preferredDatesId) {
        this.preferredDatesId = preferredDatesId;
    }

    public List<LocalDate> getDates() {
        return dates;
    }

    public void setDates(List<LocalDate> dates) {
        this.dates = dates;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "PreferredDates [preferredDatesId=" + preferredDatesId + ", dates=" + dates + ", user=" + user + "]";
    }

}
