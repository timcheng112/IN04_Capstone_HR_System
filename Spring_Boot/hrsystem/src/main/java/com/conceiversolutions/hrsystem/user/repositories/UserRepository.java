package com.conceiversolutions.hrsystem.user.repositories;

import com.conceiversolutions.hrsystem.user.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
