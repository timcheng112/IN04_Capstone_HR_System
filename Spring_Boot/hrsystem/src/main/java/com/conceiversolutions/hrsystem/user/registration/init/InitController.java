package com.conceiversolutions.hrsystem.user.registration.init;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/init")
@AllArgsConstructor
public class InitController {
    private final InitService initService;

    @GetMapping
    public String mattInit() {
        return initService.mattInit();
    }
}
