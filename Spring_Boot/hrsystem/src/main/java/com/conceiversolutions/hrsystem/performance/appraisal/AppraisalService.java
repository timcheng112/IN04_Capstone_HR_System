package com.conceiversolutions.hrsystem.performance.appraisal;

import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AppraisalService {

    private final AppraisalRepository appraisalRepository;
    private final UserRepository userRepository;

    public List<Appraisal> getAllAppraisals(){
        return appraisalRepository.findAll();
    }

    public Appraisal getAppraisal(Long appraisalId){
        Optional<Appraisal> a = appraisalRepository.findById(appraisalId);
        if (a == null) {
            throw new IllegalStateException("Appraisal does not exist");
        }
        return a.get();
    }

    public String createAppraisal( Appraisal appraisal){

         if(appraisal == null){
             throw new IllegalStateException("Appraisal does not exist");
         }
         Appraisal a = appraisalRepository.saveAndFlush(appraisal);
         return "Appraisal with id:" + a.getAppraisalId() + "is created";

    }

    public String deleteAppraisal(Long appraisalId, Long userId){
        Optional<Appraisal> a = appraisalRepository.findById(appraisalId);
        if (a == null) {
            throw new IllegalStateException("Appraisal does not exist");
        }
        Appraisal appraisal = a.get();

        Optional<User> u = userRepository.findById(userId);
        if (u.isEmpty()) {
            throw new IllegalStateException("User does not exist");
        }
        User u1 = u.get();
        if(u1.getUserRole().toString() != "MANAGER" || !u1.getIsHrEmployee()){
            return "You are not allowed to delete appraisal";
        }else{
            List<Appraisal> all = getAllAppraisals();

            all.remove(appraisal);
            return "Appraisal with id: " + appraisalId +" removed";
        }
    }

    public void editAppraisal(String strengths, String weakness, Integer rating, boolean promotion, String promotionJustification, boolean submitted){

    }

}



