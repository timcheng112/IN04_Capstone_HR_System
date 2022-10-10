package com.conceiversolutions.hrsystem.rostering.block;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/block")
public class BlockController {

    private final BlockService blockService;

    @Autowired
    public BlockController(BlockService blockService) {
        this.blockService = blockService;
    }

    @GetMapping
    public List<Block> getBlocks() {
        return blockService.getBlocks();
    }

    @GetMapping(path = "{blockId}")
    public Block getBlockById(@PathVariable("blockId") Long blockId) {
        return blockService.getBlockById(blockId);
    }

    @PostMapping
    public Long addNewBlock(@RequestBody Block block, @RequestParam(name = "rosterId", required = true) Long rosterId,
            @RequestParam(name = "userId", required = true) Long userId) {
        return blockService.addNewBlock(block, rosterId, userId);
    }

    @DeleteMapping(path = "{blockId}")
    public void deleteBlock(@PathVariable("blockId") Long blockId) {
        blockService.deleteBlock(blockId);
    }
}
