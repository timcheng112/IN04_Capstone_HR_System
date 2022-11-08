package com.conceiversolutions.hrsystem.user.user;

import com.conceiversolutions.hrsystem.enums.CitizenshipEnum;
import com.conceiversolutions.hrsystem.enums.GenderEnum;
import com.conceiversolutions.hrsystem.enums.JobTypeEnum;
import com.conceiversolutions.hrsystem.enums.PositionTypeEnum;
import com.conceiversolutions.hrsystem.enums.RaceEnum;
import com.conceiversolutions.hrsystem.enums.RoleEnum;
import com.conceiversolutions.hrsystem.user.position.Position;

import com.conceiversolutions.hrsystem.user.position.PositionRepository;
import com.conceiversolutions.hrsystem.user.qualificationinformation.QualificationInformation;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/user")
@AllArgsConstructor
public class UserController {
    private final UserService userService;
    private final PositionRepository positionRepository;

    // @Autowired
    // public UserController(UserService userService) {
    // this.userService = userService;
    // }

    // @GetMapping
    // public List<User> getTestUser() {
    // return userService.getTestUsers();
    // }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping(path = "{userId}")
    public User getUser(@PathVariable("userId") Long userId) {
        return userService.getUser(userId);
    }

    // @PostMapping
    // public Long registerJMP(@PathVariable("firstName") String firstName,
    // @PathVariable("lastName") String lastName,
    // @PathVariable("password") String password,
    // @PathVariable("phone") String phone,
    // @PathVariable("email") String email,
    // @PathVariable("dob") LocalDate dob,
    // @PathVariable("gender") GenderEnum gender) {
    //
    // }

    @PostMapping(path = "/register/registerNewAccountJMP")
    public Long registerNewAccountJMP(@RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam("password") String password,
            @RequestParam("phone") Integer phone,
            @RequestParam("email") String email,
            @RequestParam("dob") String dob,
            @RequestParam("gender") String gender) {
        System.out.println("UserController.registerNewAccountJMP");
        User newApplicant = new User(firstName, lastName, password, phone, email, LocalDate.parse(dob),
                GenderEnum.valueOf(gender), RoleEnum.APPLICANT, false, false, null);
        // System.out.println("newApplicant = " + newApplicant.toString());
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
    public String loginJMP(@RequestParam("email") String email,
            @RequestParam("password") String password) throws Exception {
        return userService.loginUserJMP(email, password);
    }

    @PostMapping(path = "/register/registerNewAccountHRMS")
    public Long registerNewAccountHRMS(@RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam("phone") Integer phone,
            @RequestParam("email") String email,
            @RequestParam("workEmail") String workEmail,
            @RequestParam("dob") String dob,
            @RequestParam("gender") String gender,
            @RequestParam("race") String race,
            @RequestParam("citizenship") String citizenship,
            @RequestParam("userRole") String userRole,
            @RequestParam("isPartTimer") Boolean isPartTimer,
            @RequestParam("isHrEmployee") Boolean isHrEmployee,
            @RequestParam("dateJoined") String dateJoined,
            @RequestParam("positionType") String positionType,
            @RequestParam("positionName") String positionName,
            @RequestParam("positionDescription") String positionDescription,
            @RequestParam("jobType") String jobType) {
        System.out.println("UserController.registerNewAccountHRMS");

        Position position = new Position(positionName, positionDescription, LocalDate.parse(dateJoined),
                JobTypeEnum.valueOf(jobType), PositionTypeEnum.valueOf(positionType));

        Position newPos = positionRepository.saveAndFlush(position);

        User newEmployee = new User(firstName, lastName, phone, email, workEmail, LocalDate.parse(dob),
                GenderEnum.valueOf(gender), RaceEnum.valueOf(race), CitizenshipEnum.valueOf(citizenship),
                RoleEnum.valueOf(userRole), isPartTimer, isHrEmployee,
                LocalDate.parse(dateJoined), null, newPos);
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
    public String loginHRMS(@RequestParam("workEmail") String workEmail,
            @RequestParam("password") String password) throws Exception {
        return userService.loginUserHRMS(workEmail, password);
    }

    // taking client request and map it into our payslip
    @PostMapping
    public void addNewPayslip(@RequestBody User user) {
        userService.addNewUser(user);
    }

    @GetMapping(path = "/register/confirmToken")
    public String confirmToken(@RequestParam("token") String token) throws Exception {
        return userService.confirmToken(token);
    }

    @GetMapping(path = "/register/verifyTempPassword")
    public String verifyTempPassword(@RequestParam("workEmail") String workEmail,
            @RequestParam("tempPassword") String tempPassword) throws Exception {
        return userService.verifyTempPassword(workEmail, tempPassword);
    }

    @GetMapping(path = "/register/setFirstPassword")
    public String setFirstPassword(@RequestParam("workEmail") String workEmail,
            @RequestParam("password") String password) throws Exception {
        return userService.setFirstPassword(workEmail, password);
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
        return userService.resendConfirmationEmail(email, 1);
    }

    @GetMapping(path = "/register/resendConfirmationEmailHRMS")
    public String resendConfirmationEmailHRMS(@RequestParam("email") String email) {
        return userService.resendConfirmationEmail(email, 2);
    }

    @PostMapping(path = "/login/requestAccountReactivation")
    public String requestAccountReactivation(@RequestParam("email") String email,
            @RequestParam("reason") String reason) {
        return userService.requestAccountReactivation(email, reason);
    }

    @GetMapping(path = "/login/forgotPasswordHRMS")
    public Long forgotPasswordHRMS(@RequestParam("workEmail") String workEmail) {
        return userService.forgotPasswordHRMS(workEmail);
    }

    @GetMapping(path = "/login/forgotPasswordJMP")
    public Long forgotPasswordJMP(@RequestParam("email") String email) {
        return userService.forgotPasswordJMP(email);
    }

    @GetMapping(path = "/login/changePasswordHRMS")
    public String changePasswordHRMS(@RequestParam("workEmail") String workEmail,
            @RequestParam("password") String password) {
        return userService.changePasswordHRMS(workEmail, password);
    }

    @GetMapping(path = "/login/changePasswordJMP")
    public String changePasswordJMP(@RequestParam("email") String email, @RequestParam("password") String password) {
        return userService.changePasswordJMP(email, password);
    }

    @GetMapping(path = "/login/getUserByToken")
    public String getUserByToken(@RequestParam("token") String token) {
        return userService.getUserFromToken(token);
    }

    @GetMapping(path = "/login/getEmployeeByToken")
    public String getEmployeeByToken(@RequestParam("token") String token) {
        return userService.getEmployeeFromToken(token);
    }

    @GetMapping(path = "/login/getUserIdByEmail")
    public Long getUserIdByEmail(@RequestParam("email") String email) {
        return userService.getUserFromEmail(email);
    }

    @GetMapping(path = "/login/getEmployeeIdByEmail")
    public Long getEmployeeIdByEmail(@RequestParam("workEmail") String workEmail) {
        System.out.println("getEmployeeIdByEmail " + workEmail);
        return userService.getUserFromWorkEmail(workEmail);
    }

    @GetMapping(path = "/updateProfile")
    public String updateProfile(@RequestParam("userId") Long userId,
            @RequestParam("gender") GenderEnum gender,
            @RequestParam("email") String email,
            @RequestParam("phone") Integer phone) {
        // System.out.println(user.getUserRole());
        return userService.updateUser(userId, gender, email, phone);

    }

    @GetMapping(path = "/getAllManagers")
    public List<User> getAllManagers() {
        return userService.getAllManagers();
    }

    @GetMapping(path = "/getAllAvailManagers")
    public List<User> getAllAvailManagers() {
        return userService.getAllAvailManagers();
    }

    @GetMapping(path = "/getAllEmployees")
    public List<User> getAllEmployees() {
        return userService.getAllEmployees();
    }

    @GetMapping(path = "/getAllEmployeesInclLeaveQuotas")
    public List<User> getAllEmployeesInclLeaveQuotas() {
        return userService.getAllEmployeesInclLeaveQuotas();
    }

    @GetMapping(path = "/getEmployeeInclLeaveQuotas")
    public User getEmployeeInclLeaveQuotas(@RequestParam("employeeId") Long employeeId) {
        return userService.getEmployeeInclLeaveQuotas(employeeId);
    }

    @GetMapping(path = "/getAllStaff")
    public List<User> getAllStaff() {
        return userService.getAllStaff();
    }

    @GetMapping(path = "/getEmployeesNotInGivenTeam")
    public List<User> getEmployeesNotInGivenTeam(@RequestParam(name = "teamId") Integer teamId) {
        return userService.getEmployeesNotInGivenTeam(teamId);
    }

    @GetMapping(path = "/getUnassignedEmployees")
    public List<User> getEmployeesWithoutTask(@RequestParam("taskId") Long taskId) {
        return userService.getEmployeesWithoutTask(taskId);
    }

    @GetMapping(path = "/getAssignedEmployees")
    public List<User> getEmployeesWithTask(@RequestParam("taskId") Long taskId) {
        return userService.getEmployeesWithTask(taskId);
    }

    // @GetMapping(path = "/getMyAttendanceToday")
    // public List<Integer> getMyAttendanceToday(Long sliId, Long userId){
    // return getMyAttendanceToday(sliId, userId);
    // }

    // @GetMapping(path = "/getAttendanceToday")
    // public List<Integer> getAttendanceToday(Long sliId, Long userId) {
    // // return getMyAttendanceToday();
    // return getAttendanceToday(sliId, userId);
    // }
    //
    // @GetMapping(path ="/activateUser/{}")
    // public String disableUser(String email){
    // return disableUser(email);
    // }

    @GetMapping(path = "/setUserStatus")
    public String setUserStatus(@RequestParam("workEmail") String workEmail) {
        return userService.setUserStatus(workEmail);
    }

    @GetMapping(path = "/getEmployeesByDepartment")
    public List<User> getEmployeesByDepartment(@RequestParam("departmentId") Long departmentId) {
        return userService.getEmployeesByDepartment(departmentId);
    }

    @GetMapping(path = "/getEmployeesByTeam")
    public List<User> getEmployeesByTeam(@RequestParam("teamId") Long teamId) {
        return userService.getEmployeesByTeam(teamId);
    }

    @GetMapping(path = "/getAllApplicants")
    public List<User> getAllApplicants() {
        return userService.getAllApplicants();
    }

    @GetMapping(path = "/getEmployeesByRosterAndDate")
    public List<User> getEmployeesByRosterAndDate(@RequestParam("rosterId") Long rosterId,
            @RequestParam("date") String date) {
        LocalDate localDate = LocalDate.parse(date);
        return userService.getEmployeesByRosterAndDate(rosterId, localDate);
    }

    @PutMapping(path = "/updateUserDetails")
    public String updateUserDetails(@RequestParam("userId") Long userId,
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam("aboutMe") String aboutMe,
            @RequestParam("educationLevel") String educationLevel,
            @RequestParam("schoolName") String schoolName,
            @RequestParam("gradYear") Integer gradYear,
            @RequestParam("languages") List<String> languages) {
        return userService.updateUserDetails(userId, firstName, lastName, aboutMe, educationLevel, schoolName, gradYear,
                languages);
    }
}
