package com.conceiversolutions.hrsystem.administration.checklist;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ChecklistConfig {
  @Bean
    CommandLineRunner checklistCommandLineRunner(ChecklistRepository repository) {
        return args -> {
            
        };
    }
}
