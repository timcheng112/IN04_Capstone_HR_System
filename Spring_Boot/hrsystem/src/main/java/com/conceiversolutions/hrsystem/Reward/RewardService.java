package com.conceiversolutions.hrsystem.Reward;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class RewardService {
    public List<Reward> getRewards() {
        return List.of(
                new Reward("RWS Grand Vacation",
                        "A 1 week stay at Resorts World Sentosa's most premium suites",
                        null,
                        LocalDate.of(2023, 11, 11)
                )
        );
    }
}
