package com.crave.backend.repository;
import java.util.List;
import com.crave.backend.model.UserOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserOrderRepository extends JpaRepository<UserOrder, Long> {
    List<UserOrder> findAllByRestaurantId(@Param("restaurant_id") Long restaurantId);
    
    List<UserOrder> findAllByUserId(@Param("user_id") Long user_id);

}
