package com.conceiversolutions.hrsystem.notification;

import java.time.LocalDateTime;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class NotificationService {

        private final NotificationRepository notificationRepository;

        private final UserRepository userRepository;

        public List<Notification> getAllNotifications() {
                System.out.println("NotificationService.getAllNotifications");

                List<Notification> notif = notificationRepository.findAll();
                System.out.println("size of list is " + notif.size());

                return notif;
        }

        public List<Notification> getAllNotificationsForUser(Long userId) {
                System.out.println("NotificationService.getAllNotificationsForUser");

                // List<Notification> notif = notificationRepository.findAll();
                User u1 = userRepository.findById(userId)
                                .orElseThrow(() -> new IllegalStateException(
                                                "User with id" + userId + "does not exist"));
                List<Notification> n = u1.getNotificationsUnread();
                List<Notification> n2 = u1.getNotificationsRead();
                for (Notification i : n) {
                        n2.add(i);
                }

                // n.addAll(n2);
                System.out.println("size of list is " + n.size());
                //
                // List<Notification> newList = Stream.concat(n.stream(), n2.stream()).toList();
                n.clear();
                return n2;
        }

        public Notification markAsRead(Long notificationId, Long userId) {
                System.out.println("NotificationService.markAsRead");
                Notification notification = notificationRepository.findById(notificationId)
                                .orElseThrow(() -> new IllegalStateException(
                                                "Notification with ID: " + notificationId + " does not exist!"));
                System.out.println(notification);
                User user = userRepository.findById(userId)
                                .orElseThrow(() -> new IllegalStateException(
                                                "User with ID: " + userId + " does not exist!"));
                user.getNotificationsUnread().remove(notification);
                user.getNotificationsRead().add(notification);
                userRepository.saveAndFlush(user);
                return notification;
        }

        public Notification getNotification(Long notificationId) {
                Notification notification = notificationRepository.findById(notificationId)
                                .orElseThrow(() -> new IllegalStateException(
                                                "Notification with ID: " + notificationId + " does not exist!"));

                return notification;
        }

        // LocalDateTime notifTime, String title, String description, User employee
        public String addNotification(String notificationTitle, String notificationDescription, Long userId) {

                Notification n = new Notification(LocalDateTime.now(), notificationTitle, notificationDescription);
                // if (notification.getNotificationId() != null) {
                // throw new IllegalStateException("notification already exists is null");
                // }

                User u1 = userRepository.findById(userId)
                                .orElseThrow(() -> new IllegalStateException(
                                                "User with id" + userId + "does not exist"));
                u1.getNotificationsUnread().add(n);
                System.out.println(u1.getNotificationsUnread());
                notificationRepository.saveAndFlush(n);
                userRepository.saveAndFlush(u1);
                System.out.println(u1.getNotificationsUnread());
                System.out.println("read");
                System.out.println(u1.getNotificationsRead());
                return "Notification added successfully.";
        }

        public String deleteNotification(Long notificationId, Long userId) {

                Notification notification = notificationRepository.findById(notificationId)
                                .orElseThrow(() -> new IllegalStateException(
                                                "Notification with ID: " + notificationId + " does not exist!"));
                User u1 = userRepository.findById(userId)
                                .orElseThrow(() -> new IllegalStateException(
                                                "User with ID: " + userId + " does not exist!"));
                // without breaking relationship

                // can only remove if notification read
                u1.getNotificationsRead().remove(notification);

                notificationRepository.deleteById(notificationId);
                return "notification with id" + userId + "is deleted";
        }

        public String deleteAllNotification(Long userId) {

                User u1 = userRepository.findById(userId)
                                .orElseThrow(() -> new IllegalStateException(
                                                "User with ID: " + userId + " does not exist!"));

                List<Notification> unreadLst = u1.getNotificationsUnread();
                List<Notification> readLst = u1.getNotificationsRead();

                unreadLst.clear();
                readLst.clear();
                System.out.println("cleared unreadlist ");
                System.out.println("cleared readLst ");

                // List<Notification> notifyLst = getAllNotifications();
                // for(Notification n: notifyLst){
                // Notification notification = notificationRepository.findById(notificationId)
                // .orElseThrow(() -> new IllegalStateException("Notification with ID: " +
                // notificationId + " does not exist!"));
                //
                // }
                //

                userRepository.saveAndFlush(u1);

                return "delete all function successful";
        }

        @Transactional
        public void editNotification(Long notificationId, String notificationTitle, String notificationDescription) {
                Notification notification = notificationRepository.findById(notificationId)
                                .orElseThrow(() -> new IllegalStateException(
                                                "Category with ID: " + notificationId + " does not exist!"));

                if (notification.getNotificationId() != null && notificationTitle.length() > 0
                                && notificationDescription.length() > 0) {
                        notification.setTitle(notificationTitle);
                        notification.setDescription(notificationDescription);
                }

                // update notif in other user's list
                notificationRepository.saveAndFlush(notification);
        }

        public List<Notification> getUserUnreadNotifications(Long userId) {
                User user = userRepository.findById(userId)
                                .orElseThrow(() -> new IllegalStateException(
                                                "User with ID: " + userId + " does not exist!"));
                return user.getNotificationsUnread();
        }

        public List<Notification> getUserReadNotifications(Long userId) {
                User user = userRepository.findById(userId)
                                .orElseThrow(() -> new IllegalStateException(
                                                "User with ID: " + userId + " does not exist!"));
                return user.getNotificationsRead();
        }

}
