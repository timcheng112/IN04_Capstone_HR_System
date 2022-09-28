package com.conceiversolutions.hrsystem.user.registration.token;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ConfirmationTokenService {
    private final ConfirmationTokenRepository confirmationTokenRepository;

    public void saveConfirmationToken(ConfirmationToken token) {
        confirmationTokenRepository.saveAndFlush(token);
    }

    public Optional<ConfirmationToken> getToken(String token) {
        return confirmationTokenRepository.findByToken(token);
    }

    public int setConfirmedAt(String token) {
        return confirmationTokenRepository.updateConfirmedAt(
                token, LocalDateTime.now());
    }

    public ConfirmationToken findUnconfirmedTokenByUserId(Long userId) {
        List<ConfirmationToken> cts = confirmationTokenRepository.findByCreatedAtNull();

        for (ConfirmationToken ct : cts) {
            if (ct.getUser().getUserId().equals(userId)) {
                return ct;
            }
        }
        throw new IllegalStateException("There are no unconfirmed tokens for this user");
    }
}
