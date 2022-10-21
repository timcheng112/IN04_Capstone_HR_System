package com.conceiversolutions.hrsystem.user.user;

import com.conceiversolutions.hrsystem.enums.GenderEnum;
import com.conceiversolutions.hrsystem.enums.JobTypeEnum;
import com.conceiversolutions.hrsystem.enums.PositionTypeEnum;
import com.conceiversolutions.hrsystem.enums.RoleEnum;
import com.conceiversolutions.hrsystem.organizationstructure.organization.OrganizationService;
import com.conceiversolutions.hrsystem.user.position.Position;

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

                Position testUserPosition = new Position("Administrator", "Administrator position description", JobTypeEnum.FULLTIME,
                PositionTypeEnum.OFFICEWORKER);

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
            testUser.setCurrentPosition(testUserPosition);

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
            testUser2.setCurrentPosition(testUserPosition);

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
            ceo.setCurrentPosition(new Position("CEO", "CEO position description", JobTypeEnum.FULLTIME,
            PositionTypeEnum.EXECUTIVE));

            Long ceoId = Long.valueOf(0);

            Position managerPosition = new Position("Manager", "Manager position description", JobTypeEnum.FULLTIME,
            PositionTypeEnum.SALESMAN);

            User manager1 = new User(
                    "Matthew",
                    "Lee",
                    "password",
                    99887761,
                    "matthew@gmail.com",
                    LocalDate.of(1997, 12, 12),
                    GenderEnum.MALE,
                    RoleEnum.MANAGER,
                    false,
                    true,
                    null);
            manager1.setWorkEmail("matthew@libro.com");
            manager1.setEnabled(true);
            manager1.setCurrentPosition(managerPosition);

            User manager2 = new User(
                    "Xueqi",
                    "Deng",
                    "password",
                    99887736,
                    "tim@gmail.com",
                    LocalDate.of(1999, 12, 12),
                    GenderEnum.FEMALE,
                    RoleEnum.MANAGER,
                    false,
                    true,
                    null);
            manager2.setWorkEmail("xueqi@libro.com");
            manager2.setEnabled(true);
            manager2.setCurrentPosition(managerPosition);

            User manager3 = new User(
                    "Shihan",
                    "Wong",
                    "password",
                    99887799,
                    "shihan@gmail.com",
                    LocalDate.of(1997, 12, 12),
                    GenderEnum.MALE,
                    RoleEnum.MANAGER,
                    false,
                    true,
                    null);
            manager3.setWorkEmail("shihan@libro.com");
            manager3.setEnabled(true);
            manager3.setCurrentPosition(managerPosition);
            
            User manager4 = new User(
                    "Xinyue",
                    "Kong",
                    "password",
                    99887766,
                    "xinyue@gmail.com",
                    LocalDate.of(1997, 12, 12),
                    GenderEnum.FEMALE,
                    RoleEnum.MANAGER,
                    false,
                    true,
                    null);
            manager4.setWorkEmail("xinyue@libro.com");
            manager4.setEnabled(true);
            manager4.setCurrentPosition(managerPosition);

            User manager5 = new User(
                    "Alison",
                    "Lee",
                    "password",
                    99887766,
                    "alison@gmail.com",
                    LocalDate.of(1997, 12, 12),
                    GenderEnum.FEMALE,
                    RoleEnum.MANAGER,
                    false,
                    true,
                    null);
            manager5.setWorkEmail("alison@libro.com");
            manager5.setEnabled(true);
            manager5.setCurrentPosition(managerPosition);

            // if any user exists already, don't run
            if (!userRepository.existsById(1L)) {
                System.out.println("No user, so will init 2 Administrator users");
                userService.initAdmin(testUser);
                userService.initAdmin(testUser2);
                ceoId = userService.initAdmin(ceo);
                userService.initAdmin(manager1);
                userService.initAdmin(manager2);
                userService.initAdmin(manager3);
                userService.initAdmin(manager4);
                userService.initAdmin(manager5);
                organizationService.addNewOrganization("Libro", ceoId);
            } else {
                System.out.println("Administrators already exist, do not init Administrator users");
            }

        };
    }
}
