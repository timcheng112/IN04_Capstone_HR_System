package com.conceiversolutions.hrsystem.rostering.block;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.conceiversolutions.hrsystem.rostering.roster.Roster;
import com.conceiversolutions.hrsystem.rostering.roster.RosterRepository;
import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BlockService {

    private final BlockRepository blockRepository;
    private final UserRepository userRepository;
    private final RosterRepository rosterRepository;

    public List<Block> getBlocks() {
        List<Block> blocks = blockRepository.findAll();
        for (Block block : blocks) {
            block.setEmployee(null);
            block.setRoster(null);
        }
        return blocks;
    }

    public Block getBlockById(Long blockId) {
        Block block = blockRepository.findById(blockId)
                .orElseThrow(() -> new IllegalStateException("Block with ID: " + blockId + " does not exist!"));
        block.setEmployee(null);
        block.setRoster(null);
        return block;
    }

    public Long addNewBlock(Block block, Long rosterId, Long userId) {
        // need to check if there is a pre-existing block that conflicts
        Roster roster = rosterRepository.findById(rosterId)
                .orElseThrow(() -> new IllegalStateException("Roster with ID: " + rosterId + "does not exist!"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("User with ID: " + userId + " does not exist!"));

        block.setRoster(roster);
        block.setEmployee(user);
        Block savedBlock = blockRepository.saveAndFlush(block);

        roster.addBlock(savedBlock);
        rosterRepository.saveAndFlush(roster);

        user.addBlock(savedBlock);
        userRepository.saveAndFlush(user);

        return savedBlock.getBlockId();
    }

    public void deleteBlock(Long blockId) {
        Block block = blockRepository.findById(blockId)
                .orElseThrow(() -> new IllegalStateException("Block with ID: " + blockId + " does not exist!"));

        block.getEmployee().removeBlock(block);
        block.getRoster().removeBlock(block);
        block.setEmployee(null);
        block.setRoster(null);

        blockRepository.deleteById(blockId);
    }

}
