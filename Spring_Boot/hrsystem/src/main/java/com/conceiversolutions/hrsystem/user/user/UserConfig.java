package com.conceiversolutions.hrsystem.user.user;

import com.conceiversolutions.hrsystem.enums.CitizenshipEnum;
import com.conceiversolutions.hrsystem.enums.GenderEnum;
import com.conceiversolutions.hrsystem.enums.JobTypeEnum;
import com.conceiversolutions.hrsystem.enums.PositionTypeEnum;
import com.conceiversolutions.hrsystem.enums.RaceEnum;
import com.conceiversolutions.hrsystem.enums.RoleEnum;
import com.conceiversolutions.hrsystem.organizationstructure.address.AddressService;
import com.conceiversolutions.hrsystem.organizationstructure.department.DepartmentService;
import com.conceiversolutions.hrsystem.organizationstructure.organization.OrganizationService;
import com.conceiversolutions.hrsystem.organizationstructure.outlet.OutletService;
import com.conceiversolutions.hrsystem.organizationstructure.team.TeamService;
import com.conceiversolutions.hrsystem.pay.payinformation.PayInformation;
import com.conceiversolutions.hrsystem.skillset.skillset.SkillsetService;
import com.conceiversolutions.hrsystem.user.position.Position;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Configuration
public class UserConfig {
        @Bean
        CommandLineRunner userCommandLineRunner(UserRepository userRepository, UserService userService,
                        OrganizationService organizationService, DepartmentService departmentService,
                        AddressService addressService, OutletService outletService,
                        TeamService teamService, SkillsetService skillsetService) {
                // User Init for test data
                return args -> {
                        if (!userRepository.existsById(1L)) {
                                System.out.println("No user, so will init Administrator data");
                                Position adminPosition = new Position("Administrator",
                                                "Administrator position description", JobTypeEnum.FULLTIME,
                                                PositionTypeEnum.OFFICEWORKER);

                                User admin1 = new User(
                                                "Janice",
                                                "Sim",
                                                "password",
                                                93823503,
                                                "janicesim@gmail.com",
                                                LocalDate.of(2000, 2, 28),
                                                GenderEnum.FEMALE,
                                                RaceEnum.CHINESE,
                                                CitizenshipEnum.CITIZEN,
                                                RoleEnum.ADMINISTRATOR,
                                                false,
                                                true,
                                                null);
                                // admin1.setCurrentPayInformation(
                                //                 new PayInformation(new BigDecimal(2000), true, false, admin1));
                                admin1.setWorkEmail("simj@libro.com");
                                admin1.setEnabled(true);
                                admin1.setCurrentPosition(adminPosition);
                                userService.initAdmin(admin1);

                                User admin2 = new User(
                                                "Aloysius",
                                                "Yap",
                                                "password",
                                                91111111,
                                                "aloysiusyap@gmail.com",
                                                LocalDate.of(1997, 1, 1),
                                                GenderEnum.MALE,
                                                RaceEnum.CHINESE,
                                                CitizenshipEnum.CITIZEN,
                                                RoleEnum.ADMINISTRATOR,
                                                false,
                                                true,
                                                null);
                                // admin2.setCurrentPayInformation(
                                //                 new PayInformation(new BigDecimal(3000), true, false, admin2));
                                admin2.setWorkEmail("yapa@libro.com");
                                admin2.setEnabled(true);
                                admin2.setCurrentPosition(adminPosition);
                                userService.initAdmin(admin2);

                                User ceo = new User(
                                                "Jeremy",
                                                "Ong",
                                                "password",
                                                99887766,
                                                "jeremyojf@gmail.com",
                                                LocalDate.of(1997, 12, 12),
                                                GenderEnum.MALE,
                                                RaceEnum.CHINESE,
                                                CitizenshipEnum.CITIZEN,
                                                RoleEnum.MANAGER,
                                                false,
                                                true,
                                                null);
                                // ceo.setCurrentPayInformation(
                                //                 new PayInformation(new BigDecimal(10000), true, false, ceo));
                                ceo.setWorkEmail("ongj@libro.com");
                                ceo.setEnabled(true);
                                ceo.setCurrentPosition(
                                                new Position("CEO", "CEO position description", JobTypeEnum.FULLTIME,
                                                                PositionTypeEnum.EXECUTIVE));
                                userService.initAdmin(ceo);
                                Long ceoId = 3L;
                                organizationService.addNewOrganization("Libro", ceoId);

                                // Sales Dept Head
                                User matthewManager = new User(
                                                "Matthew",
                                                "Lee",
                                                "password",
                                                99887761,
                                                "matthew@gmail.com",
                                                LocalDate.of(1997, 12, 12),
                                                GenderEnum.MALE,
                                                RaceEnum.CHINESE,
                                                CitizenshipEnum.CITIZEN,
                                                RoleEnum.MANAGER,
                                                false,
                                                false,
                                                null);
                                // matthewManager.setCurrentPayInformation(
                                //                 new PayInformation(new BigDecimal(5000), true, false, matthewManager));
                                matthewManager.setWorkEmail("matthew@libro.com");
                                matthewManager.setEnabled(true);
                                Position SOMPosition = new Position("Sales Operation Manager",
                                                "Sales Operation Manager position description", JobTypeEnum.FULLTIME,
                                                PositionTypeEnum.EXECUTIVE);
                                matthewManager.setCurrentPosition(SOMPosition);
                                userService.initAdmin(matthewManager);
                                Long matthewId = 4L;

                                // Add 1 department
                                departmentService.addNewDepartment("Sales", 4);

                                // Add 2 address
                                addressService.addAddress("West Mall", "1 Bukit Batok Central", "01-08", "658713",
                                                "Singapore", "Singapore");
                                addressService.addAddress("NEX", "23 Serangoon Central", "04-33", "556083", "Singapore",
                                                "Singapore");

                                // Add 2 outlet
                                outletService.addOutlet("West Mall Store", "98778123", 10, 20, 1L);
                                Long wmId = 1L;
                                outletService.addOutlet("NEX Store", "98778124", 10, 20, 2L);
                                Long nexId = 2L;

                                // Team 1 Head
                                Position managerPosition = new Position("Store Manager",
                                                "Store Manager position description", JobTypeEnum.FULLTIME,
                                                PositionTypeEnum.STOREMANAGER);

                                User xueqiManager = new User(
                                                "Xueqi",
                                                "Deng",
                                                "password",
                                                99887736,
                                                "xueqi@gmail.com",
                                                LocalDate.of(1999, 8, 8),
                                                GenderEnum.FEMALE,
                                                RaceEnum.CHINESE,
                                                CitizenshipEnum.CITIZEN,
                                                RoleEnum.MANAGER,
                                                false,
                                                false,
                                                null);
                                // xueqiManager.setCurrentPayInformation(
                                //                 new PayInformation(new BigDecimal(5250), true, false, xueqiManager));
                                xueqiManager.setWorkEmail("xueqi@libro.com");
                                xueqiManager.setEnabled(true);
                                xueqiManager.setCurrentPosition(managerPosition);
                                userService.initAdmin(xueqiManager);
                                Long xueqiId = 5L;
                                teamService.addNewTeam("West Mall Team A", xueqiId.intValue(), wmId.intValue(), false,
                                                1);
                                Long wmTeamId = 1L;

                                // Team 2 Head
                                User shihanManager = new User(
                                                "Shihan",
                                                "Wong",
                                                "password",
                                                99887799,
                                                "shihan@gmail.com",
                                                LocalDate.of(1997, 12, 12),
                                                GenderEnum.MALE,
                                                RaceEnum.CHINESE,
                                                CitizenshipEnum.CITIZEN,
                                                RoleEnum.MANAGER,
                                                false,
                                                false,
                                                null);
                                // shihanManager.setCurrentPayInformation(
                                //                 new PayInformation(new BigDecimal(4850), true, false, shihanManager));
                                shihanManager.setWorkEmail("shihan@libro.com");
                                shihanManager.setEnabled(true);
                                shihanManager.setCurrentPosition(managerPosition);
                                userService.initAdmin(shihanManager);
                                Long shihanId = 6L;
                                teamService.addNewTeam("NEX Team A", shihanId.intValue(), nexId.intValue(), false, 1);
                                Long nexTeamId = 2L;

                                // HR Director
                                Position hrDirector = new Position("HR Director", "HR Director position description",
                                                JobTypeEnum.FULLTIME,
                                                PositionTypeEnum.EXECUTIVE);

                                User xinyueEmployee = new User(
                                                "Xinyue",
                                                "Kong",
                                                "password",
                                                99887766,
                                                "xinyue@gmail.com",
                                                LocalDate.of(1997, 7, 7),
                                                GenderEnum.FEMALE,
                                                RaceEnum.CHINESE,
                                                CitizenshipEnum.FOREIGNER,
                                                RoleEnum.MANAGER,
                                                false,
                                                true,
                                                null);
                                // xinyueEmployee.setCurrentPayInformation(
                                //                 new PayInformation(new BigDecimal(7000), true, false, xinyueEmployee));
                                xinyueEmployee.setWorkEmail("xinyue@libro.com");
                                xinyueEmployee.setEnabled(true);
                                xinyueEmployee.setCurrentPosition(hrDirector);
                                userService.initAdmin(xinyueEmployee);
                                Long xinyueId = 7L;

                                // Add HR department
                                departmentService.addNewDepartment("HR", xinyueId.intValue());

                                // Add address
                                addressService.addAddress("HR Office", "1 Ubi Link", "01-01", "408553", "Singapore",
                                                "Singapore");

                                // Add outlet
                                outletService.addOutlet("HR Office", "99889988", 9, 18, 3L);
                                Long hrOffice = 3L;

                                // Team HR Head
                                Position hrManager = new Position("HR Manager", "HR Manager position description",
                                                JobTypeEnum.FULLTIME,
                                                PositionTypeEnum.EXECUTIVE);

                                // Team HR Head
                                User alisonEmployee = new User(
                                                "Alison",
                                                "Lee",
                                                "password",
                                                99887766,
                                                "alison@gmail.com",
                                                LocalDate.of(1997, 4, 4),
                                                GenderEnum.FEMALE,
                                                RaceEnum.CHINESE,
                                                CitizenshipEnum.CITIZEN,
                                                RoleEnum.MANAGER,
                                                false,
                                                true,
                                                null);
                                // alisonEmployee.setCurrentPayInformation(
                                //                 new PayInformation(new BigDecimal(4000), true, false, alisonEmployee));
                                alisonEmployee.setWorkEmail("alison@libro.com");
                                alisonEmployee.setEnabled(true);
                                alisonEmployee.setCurrentPosition(hrManager);
                                userService.initAdmin(alisonEmployee);
                                Long alisonId = 8L;
                                teamService.addNewTeam("HR Team", alisonId.intValue(), hrOffice.intValue(), true, 2);
                                Long hrTeamId = 3L;

                                // create employees
                                // HR Employee 1
                                Position hrEmployee = new Position("HR Employee", "HR Employee position description",
                                                JobTypeEnum.FULLTIME,
                                                PositionTypeEnum.OFFICEWORKER);
                                User timEmployee = new User(
                                                "Timothy",
                                                "Cheng",
                                                "password",
                                                99887764,
                                                "tim@gmail.com",
                                                LocalDate.of(1999, 2, 25),
                                                GenderEnum.MALE,
                                                RaceEnum.CHINESE,
                                                CitizenshipEnum.CITIZEN,
                                                RoleEnum.EMPLOYEE,
                                                false,
                                                true,
                                                null);
                                // timEmployee.setCurrentPayInformation(
                                //                 new PayInformation(new BigDecimal(2000), true, false, timEmployee));
                                timEmployee.setWorkEmail("tim@libro.com");
                                timEmployee.setEnabled(true);
                                timEmployee.setCurrentPosition(hrEmployee);
                                userService.initAdmin(timEmployee);
                                Long timId = 9L;
                                teamService.addMemberToTeam(hrTeamId.intValue(), timId.intValue());

                                // HR Employee 2
                                User hedgehogEmployee = new User(
                                                "Hedge",
                                                "Hog",
                                                "password",
                                                88888888,
                                                "hedgehog@gmail.com",
                                                LocalDate.of(2000, 8, 8),
                                                GenderEnum.MALE,
                                                RaceEnum.OTHERS,
                                                CitizenshipEnum.FOREIGNER,
                                                RoleEnum.EMPLOYEE,
                                                false,
                                                true,
                                                null);
                                // hedgehogEmployee.setCurrentPayInformation(new PayInformation(new BigDecimal(2250), true,
                                //                 false, hedgehogEmployee));
                                hedgehogEmployee.setWorkEmail("hedgehog@libro.com");
                                hedgehogEmployee.setEnabled(true);
                                hedgehogEmployee.setCurrentPosition(hrEmployee);
                                userService.initAdmin(hedgehogEmployee);
                                Long hedgehogId = 10L;
                                teamService.addMemberToTeam(hrTeamId.intValue(), hedgehogId.intValue());

                                // West Mall Cashier
                                Position cashierEmployee = new Position("Cashier Employee",
                                                "Cashier Employee position description", JobTypeEnum.FULLTIME,
                                                PositionTypeEnum.CASHIER);
                                User bruceEmployee = new User(
                                                "Bruce",
                                                "Wayne",
                                                "password",
                                                99554444,
                                                "bruce@gmail.com",
                                                LocalDate.of(1985, 5, 12),
                                                GenderEnum.MALE,
                                                RaceEnum.OTHERS,
                                                CitizenshipEnum.FOREIGNER,
                                                RoleEnum.EMPLOYEE,
                                                false,
                                                false,
                                                null);
                                // bruceEmployee.setCurrentPayInformation(new PayInformation(new BigDecimal(10),
                                //                 new BigDecimal(20), new BigDecimal(20), new BigDecimal(15), true, false,
                                //                 bruceEmployee));
                                bruceEmployee.setWorkEmail("bruce@libro.com");
                                bruceEmployee.setEnabled(true);
                                bruceEmployee.setCurrentPosition(cashierEmployee);
                                userService.initAdmin(bruceEmployee);
                                Long bruceId = 11L;
                                teamService.addMemberToTeam(wmTeamId.intValue(), bruceId.intValue());

                                // NEX Cashier
                                User barryEmployee = new User(
                                                "Barry",
                                                "Allen",
                                                "password",
                                                99554445,
                                                "barry@gmail.com",
                                                LocalDate.of(1988, 7, 30),
                                                GenderEnum.MALE,
                                                RaceEnum.OTHERS,
                                                CitizenshipEnum.FOREIGNER,
                                                RoleEnum.EMPLOYEE,
                                                false,
                                                false,
                                                null);
                                // barryEmployee.setCurrentPayInformation(new PayInformation(new BigDecimal(10),
                                //                 new BigDecimal(20), new BigDecimal(20), new BigDecimal(15), true, false,
                                //                 barryEmployee));
                                barryEmployee.setWorkEmail("barry@libro.com");
                                barryEmployee.setEnabled(true);
                                barryEmployee.setCurrentPosition(cashierEmployee);
                                userService.initAdmin(barryEmployee);
                                Long barryId = 12L;
                                teamService.addMemberToTeam(nexTeamId.intValue(), barryId.intValue());

                                // West Mall Salesman
                                Position salesmanEmployee = new Position("Salesman Employee",
                                                "Salesman Employee position description", JobTypeEnum.FULLTIME,
                                                PositionTypeEnum.CASHIER);
                                User dianaEmployee = new User(
                                                "Diana",
                                                "Prince",
                                                "password",
                                                99554446,
                                                "diana@gmail.com",
                                                LocalDate.of(1987, 9, 11),
                                                GenderEnum.FEMALE,
                                                RaceEnum.OTHERS,
                                                CitizenshipEnum.FOREIGNER,
                                                RoleEnum.EMPLOYEE,
                                                false,
                                                false,
                                                null);
                                // dianaEmployee.setCurrentPayInformation(new PayInformation(new BigDecimal(9),
                                //                 new BigDecimal(18), new BigDecimal(18), new BigDecimal(14), true, true,
                                //                 dianaEmployee));
                                dianaEmployee.setWorkEmail("diana@libro.com");
                                dianaEmployee.setEnabled(true);
                                dianaEmployee.setCurrentPosition(salesmanEmployee);
                                userService.initAdmin(dianaEmployee);
                                Long dianaId = 13L;
                                teamService.addMemberToTeam(wmTeamId.intValue(), dianaId.intValue());

                                // NEX Salesman
                                User clarkEmployee = new User(
                                                "Clark",
                                                "Kent",
                                                "password",
                                                99554447,
                                                "clark@gmail.com",
                                                LocalDate.of(1978, 11, 27),
                                                GenderEnum.MALE,
                                                RaceEnum.OTHERS,
                                                CitizenshipEnum.FOREIGNER,
                                                RoleEnum.EMPLOYEE,
                                                false,
                                                false,
                                                null);
                                // clarkEmployee.setCurrentPayInformation(new PayInformation(new BigDecimal(9),
                                //                 new BigDecimal(18), new BigDecimal(18), new BigDecimal(14), true, true,
                                //                 clarkEmployee));
                                clarkEmployee.setWorkEmail("clark@libro.com");
                                clarkEmployee.setEnabled(true);
                                clarkEmployee.setCurrentPosition(salesmanEmployee);
                                userService.initAdmin(clarkEmployee);
                                Long clarkId = 14L;
                                teamService.addMemberToTeam(nexTeamId.intValue(), clarkId.intValue());

                                // Skillsets
                                skillsetService.addSkillset("Java");
                                skillsetService.addSkillset("Python");
                                skillsetService.addSkillset("MySQL");
                                skillsetService.addSkillset("Javascript");
                                skillsetService.addSkillset("React");
                                skillsetService.addSkillset("HR Management");
                                skillsetService.addSkillset("Microsoft Word");
                                skillsetService.addSkillset("Microsoft Excel");
                                skillsetService.addSkillset("Microsoft Powerpoint");

                                // Create Applicant
                                User spongebobApplicant = new User("Spongebob", "Squarepants", "password", 81231234,
                                                "sponge@bob.com", LocalDate.of(1999, 5, 1),
                                                GenderEnum.MALE, RaceEnum.OTHERS, CitizenshipEnum.FOREIGNER,
                                                RoleEnum.APPLICANT, false, false, null);
                                spongebobApplicant.setEnabled(true);
                                userService.initApplicant(spongebobApplicant);

                                User sandyApplicant = new User("Sandy", "Cheeks", "password", 81231235,
                                                "sandy@cheeks.com", LocalDate.of(1999, 5, 1),
                                                GenderEnum.FEMALE, RaceEnum.EURASIAN, CitizenshipEnum.CITIZEN,
                                                RoleEnum.APPLICANT, false, false, null);
                                sandyApplicant.setEnabled(true);
                                userService.initApplicant(sandyApplicant);
                                // firstName, lastName, password, phone, email, dob, gender.toUpperCase()

                                System.out.println("************* Init Completed *************");
                        } else {
                                // if any user exists already, don't run
                                System.out.println(
                                                "************* Administrators already exist, do not init *************");
                        }

                };
        }
}
