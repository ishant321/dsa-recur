package com.dsarecur.dashboard.Repository;

import com.dsarecur.dashboard.model.UserActivityDaily;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface UserActivityDailyRepo extends JpaRepository<UserActivityDaily, Integer> {
    Optional<UserActivityDaily> findByUserIdAndDate(String userId, LocalDate date);
}
