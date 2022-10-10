package com.conceiversolutions.hrsystem.user.user;

import com.conceiversolutions.hrsystem.administration.tasklistitem.TaskListItem;
import com.conceiversolutions.hrsystem.emailhandler.EmailSender;
import com.conceiversolutions.hrsystem.enums.GenderEnum;
import com.conceiversolutions.hrsystem.enums.RoleEnum;
import com.conceiversolutions.hrsystem.organizationstructure.department.Department;
import com.conceiversolutions.hrsystem.organizationstructure.department.DepartmentRepository;
import com.conceiversolutions.hrsystem.organizationstructure.team.Team;
import com.conceiversolutions.hrsystem.organizationstructure.team.TeamRepository;
import com.conceiversolutions.hrsystem.user.reactivationrequest.ReactivationRequest;
import com.conceiversolutions.hrsystem.user.reactivationrequest.ReactivationRequestRepository;
import com.conceiversolutions.hrsystem.user.registration.EmailValidator;
import com.conceiversolutions.hrsystem.user.registration.token.ConfirmationToken;
import com.conceiversolutions.hrsystem.user.registration.token.ConfirmationTokenRepository;
import com.conceiversolutions.hrsystem.user.registration.token.ConfirmationTokenService;
import lombok.AllArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final static String USER_NOT_FOUND_MSG = "User with email %s not found";
    private final EmailValidator emailValidator;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ConfirmationTokenService confirmationTokenService;
    private final EmailSender emailSender;
    private final ConfirmationTokenRepository confirmationTokenRepository;
    private final ReactivationRequestRepository reactivationRequestRepository;
    private final DepartmentRepository departmentRepository;
    private final TeamRepository teamRepository;

    // @Autowired
    // public UserService(UserRepository userRepository, EmailValidator
    // emailValidator, BCryptPasswordEncoder bCryptPasswordEncoder,
    // ConfirmationTokenService confirmationTokenService, EmailSender emailSender,
    // ConfirmationTokenRepository confirmationTokenRepository,
    // ReactivationRequestRepository reactivationRequestRepository) {
    // this.userRepository = userRepository;
    // this.emailValidator = emailValidator;
    // this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    // this.confirmationTokenService = confirmationTokenService;
    // this.emailSender = emailSender;
    // this.confirmationTokenRepository = confirmationTokenRepository;
    // this.reactivationRequestRepository = reactivationRequestRepository;
    // }

    // public List<User> getTestUsers() {
    // return List.of(
    // new User("Janice",
    // "Sim",
    // "password",
    // 93823503,
    // "janicesim@gmail.com",
    // LocalDate.of(2000,2,28),
    // GenderEnum.FEMALE,
    // RoleEnum.APPLICANT,
    // false,
    // false,
    // null
    // )
    // );
    // }

    public List<User> getAllUsers() {
        System.out.println("UserService.getAllUsers");

        List<User> users = userRepository.findAll();
        System.out.println("size of user list is " + users.size());
        for (User u : users) {
            List<Team> teams = u.getTeams();
            for (Team t : teams) {
                t.setUsers(new ArrayList<>());
                t.setDepartment(null);
                t.setOutlet(null);
                t.setRoster(null);
            }
            // u.setTaskListItems(null);
            for (TaskListItem taskListItem : u.getTaskListItems()) {
                taskListItem.setUser(null);
                taskListItem.getTask().setTaskListItems(new ArrayList<>());
                taskListItem.getTask().setCategory(null);
            }
            u.setQualificationInformation(null);
            u.setTeams(new ArrayList<>());
            u.setBlocks(new ArrayList<>());
        }

        return users;
    }

    public User getUser(Long id) {
        System.out.println("UserService.getUser");
        System.out.println("id = " + id);
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            System.out.println("User found");
            System.out.println(user.get());

            User u = user.get();

            List<Team> teams = u.getTeams();
            for (Team t : teams) {
                t.setUsers(new ArrayList<>());
                t.setDepartment(null);
                t.setOutlet(null);
                t.setRoster(null);
            }
            // u.setTaskListItems(null);
            for (TaskListItem taskListItem : u.getTaskListItems()) {
                taskListItem.setUser(null);
                taskListItem.getTask().setTaskListItems(new ArrayList<>());
                taskListItem.getTask().setCategory(null);
            }
            u.setQualificationInformation(null);
            u.setTeams(new ArrayList<>());
            u.setBlocks(new ArrayList<>());

            return u;
        } else {
            throw new IllegalStateException("User does not exist.");
        }

    }

    public User getUser(String email) {
        System.out.println("UserService.getUser");
        System.out.println("email = " + email);
        Optional<User> user = userRepository.findUserByEmail(email);
        if (user.isPresent()) {
            System.out.println("User found");
            System.out.println(user.get());

            User u = user.get();

            List<Team> teams = u.getTeams();
            for (Team t : teams) {
                t.setUsers(new ArrayList<>());
                t.setDepartment(null);
                t.setOutlet(null);
                t.setRoster(null);
            }
            // u.setTaskListItems(null);
            for (TaskListItem taskListItem : u.getTaskListItems()) {
                taskListItem.setUser(null);
                taskListItem.getTask().setTaskListItems(new ArrayList<>());
                taskListItem.getTask().setCategory(null);
            }
            u.setQualificationInformation(null);
            u.setTeams(new ArrayList<>());
            u.setBlocks(new ArrayList<>());

            return u;
        } else {
            throw new IllegalStateException("User does not exist.");
        }
    }

    public User getEmployee(String workEmail) {
        System.out.println("UserService.getEmployee");
        System.out.println("email = " + workEmail);
        Optional<User> user = userRepository.findUserByWorkEmail(workEmail);
        if (user.isPresent()) {
            System.out.println("Employee found");
            System.out.println(user.get());

            User u = user.get();

            List<Team> teams = u.getTeams();
            for (Team t : teams) {
                t.setUsers(new ArrayList<>());
                t.setDepartment(null);
                t.setOutlet(null);
                t.setRoster(null);
            }
            // u.setTaskListItems(null);
            for (TaskListItem taskListItem : u.getTaskListItems()) {
                taskListItem.setUser(null);
                taskListItem.getTask().setTaskListItems(new ArrayList<>());
                taskListItem.getTask().setCategory(null);
            }
            u.setQualificationInformation(null);
            u.setTeams(new ArrayList<>());
            u.setBlocks(new ArrayList<>());

            return u;
        } else {
            throw new IllegalStateException("Employee does not exist.");
        }
    }

    public List<User> getEmployeesWithoutTask(Long taskId) {
        List<User> employees = userRepository.findEmployeesWithoutTask(taskId, RoleEnum.ADMINISTRATOR,
                RoleEnum.APPLICANT);
        for (User employee : employees) {
            for (TaskListItem taskListItem : employee.getTaskListItems()) {
                taskListItem.setUser(null);
                taskListItem.getTask().setTaskListItems(new ArrayList<>());
                taskListItem.getTask().setCategory(null);
            }
        }
        return employees;
    }

    public List<User> getEmployeesWithTask(Long taskId) {
        List<User> employees = userRepository.findEmployeesWithTask(taskId, RoleEnum.ADMINISTRATOR, RoleEnum.APPLICANT);
        for (User employee : employees) {
            for (TaskListItem taskListItem : employee.getTaskListItems()) {
                taskListItem.setUser(null);
                taskListItem.getTask().setTaskListItems(new ArrayList<>());
                taskListItem.getTask().setCategory(null);
            }
        }
        return employees;
    }

    public Long addNewUser(User user) {
        System.out.println("UserService.addNewUser");
        // Check if email is valid
        boolean isValidEmail = emailValidator.test(user.getEmail());
        if (!isValidEmail) {
            throw new IllegalStateException("Email address is not valid");
        }

        // Check if email is already used
        if (user.getUserRole().equals(RoleEnum.APPLICANT)) {
            Optional<User> userByEmail = userRepository.findUserByEmail(user.getEmail());
            if (userByEmail.isPresent()) {
                System.out.println("Email already in use.");
                throw new IllegalStateException("User's email is already in use");
            }
        } else {
            System.out.println("work email " + user.getWorkEmail());
            String workEmailToCheck = user.getWorkEmail();
            boolean isValidWorkEmail = emailValidator.test(workEmailToCheck);
            if (!isValidWorkEmail) {
                throw new IllegalStateException("Work email address is not valid");
            }
            Optional<User> employeeByWorkEmail1 = userRepository.findUserByEmail(user.getEmail());

            Optional<User> employeeByWorkEmail2 = userRepository.findUserByWorkEmail(user.getWorkEmail());
            if (employeeByWorkEmail1.isPresent() || employeeByWorkEmail2.isPresent()) {
                System.out.println("Email(s) already in use.");
                throw new IllegalStateException("User's emails are already in use");
            }

        }

        String encodedPassword = "";
        if (user.getUserRole().equals(RoleEnum.APPLICANT)) {
            encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
        } else {
            encodedPassword = bCryptPasswordEncoder.encode(user.getWorkEmail());
        }
        user.setPassword(encodedPassword);
        User newUser = userRepository.saveAndFlush(user);

        // Sending confirmation TOKEN to set user's isEnabled
        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token, LocalDateTime.now(), LocalDateTime.now().plusHours(1), newUser);

        confirmationTokenService.saveConfirmationToken(confirmationToken);
        String link = "";
        if (newUser.getUserRole().equals(RoleEnum.APPLICANT)) {
            link = "http://localhost:3000/verify/" + token;
            emailSender.send(
                    newUser.getEmail(), buildJMPConfirmationEmail(newUser.getFirstName(), link));
        } else {
            link = "http://localhost:3001/verify/" + token;
            emailSender.send(
                    newUser.getWorkEmail(),
                    buildHRMSConfirmationEmail(newUser.getFirstName(), link, newUser.getPassword()));
        }

        System.out.println("New user successfully created with User Id : " + newUser.getUserId());
        return newUser.getUserId();
    }

    public String loginUserJMP(String email, String password) throws Exception {
        System.out.println("UserService.loginUserJMP");
        System.out.println("email = " + email + ", password = " + password);
        Optional<User> user = userRepository.findUserByEmail(email);
        if (user.isPresent()) {
            User userRecord = user.get();

            if (userRecord.getBlackListed()) {
                throw new IllegalStateException("User account is not accessible, please request to be reactivated");
            } else if (!userRecord.isEnabled()) {
                throw new IllegalStateException(
                        "User account is not activated yet, please check your email or request to be activated");
            }

            if (bCryptPasswordEncoder.matches(password, userRecord.getPassword())) {
                System.out.println("User found and password matches. User Id is : " + userRecord.getUserId());
                return userRecord.getUserId().toString();
            } else {
                throw new IllegalStateException("User password does not match the record.");
            }
        } else {
            throw new IllegalStateException("User does not exist.");
        }
    }

    public String loginUserHRMS(String workEmail, String password) throws Exception {
        System.out.println("UserService.loginUserHRMS");
        System.out.println("workEmail = " + workEmail + ", password = " + password);
        Optional<User> user = userRepository.findUserByWorkEmail(workEmail);
        if (user.isPresent()) {
            System.out.println("Employee exists");
            User userRecord = user.get();

            if (!userRecord.isEnabled()) {
                System.out.println(
                        "Employee account is not activated yet, please check your work email or request to be activated");
                throw new Exception(
                        "Employee account is not activated yet, please check your work email or request to be activated");
            }

            if (bCryptPasswordEncoder.matches(password, userRecord.getPassword())) {
                System.out.println("Employee found and password matches. User Id is : " + userRecord.getUserId());
                return userRecord.getUserId().toString();
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
                    .orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG, email)));
        } else {
            return userRepository.findUserByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG, email)));
        }
    }

    @Transactional
    public String confirmToken(String token) throws Exception {
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
        return "Token has been confirmed.";
    }

    public int enableUser(String email) {
        System.out.println("UserService.enableUser");
        System.out.println("email = " + email);
        return userRepository.enableUser(email);
    }

    public String getUserFromToken(String token) {
        System.out.println("UserService.getUserFromToken");
        Optional<User> user = userRepository.findUserByToken(token);
        if (user.isPresent()) {
            return user.get().getEmail();
        } else {
            throw new IllegalStateException("User does not exist");
        }
    }

    public String getEmployeeFromToken(String token) {
        System.out.println("UserService.getEmployeeFromToken");
        Optional<User> employee = userRepository.findUserByToken(token);
        if (employee.isPresent()) {
            return employee.get().getWorkEmail();
        } else {
            throw new IllegalStateException("Employee does not exist");
        }
    }

    public Long forgotPasswordHRMS(String email) {
        System.out.println("UserService.forgotPassword");
        User tempUser = getEmployee(email);

        if (tempUser == null) {
            throw new IllegalStateException("User does not exist.");
        }

        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token, LocalDateTime.now(), LocalDateTime.now().plusHours(1), tempUser);

        confirmationTokenService.saveConfirmationToken(confirmationToken);

        String link = "http://localhost:3001/forgot/" + token;
        emailSender.send(email, buildForgotPasswordEmail(tempUser.getFirstName(), link));
        return tempUser.getUserId();
    }

    public Long forgotPasswordJMP(String email) {
        System.out.println("UserService.forgotPassword");
        User tempUser = getUser(email);

        if (tempUser == null) {
            throw new IllegalStateException("User does not exist.");
        }

        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token, LocalDateTime.now(), LocalDateTime.now().plusHours(1), tempUser);

        confirmationTokenService.saveConfirmationToken(confirmationToken);

        String link = "http://localhost:3000/forgot/" + token;
        emailSender.send(email, buildForgotPasswordEmail(tempUser.getFirstName(), link));
        return tempUser.getUserId();
    }

    private String buildJMPConfirmationEmail(String name, String link) {
        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
                "\n" +
                "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
                "\n" +
                "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n"
                +
                "    <tbody><tr>\n" +
                "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
                "        \n" +
                "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n"
                +
                "          <tbody><tr>\n" +
                "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
                "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n"
                +
                "                  <tbody><tr>\n" +
                "                    <td style=\"padding-left:10px\">\n" +
                "                  \n" +
                "                    </td>\n" +
                "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n"
                +
                "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Confirm your email</span>\n"
                +
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
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n"
                +
                "    <tbody><tr>\n" +
                "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
                "      <td>\n" +
                "        \n" +
                "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n"
                +
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
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n"
                +
                "    <tbody><tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n"
                +
                "        \n" +
                "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Hi " + name
                + ",</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> Thank you for registering an account with Libro. Please click on the below link to activate your account: </p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> <a href=\""
                + link + "\">Activate Now</a> </p></blockquote>\n Link will expire in 1 Hour. <p>Grow with Libro</p>" +
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

    private String buildHRMSConfirmationEmail(String name, String link, String tempPassword) {
        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
                "\n" +
                "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
                "\n" +
                "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n"
                +
                "    <tbody><tr>\n" +
                "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
                "        \n" +
                "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n"
                +
                "          <tbody><tr>\n" +
                "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
                "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n"
                +
                "                  <tbody><tr>\n" +
                "                    <td style=\"padding-left:10px\">\n" +
                "                  \n" +
                "                    </td>\n" +
                "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n"
                +
                "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Confirm your email</span>\n"
                +
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
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n"
                +
                "    <tbody><tr>\n" +
                "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
                "      <td>\n" +
                "        \n" +
                "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n"
                +
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
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n"
                +
                "    <tbody><tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n"
                +
                "        \n" +
                "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Hi " + name
                + ",</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> Thank you for registering an account with Libro. Please enter the following temporary password in the link below to activate your account: </p> <p>"
                + tempPassword
                + "</p>\n \n <blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> <a href=\""
                + link + "\">Activate Now</a> </p></blockquote>\n Link will expire in 1 Hour. <p>Grow with Libro</p>" +
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

    private String buildResetPasswordEmail(String name) {
        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
                "\n" +
                "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
                "\n" +
                "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n"
                +
                "    <tbody><tr>\n" +
                "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
                "        \n" +
                "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n"
                +
                "          <tbody><tr>\n" +
                "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
                "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n"
                +
                "                  <tbody><tr>\n" +
                "                    <td style=\"padding-left:10px\">\n" +
                "                  \n" +
                "                    </td>\n" +
                "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n"
                +
                "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Change your password</span>\n"
                +
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
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n"
                +
                "    <tbody><tr>\n" +
                "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
                "      <td>\n" +
                "        \n" +
                "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n"
                +
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
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n"
                +
                "    <tbody><tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n"
                +
                "        \n" +
                "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Hi " + name
                + ",</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> You have successfully reset your account password. If you did not request for the password reset, please contact us at : </p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> <p>in04.capstoner.2022@gmail.com</p></blockquote>\n  <p>Grow with Libro</p>"
                +
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

    private String buildForgotPasswordEmail(String name, String link) {
        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
                "\n" +
                "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
                "\n" +
                "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n"
                +
                "    <tbody><tr>\n" +
                "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
                "        \n" +
                "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n"
                +
                "          <tbody><tr>\n" +
                "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
                "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n"
                +
                "                  <tbody><tr>\n" +
                "                    <td style=\"padding-left:10px\">\n" +
                "                  \n" +
                "                    </td>\n" +
                "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n"
                +
                "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Reset your password</span>\n"
                +
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
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n"
                +
                "    <tbody><tr>\n" +
                "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
                "      <td>\n" +
                "        \n" +
                "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n"
                +
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
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n"
                +
                "    <tbody><tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n"
                +
                "        \n" +
                "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Hi " + name
                + ",</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> Please click on the link below to change your password. If you did not request for the password reset, please contact us at : </p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> <p>in04.capstoner.2022@gmail.com</p></blockquote>\n</p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> <a href=\""
                + link + "\">Change Now</a> </p></blockquote>\n Link will expire in 1 Hour. <p>Grow with Libro</p>" +
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

    public String resetPasswordJMP(String email, String oldPassword, String newPassword) {
        System.out.println("UserService.resetPasswordJMP");
        System.out.println("email = " + email + ", oldPassword = " + oldPassword + ", newPassword = " + newPassword);

        User user = getUser(email);
        if (bCryptPasswordEncoder.matches(oldPassword, user.getPassword())) {
            user.setPassword(bCryptPasswordEncoder.encode(newPassword));
        } else {
            throw new IllegalStateException("User's current password does not match the record.");
        }

        userRepository.saveAndFlush(user);
        System.out.println("User password has been changed");

        emailSender.send(
                email, buildResetPasswordEmail(user.getFirstName()));

        return "Password successfully changed for " + email;
    }

    public String resetPasswordHRMS(String workEmail, String oldPassword, String newPassword) {
        System.out.println("UserService.resetPasswordJMP");
        System.out.println(
                "workEmail = " + workEmail + ", oldPassword = " + oldPassword + ", newPassword = " + newPassword);

        User employee = getEmployee(workEmail);
        if (bCryptPasswordEncoder.matches(oldPassword, employee.getPassword())) {
            employee.setPassword(bCryptPasswordEncoder.encode(newPassword));
        } else {
            throw new IllegalStateException("User's current password does not match the record.");
        }

        userRepository.saveAndFlush(employee);
        System.out.println("User password has been changed");

        emailSender.send(
                workEmail, buildResetPasswordEmail(employee.getFirstName()));

        return "Password successfully changed for " + workEmail;
    }

    public String changePasswordJMP(String email, String password) {
        System.out.println("UserService.changePasswordJMP");
        System.out.println(
                "email = " + email + "," + "newPassword = " + password);

        User user = getUser(email);

        user.setPassword(bCryptPasswordEncoder.encode(password));

        userRepository.saveAndFlush(user);
        System.out.println("User password has been changed");

        emailSender.send(email, buildResetPasswordEmail(user.getFirstName()));

        return "Password successfully changed for " + email;
    }

    public String changePasswordHRMS(String workEmail, String password) {
        System.out.println("UserService.changePasswordHRMS");
        System.out.println(
                "workEmail = " + workEmail + "," + "newPassword = " + password);

        User employee = getEmployee(workEmail);

        employee.setPassword(bCryptPasswordEncoder.encode(password));

        userRepository.saveAndFlush(employee);
        System.out.println("Employee password has been changed");

        emailSender.send(workEmail, buildResetPasswordEmail(employee.getFirstName()));

        return "Password successfully changed for " + workEmail;
    }

    public String resendConfirmationEmail(String email, Integer platform) {
        System.out.println("UserService.resendConfirmationEmail");
        System.out.println("email = " + email + ", platform = " + platform);
        if (platform.equals(1)) { // JMP
            System.out.println("JMP Platform");
            User tempUser = getUser(email);

            System.out.println("User Id is : " + tempUser.getUserId());

            ConfirmationToken ct = confirmationTokenService.findUnconfirmedTokenByUserId(tempUser.getUserId());
            System.out.println("JMP Unconfirmed token identified");
            System.out.println("Confirmation Token is : " + ct.toString());

            ct.setExpiresAt(LocalDateTime.now().plusHours(1));
            confirmationTokenRepository.saveAndFlush(ct);

            String link = "http://localhost:3000/verify/" + ct.getToken();
            emailSender.send(
                    tempUser.getEmail(), buildJMPConfirmationEmail(tempUser.getFirstName(), link));
        } else { // HRMS/ESS
            System.out.println("HRMS/ESS Platform");
            User tempUser = getEmployee(email);

            System.out.println("User Id is : " + tempUser.getUserId());

            ConfirmationToken ct = confirmationTokenService.findUnconfirmedTokenByUserId(tempUser.getUserId());
            System.out.println("HRMS/ESS Unconfirmed token identified");
            System.out.println("Confirmation Token is : " + ct.toString());

            ct.setExpiresAt(LocalDateTime.now().plusHours(1));
            confirmationTokenRepository.saveAndFlush(ct);

            String link = "http://localhost:3001/verify/" + ct.getToken();
            emailSender.send(
                    tempUser.getWorkEmail(),
                    buildHRMSConfirmationEmail(tempUser.getFirstName(), link, tempUser.getPassword()));
        }
        return "Confirmation email resent";
    }

    public String requestAccountReactivation(String email, String reason) {
        System.out.println("UserService.requestAccountReactivation");
        User applicant = getUser(email);

        if (!applicant.getBlackListed() && applicant.isEnabled()) {
            throw new IllegalStateException("User account does not need reactivation");
        } else {
            ReactivationRequest req = new ReactivationRequest(LocalDateTime.now(), reason, applicant);
            ReactivationRequest savedReq = reactivationRequestRepository.saveAndFlush(req);
            applicant.setReactivationRequest(savedReq);
            userRepository.saveAndFlush(applicant);
            return "Reactivation Request has been recorded";
        }
    }

    @Transactional
    public String updateUser(Long userId, GenderEnum gender, String email, Integer phone) {
        System.out.println("UserService.updateUser");
        // System.out.println(.getUserRole());

        User user = getUser(userId);

        user.setPhone(phone);
        user.setEmail(email);
        user.setGender(gender);

        return "Update of user was successful";
    }

    public Long getUserFromEmail(String email) {
        System.out.println("UserService.getUserFromEmail");
        Optional<User> user = userRepository.findUserByEmail(email);
        if (user.isPresent()) {
            return user.get().getUserId();
        } else {
            throw new IllegalStateException("User not found");
        }
    }

    public Long getUserFromWorkEmail(String workEmail) {
        System.out.println("UserService.getUserFromWorkEmail");
        Optional<User> user = userRepository.findUserByWorkEmail(workEmail);
        if (user.isPresent()) {
            return user.get().getUserId();
        } else {
            throw new IllegalStateException("User not found");
        }
    }

    @Transactional
    public String updateUser(User newUser, Long id) {
        System.out.println("UserService.updateUser");

        User user = getUser(id);

        user.setFirstName(newUser.getFirstName());
        user.setLastName(newUser.getLastName());
        user.setPhone(newUser.getPhone());
        user.setEmail(newUser.getEmail());
        user.setDob(newUser.getDob());
        user.setGender(newUser.getGender());
        user.setProfilePic(newUser.getProfilePic());

        return "Update of user was successful";
    }

    public List<User> getAllManagers() {
        List<User> managers = userRepository.findAllByRole(RoleEnum.MANAGER);
        System.out.println("size of managers list is " + managers.size());
        for (User u : managers) {
            List<Team> teams = u.getTeams();
            for (Team t : teams) {
                t.setUsers(new ArrayList<>());
                t.setDepartment(null);
                t.setRoster(null);
                t.setTeamHead(null);
            }
            // u.setTaskListItems(null);
            for (TaskListItem taskListItem : u.getTaskListItems()) {
                taskListItem.setUser(null);
                taskListItem.getTask().setTaskListItems(new ArrayList<>());
                taskListItem.getTask().setCategory(null);
            }
            u.setQualificationInformation(null);
            // u.setTeams(new ArrayList<>());
        }

        return managers;
    }

    public List<User> getAllEmployees() {
        List<User> employees = userRepository.findAllByRole(RoleEnum.EMPLOYEE);
        employees.addAll(userRepository.findAllByRole(RoleEnum.MANAGER));
        System.out.println("size of employees list is " + employees.size());
        for (User u : employees) {
            List<Team> teams = u.getTeams();
            for (Team t : teams) {
                t.setUsers(new ArrayList<>());
                t.setDepartment(null);
                t.setRoster(null);
                t.setTeamHead(null);
            }
            // u.setTaskListItems(null);
            for (TaskListItem taskListItem : u.getTaskListItems()) {
                taskListItem.setUser(null);
                taskListItem.getTask().setTaskListItems(new ArrayList<>());
                taskListItem.getTask().setCategory(null);
            }
            u.setQualificationInformation(null);
            // u.setTeams(new ArrayList<>());
            u.setBlocks(new ArrayList<>());

        }
        return employees;
    }

    public List<User> getAllStaff() {
        List<User> employees = userRepository.findAllStaff(RoleEnum.MANAGER, RoleEnum.EMPLOYEE);
        System.out.println("size of employee list is " + employees.size());
        for (User u : employees) {
            List<Team> teams = u.getTeams();
            for (Team t : teams) {
                t.setUsers(new ArrayList<>());
                t.setDepartment(null);
                t.setRoster(null);
                t.setTeamHead(null);
            }
            // u.setTaskListItems(null);
            for (TaskListItem taskListItem : u.getTaskListItems()) {
                taskListItem.setUser(null);
                taskListItem.getTask().setTaskListItems(new ArrayList<>());
                taskListItem.getTask().setCategory(null);
            }
            u.setQualificationInformation(null);
            // u.setTeams(new ArrayList<>());
            u.setBlocks(new ArrayList<>());

        }

        return employees;
    }

    public Long initAdmin(User user) {
        System.out.println("UserService.initAdmin");
        boolean isValidEmail = emailValidator.test(user.getEmail());
        if (!isValidEmail) {
            throw new IllegalStateException("Email address is not valid");
        }
        System.out.println("work email " + user.getWorkEmail());
        String workEmailToCheck = user.getWorkEmail();
        boolean isValidWorkEmail = emailValidator.test(workEmailToCheck);
        if (!isValidWorkEmail) {
            throw new IllegalStateException("Work email address is not valid");
        }
        Optional<User> employeeByWorkEmail1 = userRepository.findUserByEmail(user.getEmail());

        Optional<User> employeeByWorkEmail2 = userRepository.findUserByWorkEmail(user.getWorkEmail());
        if (employeeByWorkEmail1.isPresent() || employeeByWorkEmail2.isPresent()) {
            System.out.println("Email(s) already in use.");
            throw new IllegalStateException("User's emails are already in use");
        }

        String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        User newUser = userRepository.saveAndFlush(user);
        return newUser.getUserId();
    }

    public List<User> getAllAvailManagers() {
        List<Department> departments = departmentRepository.findAll();
        List<Long> deptHeadIds = new ArrayList<>();
        for (Department d : departments) {
            deptHeadIds.add(d.getDepartmentHead().getUserId());
        }

        List<Team> allTeams = teamRepository.findAll();
        List<Long> teamHeadIds = new ArrayList<>();
        for (Team t : allTeams) {
            teamHeadIds.add(t.getTeamHead().getUserId());
        }

        List<User> managers = userRepository.findAllByRole(RoleEnum.MANAGER);
        System.out.println("size of managers list is " + managers.size());
        List<User> availManagers = new ArrayList<>();
        for (User u : managers) {
            if (!deptHeadIds.contains(u.getUserId()) && !teamHeadIds.contains(u.getUserId())) {
                List<Team> teams = u.getTeams();
                for (Team t : teams) {
                    t.setUsers(new ArrayList<>());
                    t.setDepartment(null);
                    t.setRoster(null);
                    t.setTeamHead(null);
                }
                // u.setTaskListItems(null);
                for (TaskListItem taskListItem : u.getTaskListItems()) {
                    taskListItem.setUser(null);
                    taskListItem.getTask().setTaskListItems(new ArrayList<>());
                    taskListItem.getTask().setCategory(null);
                }
                u.setQualificationInformation(null);
                u.setBlocks(new ArrayList<>());

                availManagers.add(u);
            }
        }

        return availManagers;
    }

    public List<User> getEmployeesNotInGivenTeam(Integer teamId) {
        System.out.println("UserService.getEmployeesNotInGivenTeam");
        System.out.println("teamId = " + teamId);

        List<User> employees = userRepository.getEmployeesNotInGivenTeam(RoleEnum.MANAGER, RoleEnum.EMPLOYEE,
                Long.valueOf(teamId));
        
        System.out.println("EMPLOYEES NOT IN GIVEN TEAM: " + employees);

        if (employees.isEmpty()) {
            throw new IllegalStateException("Employees not found.");
        }

        for (User e : employees) {
            List<Team> teams = e.getTeams();
            for (Team t : teams) {
                t.setUsers(new ArrayList<>());
                t.setDepartment(null);
                t.setOutlet(null);
                t.setTeamHead(null);
                t.setRoster(null);
            }
            // u.setTaskListItems(null);
            for (TaskListItem taskListItem : e.getTaskListItems()) {
                taskListItem.setUser(null);
                taskListItem.getTask().setTaskListItems(new ArrayList<>());
                taskListItem.getTask().setCategory(null);
            }
            e.setQualificationInformation(null);
            e.setBlocks(new ArrayList<>());

        }

        return employees;
    }

    public String verifyTempPassword(String workEmail, String tempPassword) {
        String currentPassword = getEmployee(workEmail).getPassword();
        if (tempPassword.equals(currentPassword)) {
            return "Temporary password verified";
        }
        throw new IllegalStateException("Invalid temporary password");
    }

    @Transactional
    public String setFirstPassword(String workEmail, String password) {
        User user = getEmployee(workEmail);
        String encodedPassword = bCryptPasswordEncoder.encode(password);
        user.setPassword(encodedPassword);
        enableUser(user.getEmail());
        userRepository.saveAndFlush(user);
        return "Successfully set password";
    }

    
}
