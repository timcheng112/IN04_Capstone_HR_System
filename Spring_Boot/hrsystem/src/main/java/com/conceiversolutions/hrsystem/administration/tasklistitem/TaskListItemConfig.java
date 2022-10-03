package com.conceiversolutions.hrsystem.administration.tasklistitem;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TaskListItemConfig {

    @Bean
    CommandLineRunner taskListItemCommandLineRunner(TaskListItemRepository repository) {
        return args -> {
            // repository.deleteAll();
            // Task dummyTask = new Task("Dummy Task", "This is a dummy task", true, new
            // Category("Dummy Category"),
            // new ArrayList<>());

            // repository.saveAll(
            // List.of(dummyTask));
        };
    }
}
