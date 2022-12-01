package com.conceiversolutions.hrsystem.nfc;

import com.conceiversolutions.hrsystem.rostering.shiftlistitem.ShiftListItem;
import com.conceiversolutions.hrsystem.rostering.shiftlistitem.ShiftListItemService;
import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;
import com.conceiversolutions.hrsystem.user.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.smartcardio.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Service
@AllArgsConstructor
public class CardService {

//    private final CardRepository cardRepository;
    private final UserRepository userRepository;
    private final UserService userService;
    private final ShiftListItemService shiftListItemService;
    static Boolean toggle = false;
    @Scheduled(fixedRate = 5000)
    @Async
    public String NFC(){
        System.out.println("NFC SCHEDULE TASK RUN");
        System.out.println(toggle);
        if (toggle) {
            try{
                // show the list of available terminals
                TerminalFactory factory = TerminalFactory.getDefault();
                CardTerminals cardTerminals = factory.terminals();
                List<CardTerminal> terminals = factory.terminals().list();

                System.out.println("Terminals: " + terminals);

                // get the first terminal
                CardTerminal terminal = terminals.get(0);
                String cardId = "";
                try {
                    if (cardTerminals.waitForChange(5000L)) {
                        // check if card is same as new card
                        Card newCard = terminal.connect("*");

                        ATR atr = newCard.getATR();
                        byte[] baAtr = atr.getBytes();

//							System.out.print("ATR = 0x");
//							for(int i = 0; i < baAtr.length; i++ ){
//								System.out.printf("%02X ",baAtr[i]);
//							}
//							System.out.println("AAAAA");
                        CardChannel channel = newCard.getBasicChannel();
                        byte[] cmdApduGetCardUid = new byte[]{
                                (byte)0xFF, (byte)0xCA, (byte)0x00, (byte)0x00, (byte)0x00};

//							System.out.println("BBBBB");
                        ResponseAPDU respApdu = channel.transmit(
                                new CommandAPDU(cmdApduGetCardUid));

                        if(respApdu.getSW1() == 0x90 && respApdu.getSW2() == 0x00){
//								System.out.println("CCCCC");
                            byte[] baCardUid = respApdu.getData();

                            cardId = Arrays.toString(baCardUid);
                            LocalDate date = LocalDate.now();
                            if(userRepository.findUserByCardUUID(cardId).isPresent()){
                                User u1 = userRepository.findUserByCardUUID(cardId).get();
                                Long userId = u1.getUserId();
                                ShiftListItem s =shiftListItemService.getShiftListItemByDateAndUserId(date, userId);
                                if(s.getCheckInTiming() == null){
                                    userService.checkInEmployee(userId);
                                }else{
                                    userService.checkOutEmployee(userId);
                                }

                            }
//                            User u1 = userRepository.findUserByCardUUID(cardId).get();
//                            if (cardId.equals("")) {
//                                System.out.println("new card");
//                                cardId = Arrays.toString(baCardUid);
//                            } else if (cardId.equals(Arrays.toString(baCardUid))) {
//                                System.out.println("same card");
//                            } else {
//                                System.out.println("diff card");
//                                cardId = Arrays.toString(baCardUid);
//                            }


//							System.out.print("Card UID = 0x");
//							for(int i = 0; i < baCardUid.length; i++ ){
//								System.out.printf("%02X ", baCardUid [i]);
//							}
//								System.out.println("DDDDD");
                            System.out.println("Card id is" + Arrays.toString(baCardUid));
                            Thread.sleep(2000);
                        }
                        newCard.disconnect(false);
//							System.out.println("EEEEE");
                    }

                } catch (Exception ex) {
                    throw new IllegalStateException(ex.getLocalizedMessage());
                }


//			card.disconnect(false);

            } catch (CardException e) {
                e.printStackTrace();
            } catch (Exception ex) {
                throw ex;
            }
        }

        return "NFC method ran";
    }

    public String toggleAttendance(Boolean toggle) {
        System.out.println("CardService.toggleAttendance");
        this.toggle = toggle;
        System.out.println("Toggle has been changed to " + toggle.toString());
        return "Toggle has been changed to " + toggle.toString();
    }

    @Async
    public String assignCardtoUser(Long userId) {
        System.out.println("CardService.assignCardtoUser");
        System.out.println("userId = " + userId);

        // get user
        User u1 = userRepository.findById(userId).get();

        try{
            // show the list of available terminals
            TerminalFactory factory = TerminalFactory.getDefault();
            CardTerminals cardTerminals = factory.terminals();
            List<CardTerminal> terminals = factory.terminals().list();

            System.out.println("Terminals: " + terminals);

            // get the first terminal
            CardTerminal terminal = terminals.get(0);
            String cardId = "";
            try {
                if (cardTerminals.waitForChange(10000L)) {
                    // check if card is same as new card
                    Card newCard = terminal.connect("*");

                    ATR atr = newCard.getATR();
                    byte[] baAtr = atr.getBytes();


                    CardChannel channel = newCard.getBasicChannel();
                    byte[] cmdApduGetCardUid = new byte[]{
                            (byte)0xFF, (byte)0xCA, (byte)0x00, (byte)0x00, (byte)0x00};

//							System.out.println("BBBBB");
                    ResponseAPDU respApdu = channel.transmit(
                            new CommandAPDU(cmdApduGetCardUid));

                    if(respApdu.getSW1() == 0x90 && respApdu.getSW2() == 0x00){
//								System.out.println("CCCCC");
                        byte[] baCardUid = respApdu.getData();

                        if (cardId.equals("")) {
                            System.out.println("new card");
                            cardId = Arrays.toString(baCardUid);
                        } else if (cardId.equals(Arrays.toString(baCardUid))) {
                            System.out.println("same card");
                        } else {
                            System.out.println("diff card");
                            cardId = Arrays.toString(baCardUid);
                        }
//							System.out.print("Card UID = 0x");
//							for(int i = 0; i < baCardUid.length; i++ ){
//								System.out.printf("%02X ", baCardUid [i]);
//							}
//								System.out.println("DDDDD");
                        System.out.println("Card id is" + Arrays.toString(baCardUid));

                        System.out.println("Card UUID is" + u1.getCardUUID());

                        if (u1.getCardUUID() == Arrays.toString(baCardUid)) {
                            throw new IllegalStateException("Card is already assigned to the user");
                        } else if(userRepository.findUserByCardUUID(Arrays.toString(baCardUid)).isPresent()) {
                            System.out.println("card is present");
                            // go to repo and find user who user.cardUID = this cardUID
                            // if that user.userId != this user.userId, then u set that user's UID as null, and set this user UID to this card
                            User u2 = userRepository.findUserByCardUUID(Arrays.toString(baCardUid)).get();
                            System.out.println("u2 getCardUUID: " + u2.getCardUUID());
                            u2.setCardUUID(null);
                            System.out.println("u2 getCardUUID: " + u2.getCardUUID());
                            userRepository.save(u2);
                        }
                        u1.setCardUUID(Arrays.toString(baCardUid));
                        System.out.println(u1.getCardUUID());
                        Thread.sleep(2000);
                    }
                    newCard.disconnect(false);
                }


            } catch (Exception ex) {
                throw new IllegalStateException(ex.getLocalizedMessage());
            }



        } catch (CardException e) {
            e.printStackTrace();
        } catch (Exception ex) {
            throw ex;
        }

        userRepository.saveAndFlush(u1);
        return "Card has been successfully assigned to user.";
        // set card thingy
    }
}
