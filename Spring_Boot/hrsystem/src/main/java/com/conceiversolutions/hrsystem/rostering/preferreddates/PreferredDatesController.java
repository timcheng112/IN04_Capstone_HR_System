package com.conceiversolutions.hrsystem.rostering.preferreddates;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "api/preferred_date")
@AllArgsConstructor
public class PreferredDatesController {

    private final PreferredDatesService preferredDatesService;

}
