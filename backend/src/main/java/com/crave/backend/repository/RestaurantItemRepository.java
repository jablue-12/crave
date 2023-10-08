package com.crave.backend.repository;

import com.crave.backend.model.RestaurantItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RestaurantItemRepository extends JpaRepository<RestaurantItem, Long> {
}
