package com.conceiversolutions.hrsystem.user.user;

import com.conceiversolutions.hrsystem.emailhandler.EmailSender;
import com.conceiversolutions.hrsystem.enums.RoleEnum;
import com.conceiversolutions.hrsystem.user.registration.EmailValidator;
import com.conceiversolutions.hrsystem.user.registration.token.ConfirmationToken;
import com.conceiversolutions.hrsystem.user.registration.token.ConfirmationTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final static String USER_NOT_FOUND_MSG = "User with email %s not found";
    private final EmailValidator emailValidator;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ConfirmationTokenService confirmationTokenService;
    private final EmailSender emailSender;

    @Autowired
    public UserService(UserRepository userRepository, EmailValidator emailValidator, BCryptPasswordEncoder bCryptPasswordEncoder, ConfirmationTokenService confirmationTokenService, EmailSender emailSender) {
        this.userRepository = userRepository;
        this.emailValidator = emailValidator;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.confirmationTokenService = confirmationTokenService;
        this.emailSender = emailSender;
    }

//    public List<User> getTestUsers() {
//        return List.of(
//                new User("Janice",
//                        "Sim",
//                        "password",
//                        93823503,
//                        "janicesim@gmail.com",
//                        LocalDate.of(2000,2,28),
//                        GenderEnum.FEMALE,
//                        RoleEnum.APPLICANT,
//                        false,
//                        false,
//                        null
//                )
//        );
//    }

    public List<User> getAllUsers(){
        System.out.println("UserService.getAllUsers");
        return userRepository.findAll();
    }

    public User getUser(Long id){
        System.out.println("UserService.getUser");
        System.out.println("id = " + id);
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            System.out.println("User found");
            System.out.println(user.get());
            return user.get();
        } else {
            throw new IllegalStateException("User does not exist.");
        }

    }

    public Long addNewUser(User user) {
        System.out.println("UserService.addNewUser");
//        Check if email is valid
        boolean isValidEmail = emailValidator.test(user.getEmail());
        if (!isValidEmail) {
            throw new IllegalStateException("Email address is not valid");
        }

//        Check if email is already used
        if (user.getUserRole().equals(RoleEnum.APPLICANT)) {
            Optional<User> userByEmail = userRepository.findUserByEmail(user.getEmail());
            if (userByEmail.isPresent()) {
                System.out.println("Email already in use.");
                throw new IllegalStateException("User's email is already in used");
            }
        } else {
            boolean isValidWorkEmail = emailValidator.test(user.getWorkEmail());
            if(!isValidWorkEmail) {
                throw new IllegalStateException("Work email address is not valid");
            }
            Optional<User> employeeByWorkEmail1 = userRepository.findUserByEmail(user.getEmail());
            Optional<User> employeeByWorkEmail2 = userRepository.findUserByWorkEmail(user.getWorkEmail());
            if (employeeByWorkEmail1.isPresent() || employeeByWorkEmail2.isPresent()) {
                System.out.println("Email(s) already in use.");
                throw new IllegalStateException("User's emails are already in used");
            }
        }

        String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());

        user.setPassword(encodedPassword);

        User newUser = userRepository.saveAndFlush(user);

//        Sending confirmation TOKEN to set user's isEnabled
        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token, LocalDateTime.now(), LocalDateTime.now().plusHours(1), newUser
        );

        confirmationTokenService.saveConfirmationToken(confirmationToken);

        String link = "http://localhost:9191/api/user/register/confirmToken?token=" + token;
        if (newUser.getUserRole().equals(RoleEnum.APPLICANT)) {
            emailSender.send(
                    newUser.getEmail(), buildConfirmationEmail(newUser.getFirstName(), link));
        } else {
            emailSender.send(
                    newUser.getWorkEmail(), buildConfirmationEmail(newUser.getFirstName(), link));
        }

        System.out.println("New user successfully created with User Id : " + newUser.getUserId());
        return newUser.getUserId();
    }

    public Long loginUserJMP(String email, String password) {
        System.out.println("UserService.loginUserJMP");
        System.out.println("email = " + email + ", password = " + password);
        Optional<User> user = userRepository.findUserByEmail(email);
        if(user.isPresent()){
            User userRecord = user.get();
            if (bCryptPasswordEncoder.matches(password, userRecord.getPassword())) {
                System.out.println("User found and password matches. User Id is : " + userRecord.getUserId());
                return userRecord.getUserId();
            } else {
                throw new IllegalStateException("User password does not match the record.");
            }
        } else {
            throw new IllegalStateException("User does not exist.");
        }
    }

    public Long loginUserHRMS(String workEmail, String password) {
        System.out.println("UserService.loginUserHRMS");
        System.out.println("workEmail = " + workEmail + ", password = " + password);
        Optional<User> user = userRepository.findUserByWorkEmail(workEmail);
        if(user.isPresent()){
            System.out.println("Employee exists");
            User userRecord = user.get();
            if (bCryptPasswordEncoder.matches(password, userRecord.getPassword())) {
                System.out.println("Employee found and password matches. User Id is : " + userRecord.getUserId());
                return userRecord.getUserId();
            } else {
                throw new IllegalStateException("User password does not match the record.");
            }
        } else {
            System.out.println("Employee does not exist");
            throw new IllegalStateException("User does not exist.");
        }
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        String[] split = email.split("@");
        if (split[1].startsWith("libro")) {
            return userRepository.findUserByWorkEmail(email)
                    .orElseThrow(() ->
                            new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG, email)));
        } else {
            return userRepository.findUserByEmail(email)
                    .orElseThrow(() ->
                            new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG, email)));
        }
    }

    @Transactional
    public String confirmToken(String token) {
        System.out.println("UserService.confirmToken");
        System.out.println("token = " + token);
        ConfirmationToken confirmationToken = confirmationTokenService
                .getToken(token)
                .orElseThrow(() -> new IllegalStateException("Token is not found"));

        if (confirmationToken.getConfirmedAt() != null) {
            System.out.println("Email is already verified");
            throw new IllegalStateException("Email has already confirmed");
        }

        LocalDateTime expiredAt = confirmationToken.getExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            System.out.println("Token has already expired");
            throw new IllegalStateException("Token has already expired");
        }

        confirmationTokenService.setConfirmedAt(token);
        enableUser(confirmationToken.getUser().getEmail());
        return "Token has been confirmed.";
    }

    public int enableUser(String email) {
        System.out.println("UserService.enableUser");
        System.out.println("email = " + email);
        return userRepository.enableUser(email);
    }

    private String buildConfirmationEmail(String name, String link) {
        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
                "\n" +
                "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
                "\n" +
                "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
                "        \n" +
                "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n" +
                "          <tbody><tr>\n" +
                "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
                "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td style=\"padding-left:10px\">\n" +
                "                  \n" +
                "                    </td>\n" +
                "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n" +
                "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Confirm your email</span>\n" +
                "                    </td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "              </a>\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "        </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
                "      <td>\n" +
                "        \n" +
                "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td bgcolor=\"#1D70B8\" width=\"100%\" height=\"10\"></td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "\n" +
                "\n" +
                "\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n" +
                "        \n" +
                "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Hi " + name + ",</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> Thank you for registering an account with Libro. Please click on the below link to activate your account: </p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> <a href=\"" + link + "\">Activate Now</a> </p></blockquote>\n Link will expire in 1 Hour. <p>Grow with Libro</p>" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
                "\n" +
                "</div></div>";
    }

    public Boolean testEmailRegex(String email) {
        System.out.println("UserService.testEmailRegex");
        Boolean result = emailValidator.test(email);
        System.out.println("result is " + result);
        return result;
    }
}
