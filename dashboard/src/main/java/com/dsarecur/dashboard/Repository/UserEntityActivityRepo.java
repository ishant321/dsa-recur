package com.dsarecur.dashboard.Repository;

import com.dsarecur.dashboard.constants.EntityType;
import com.dsarecur.dashboard.model.UserEntityActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserEntityActivityRepo extends JpaRepository<UserEntityActivity, Integer> {
    Optional<UserEntityActivity> findByUserIdAndEntityIdAndEntityType(
            String userId,
            Integer entityId,
            EntityType entityType
    );

    List<UserEntityActivity> findByUserId(String userId);
}
