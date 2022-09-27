package com.conceiversolutions.hrsystem.user.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

//    @GetMapping
//    public List<User> getTestUser() {
//        return userService.getTestUsers();
//    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping(path = "{userId}")
    public User getUser(@PathVariable("userId") Long userId){
        return userService.getUser(userId);
    }

    //taking client request and map it into our payslip
    @PostMapping
    public void addNewPayslip(@RequestBody User user) {
        userService.addNewUser(user);
    }
}
