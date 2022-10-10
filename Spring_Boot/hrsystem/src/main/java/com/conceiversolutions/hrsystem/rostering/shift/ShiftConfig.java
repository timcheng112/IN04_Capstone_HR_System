package com.conceiversolutions.hrsystem.rostering.shift;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ShiftConfig {

    @Bean
    CommandLineRunner shiftCommandLineRunner(ShiftRepository repository) {
        return args -> {

        };
    }
}
