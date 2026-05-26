package com.dsarecur.dashboard.Repository;

import com.dsarecur.dashboard.model.UserEntityActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserEntityActivityRepo extends JpaRepository<UserEntityActivity, Integer> {
}
