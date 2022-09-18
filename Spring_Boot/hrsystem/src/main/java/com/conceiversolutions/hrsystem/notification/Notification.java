package com.conceiversolutions.hrsystem.notification;

import java.time.LocalDate;

public class Notification {
    public Long notificationId;
    public LocalDate notifTime;
    public String title;
    public String description;

    public Notification() {
    }

    public Notification(LocalDate notifTime, String title, String description) {
        this.notifTime = notifTime;
        this.title = title;
        this.description = description;
    }

    public Notification(Long notificationId, LocalDate notifTime, String title, String description) {
        this.notificationId = notificationId;
        this.notifTime = notifTime;
        this.title = title;
        this.description = description;
    }

    public Long getNotificationId() {
        return notificationId;
    }

    public void setNotificationId(Long notificationId) {
        this.notificationId = notificationId;
    }

    public LocalDate getNotifTime() {
        return notifTime;
    }

    public void setNotifTime(LocalDate notifTime) {
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
