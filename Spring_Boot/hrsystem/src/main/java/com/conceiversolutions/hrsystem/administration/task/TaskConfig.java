package com.conceiversolutions.hrsystem.administration.task;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TaskConfig {

    @Bean
    CommandLineRunner commandLineRunner(TaskRepository repository) {
        return args -> {
            Task dummyTask = new Task();

            repository.saveAll(
                    List.of(dummyTask));
        };
    }
}
