package com.conceiversolutions.hrsystem.nfc;


import com.conceiversolutions.hrsystem.user.user.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/card")
@AllArgsConstructor
public class CardController {

    private final CardService cardService;

    @GetMapping(path= "/nfc")
    public String NFC(boolean check){
        return cardService.NFC(check);
    }

//    @PostMapping(path="/assignCard")
//    public User assignCard(Long userId, String cardUUID){
//        return
//    }


}


