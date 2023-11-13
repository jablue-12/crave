package com.crave.backend.repository;

import java.util.List;
import java.util.Set;
import com.crave.backend.enums.RestaurantTag;
import com.crave.backend.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    List<Restaurant> findByTagsIn(Set<RestaurantTag> tags);
}
