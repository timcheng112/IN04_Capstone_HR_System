package com.conceiversolutions.hrsystem.nfc;


import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/card")
@AllArgsConstructor
public class CardController {

    private final CardService cardService;

    @GetMapping(path= "/nfc")
    public String NFC(){
        return cardService.NFC();
    }

    @PutMapping("toggleAttendance")
    public String toggleAttendance(@RequestParam("toggle") Boolean toggle) {
        return cardService.toggleAttendance(toggle);
    }

    @PutMapping("assignCardtoUser")
    public String assignCardtoUser(@RequestParam("userId") Long userId ) {
        return cardService.assignCardtoUser(userId);
    }

//    @PostMapping(path="/assignCard")
//    public User assignCard(Long userId, String cardUUID){
//        return
//    }


}


