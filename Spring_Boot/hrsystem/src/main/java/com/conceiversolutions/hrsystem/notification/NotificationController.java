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

    @GetMapping(path = "/GetNotification")
    public Notification getANotification(@PathVariable("notificationId") Long notificationId){
        return notificationService.getNotification(notificationId);
    }

    @PostMapping
    public void addNotification(@RequestBody Notification notification, @PathVariable("userId") Long userId ) {
        notificationService.addNotification(notification, userId);
    }


    @PutMapping(path= "{notificationId}")
    public void editNotification(@PathVariable("notificationId") Long notificationId, @RequestParam(name = "notificationTitle", required = false) String notificationTitle,
                                 @RequestParam(name = "notificationDescription", required = false) String notificationDesc) {
        notificationService.editNotification(notificationId, notificationTitle, notificationDesc);

    }

    @DeleteMapping(path = "{notificationId}")
    public void deleteCategory(@PathVariable("categoryId") Long notificationId, @PathVariable("userId") Long userId) throws IllegalStateException{
        notificationService.deleteNotification(notificationId, userId);
    }
}
