package com.conceiversolutions.hrsystem.notification;

import com.conceiversolutions.hrsystem.administration.category.Category;
import com.conceiversolutions.hrsystem.jobmanagement.jobrequest.JobRequest;
import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;
import lombok.AllArgsConstructor;
import org.aspectj.weaver.ast.Not;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    private final UserRepository userRepository;

    public List<Notification> getAllNotifications(){
        System.out.println("NotificationService.getAllNotifications");

        List<Notification> notif = notificationRepository.findAll();
        System.out.println("size of list is " + notif.size());

        return notif;
    }


    public Notification getNotification(Long notificationId){
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new IllegalStateException("Notification with ID: " + notificationId + " does not exist!"));

        return notification;
    }

    //LocalDateTime notifTime, String title, String description, User employee
    public void addNotification(Notification notification, Long userId){
        if (notification.getNotificationId() != null) {
            throw new IllegalStateException("notification already exists  is null");
        }

        User u1 = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("User with id" + userId + "does not exist"));
        u1.getNotifications().add(notification);

        notificationRepository.saveAndFlush(notification);
    }

    public void deleteNotification(Long notificationId, Long userId) {

        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new IllegalStateException("Notification with ID: " + notificationId + " does not exist!"));
        User u1 = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("User with ID: " + userId + " does not exist!"));
        //without breaking relationship

        u1.getNotifications().remove(notification);
        notificationRepository.deleteById(notificationId);
    }

    @Transactional
    public void editNotification(Long notificationId, String notificationTitle, String notificationDescription) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new IllegalStateException("Category with ID: " + notificationId + " does not exist!"));

        if (notification.getNotificationId() != null && notificationTitle.length() > 0 && notificationDescription.length() > 0) {
            notification.setTitle(notificationTitle);
            notification.setDescription(notificationDescription);
        }

        //update notif in other user's list
        notificationRepository.saveAndFlush(notification);
    }


}
