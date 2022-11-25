package com.conceiversolutions.hrsystem.rostering.preferreddates;

import java.time.LocalDate;
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
        // dates.setUser(null);
        dates.getUser().nullify();
        return dates;
    }

    public Long addNewPreferredDates(List<LocalDate> dates, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("User with ID: " + userId + " does not exist!"));

        PreferredDates preferredDates = new PreferredDates();
        preferredDates.setDates(dates);
        preferredDates.setUser(user);
        PreferredDates savedDates = preferredDatesRepository.saveAndFlush(preferredDates);

        user.setPreferredDates(preferredDates);
        userRepository.saveAndFlush(user);

        return savedDates.getPreferredDatesId();
    }

    public void editPreferredDates(Long userId, List<LocalDate> newDates) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new IllegalStateException("User with ID: " + userId + " does not exist!"));
        PreferredDates dates = user.getPreferredDates();
        if (dates == null) {
            addNewPreferredDates(newDates, userId);
        } else {
            dates.setDates(newDates);
            preferredDatesRepository.save(dates);
        }
    }

    public void deletePreferredDates(Long preferredDatesId) {
        PreferredDates dates = preferredDatesRepository.findById(preferredDatesId).orElseThrow(
                () -> new IllegalStateException("Preferred Dates with ID: " + preferredDatesId + " does not exist!"));

        dates.getUser().setPreferredDates(null);
        dates.setUser(null);

        preferredDatesRepository.deleteById(preferredDatesId);
    }

    public PreferredDates getPreferredDatesByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("User with ID: " + userId + " does not exist!"));
        PreferredDates preferredDates = user.getPreferredDates();
        preferredDates.getUser().nullify();
        return preferredDates;
    }

}
