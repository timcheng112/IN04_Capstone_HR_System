package com.conceiversolutions.hrsystem.rostering.roster;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RosterConfig {

    @Bean
    CommandLineRunner rosterCommandLineRunner(RosterRepository repository) {
        return args -> {

        };
    }
}
