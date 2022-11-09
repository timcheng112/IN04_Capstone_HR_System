package com.conceiversolutions.hrsystem.user.registration.init;

import com.conceiversolutions.hrsystem.enums.CitizenshipEnum;
import com.conceiversolutions.hrsystem.enums.GenderEnum;
import com.conceiversolutions.hrsystem.enums.RaceEnum;
import com.conceiversolutions.hrsystem.enums.RoleEnum;
import com.conceiversolutions.hrsystem.organizationstructure.address.AddressService;
import com.conceiversolutions.hrsystem.organizationstructure.department.DepartmentService;
import com.conceiversolutions.hrsystem.organizationstructure.outlet.OutletService;
import com.conceiversolutions.hrsystem.organizationstructure.team.TeamService;
import com.conceiversolutions.hrsystem.skillset.skillset.SkillsetService;
import com.conceiversolutions.hrsystem.skillset.userskillset.UserSkillsetService;
import com.conceiversolutions.hrsystem.user.position.Position;
import com.conceiversolutions.hrsystem.user.position.PositionRepository;
import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@AllArgsConstructor
public class InitService {
    private final DepartmentService departmentService;
    private final AddressService addressService;
    private final OutletService outletService;
    private final TeamService teamService;
    private final SkillsetService skillsetService;
    private final UserSkillsetService userSkillsetService;
    private final UserService userService;
    private final PositionRepository positionRepository;

    public String mattInit() {
        System.out.println("InitService.mattInit");

        // Add 1 department
        departmentService.addNewDepartment("Sales", 3);

        // Add 1 address
        addressService.addAddress("West Mall", "Bukit Batok Central", "04-05", "658713", "Singapore", "Singapore");

        // Add 1 outlet
        outletService.addOutlet("West Mall Store", "98778123", 10, 20, 1L);

        // Add 1 team
        teamService.addNewTeam("West Mall Team A", 3, 1, false, 1);

        // Add 3 skillsets
        skillsetService.addSkillset("Java");
        skillsetService.addSkillset("Python");
        skillsetService.addSkillset("MySQL");

        // Add 2 UserSkillset
        userSkillsetService.addUserSkillset(3L, 1L, 5);
        userSkillsetService.addUserSkillset(3L, 2L, 3);

        // Add Non HR Manager
        User staffManager = new User(
                "Aloysius",
                "Yap",
                "password",
                99887766,
                "aloysiusyap@gmail.com",
                LocalDate.of(1997, 11, 11),
                GenderEnum.MALE,
                RaceEnum.CHINESE,
                CitizenshipEnum.CITIZEN,
                RoleEnum.MANAGER,
                false,
                false,
                null);
        staffManager.setWorkEmail("yapa@libro.com");
        staffManager.setEnabled(true);

        Position managerPosition = positionRepository.findById(3L).get();
        staffManager.setCurrentPosition(managerPosition);
        userService.initAdmin(staffManager);

        return "Successful";
    }
}
