package com.crave.backend.repository;
import java.util.List;
import com.crave.backend.model.RestaurantItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RestaurantItemRepository extends JpaRepository<RestaurantItem, Long> {
    List <RestaurantItem> findAllByRestaurantId(Long restaurantId);

    void deleteByRestaurantId(Long restaurantId);
}
