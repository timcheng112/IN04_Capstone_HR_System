package com.conceiversolutions.hrsystem.user.user;

import com.conceiversolutions.hrsystem.enums.GenderEnum;
import com.conceiversolutions.hrsystem.enums.RoleEnum;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.List;

@Configuration
public class UserConfig {
    @Bean
    CommandLineRunner userCommandLineRunner(UserRepository userRepository) {
//        User Init for 2 test users
        return args -> {
            User testUser = new User(
                    "Janice",
                    "Sim",
                    "password",
                    93823503,
                    "janicesim@gmail.com",
                    LocalDate.of(2000,2,28),
                    GenderEnum.FEMALE,
                    RoleEnum.APPLICANT,
                    false,
                    false,
                    null
                );

            User testUser2 = new User(
                    "Matthew",
                    "Lee",
                    "password",
                    81868188,
                    "matthewlee@gmail.com",
                    LocalDate.of(1997,1,3),
                    GenderEnum.MALE,
                    RoleEnum.APPLICANT,
                    true,
                    false,
                    null
            );

//            if any user exists already, don't run
            if (!userRepository.existsById(1L)) {
                System.out.println("No user, so will init 2 test users");
                userRepository.saveAll(
                        List.of(testUser, testUser2)
                );
            } else {
                System.out.println("Users already exist, do not init test users");
            }
        };
    }
}
