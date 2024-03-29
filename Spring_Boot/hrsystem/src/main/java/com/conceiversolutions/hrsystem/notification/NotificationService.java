package com.conceiversolutions.hrsystem.notification;

import java.beans.Transient;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import com.conceiversolutions.hrsystem.enums.RoleEnum;
import com.conceiversolutions.hrsystem.user.user.UserService;
import org.springframework.stereotype.Service;

import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class NotificationService {

        private final NotificationRepository notificationRepository;

        private final UserRepository userRepository;

        private final UserService userService;

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

        public String addANotificationII(String notificationTitle, String notificationDescription, Long userId, Long senderId){

                User sender = userRepository.findById(senderId)
                        .orElseThrow(() -> new IllegalStateException(
                                "User with id" + userId + "does not exist"));
                String str1 = sender.getFirstName();
                String str2 = sender.getLastName();
                String senderName = str1 + " " + str2;

                Notification n = new Notification(LocalDateTime.now(), notificationTitle, notificationDescription, senderName);

                if(userId == -1){
                        //broadcast
                        List<User> staff = userRepository.findAllStaff(RoleEnum.EMPLOYEE, RoleEnum.MANAGER);
                        for(User s : staff){
                                List<Notification> lst = s.getNotificationsUnread();
                                lst.add(n);
                                System.out.println(s.getNotificationsUnread());
                                notificationRepository.saveAndFlush(n);
                                userRepository.saveAndFlush(s);
                        }

                }else{
                        //notifications targetted to userId
                        User u1 = userRepository.findById(userId)
                                .orElseThrow(() -> new IllegalStateException(
                                        "User with id" + userId + "does not exist"));
                        u1.getNotificationsUnread().add(n);
                        System.out.println(u1.getNotificationsUnread());
                        notificationRepository.saveAndFlush(n);
                        userRepository.saveAndFlush(u1);


                }

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
                return "Notification has been deleted";
        }

        public String deleteAllNotification(Long userId) {

                User u1 = userRepository.findById(userId)
                                .orElseThrow(() -> new IllegalStateException(
                                                "User with ID: " + userId + " does not exist!"));

                List<Notification> unreadList = u1.getNotificationsUnread();
                List<Notification> readList = u1.getNotificationsRead();

                Integer count = unreadList.size() + readList.size();

                unreadList.clear();
                readList.clear();
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

                return count + " notifications deleted";
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

//        @Transient
        public String broadcastMessage(String notificationTitle, String notificationDescription){
                Notification n = new Notification(LocalDateTime.now(), notificationTitle, notificationDescription);
                System.out.println(n.description);
                List<User> lst = userRepository.findAll();
                if( lst.size() > 0){
                        for( User u : lst){
                                User newUser = breakRelationships(u);
                                newUser.getNotificationsUnread().add(n);
                                System.out.println("notif added for user");
                                System.out.println(newUser.getNotificationsUnread());
                                notificationRepository.saveAndFlush(n);
                                userRepository.saveAndFlush(newUser);
                                System.out.println("notif added for user after flush");
                                System.out.println(newUser.getNotificationsUnread());
                        }
                        return "Notification broadcast is successful.";

                }else{
                        return "No one to broadcast to.";
                }

        }


        public User breakRelationships(User user) {
                User newUser = user;
                user.nullify();
                user.setNotificationsRead(newUser.getNotificationsRead());
                user.setNotificationsUnread(newUser.getNotificationsUnread());


//                u.setUserId(user.getUserId());
//                u.setFirstName(user.getFirstName());
//                u.setLastName(user.getLastName());
//                u.setWorkEmail(user.getWorkEmail());
//                u.setUserRole(user.getUserRole());
//                u.setProfilePic(user.getProfilePic());
//                u.setIsBlackListed(user.getIsBlackListed());
//                u.setNotificationsUnread(user.getNotificationsUnread());
//                u.setNotificationsRead(user.getNotificationsRead());

                return user;
        }


}
