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
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;

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

    public List<Notification> getAllNotificationsForUser(Long userId){
        System.out.println("NotificationService.getAllNotificationsForUser");

//        List<Notification> notif = notificationRepository.findAll();
        User u1 = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("User with id" + userId + "does not exist"));
        List<Notification> n = u1.getNotificationsUnread();
        List<Notification> n2 = u1.getNotificationsRead();
//        n.addAll(n2);
        System.out.println("size of list is " + n.size());
        //
//        List<Notification> newList = Stream.concat(n.stream(), n2.stream()).toList();
        return n;
    }

    public Notification getANotification(Long notificationId, Long userId ){
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new IllegalStateException("Notification with ID: " + notificationId + " does not exist!"));
        User u1 = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("User with ID: " + userId + " does not exist!"));
        u1.getNotificationsUnread().remove(notification);
        u1.getNotificationsRead().add(notification);
        userRepository.saveAndFlush(u1);
        return notification;
    }


    public Notification getNotification(Long notificationId){
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new IllegalStateException("Notification with ID: " + notificationId + " does not exist!"));

        return notification;
    }

    //LocalDateTime notifTime, String title, String description, User employee
    public String addNotification(String notificationTitle, String notificationDescription, Long userId){

        Notification n = new Notification(LocalDateTime.now(),notificationTitle, notificationDescription);
//        if (notification.getNotificationId() != null) {
//            throw new IllegalStateException("notification already exists  is null");
//        }

        User u1 = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("User with id" + userId + "does not exist"));
        u1.getNotificationsUnread().add(n);


        notificationRepository.saveAndFlush(n);
        userRepository.saveAndFlush(u1);

        return "Notification added successfully.";
    }

    public String deleteNotification(Long notificationId, Long userId) {

        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new IllegalStateException("Notification with ID: " + notificationId + " does not exist!"));
        User u1 = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("User with ID: " + userId + " does not exist!"));
        //without breaking relationship

        //can only remove if notification read
        u1.getNotificationsRead().remove(notification);

        notificationRepository.deleteById(notificationId);
        return "notification with id" + userId+ "is deleted";
    }

    public String deleteAllNotification(Long userId){

        User u1 = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("User with ID: " + userId + " does not exist!"));

        List<Notification> unreadLst = u1.getNotificationsUnread();
        List<Notification> readLst = u1.getNotificationsRead();

        unreadLst.clear();
        readLst.clear();

//        List<Notification> notifyLst = getAllNotifications();
//        for(Notification n: notifyLst){
//            Notification notification = notificationRepository.findById(notificationId)
//                    .orElseThrow(() -> new IllegalStateException("Notification with ID: " + notificationId + " does not exist!"));
//
//        }
//

        userRepository.saveAndFlush(u1);

        return "delete all function successful";
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