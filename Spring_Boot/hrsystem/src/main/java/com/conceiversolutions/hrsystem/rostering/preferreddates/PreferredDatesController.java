package com.conceiversolutions.hrsystem.rostering.preferreddates;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "api/preferred_date")
@AllArgsConstructor
public class PreferredDatesController {

    private final PreferredDatesService preferredDatesService;

    @GetMapping
    public List<PreferredDates> getPreferredDates() {
        return preferredDatesService.getPreferredDates();
    }

    @GetMapping(path = "{preferredDatesId}")
    public PreferredDates getPreferredDatesById(@PathVariable("preferredDatesId") Long preferredDatesId) {
        return preferredDatesService.getPreferredDatesById(preferredDatesId);
    }

    @GetMapping(path = "getPreferredDatesByUserId")
    public PreferredDates getPreferredDatesByUserId(@RequestParam("userId") Long userId) {
        return preferredDatesService.getPreferredDatesByUserId(userId);
    }

    @PostMapping
    public Long addNewPreferredDates(@RequestBody PreferredDates preferredDates,
            @RequestParam(name = "userId", required = true) Long userId) {
        // List<LocalDate> localDates = new ArrayList<>();
        // for (PreferredDates date : preferredDates) {
        // LocalDate localDate = LocalDate.parse(date.get);
        // localDates.add(localDate);
        // }
        return preferredDatesService.addNewPreferredDates(preferredDates.getDates(), userId);
    }

    @PutMapping(path = "editPreferredDates")
    public void editPreferredDates(@RequestParam(name = "userId", required = true) Long userId,
            @RequestBody PreferredDates preferredDates) {
        preferredDatesService.editPreferredDates(userId, preferredDates.getDates());
    }

    @DeleteMapping(path = "{preferredDatesId}")
    public void deletePreferredDates(@PathVariable("preferredDatesId") Long preferredDatesId) {
        preferredDatesService.deletePreferredDates(preferredDatesId);
    }
}
