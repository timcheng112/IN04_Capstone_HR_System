package com.conceiversolutions.hrsystem.user.registration;

import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
public class EmailValidator {
    private final static String REGEX_PATTERN = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$";

    public boolean test(String email) {
        System.out.println("EmailValidator.test");
        return Pattern.compile(REGEX_PATTERN).matcher(email).matches();
    }
}
