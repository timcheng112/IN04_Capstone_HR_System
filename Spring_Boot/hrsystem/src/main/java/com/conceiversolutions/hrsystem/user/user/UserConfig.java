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
    CommandLineRunner userCommandLineRunner(UserRepository userRepository, UserService userService) {
        // User Init for 2 test users
        return args -> {
            User testUser = new User(
                    "Janice",
                    "Sim",
                    "password",
                    93823503,
                    "janicesim@gmail.com",
                    LocalDate.of(2000, 2, 28),
                    GenderEnum.FEMALE,
                    RoleEnum.ADMINISTRATOR,
                    false,
                    true,
                    null);
            testUser.setWorkEmail("simj@libro.com");
            testUser.setEnabled(true);

            User testUser2 = new User(
                    "Matthew",
                    "Lee",
                    "password",
                    81868188,
                    "matthewlee@gmail.com",
                    LocalDate.of(1997, 1, 3),
                    GenderEnum.MALE,
                    RoleEnum.ADMINISTRATOR,
                    false,
                    true,
                    null);
            testUser2.setWorkEmail("leem@libro.com");
            testUser2.setEnabled(true);

            // if any user exists already, don't run
            if (!userRepository.existsById(1L)) {
                System.out.println("No user, so will init 2 Administrator users");
                userService.initAdmin(testUser);
                userService.initAdmin(testUser2);
            } else {
                System.out.println("Administrators already exist, do not init Administrator users");
            }
        };
    }
}
