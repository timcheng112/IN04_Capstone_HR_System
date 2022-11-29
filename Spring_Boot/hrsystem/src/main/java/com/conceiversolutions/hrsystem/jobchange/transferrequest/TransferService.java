package com.conceiversolutions.hrsystem.jobchange.transferrequest;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TransferService {

    private final TransferRepository transferRepository;

    public List<TransferRequest> getAllTransferRequests(){
        return transferRepository.findAll();
    }
}
