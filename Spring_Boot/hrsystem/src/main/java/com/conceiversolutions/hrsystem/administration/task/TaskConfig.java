package com.conceiversolutions.hrsystem.administration.task;

import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.conceiversolutions.hrsystem.administration.category.Category;

@Configuration
public class TaskConfig {

    @Bean
    CommandLineRunner taskCommandLineRunner(TaskRepository repository) {
        return args -> {
            repository.deleteAll();
            // Task dummyTask = new Task("Dummy Task", "This is a dummy task", true, new
            // Category("Dummy Category"),
            // new ArrayList<>());

            // repository.saveAll(
            // List.of(dummyTask));
        };
    }
}