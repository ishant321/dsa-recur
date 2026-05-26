package com.dsarecur.dashboard.Repository;

import com.dsarecur.dashboard.model.UserActivityDaily;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserActivityDailyRepo extends JpaRepository<UserActivityDaily, Integer> {
}
