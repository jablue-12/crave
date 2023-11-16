package com.crave.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RestaurantItem {
    @Id
    @SequenceGenerator(
            name = "restaurantItem_sequence",
            sequenceName = "restaurantItem_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "restaurantItem_sequence"
    )
    private Long id;
    private Long restaurant_id;
    private String name;
    private float price;
}
