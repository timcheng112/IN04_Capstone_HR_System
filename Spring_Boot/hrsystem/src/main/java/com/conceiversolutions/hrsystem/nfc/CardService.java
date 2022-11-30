package com.conceiversolutions.hrsystem.nfc;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.smartcardio.*;
import java.util.Arrays;
import java.util.List;

@Service
@AllArgsConstructor
public class CardService {

    private final CardRepository cardRepository;

    public String NFC(boolean check){

        try{

            // show the list of available terminals
            TerminalFactory factory = TerminalFactory.getDefault();
            CardTerminals cardTerminals = factory.terminals();
            List<CardTerminal> terminals = factory.terminals().list();

            System.out.println("Terminals: " + terminals);

            // get the first terminal
            CardTerminal terminal = terminals.get(0);
//			Card card = null;
            String cardId = "";
            while (check) {
                try {
                    if (cardTerminals.waitForChange(100000L)) {
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
                            Thread.sleep(2000);
                        }
                        newCard.disconnect(false);
//							System.out.println("EEEEE");
                    }


//					if (terminal.waitForCardPresent(10000L)) {
//						// check if card is same as new card
//						if (terminal.isCardPresent()) {
//							System.out.println("Card is present");
//
//							Card newCard = terminal.connect("*");
//							if (card != null) {
//								System.out.println("card: " + newCard);
//								card = newCard;
//							}
//							card.disconnect(false);
//						}
//
//					}
                } catch (Exception ex) {
                    System.out.println("smth happened");
                }


            }


//			card.disconnect(false);

        } catch (CardException e) {
            e.printStackTrace();
        }

        return "NFC method ran";
    }
}
