package com.conceiversolutions.hrsystem.pay.deductionTemplate;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class DeductionTemplateService {

    private final DeductionTemplateRepository deductionTemplateRepository;

    public List<DeductionTemplate> getAllDeductionTemplates(){return deductionTemplateRepository.findAll();}

    public DeductionTemplate getDeductionTemplate(Long id) {
        Optional<DeductionTemplate> deductionTemplateOptional = deductionTemplateRepository.findById(id);
        if(deductionTemplateOptional.isPresent()) {
            return deductionTemplateOptional.get();
        } else {
            throw new IllegalStateException("Deduction Template of id " + id + " does not exist");
        }
    }
}
