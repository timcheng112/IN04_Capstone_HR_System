package com.conceiversolutions.hrsystem.emailhandler;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
@AllArgsConstructor
public class EmailService implements EmailSender {
    private final JavaMailSender javaMailSender;
    private final static Logger LOGGER = LoggerFactory.getLogger(EmailService.class);

    @Override
    @Async
    public void send(String receipient, String email) {
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, "utf-8");
            mimeMessageHelper.setText(email, true);
            mimeMessageHelper.setTo(receipient);
            mimeMessageHelper.setSubject("Libro Account Confirmation");
            mimeMessageHelper.setFrom("in04.capstoner.2022@gmail.com");
            javaMailSender.send(mimeMessage);
        } catch (MessagingException ex) {
            LOGGER.error("Failed to send email", ex);
            throw new IllegalStateException("Failed to send email.");
        }
    }

    @Async
    public void send(String receipient, String email, String subject) {
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, "utf-8");
            mimeMessageHelper.setText(email, true);
            mimeMessageHelper.setTo(receipient);
            mimeMessageHelper.setSubject(subject);
            mimeMessageHelper.setFrom("in04.capstoner.2022@gmail.com");
            javaMailSender.send(mimeMessage);
        } catch (MessagingException ex) {
            LOGGER.error("Failed to send email", ex);
            throw new IllegalStateException("Failed to send email.");
        }
    }
}
