package com.conceiversolutions.hrsystem.pay.deductionTemplate;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "api/pay/deductionTemplate")
@AllArgsConstructor
public class DeductionTemplateController {

    private final DeductionTemplateService deductionTemplateService;

    @GetMapping
    public List<DeductionTemplate> getAllDeductionTemplates() {return deductionTemplateService.getAllDeductionTemplates();}

    @GetMapping(path = "{deductionTemplateId}")
    public DeductionTemplate getDeductionTemplate(@PathVariable("deductionTemplateId") Long deductionTemplateId) {
        return deductionTemplateService.getDeductionTemplate(deductionTemplateId);
    }
}
