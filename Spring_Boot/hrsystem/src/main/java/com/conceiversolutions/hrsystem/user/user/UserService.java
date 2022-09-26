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
        return userRepository.findAll();
    }

    public User getUser(Long id){
        Optional<User> p = userRepository.findById(id);
        if(p.isPresent()){
            return p.get();
        }else{
            throw new IllegalStateException("Payslip does not exist.");
        }

    }

    //i need to come back to change this. no dummy user now. need to check if user alr has payslip. if so
    //we will not be adding a new payslip as well.

    public void addNewUser(User user) {
        userRepository.save(user);
    }
}
