package com.conceiversolutions.hrsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
//@EnableScheduling
public class HrsystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(HrsystemApplication.class, args);
	}

}

//package com.conceiversolutions.hrsystem;
//
////import com.conceiversolutions.hrsystem.acr122u.ACR122UReaderHelper;
////import com.conceiversolutions.hrsystem.acr122u.ACR122Util;
//import com.conceiversolutions.hrsystem.user.user.UserService;
//import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.scheduling.annotation.EnableScheduling;
//
//import java.util.Arrays;
//import java.util.List;
//import javax.smartcardio.*;
//
//@SpringBootApplication
////@EnableScheduling
//public class HrsystemApplication {
//
//
//
//	public static void main(String[] args) {
//
//
//		try{
//			SpringApplication.run(HrsystemApplication.class, args);
//			// show the list of available terminals
//			TerminalFactory factory = TerminalFactory.getDefault();
//			CardTerminals cardTerminals = factory.terminals();
//			List<CardTerminal> terminals = factory.terminals().list();
//
//			System.out.println("Terminals: " + terminals);
//
//			// get the first terminal
//			CardTerminal terminal = terminals.get(0);
////			Card card = null;
//			String cardId = "";
//			while (true) {
//				try {
//					if (cardTerminals.waitForChange(100000L)) {
//						// check if card is same as new card
//						Card newCard = terminal.connect("*");
//
//						ATR atr = newCard.getATR();
//						byte[] baAtr = atr.getBytes();
//
////							System.out.print("ATR = 0x");
////							for(int i = 0; i < baAtr.length; i++ ){
////								System.out.printf("%02X ",baAtr[i]);
////							}
////							System.out.println("AAAAA");
//						CardChannel channel = newCard.getBasicChannel();
//						byte[] cmdApduGetCardUid = new byte[]{
//								(byte)0xFF, (byte)0xCA, (byte)0x00, (byte)0x00, (byte)0x00};
//
////							System.out.println("BBBBB");
//						ResponseAPDU respApdu = channel.transmit(
//								new CommandAPDU(cmdApduGetCardUid));
//
//						if(respApdu.getSW1() == 0x90 && respApdu.getSW2() == 0x00){
////								System.out.println("CCCCC");
//							byte[] baCardUid = respApdu.getData();
//
//							if (cardId.equals("")) {
//								System.out.println("new card");
//								cardId = Arrays.toString(baCardUid);
//							} else if (cardId.equals(Arrays.toString(baCardUid))) {
//								System.out.println("same card");
//							} else {
//								System.out.println("diff card");
//								cardId = Arrays.toString(baCardUid);
////								userService.setNfcUUID(cardId,)
//							}
////							System.out.print("Card UID = 0x");
////							for(int i = 0; i < baCardUid.length; i++ ){
////								System.out.printf("%02X ", baCardUid [i]);
////							}
////								System.out.println("DDDDD");
//							System.out.println("Card id is" + Arrays.toString(baCardUid));
//							Thread.sleep(2000);
//						}
//						newCard.disconnect(false);
////							System.out.println("EEEEE");
//					}
//
//
////					if (terminal.waitForCardPresent(10000L)) {
////						// check if card is same as new card
////						if (terminal.isCardPresent()) {
////							System.out.println("Card is present");
////
////							Card newCard = terminal.connect("*");
////							if (card != null) {
////								System.out.println("card: " + newCard);
////								card = newCard;
////							}
////							card.disconnect(false);
////						}
////
////					}
//				} catch (Exception ex) {
//					System.out.println("no card on reader");
//				}
//
//
//			}
//
//
////			card.disconnect(false);
//
//		} catch (CardException e) {
//			e.printStackTrace();
//		}
////		ACR122UReaderHelper reader = ACR122UReaderHelper.getInstance();
////		ACR122Util readerUtil = ACR122Util.getInstance();
////
////		byte []authKeyData = new byte[]{(byte)0x01,(byte)0x02,(byte)0x03,(byte)0x04,(byte)0x05,(byte)0x06};
////		byte []data = new byte[]{(byte)0x09,(byte)0x09,(byte)0x09,(byte)0x09,(byte)0x09,(byte)0x09,(byte)0x09,(byte)0x09,(byte)0x09,   (byte)0x09,(byte)0x09,(byte)0x09,(byte)0x09,(byte)0x09,(byte)0x09,(byte)0x09};
////
////		reader.connectReader();
////
////		reader.connectCard(null);
////		reader.getUID(); // Returns UID of the card which is placed on the readert.
////		reader.readCardUsingDefaultKey(1); // Returns 16 bytes of array for success, Returns 2 bytes of array(63,00) for failure
////		reader.readCardBlock(authKeyData, readerUtil.getAuthCmdForkeyA(), 1); // Returns 16 bytes of array for success, Returns 2 bytes of array(63,00) for failure
////		reader.writeDataIntoCard(authKeyData, readerUtil.getAuthCmdForkeyA(), 1, data); // Returns 2 bytes of array(90,00) for success, Returns 2 bytes of array(63,00) for failure
//	}
//
//}
