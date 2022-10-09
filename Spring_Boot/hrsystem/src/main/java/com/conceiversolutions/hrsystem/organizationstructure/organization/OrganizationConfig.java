 package com.conceiversolutions.hrsystem.organizationstructure.organization;

 import java.util.ArrayList;
 import java.util.List;
 import java.util.Optional;

 import com.conceiversolutions.hrsystem.organizationstructure.department.Department;
 import com.conceiversolutions.hrsystem.organizationstructure.department.DepartmentRepository;
 import com.conceiversolutions.hrsystem.organizationstructure.team.Team;
 import com.conceiversolutions.hrsystem.organizationstructure.team.TeamRepository;
 import com.conceiversolutions.hrsystem.pay.deduction.DeductionRepository;
 import com.conceiversolutions.hrsystem.rostering.roster.Roster;
 import com.conceiversolutions.hrsystem.rostering.roster.RosterRepository;
 import com.conceiversolutions.hrsystem.user.user.User;
 import com.conceiversolutions.hrsystem.user.user.UserRepository;
 import org.springframework.boot.CommandLineRunner;
 import org.springframework.context.annotation.Bean;
 import org.springframework.context.annotation.Configuration;

 @Configuration
 public class OrganizationConfig {
//     private UserRepository userRepository;
//     private DepartmentRepository departmentRepository;
//     private TeamRepository teamRepository;
//     private RosterRepository rosterRepository;

//     @Bean
//     CommandLineRunner organizationCommandLineRunner(OrganizationRepository repository, UserRepository userRepository, DepartmentRepository departmentRepository, TeamRepository teamRepository, RosterRepository rosterRepository) {
//         return args -> {
//             System.out.println("potato1");
//             if(repository.findOrgByName("Libro").isEmpty()){
//                 System.out.println("potato2");
//                 Optional<User> orgHead = userRepository.findById(1L);
//
//                 if(orgHead.isPresent()){
//                     System.out.println("potato3");
//                     User u = orgHead.get();
//                     Organization libro = new Organization("Libro",new ArrayList<>(), u);
//                     //save and flush returns entity
//                     repository.saveAndFlush(libro);
//
//                 }
//
//             }
//             System.out.println("potato4");
//             Organization ooo = repository.findOrgByName("Libro").get();
//             User u2= userRepository.findById(1L).get();
//             if(departmentRepository.findById(1L).isEmpty()){
//                 Department d1 = new Department("Analytics", ooo, new ArrayList<>(), u2);
//                 //post managed
//                 Department savedD = departmentRepository.saveAndFlush(d1);
//                 System.out.println("potato5");
//                 //add dept into org
//                 ooo.setDepartments(List.of(savedD));
//                 repository.save(ooo);
//
//             }
//             if(teamRepository.findById(1L).isEmpty()){
//                 User u3 = userRepository.findById(6L).get();
//                 Department savedD = departmentRepository.findById(1L).get();
//                 Team t1 = new Team("MorningShift1","Bukit Batok", false, savedD, null, List.of(u3), u2 );
//                 Roster r1 = new Roster("Roster1",new ArrayList<>(),new ArrayList<>());
//                 Roster savedR = rosterRepository.saveAndFlush(r1);
//                 t1.setRoster(savedR);
//                 Team savedT = teamRepository.saveAndFlush(t1);
//                 savedR.setTeam(savedT);
//                 rosterRepository.save(savedR);
//                 savedD.setTeams(List.of(savedT));
//                 departmentRepository.save(savedD);
//                 u3.setTeams(List.of(savedT));
//                 userRepository.save(u3);
//                 System.out.println("potato6");
//             }
//
//
//
//
//
//
//
////             Team t1 = new Team("Morning",)
////             User orgHead = userRepository.findById(1L).get();
//             //Organization libro = new Organization("Libro",new ArrayList<>(), orgHead);// this constructor cannot be an empty constructor. Org Head is not-null
//
//
//////             if(!repository.existsById(3l)){
////              if(repository.findAll().isEmpty()){
////                     Organization org = repository.saveAndFlush(libro);
////                     System.out.println(org);
////                     Department d = new Department("CEO OFFICE", org, new ArrayList<>(), orgHead);
////                     Department newD = departmentRepository.saveAndFlush(d);
////                     System.out.println(newD);
////
////              }else{
////                     System.out.println("org alr exist plz");
////              }
//
//
//
//
//         };
//     }
 }
