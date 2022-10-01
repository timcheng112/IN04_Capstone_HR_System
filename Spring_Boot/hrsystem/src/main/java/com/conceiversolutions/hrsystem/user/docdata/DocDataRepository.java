package com.conceiversolutions.hrsystem.user.docdata;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DocDataRepository extends JpaRepository<DocData, Long> {
    Optional<DocData> findByName(String fileName);
}
