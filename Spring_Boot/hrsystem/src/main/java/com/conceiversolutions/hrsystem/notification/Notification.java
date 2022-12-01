package com.conceiversolutions.hrsystem.notification;

import com.conceiversolutions.hrsystem.user.user.User;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="notifications")
@Getter
@Setter
@EqualsAndHashCode
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id")
    public Long notificationId;
    @Column(name = "notif_time", nullable = false)
    public LocalDateTime notifTime;
    @Column(name = "title", nullable = false, length = 64)
    public String title;
    @Column(name = "description", nullable = false)
    public String description;
    @Column(name = "sender_name", nullable = false)
    public String senderName;

    public Notification() {
    }

    public Notification(LocalDateTime notifTime, String title, String description) {
        this.notifTime = notifTime;
        this.title = title;
        this.description = description;
    }

    public Notification(LocalDateTime notifTime, String title, String description, String senderName) {
        this.notifTime = notifTime;
        this.title = title;
        this.description = description;
        this.senderName = senderName;
    }

    //    public Notification(LocalDateTime notifTime, String title, String description, User employee) {
//        this.notifTime = notifTime;
//        this.title = title;
//        this.description = description;
//        this.employee = employee;
//    }


    public Long getNotificationId() {
        return notificationId;
    }

    public void setNotificationId(Long notificationId) {
        this.notificationId = notificationId;
    }

    public LocalDateTime getNotifTime() {
        return notifTime;
    }

    public void setNotifTime(LocalDateTime notifTime) {
        this.notifTime = notifTime;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Notification{" +
                "notificationId=" + notificationId +
                ", notifTime=" + notifTime +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
