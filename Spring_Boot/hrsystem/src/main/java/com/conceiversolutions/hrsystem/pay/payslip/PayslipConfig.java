package com.conceiversolutions.hrsystem.pay.payslip;

import com.conceiversolutions.hrsystem.pay.allowance.AllowanceRepository;
import com.conceiversolutions.hrsystem.pay.deduction.DeductionRepository;
import com.conceiversolutions.hrsystem.pay.payinformation.PayInformationRepository;
import com.conceiversolutions.hrsystem.user.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PayslipConfig {
//    @Bean
//    CommandLineRunner payslipCommandLineRunner (PayslipRepository payslipRepository, UserRepository userRepository,
//                                                PayInformationRepository payInformationRepository, AllowanceRepository allowanceRepository, DeductionRepository deductionRepository) {
//        return args -> {
//            Payslip p1= new Payslip(
//                  5, 2022, LocalDate.of(2022,5,13),
//                        new BigDecimal(50),LocalDate.of(2022,8,30)
//                );
//
//            Payslip p2= new Payslip(
//                    12, 2021, LocalDate.of(2021,9,10),
//                    new BigDecimal(50),LocalDate.of(2021,9,10)
//            );
//
//            Payslip p3= new Payslip(
//                    12, 2021, LocalDate.of(2021,9,10),
//                    new BigDecimal(50),LocalDate.of(2021,9,10), null, null);
//            PayInformation payInfo1 = new PayInformation(
//                    "MONTHLY", new BigDecimal(1000), new BigDecimal(0), new BigDecimal(0),
//                    new BigDecimal(0), "GIRO", "CPF", null,null, null);

//            //p3.setPayInformation(payInfo1);
//            System.out.println("test1");
//            List<Allowance> allowLst = new  ArrayList<>();
//            List<Deduction> deductLst = new  ArrayList<>();
//            //payslip alr have allowance and deduction
//            Allowance a1 = new Allowance("$$ BONUS", new BigDecimal(500),"Ang Pao from CEO", null);
//            Deduction d1 = new Deduction("-- SALARY DEDUCTION", new BigDecimal(100),"DEDUCTION DUE TO CORORO", null);
//            allowLst.add(a1);
//            deductLst.add(d1);
////            p3.getPayInformation().setAllowance(allowLst);
////            p3.getPayInformation().setDeduction(deductLst);
//            System.out.println("test2");
//
//
//            User admin = new User("Jane", "Doe", "letmein123", 98, "in04.capstoner.2022@gmail.com", "e0417898@u.nus.edu",
//                    LocalDate.of(2000,12,3), GenderEnum.FEMALE, RoleEnum.ADMINISTRATOR, false,
//                    true, false, true, LocalDate.of(2022,1,1),
//                    null, null, null,null, null, null, null);

//            User u1 = new User("John", "Tho", "letmein123", 98, "in04.capstoner.2022@gmail.com", "in04.capstoner.2022@gmail.com",
//                    LocalDate.of(2001,12,2), GenderEnum.FEMALE, RoleEnum.MANAGER, false,
//                    true, false, true, LocalDate.of(2022,1,1),
//                    null, null, null,null, null, null, null);
//
//            List<Payslip> p4 = new ArrayList<>();
//            User u2 = new User("Jane", "Doe", "letmein123", 98, "in04.capstoner.2022@gmail.com", "in04.capstoner.2022@gmail.com",
//                    LocalDate.of(2002,12,1), GenderEnum.FEMALE, RoleEnum.EMPLOYEE, false,
//                    true, false, true, LocalDate.of(2022,1,1),
//                    null, null, null,null, null, p4, null);
//            System.out.println("potato1");
//            //Caused by: java.lang.NullPointerException: Cannot invoke "java.util.List.add(Object)" because the return value of "com.conceiversolutions.hrsystem.user.User.getPayslips()" is null.
//            // even though i set new arraylist alr within?
////            List<Payslip> p3 = new ArrayList<>();
//            u2.getPayslips().add( new Payslip(1, 2022, LocalDate.of(2021,5,30),
//                            new BigDecimal(50),LocalDate.of(2021,8,30),null, null
//            ));
//            System.out.println("potato2");
//            u2.getPayslips().get(0).setPayInformation(new PayInformation(
//                    "MONTHLY", new BigDecimal(1000), new BigDecimal(0), new BigDecimal(0),
//                    new BigDecimal(0), "GIRO", "CPF", null,null, null));
//
//
//            System.out.println("potato3");
//            List<Allowance> newAllowanceLst = new  ArrayList<>();
//            List<Deduction> newDeductionLst = new  ArrayList<>();
//            //payslip alr have allowance and deduction
//            Allowance a10 = new Allowance("$$ BONUS", new BigDecimal(500),"Ang Pao from CEO");
//            Deduction d10 = new Deduction("-- SALARY DEDUCTION", new BigDecimal(100),"DEDUCTION DUE TO CORORO");
//            newAllowanceLst.add(a10);
//            newDeductionLst.add(d10);
//            u2.getPayslips().get(0).getPayInformation().setAllowance(newAllowanceLst);
//            u2.getPayslips().get(0).getPayInformation().setDeduction(newDeductionLst);
//            System.out.println("potato4");
//
//            payslipRepository.saveAll(List.of(p1,p2,p3));
//            payInformationRepository.saveAll(List.of(payInfo1));
//            allowanceRepository.saveAll(List.of(a1));
//            deductionRepository.save(d1);

//            //go in circles
//            //payInfo1.setPayslip(p3);
//            System.out.println(p3.getPayInformation());
//            System.out.println(payInfo1.getPayslip());
//            p3.setPayInformation(payInfo1);
//            payInfo1.setPayslip(p3);
//            a1.setPayInfo(payInfo1);
//            d1.setPayInfo(payInfo1);
//            System.out.println(p3.getPayInformation());
//            System.out.println(payInfo1.getPayslip());
//
//            payslipRepository.save(p3);
//            payInformationRepository.save(payInfo1);
//            allowanceRepository.save(a1);
//            deductionRepository.save(d1);
//
//            payslipRepository.flush();
//            payInformationRepository.flush();
//            allowanceRepository.flush();
//            deductionRepository.flush();

//            userRepository.saveAll(List.of(admin,u1,u2));
//
//        };
//    }
}
