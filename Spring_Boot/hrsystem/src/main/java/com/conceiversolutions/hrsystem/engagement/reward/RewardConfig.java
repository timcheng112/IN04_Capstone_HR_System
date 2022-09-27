 package com.conceiversolutions.hrsystem.engagement.reward;

 import org.springframework.boot.CommandLineRunner;
 import org.springframework.context.annotation.Bean;
 import org.springframework.context.annotation.Configuration;

 import java.time.LocalDate;
 import java.util.List;

 @Configuration
 public class RewardConfig {

     @Bean
     CommandLineRunner rewardCommandLineRunner(
             RewardRepository repository) {
         return args -> {
             Reward rws = new Reward(
                     "Resorts World Stay",
                     "3D2N Stay at RWS best suite",
                     null,
                     null,
                     LocalDate.of(2023,10,5)
             );
             Reward luge = new Reward(
                     "Luge Adventure",
                     "10 Free Rides at Luge",
                     null,
                     null,
                     LocalDate.of(2023,9,9)
             );

             repository.saveAll(
                     List.of(rws,luge)
             );

         };
     }
 }
