package com.conceiversolutions.hrsystem.pay.allowanceTemplate;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path="api/pay/allowanceTemplate")
@AllArgsConstructor
public class AllowanceTemplateController {

    private final AllowanceTemplateService allowanceTemplateService;

    @GetMapping
    public List<AllowanceTemplate> getAllAllowanceTemplates() { return allowanceTemplateService.getAllAllowanceTemplates();}

    @GetMapping(path="{allowanceTemplateId}")
    public AllowanceTemplate getAllowanceTemplate(@PathVariable("allowanceTemplateId") Long allowanceTemplateId) {
        return allowanceTemplateService.getAllowanceTemplate(allowanceTemplateId);
    }
}
