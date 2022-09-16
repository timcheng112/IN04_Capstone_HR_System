package com.conceiversolutions.hrsystem.Reward;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class RewardService {

    private final RewardRepository rewardRepository;

    @Autowired
    public RewardService(RewardRepository rewardRepository) {
        this.rewardRepository = rewardRepository;
    }

    public List<Reward> getRewards() {
        return rewardRepository.findAll();
    }

    public void createNewReward(Reward reward) {
        rewardRepository.save(reward);
    }

    public void deleteReward(Long rewardId) {
        boolean exists = rewardRepository.existsById(rewardId);
        if(!exists) {
            throw new IllegalStateException(
                    "reward with id " + rewardId + " does not exist!");
        }
        rewardRepository.deleteById(rewardId);
    }
}