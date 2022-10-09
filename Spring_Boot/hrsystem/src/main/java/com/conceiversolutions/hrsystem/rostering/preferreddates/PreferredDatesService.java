package com.conceiversolutions.hrsystem.rostering.preferreddates;

import java.util.List;

import org.springframework.stereotype.Service;

import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PreferredDatesService {

    private final PreferredDatesRepository preferredDatesRepository;
    private final UserRepository userRepository;

    public List<PreferredDates> getPreferredDates() {
        List<PreferredDates> dates = preferredDatesRepository.findAll();
        for (PreferredDates date : dates) {
            date.setUser(null);
        }
        return dates;
    }

    public PreferredDates getPreferredDatesById(Long preferredDatesId) {
        PreferredDates dates = preferredDatesRepository.findById(preferredDatesId).orElseThrow(
                () -> new IllegalStateException("Preferred Dates with ID: " + preferredDatesId + " does not exist!"));
        dates.setUser(null);
        return dates;
    }

    public Long addNewPreferredDates(PreferredDates preferredDates, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("User with ID: " + userId + " does not exist!"));

        preferredDates.setUser(user);
        PreferredDates savedDates = preferredDatesRepository.saveAndFlush(preferredDates);

        user.setPreferredDates(preferredDates);
        userRepository.saveAndFlush(user);

        return savedDates.getPreferredDatesId();
    }

    public void deletePreferredDates(Long preferredDatesId) {
        PreferredDates dates = preferredDatesRepository.findById(preferredDatesId).orElseThrow(
                () -> new IllegalStateException("Preferred Dates with ID: " + preferredDatesId + " does not exist!"));

        dates.getUser().setPreferredDates(null);
        dates.setUser(null);

        preferredDatesRepository.deleteById(preferredDatesId);
    }

}
