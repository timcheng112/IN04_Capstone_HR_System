package com.conceiversolutions.hrsystem.rostering.shiftlistitem;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ShiftListItemConfig {

    @Bean
    CommandLineRunner shiftListItemCommandLineRunner(ShiftListItemRepository repository) {
        return args -> {

        };
    }
}
