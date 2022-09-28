package com.conceiversolutions.hrsystem.user.user;

import com.conceiversolutions.hrsystem.enums.GenderEnum;
import com.conceiversolutions.hrsystem.enums.RoleEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.time.LocalDate;
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

//    @PostMapping
//    public Long registerJMP(@PathVariable("firstName") String firstName,
//                            @PathVariable("lastName") String lastName,
//                            @PathVariable("password") String password,
//                            @PathVariable("phone") String phone,
//                            @PathVariable("email") String email,
//                            @PathVariable("dob") LocalDate dob,
//                            @PathVariable("gender") GenderEnum gender) {
//
//    }

    @PostMapping(path = "/register/registerNewAccountJMP")
        public Long registerNewAccountJMP(@RequestParam("firstName") String firstName,
                            @RequestParam("lastName") String lastName,
                            @RequestParam("password") String password,
                            @RequestParam("phone") Integer phone,
                            @RequestParam("email") String email,
                            @RequestParam("dob") String dob,
                            @RequestParam("gender") String gender) {
        System.out.println("UserController.registerNewAccountJMP");
        User newApplicant = new User(firstName, lastName, password, phone, email, LocalDate.parse(dob), GenderEnum.valueOf(gender), RoleEnum.APPLICANT, false, false, null);
        System.out.println("newApplicant = " + newApplicant.toString());
        try {
            Long applicantId = userService.addNewUser(newApplicant);
            System.out.println("UserController.registerNewAccountJMP");
            System.out.println("applicantId = " + applicantId);
            return applicantId;
        } catch (IllegalStateException ex) {
            System.out.println(ex.getMessage());
            throw ex;
        }
    }

    @GetMapping(path = "/login/loginJMP")
    public Long loginJMP(@RequestParam("email") String email,
                         @RequestParam("password") String password) {
        return userService.loginUserJMP(email, password);
    }

    @PostMapping(path = "/register/registerNewAccountHRMS")
    public Long registerNewAccountHRMS(@RequestParam("firstName") String firstName,
                                      @RequestParam("lastName") String lastName,
                                      @RequestParam("password") String password,
                                      @RequestParam("phone") Integer phone,
                                      @RequestParam("email") String email,
                                      @RequestParam("workEmail") String workEmail,
                                      @RequestParam("dob") String dob,
                                      @RequestParam("gender") String gender,
                                      @RequestParam("userRole") String userRole,
                                      @RequestParam("isPartTimer") Boolean isPartTimer,
                                      @RequestParam("isHrEmployee") Boolean isHrEmployee,
                                      @RequestParam("dateJoined") String dateJoined) {
        System.out.println("UserController.registerNewAccountJMP");
        User newEmployee = new User(firstName, lastName, password, phone, email, workEmail, LocalDate.parse(dob), GenderEnum.valueOf(gender), RoleEnum.valueOf(userRole), isPartTimer, isHrEmployee, LocalDate.parse(dateJoined), null);
        System.out.println("newEmployee = " + newEmployee.toString());
        try {
            Long employeeId = userService.addNewUser(newEmployee);
            System.out.println("UserController.registerNewAccountHRMS");
            System.out.println("employeeId = " + employeeId);
            return employeeId;
        } catch (IllegalStateException ex) {
            System.out.println(ex.getMessage());
            throw ex;
        }
    }

    @GetMapping(path = "/login/loginHRMS")
    public Long loginHRMS(@RequestParam("workEmail") String workEmail,
                         @RequestParam("password") String password) {
        return userService.loginUserHRMS(workEmail, password);
    }

    //taking client request and map it into our payslip
    @PostMapping
    public void addNewPayslip(@RequestBody User user) {
        userService.addNewUser(user);
    }

    @GetMapping(path = "/register/confirmToken")
    public String confirmToken(@RequestParam("token") String token) {
        return userService.confirmToken(token);
    }
}
