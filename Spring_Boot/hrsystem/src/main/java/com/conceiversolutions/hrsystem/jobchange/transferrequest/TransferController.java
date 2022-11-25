package com.conceiversolutions.hrsystem.jobchange.transferrequest;


import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/transfer")
@AllArgsConstructor
public class TransferController {

    private final TransferService transferService;

    public List<TransferRequest> getAllTransferRequests(){
        return transferService.getAllTransferRequests();
    }
}
