package com.crave.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
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
    @NonNull
    private Long restaurantId;
    @NonNull
    private String name;
    @NonNull
    private float price;
}
