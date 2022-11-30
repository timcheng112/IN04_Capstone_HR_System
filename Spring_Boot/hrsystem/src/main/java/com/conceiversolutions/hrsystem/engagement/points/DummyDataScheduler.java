package com.conceiversolutions.hrsystem.engagement.points;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.logging.Logger;

@Configuration
@EnableScheduling
@EnableAsync
@ConditionalOnProperty(name = "scheduler.enabled", matchIfMissing = true)
public class DummyDataScheduler {
//    The annotated method needs to fulfill two conditions:
//
//    The method should not have a return type and so return void. For methods that have a return type, the returned value is ignored when invoked through the scheduler.
//    The method should not accept any input parameters.

}

