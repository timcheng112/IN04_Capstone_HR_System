package com.conceiversolutions.hrsystem.user.user;

import com.conceiversolutions.hrsystem.enums.GenderEnum;
import com.conceiversolutions.hrsystem.enums.RoleEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

//    public List<User> getTestUsers() {
//        return List.of(
//                new User("Janice",
//                        "Sim",
//                        "password",
//                        93823503,
//                        "janicesim@gmail.com",
//                        LocalDate.of(2000,2,28),
//                        GenderEnum.FEMALE,
//                        RoleEnum.APPLICANT,
//                        false,
//                        false,
//                        null
//                )
//        );
//    }

    public List<User> getAllUsers(){
        System.out.println("UserService.getAllUsers");
        return userRepository.findAll();
    }

    public User getUser(Long id){
        System.out.println("UserService.getUser");
        System.out.println("id = " + id);
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            System.out.println("User found");
            System.out.println(user.get());
            return user.get();
        } else {
            throw new IllegalStateException("User does not exist.");
        }

    }

    public Long addNewUser(User user) {
        System.out.println("UserService.addNewUser");

//        Check if email is already used
        if (user.getUserRole().equals(RoleEnum.EMPLOYEE)) {
            Optional<User> userByEmail = userRepository.findUserByEmail(user.getEmail());
            if (userByEmail.isPresent()) {
                System.out.println("Email already in use.");
                throw new IllegalStateException("User's email is already in used");
            }
        } else {
            Optional<User> employeeByWorkEmail1 = userRepository.findUserByEmail(user.getEmail());
            Optional<User> employeeByWorkEmail2 = userRepository.findUserByWorkEmail(user.getWorkEmail());
            if (employeeByWorkEmail1.isPresent() || employeeByWorkEmail2.isPresent()) {
                System.out.println("Email(s) already in use.");
                throw new IllegalStateException("User's emails are already in used");
            }
        }

        User newUser = userRepository.saveAndFlush(user);
        System.out.println("New user successfully created with User Id : " + newUser.getUserId());
        return newUser.getUserId();
    }

    public Long loginUserJMP(String email, String password) {
        System.out.println("UserService.loginUserJMP");
        System.out.println("email = " + email + ", password = " + password);
        Optional<User> user = userRepository.findUserByEmail(email);
        if(user.isPresent()){
            User userRecord = user.get();
            if (userRecord.getPassword().equals(password)) {
                System.out.println("User found and password matches. User Id is : " + userRecord.getUserId());
                return userRecord.getUserId();
            } else {
                throw new IllegalStateException("User password does not match the record.");
            }
        } else {
            throw new IllegalStateException("User does not exist.");
        }
    }

    public Long loginUserHRMS(String workEmail, String password) {
        System.out.println("UserService.loginUserHRMS");
        System.out.println("workEmail = " + workEmail + ", password = " + password);
        Optional<User> user = userRepository.findUserByEmail(workEmail);
        if(user.isPresent()){
            User userRecord = user.get();
            if (userRecord.getPassword().equals(password)) {
                System.out.println("Employee found and password matches. User Id is : " + userRecord.getUserId());
                return userRecord.getUserId();
            } else {
                throw new IllegalStateException("User password does not match the record.");
            }
        } else {
            throw new IllegalStateException("User does not exist.");
        }
    }
}
