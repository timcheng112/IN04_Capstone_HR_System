package com.conceiversolutions.hrsystem.user.user;

import com.conceiversolutions.hrsystem.enums.GenderEnum;
import com.conceiversolutions.hrsystem.enums.RoleEnum;
import com.conceiversolutions.hrsystem.organizationstructure.organization.OrganizationService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.List;

@Configuration
public class UserConfig {
    @Bean
    CommandLineRunner userCommandLineRunner(UserRepository userRepository, UserService userService, OrganizationService organizationService) {
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

            User ceo = new User(
                    "Jeremy",
                    "Ong",
                    "password",
                    99887766,
                    "jeremyojf@gmail.com",
                    LocalDate.of(1997, 12, 12),
                    GenderEnum.MALE,
                    RoleEnum.MANAGER,
                    false,
                    true,
                    null);
            ceo.setWorkEmail("ongj@libro.com");
            ceo.setEnabled(true);

            Long ceoId = Long.valueOf(0);
            // if any user exists already, don't run
            if (!userRepository.existsById(1L)) {
                System.out.println("No user, so will init 2 Administrator users");
                userService.initAdmin(testUser);
                userService.initAdmin(testUser2);
                ceoId = userService.initAdmin(ceo);
            } else {
                System.out.println("Administrators already exist, do not init Administrator users");
            }

            organizationService.addNewOrganization("Libro", ceoId);
        };
    }
}
