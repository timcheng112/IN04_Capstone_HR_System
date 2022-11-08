package com.conceiversolutions.hrsystem.pay.allowanceTemplate;

import com.conceiversolutions.hrsystem.pay.allowance.AllowanceService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AllowanceTemplateService {

    private final AllowanceTemplateRepository allowanceTemplateRepository;

    public List<AllowanceTemplate> getAllAllowanceTemplates() {return allowanceTemplateRepository.findAll();}

    public AllowanceTemplate getAllowanceTemplate(Long id) {
        Optional<AllowanceTemplate> allowanceTemplateOptional = allowanceTemplateRepository.findById(id);
        if(allowanceTemplateOptional.isPresent()){
            return allowanceTemplateOptional.get();
        } else {
            throw new IllegalStateException("Allowance Template of id " + id + " does not exist");
        }
    }
}
