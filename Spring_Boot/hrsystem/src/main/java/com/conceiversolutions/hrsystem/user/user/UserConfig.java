package com.conceiversolutions.hrsystem.user.user;

import com.conceiversolutions.hrsystem.engagement.benefittype.BenefitType;
import com.conceiversolutions.hrsystem.engagement.benefittype.BenefitTypeRepository;
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
import com.conceiversolutions.hrsystem.pay.allowance.Allowance;
import com.conceiversolutions.hrsystem.pay.deduction.Deduction;
import com.conceiversolutions.hrsystem.pay.payinformation.PayInformation;
import com.conceiversolutions.hrsystem.pay.payslip.Payslip;
import com.conceiversolutions.hrsystem.pay.payslip.PayslipRepository;
import com.conceiversolutions.hrsystem.pay.payslip.PayslipService;
import com.conceiversolutions.hrsystem.skillset.skillset.SkillsetService;
import com.conceiversolutions.hrsystem.user.position.Position;

import net.bytebuddy.asm.Advice.Local;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Configuration
public class UserConfig {
        @Bean
        CommandLineRunner userCommandLineRunner(UserRepository userRepository, UserService userService,
                        OrganizationService organizationService, DepartmentService departmentService,
                        AddressService addressService, OutletService outletService,
                        TeamService teamService, SkillsetService skillsetService,
                        BenefitTypeRepository benefitTypeRepository, PayslipService payslipService) {
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
                                admin1.setCurrentPayInformation(
                                                new PayInformation(new BigDecimal(2000), true, false));
                                admin1.setWorkEmail("simj@libro.com");
                                admin1.setEnabled(true);
                                admin1.setCurrentPosition(adminPosition);
                                admin1.setBankName("DBS Bank");
                                admin1.setBankAccNo("0052312891");

                                Payslip augPayslipAdmin1 = new Payslip(LocalDate.of(2022, 8, 31), new BigDecimal(1800),
                                                new BigDecimal(0), new BigDecimal(100), new BigDecimal(1900),
                                                LocalDate.of(2022, 8, 31));
                                Payslip sepPayslipAdmin1 = new Payslip(LocalDate.of(2022, 9, 30), new BigDecimal(1800),
                                                new BigDecimal(0), new BigDecimal(100), new BigDecimal(1900),
                                                LocalDate.of(2022, 9, 30));
                                Payslip octPayslipAdmin1 = new Payslip(LocalDate.of(2022, 10, 31), new BigDecimal(1800),
                                                new BigDecimal(0), new BigDecimal(100), new BigDecimal(1900),
                                                LocalDate.of(2022, 10, 31));
                                // note: good chance this is scuffed because its not properly setting up payinfo
                                // - payslip relationship.
                                Payslip futurePayslipAdmin1 = new Payslip(LocalDate.of(2023, 8, 31),
                                                new BigDecimal(1813), new BigDecimal(13), new BigDecimal(100),
                                                new BigDecimal(1900), LocalDate.of(2023, 8, 31));
                                List<Payslip> payslipsAdmin1 = new ArrayList<>();
                                payslipsAdmin1.add(augPayslipAdmin1);
                                payslipsAdmin1.add(sepPayslipAdmin1);
                                payslipsAdmin1.add(octPayslipAdmin1);
                                payslipsAdmin1.add(futurePayslipAdmin1);
                                admin1.setPayslips(payslipsAdmin1);
                                List<Allowance> allowanceTemp = admin1.getCurrentPayInformation().getAllowance();
                                allowanceTemp.add(new Allowance("allowance1", new BigDecimal(100),
                                                "this is a test allowance!", LocalDate.of(2022, 11, 27), "BONUS"));
                                List<Deduction> deductionTemp = admin1.getCurrentPayInformation().getDeduction();
                                deductionTemp.add(new Deduction("deduction1", new BigDecimal(50),
                                                "this is a test deduction!", LocalDate.of(2022, 11, 1), "OTHERS"));
                                admin1.getCurrentPayInformation().setAllowance(allowanceTemp);
                                admin1.getCurrentPayInformation().setDeduction(deductionTemp);
                                userService.initAdmin(admin1);
                                // persist payslips too to set other side of r/s
                                augPayslipAdmin1.setEmployee(admin1);
                                augPayslipAdmin1.setPayInformation(admin1.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(augPayslipAdmin1);

                                sepPayslipAdmin1.setEmployee(admin1);
                                sepPayslipAdmin1.setPayInformation(admin1.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(sepPayslipAdmin1);

                                octPayslipAdmin1.setEmployee(admin1);
                                octPayslipAdmin1.setPayInformation(admin1.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(octPayslipAdmin1);

                                futurePayslipAdmin1.setEmployee(admin1);
                                futurePayslipAdmin1.setPayInformation(admin1.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(futurePayslipAdmin1);

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
                                admin2.setCurrentPayInformation(
                                                new PayInformation(new BigDecimal(3000), true, false));
                                admin2.setWorkEmail("yapa@libro.com");
                                admin2.setEnabled(true);
                                admin2.setCurrentPosition(adminPosition);
                                admin2.setBankName("UOB Singapore");
                                admin2.setBankAccNo("0062312891");
                                Payslip augPayslipAdmin2 = new Payslip(LocalDate.of(2022, 8, 31), new BigDecimal(2300),
                                                new BigDecimal(0), new BigDecimal(100), new BigDecimal(2400),
                                                LocalDate.of(2022, 8, 31));
                                Payslip sepPayslipAdmin2 = new Payslip(LocalDate.of(2022, 9, 30), new BigDecimal(2300),
                                                new BigDecimal(0), new BigDecimal(100), new BigDecimal(2400),
                                                LocalDate.of(2022, 9, 30));
                                Payslip octPayslipAdmin2 = new Payslip(LocalDate.of(2022, 10, 31), new BigDecimal(2300),
                                                new BigDecimal(0), new BigDecimal(100), new BigDecimal(2400),
                                                LocalDate.of(2022, 10, 31));
                                List<Payslip> payslipsAdmin2 = new ArrayList<>();
                                payslipsAdmin2.add(augPayslipAdmin2);
                                payslipsAdmin2.add(sepPayslipAdmin2);
                                payslipsAdmin2.add(octPayslipAdmin2);
                                admin2.setPayslips(payslipsAdmin2);
                                userService.initAdmin(admin2);
                                augPayslipAdmin2.setEmployee(admin2);
                                augPayslipAdmin2.setPayInformation(admin2.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(augPayslipAdmin2);

                                sepPayslipAdmin2.setEmployee(admin2);
                                sepPayslipAdmin2.setPayInformation(admin2.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(sepPayslipAdmin2);

                                octPayslipAdmin2.setEmployee(admin2);
                                octPayslipAdmin2.setPayInformation(admin2.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(octPayslipAdmin2);

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
                                ceo.setCurrentPayInformation(
                                                new PayInformation(new BigDecimal(10000), true, false));
                                List<Allowance> allowanceCeo = ceo.getCurrentPayInformation().getAllowance();
                                allowanceCeo.add(new Allowance("allowanceCeo", new BigDecimal(100), "Travel Allowance",
                                                LocalDate.of(2022, 11, 27), "LIFESTYLE"));
                                List<Deduction> deductionCeo = ceo.getCurrentPayInformation().getDeduction();
                                deductionCeo.add(new Deduction("deductionCeo", new BigDecimal(50), "Housing Costs",
                                                LocalDate.of(2022, 11, 1), "DAMAGES"));
                                ceo.getCurrentPayInformation().setAllowance(allowanceCeo);
                                ceo.getCurrentPayInformation().setDeduction(deductionCeo);
                                ceo.setWorkEmail("ongj@libro.com");
                                ceo.setEnabled(true);
                                ceo.setCurrentPosition(
                                                new Position("CEO", "CEO position description", JobTypeEnum.FULLTIME,
                                                                PositionTypeEnum.EXECUTIVE));
                                ceo.setBankName("Citibank Singapore");
                                ceo.setBankAccNo("0072312891");
                                Payslip augPayslipCeo = new Payslip(LocalDate.of(2022, 8, 31), new BigDecimal(8369),
                                                new BigDecimal(9000), new BigDecimal(69), new BigDecimal(700),
                                                LocalDate.of(2022, 8, 31));
                                Payslip sepPayslipCeo = new Payslip(LocalDate.of(2022, 9, 30), new BigDecimal(8369),
                                                new BigDecimal(9000), new BigDecimal(69), new BigDecimal(700),
                                                LocalDate.of(2022, 9, 30));
                                Payslip octPayslipCeo = new Payslip(LocalDate.of(2022, 10, 31), new BigDecimal(8369),
                                                new BigDecimal(9000), new BigDecimal(69), new BigDecimal(700),
                                                LocalDate.of(2022, 10, 31));
                                List<Payslip> payslipsCeo = new ArrayList<>();
                                payslipsCeo.add(augPayslipCeo);
                                payslipsCeo.add(sepPayslipCeo);
                                payslipsCeo.add(octPayslipCeo);
                                ceo.setPayslips(payslipsCeo);
                                userService.initAdmin(ceo);

                                augPayslipCeo.setEmployee(ceo);
                                augPayslipCeo.setPayInformation(ceo.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(augPayslipCeo);

                                sepPayslipCeo.setEmployee(ceo);
                                sepPayslipCeo.setPayInformation(ceo.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(sepPayslipCeo);

                                octPayslipCeo.setEmployee(ceo);
                                octPayslipCeo.setPayInformation(ceo.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(octPayslipCeo);

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
                                matthewManager.setCurrentPayInformation(
                                                new PayInformation(new BigDecimal(5000), true, false));
                                matthewManager.setWorkEmail("matthew@libro.com");
                                matthewManager.setEnabled(true);
                                Position SOMPosition = new Position("Sales Operation Manager",
                                                "Sales Operation Manager position description", JobTypeEnum.FULLTIME,
                                                PositionTypeEnum.EXECUTIVE);
                                matthewManager.setCurrentPosition(SOMPosition);
                                matthewManager.setBankName("Maybank Singapore");
                                matthewManager.setBankAccNo("0082316891");
                                Payslip augPayslipMatthewManager = new Payslip(LocalDate.of(2022, 8, 31),
                                                new BigDecimal(3870), new BigDecimal(70), new BigDecimal(0),
                                                new BigDecimal(3800), LocalDate.of(2022, 8, 31));
                                Payslip sepPayslipMatthewManager = new Payslip(LocalDate.of(2022, 9, 30),
                                                new BigDecimal(3870), new BigDecimal(70), new BigDecimal(0),
                                                new BigDecimal(3800), LocalDate.of(2022, 9, 30));
                                Payslip octPayslipMatthewManager = new Payslip(LocalDate.of(2022, 10, 31),
                                                new BigDecimal(3870), new BigDecimal(70), new BigDecimal(0),
                                                new BigDecimal(3800), LocalDate.of(2022, 10, 31));
                                List<Payslip> payslipsMatthewManager = new ArrayList<>();
                                payslipsMatthewManager.add(augPayslipMatthewManager);
                                payslipsMatthewManager.add(sepPayslipMatthewManager);
                                payslipsMatthewManager.add(octPayslipMatthewManager);
                                matthewManager.setPayslips(payslipsMatthewManager);
                                userService.initAdmin(matthewManager);

                                augPayslipMatthewManager.setEmployee(matthewManager);
                                augPayslipMatthewManager.setPayInformation(matthewManager.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(augPayslipMatthewManager);

                                sepPayslipMatthewManager.setEmployee(matthewManager);
                                sepPayslipMatthewManager.setPayInformation(matthewManager.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(sepPayslipMatthewManager);

                                octPayslipMatthewManager.setEmployee(matthewManager);
                                octPayslipMatthewManager.setPayInformation(matthewManager.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(octPayslipMatthewManager);
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
                                xueqiManager.setCurrentPayInformation(
                                                new PayInformation(new BigDecimal(5250), true, false));
                                xueqiManager.setWorkEmail("xueqi@libro.com");
                                xueqiManager.setEnabled(true);
                                xueqiManager.setCurrentPosition(managerPosition);
                                xueqiManager.setBankName("Standard Chartered Singapore");
                                xueqiManager.setBankAccNo("0022386891");
                                Payslip augPayslipXueqiManager = new Payslip(LocalDate.of(2022, 8, 31),
                                                new BigDecimal(4070), new BigDecimal(70), new BigDecimal(100),
                                                new BigDecimal(4100), LocalDate.of(2022, 8, 31));
                                Payslip sepPayslipXueqiManager = new Payslip(LocalDate.of(2022, 9, 30),
                                                new BigDecimal(3999), new BigDecimal(99), new BigDecimal(200),
                                                new BigDecimal(4100), LocalDate.of(2022, 9, 30));
                                Payslip octPayslipXueqiManager = new Payslip(LocalDate.of(2022, 10, 31),
                                                new BigDecimal(4070), new BigDecimal(70), new BigDecimal(100),
                                                new BigDecimal(4100), LocalDate.of(2022, 10, 31));
                                List<Payslip> payslipsXueqiManager = new ArrayList<>();
                                payslipsXueqiManager.add(augPayslipXueqiManager);
                                payslipsXueqiManager.add(sepPayslipXueqiManager);
                                payslipsXueqiManager.add(octPayslipXueqiManager);
                                xueqiManager.setPayslips(payslipsXueqiManager);
                                userService.initAdmin(xueqiManager);

                                augPayslipXueqiManager.setEmployee(matthewManager);
                                augPayslipXueqiManager.setPayInformation(matthewManager.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(augPayslipXueqiManager);

                                sepPayslipXueqiManager.setEmployee(xueqiManager);
                                sepPayslipXueqiManager.setPayInformation(xueqiManager.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(sepPayslipXueqiManager);

                                octPayslipXueqiManager.setEmployee(xueqiManager);
                                octPayslipXueqiManager.setPayInformation(xueqiManager.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(octPayslipXueqiManager);

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
                                shihanManager.setCurrentPayInformation(
                                                new PayInformation(new BigDecimal(4850), true, false));
                                shihanManager.setWorkEmail("shihan@libro.com");
                                shihanManager.setEnabled(true);
                                shihanManager.setCurrentPosition(managerPosition);
                                shihanManager.setBankName("DBS Bank");
                                shihanManager.setBankAccNo("0069316891");
                                Payslip augPayslipShihanManager = new Payslip(LocalDate.of(2022, 8, 31),
                                                new BigDecimal(3530), new BigDecimal(70), new BigDecimal(100),
                                                new BigDecimal(3600), LocalDate.of(2022, 8, 31));
                                Payslip sepPayslipShihanManager = new Payslip(LocalDate.of(2022, 9, 30),
                                                new BigDecimal(3600), new BigDecimal(0), new BigDecimal(0),
                                                new BigDecimal(3600), LocalDate.of(2022, 9, 30));
                                Payslip octPayslipShihanManager = new Payslip(LocalDate.of(2022, 10, 31),
                                                new BigDecimal(3530), new BigDecimal(70), new BigDecimal(100),
                                                new BigDecimal(3600), LocalDate.of(2022, 10, 31));
                                List<Payslip> payslipsShihanManager = new ArrayList<>();
                                payslipsShihanManager.add(augPayslipShihanManager);
                                payslipsShihanManager.add(sepPayslipShihanManager);
                                payslipsShihanManager.add(octPayslipShihanManager);
                                shihanManager.setPayslips(payslipsShihanManager);
                                userService.initAdmin(shihanManager);
                                augPayslipShihanManager.setEmployee(shihanManager);
                                augPayslipShihanManager.setPayInformation(shihanManager.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(augPayslipShihanManager);

                                sepPayslipShihanManager.setEmployee(shihanManager);
                                sepPayslipShihanManager.setPayInformation(shihanManager.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(sepPayslipShihanManager);

                                octPayslipShihanManager.setEmployee(shihanManager);
                                octPayslipShihanManager.setPayInformation(shihanManager.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(octPayslipShihanManager);
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
                                xinyueEmployee.setCurrentPayInformation(
                                                new PayInformation(new BigDecimal(7000), false, false));
                                xinyueEmployee.setWorkEmail("xinyue@libro.com");
                                xinyueEmployee.setEnabled(true);
                                xinyueEmployee.setCurrentPosition(hrDirector);
                                xinyueEmployee.setBankName("DBS Bank");
                                xinyueEmployee.setBankAccNo("0059386891");
                                Payslip augPayslipXinyueEmployee = new Payslip(LocalDate.of(2022, 8, 31),
                                                new BigDecimal(3530), new BigDecimal(70), new BigDecimal(100),
                                                new BigDecimal(5900), LocalDate.of(2022, 8, 31));
                                Payslip sepPayslipXinyueEmployee = new Payslip(LocalDate.of(2022, 9, 30),
                                                new BigDecimal(5830), new BigDecimal(70), new BigDecimal(100),
                                                new BigDecimal(5900), LocalDate.of(2022, 9, 30));
                                Payslip octPayslipXinyueEmployee = new Payslip(LocalDate.of(2022, 10, 31),
                                                new BigDecimal(5830), new BigDecimal(70), new BigDecimal(100),
                                                new BigDecimal(5900), LocalDate.of(2022, 10, 31));
                                List<Payslip> payslipsXinyueEmployee = new ArrayList<>();
                                payslipsXinyueEmployee.add(augPayslipXinyueEmployee);
                                payslipsXinyueEmployee.add(sepPayslipXinyueEmployee);
                                payslipsXinyueEmployee.add(octPayslipXinyueEmployee);
                                xinyueEmployee.setPayslips(payslipsXinyueEmployee);
                                userService.initAdmin(xinyueEmployee);

                                augPayslipXinyueEmployee.setEmployee(xinyueEmployee);
                                augPayslipXinyueEmployee.setPayInformation(xinyueEmployee.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(augPayslipXinyueEmployee);

                                sepPayslipXinyueEmployee.setEmployee(xinyueEmployee);
                                sepPayslipXinyueEmployee.setPayInformation(xinyueEmployee.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(sepPayslipXinyueEmployee);

                                octPayslipXinyueEmployee.setEmployee(xinyueEmployee);
                                octPayslipXinyueEmployee.setPayInformation(xinyueEmployee.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(octPayslipXinyueEmployee);

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
                                                PositionTypeEnum.STOREMANAGER);

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
                                alisonEmployee.setCurrentPayInformation(
                                                new PayInformation(new BigDecimal(4000), true, false));
                                alisonEmployee.setWorkEmail("alison@libro.com");
                                alisonEmployee.setEnabled(true);
                                alisonEmployee.setCurrentPosition(hrManager);
                                alisonEmployee.setBankName("DBS Bank");
                                alisonEmployee.setBankAccNo("0049316891");
                                Payslip augPayslipAlisonEmployee = new Payslip(LocalDate.of(2022, 8, 31),
                                                new BigDecimal(3070), new BigDecimal(70), new BigDecimal(0),
                                                new BigDecimal(3000), LocalDate.of(2022, 8, 31));
                                Payslip sepPayslipAlisonEmployee = new Payslip(LocalDate.of(2022, 9, 30),
                                                new BigDecimal(3070), new BigDecimal(70), new BigDecimal(0),
                                                new BigDecimal(3000), LocalDate.of(2022, 9, 30));
                                Payslip octPayslipAlisonEmployee = new Payslip(LocalDate.of(2022, 10, 31),
                                                new BigDecimal(3070), new BigDecimal(70), new BigDecimal(0),
                                                new BigDecimal(3000), LocalDate.of(2022, 10, 31));
                                List<Payslip> payslipsAlisonEmployee = new ArrayList<>();
                                payslipsAlisonEmployee.add(augPayslipAlisonEmployee);
                                payslipsAlisonEmployee.add(sepPayslipAlisonEmployee);
                                payslipsAlisonEmployee.add(octPayslipAlisonEmployee);
                                alisonEmployee.setPayslips(payslipsAlisonEmployee);
                                userService.initAdmin(alisonEmployee);

                                augPayslipAlisonEmployee.setEmployee(alisonEmployee);
                                augPayslipAlisonEmployee.setPayInformation(alisonEmployee.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(augPayslipAlisonEmployee);

                                sepPayslipAlisonEmployee.setEmployee(alisonEmployee);
                                sepPayslipAlisonEmployee.setPayInformation(alisonEmployee.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(sepPayslipAlisonEmployee);

                                octPayslipAlisonEmployee.setEmployee(alisonEmployee);
                                octPayslipAlisonEmployee.setPayInformation(alisonEmployee.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(octPayslipAlisonEmployee);

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
                                timEmployee.setCurrentPayInformation(
                                                new PayInformation(new BigDecimal(2000), true, false));
                                timEmployee.setWorkEmail("tim@libro.com");
                                timEmployee.setEnabled(true);
                                timEmployee.setCurrentPosition(hrEmployee);
                                timEmployee.setBankName("DBS Bank");
                                timEmployee.setBankAccNo("0089812891");
                                Payslip augPayslipTimEmployee = new Payslip(LocalDate.of(2022, 8, 31),
                                                new BigDecimal(2070), new BigDecimal(70), new BigDecimal(0),
                                                new BigDecimal(2000), LocalDate.of(2022, 8, 31));
                                Payslip sepPayslipTimEmployee = new Payslip(LocalDate.of(2022, 9, 30),
                                                new BigDecimal(2070), new BigDecimal(70), new BigDecimal(0),
                                                new BigDecimal(2000), LocalDate.of(2022, 9, 30));
                                Payslip octPayslipTimEmployee = new Payslip(LocalDate.of(2022, 10, 31),
                                                new BigDecimal(2070), new BigDecimal(70), new BigDecimal(0),
                                                new BigDecimal(2000), LocalDate.of(2022, 10, 31));
                                List<Payslip> payslipsTimEmployee = new ArrayList<>();
                                payslipsTimEmployee.add(augPayslipTimEmployee);
                                payslipsTimEmployee.add(sepPayslipTimEmployee);
                                payslipsTimEmployee.add(octPayslipTimEmployee);
                                timEmployee.setPayslips(payslipsTimEmployee);
                                userService.initAdmin(timEmployee);

                                augPayslipTimEmployee.setEmployee(timEmployee);
                                augPayslipTimEmployee.setPayInformation(timEmployee.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(augPayslipTimEmployee);

                                sepPayslipTimEmployee.setEmployee(timEmployee);
                                sepPayslipTimEmployee.setPayInformation(timEmployee.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(sepPayslipTimEmployee);

                                octPayslipTimEmployee.setEmployee(timEmployee);
                                octPayslipTimEmployee.setPayInformation(timEmployee.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(octPayslipTimEmployee);
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
                                hedgehogEmployee.setCurrentPayInformation(new PayInformation(new BigDecimal(2250), true,
                                                false));
                                hedgehogEmployee.setWorkEmail("hedgehog@libro.com");
                                hedgehogEmployee.setEnabled(true);
                                hedgehogEmployee.setCurrentPosition(hrEmployee);
                                hedgehogEmployee.setBankName("DBS Bank");
                                hedgehogEmployee.setBankAccNo("0015812891");
                                Payslip augPayslipHedgehogEmployee = new Payslip(LocalDate.of(2022, 8, 31),
                                                new BigDecimal(1070), new BigDecimal(70), new BigDecimal(0),
                                                new BigDecimal(1000), LocalDate.of(2022, 8, 31));
                                Payslip sepPayslipHedgehogEmployee = new Payslip(LocalDate.of(2022, 9, 30),
                                                new BigDecimal(1070), new BigDecimal(70), new BigDecimal(0),
                                                new BigDecimal(1000), LocalDate.of(2022, 9, 30));
                                Payslip octPayslipHedgehogEmployee = new Payslip(LocalDate.of(2022, 10, 31),
                                                new BigDecimal(1070), new BigDecimal(70), new BigDecimal(0),
                                                new BigDecimal(1000), LocalDate.of(2022, 10, 31));
                                List<Payslip> payslipsHedgehogEmployee = new ArrayList<>();
                                payslipsHedgehogEmployee.add(augPayslipHedgehogEmployee);
                                payslipsHedgehogEmployee.add(sepPayslipHedgehogEmployee);
                                payslipsHedgehogEmployee.add(octPayslipHedgehogEmployee);
                                hedgehogEmployee.setPayslips(payslipsHedgehogEmployee);
                                userService.initAdmin(hedgehogEmployee);

                                augPayslipHedgehogEmployee.setEmployee(hedgehogEmployee);
                                augPayslipHedgehogEmployee
                                                .setPayInformation(hedgehogEmployee.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(augPayslipXinyueEmployee);

                                sepPayslipHedgehogEmployee.setEmployee(hedgehogEmployee);
                                sepPayslipHedgehogEmployee
                                                .setPayInformation(hedgehogEmployee.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(sepPayslipHedgehogEmployee);

                                octPayslipHedgehogEmployee.setEmployee(hedgehogEmployee);
                                octPayslipHedgehogEmployee
                                                .setPayInformation(hedgehogEmployee.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(octPayslipHedgehogEmployee);

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
                                bruceEmployee.setCurrentPayInformation(new PayInformation(new BigDecimal(10),
                                                new BigDecimal(20), new BigDecimal(20), new BigDecimal(15), false,
                                                false));
                                bruceEmployee.setWorkEmail("bruce@libro.com");
                                bruceEmployee.setEnabled(true);
                                bruceEmployee.setCurrentPosition(cashierEmployee);
                                bruceEmployee.setBankName("UOB Singapore");
                                bruceEmployee.setBankAccNo("0035812891");
                                Payslip augPayslipBruceEmployee = new Payslip(LocalDate.of(2022, 8, 31),
                                                new BigDecimal(1270), new BigDecimal(70), new BigDecimal(0),
                                                new BigDecimal(1200), LocalDate.of(2022, 8, 31));
                                Payslip sepPayslipBruceEmployee = new Payslip(LocalDate.of(2022, 9, 30),
                                                new BigDecimal(1270), new BigDecimal(70), new BigDecimal(0),
                                                new BigDecimal(1200), LocalDate.of(2022, 9, 30));
                                Payslip octPayslipBruceEmployee = new Payslip(LocalDate.of(2022, 10, 31),
                                                new BigDecimal(1270), new BigDecimal(70), new BigDecimal(0),
                                                new BigDecimal(1200), LocalDate.of(2022, 10, 31));
                                List<Payslip> payslipsBruceEmployee = new ArrayList<>();
                                payslipsBruceEmployee.add(augPayslipBruceEmployee);
                                payslipsBruceEmployee.add(sepPayslipBruceEmployee);
                                payslipsBruceEmployee.add(octPayslipBruceEmployee);
                                bruceEmployee.setPayslips(payslipsBruceEmployee);
                                userService.initAdmin(bruceEmployee);

                                augPayslipBruceEmployee.setEmployee(bruceEmployee);
                                augPayslipBruceEmployee.setPayInformation(bruceEmployee.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(augPayslipBruceEmployee);

                                sepPayslipBruceEmployee.setEmployee(bruceEmployee);
                                sepPayslipBruceEmployee.setPayInformation(bruceEmployee.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(sepPayslipBruceEmployee);

                                octPayslipBruceEmployee.setEmployee(bruceEmployee);
                                octPayslipBruceEmployee.setPayInformation(bruceEmployee.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(octPayslipBruceEmployee);

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
                                barryEmployee.setCurrentPayInformation(new PayInformation(new BigDecimal(10),
                                                new BigDecimal(20), new BigDecimal(20), new BigDecimal(15), true,
                                                false));
                                barryEmployee.setWorkEmail("barry@libro.com");
                                barryEmployee.setEnabled(true);
                                barryEmployee.setCurrentPosition(cashierEmployee);
                                barryEmployee.setBankName("DBS Bank");
                                barryEmployee.setBankAccNo("0062112891");
                                Payslip augPayslipBarryEmployee = new Payslip(LocalDate.of(2022, 8, 31),
                                                new BigDecimal(970), new BigDecimal(70), new BigDecimal(0),
                                                new BigDecimal(900), LocalDate.of(2022, 8, 31));
                                Payslip sepPayslipBarryEmployee = new Payslip(LocalDate.of(2022, 9, 30),
                                                new BigDecimal(970), new BigDecimal(70), new BigDecimal(0),
                                                new BigDecimal(900), LocalDate.of(2022, 9, 30));
                                Payslip octPayslipBarryEmployee = new Payslip(LocalDate.of(2022, 10, 31),
                                                new BigDecimal(970), new BigDecimal(70), new BigDecimal(0),
                                                new BigDecimal(900), LocalDate.of(2022, 10, 31));
                                List<Payslip> payslipsBarryEmployee = new ArrayList<>();
                                payslipsBarryEmployee.add(augPayslipBarryEmployee);
                                payslipsBarryEmployee.add(sepPayslipBarryEmployee);
                                payslipsBarryEmployee.add(octPayslipBarryEmployee);
                                barryEmployee.setPayslips(payslipsBarryEmployee);
                                userService.initAdmin(barryEmployee);

                                augPayslipBarryEmployee.setEmployee(barryEmployee);
                                augPayslipBarryEmployee.setPayInformation(barryEmployee.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(augPayslipBarryEmployee);

                                sepPayslipBarryEmployee.setEmployee(barryEmployee);
                                sepPayslipBarryEmployee.setPayInformation(barryEmployee.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(sepPayslipBarryEmployee);

                                octPayslipBarryEmployee.setEmployee(barryEmployee);
                                octPayslipBarryEmployee.setPayInformation(barryEmployee.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(octPayslipBarryEmployee);

                                Long barryId = 12L;
                                teamService.addMemberToTeam(nexTeamId.intValue(), barryId.intValue());

                                // West Mall Salesman
                                Position salesmanEmployee = new Position("Salesman Employee",
                                                "Salesman Employee position description", JobTypeEnum.FULLTIME,
                                                PositionTypeEnum.SALESMAN);
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
                                dianaEmployee.setCurrentPayInformation(new PayInformation(new BigDecimal(9),
                                                new BigDecimal(18), new BigDecimal(18), new BigDecimal(14), false,
                                                true));
                                dianaEmployee.setWorkEmail("diana@libro.com");
                                dianaEmployee.setEnabled(true);
                                dianaEmployee.setCurrentPosition(salesmanEmployee);
                                dianaEmployee.setBankName("Maybank Singapore");
                                dianaEmployee.setBankAccNo("0095212891");
                                Payslip augPayslipDianaEmployee = new Payslip(LocalDate.of(2022, 8, 31),
                                                new BigDecimal(6070), new BigDecimal(70), new BigDecimal(0),
                                                new BigDecimal(6000), LocalDate.of(2022, 8, 31));
                                Payslip sepPayslipDianaEmployee = new Payslip(LocalDate.of(2022, 9, 30),
                                                new BigDecimal(6070), new BigDecimal(70), new BigDecimal(0),
                                                new BigDecimal(6000), LocalDate.of(2022, 9, 30));
                                Payslip octPayslipDianaEmployee = new Payslip(LocalDate.of(2022, 10, 31),
                                                new BigDecimal(6070), new BigDecimal(70), new BigDecimal(0),
                                                new BigDecimal(6000), LocalDate.of(2022, 10, 31));
                                List<Payslip> payslipsDianaEmployee = new ArrayList<>();
                                payslipsDianaEmployee.add(augPayslipDianaEmployee);
                                payslipsDianaEmployee.add(sepPayslipDianaEmployee);
                                payslipsDianaEmployee.add(octPayslipDianaEmployee);
                                dianaEmployee.setPayslips(payslipsDianaEmployee);
                                userService.initAdmin(dianaEmployee);

                                augPayslipDianaEmployee.setEmployee(dianaEmployee);
                                augPayslipDianaEmployee.setPayInformation(dianaEmployee.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(augPayslipDianaEmployee);

                                sepPayslipDianaEmployee.setEmployee(dianaEmployee);
                                sepPayslipDianaEmployee.setPayInformation(dianaEmployee.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(sepPayslipDianaEmployee);

                                octPayslipDianaEmployee.setEmployee(dianaEmployee);
                                octPayslipDianaEmployee.setPayInformation(dianaEmployee.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(octPayslipDianaEmployee);

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
                                clarkEmployee.setCurrentPayInformation(new PayInformation(new BigDecimal(9),
                                                new BigDecimal(18), new BigDecimal(18), new BigDecimal(14), true,
                                                true));
                                clarkEmployee.setWorkEmail("clark@libro.com");
                                clarkEmployee.setEnabled(true);
                                clarkEmployee.setCurrentPosition(salesmanEmployee);
                                clarkEmployee.setBankName("Standard Chartered Singapore");
                                clarkEmployee.setBankAccNo("0071647423");
                                Payslip augPayslipClarkEmployee = new Payslip(LocalDate.of(2022, 8, 31),
                                                new BigDecimal(4070), new BigDecimal(70), new BigDecimal(0),
                                                new BigDecimal(4000), LocalDate.of(2022, 8, 31));
                                Payslip sepPayslipClarkEmployee = new Payslip(LocalDate.of(2022, 9, 30),
                                                new BigDecimal(4070), new BigDecimal(70), new BigDecimal(0),
                                                new BigDecimal(4000), LocalDate.of(2022, 9, 30));
                                Payslip octPayslipClarkEmployee = new Payslip(LocalDate.of(2022, 10, 31),
                                                new BigDecimal(4070), new BigDecimal(70), new BigDecimal(0),
                                                new BigDecimal(4000), LocalDate.of(2022, 10, 31));
                                List<Payslip> payslipsClarkEmployee = new ArrayList<>();
                                payslipsClarkEmployee.add(augPayslipClarkEmployee);
                                payslipsClarkEmployee.add(sepPayslipClarkEmployee);
                                payslipsClarkEmployee.add(octPayslipClarkEmployee);
                                clarkEmployee.setPayslips(payslipsClarkEmployee);
                                userService.initAdmin(clarkEmployee);

                                augPayslipClarkEmployee.setEmployee(clarkEmployee);
                                augPayslipClarkEmployee.setPayInformation(clarkEmployee.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(augPayslipClarkEmployee);

                                sepPayslipClarkEmployee.setEmployee(clarkEmployee);
                                sepPayslipClarkEmployee.setPayInformation(clarkEmployee.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(sepPayslipClarkEmployee);

                                octPayslipClarkEmployee.setEmployee(clarkEmployee);
                                octPayslipClarkEmployee.setPayInformation(clarkEmployee.getCurrentPayInformation());
                                payslipService.addNewPayslipFlush(octPayslipClarkEmployee);

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

                                // Create Benefit Types
                                BenefitType benefitType1 = new BenefitType("Medical");
                                BenefitType benefitType2 = new BenefitType("Dental");
                                BenefitType benefitType3 = new BenefitType("Accident");
                                BenefitType benefitType4 = new BenefitType("Life");
                                List<BenefitType> benefitTypes = List.of(benefitType1, benefitType2, benefitType3,
                                                benefitType4);
                                benefitTypeRepository.saveAllAndFlush(benefitTypes);

                                System.out.println("************* Init Completed *************");
                        } else {
                                // if any user exists already, don't run
                                System.out.println(
                                                "************* Administrators already exist, do not init *************");
                        }

                };
        }
}
