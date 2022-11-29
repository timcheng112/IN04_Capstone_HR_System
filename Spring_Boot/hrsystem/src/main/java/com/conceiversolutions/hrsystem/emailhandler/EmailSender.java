package com.conceiversolutions.hrsystem.emailhandler;

public interface EmailSender {
    void send(String to, String email);

    void send(String to, String email, String subject);
}
