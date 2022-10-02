package com.conceiversolutions.hrsystem.administration.tasklistitem;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TaskListItemConfig {

    @Bean
    CommandLineRunner taskListItemCommandLineRunner(TaskListItemRepository repository) {
        return args -> {
            repository.deleteAll();
            // Category dummyCategory = new Category();

            // repository.saveAll(
            // List.of(dummyCategory));
        };
    }
}
