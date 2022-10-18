package com.conceiversolutions.hrsystem.notification;


import com.conceiversolutions.hrsystem.administration.category.Category;
import com.conceiversolutions.hrsystem.jobmanagement.jobrequest.JobRequest;
import lombok.AllArgsConstructor;
import org.aspectj.weaver.ast.Not;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/notification")
@AllArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;


    @GetMapping(path = "/getAllNotifications")
    public List<Notification> getAllNotifications() {
        return notificationService.getAllNotifications();
    }

    @GetMapping(path = "/getAllNotificationsForUser/{userId}")
    public List<Notification> getAllNotificationsForUser(@PathVariable("userId") Long userId){
        return notificationService.getAllNotificationsForUser(userId);
    }
    @GetMapping(path = "/{notificationId}")
    public Notification getANotification(@PathVariable("notificationId") Long notificationId, @PathVariable("userId") Long userId){
        return notificationService.getANotification(notificationId, userId);
    }

    @PostMapping
    public String addNotification( @RequestParam(name = "notificationTitle", required = false) String notificationTitle,
                                   @RequestParam(name = "notificationDescription", required = false) String notificationDesc,
                                   @RequestParam("userId") Long userId ) {
//        System.out.println("are you here");
        return notificationService.addNotification(notificationTitle, notificationDesc, userId);
    }


    @PutMapping(path= "{notificationId}")
    public void editNotification(@PathVariable("notificationId") Long notificationId, @RequestParam(name = "notificationTitle", required = false) String notificationTitle,
                                 @RequestParam(name = "notificationDescription", required = false) String notificationDesc) {
        notificationService.editNotification(notificationId, notificationTitle, notificationDesc);

    }

    @DeleteMapping(path = "/deleteOneNotif")
    public String deleteNotification(@PathVariable("notificationId") Long notificationId, @PathVariable("userId") Long userId) throws IllegalStateException{
        return notificationService.deleteNotification(notificationId, userId);
    }

    @DeleteMapping(path = "/deleteNotifications")
    public String deleteAllNotifications(@PathVariable("userId") Long userId ) throws IllegalStateException{
        return notificationService.deleteAllNotification(userId);
    }
}
