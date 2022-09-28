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

    @GetMapping(path = "/register/testEmailRegex")
    public Boolean testEmailRegex(@RequestParam("email") String email) {
        return userService.testEmailRegex(email);
    }

    @GetMapping(path = "/login/checkEmailJMP")
    public Long checkEmailJMP(@RequestParam("email") String email) {
        try {
            User user = userService.getUser(email);

            if (user.getUserRole().equals(RoleEnum.APPLICANT)) {
                System.out.println("User found and User role is Applicant");
                return user.getUserId();
            } else {
                System.out.println("User role is not Applicant");
                throw new IllegalStateException("Email is not linked to a Job Applicant account");
            }
        } catch (Exception ex) {
            System.out.println("User not found or User role is not APPLICANT");
            throw ex;
        }
    }

    @PutMapping(path = "/login/resetPasswordJMP")
    public String resetPasswordJMP(@RequestParam("email") String email,
                                   @RequestParam("oldPassword") String oldPassword,
                                   @RequestParam("newPassword") String newPassword) {
        return userService.resetPasswordJMP(email, oldPassword, newPassword);
    }

    @GetMapping(path = "/login/checkEmailHRMS")
    public Long checkEmailHRMS(@RequestParam("workEmail") String workEmail) {
        try {
            User employee = userService.getEmployee(workEmail);
            if (employee.getUserRole().equals(RoleEnum.APPLICANT)) {
                System.out.println("User role is an Applicant");
                throw new IllegalStateException("Email is not linked to an Employee account");
            } else {
                System.out.println("Employee found and User role is " + employee.getUserRole().name());
                return employee.getUserId();
            }
        } catch (Exception ex) {
            System.out.println("Employee not found");
            throw ex;
        }
    }

    @PutMapping(path = "/login/resetPasswordHRMS")
    public String resetPasswordHRMS(@RequestParam("workEmail") String workEmail,
                                   @RequestParam("oldPassword") String oldPassword,
                                   @RequestParam("newPassword") String newPassword) {
        return userService.resetPasswordHRMS(workEmail, oldPassword, newPassword);
    }

    @GetMapping(path = "/register/resendConfirmationEmailJMP")
    public String resendConfirmationEmailJMP(@RequestParam("email") String email) {
        return userService.resendConfirmationEmail(email,1);
    }

    @GetMapping(path = "/register/resendConfirmationEmailHRMS")
    public String resendConfirmationEmailHRMS(@RequestParam("email") String email) {
        return userService.resendConfirmationEmail(email,2);
    }

    @PostMapping(path = "/login/requestAccountReactivation")
    public String requestAccountReactivation(@RequestParam("email") String email,
                                             @RequestParam("reason") String reason) {
        return userService.requestAccountReactivation(email, reason);
    }
}
