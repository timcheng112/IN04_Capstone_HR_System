package com.conceiversolutions.hrsystem.rostering.swaprequest;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwapRequestConfig {

    @Bean
    CommandLineRunner swapRequestCommandLineRunner(SwapRequestRepository repository) {
        return args -> {

        };
    }
}
