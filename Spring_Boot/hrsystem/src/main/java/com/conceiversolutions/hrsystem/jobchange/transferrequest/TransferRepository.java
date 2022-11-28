package com.conceiversolutions.hrsystem.jobchange.transferrequest;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransferRepository extends JpaRepository<TransferRequest, Long> {


}
