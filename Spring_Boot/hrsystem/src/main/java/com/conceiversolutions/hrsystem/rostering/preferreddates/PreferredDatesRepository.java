package com.conceiversolutions.hrsystem.rostering.preferreddates;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PreferredDatesRepository extends JpaRepository<PreferredDates, Long> {

}
