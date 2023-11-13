package com.crave.backend.model;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import io.micrometer.common.lang.Nullable;

import java.time.LocalTime;

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
public class Restaurant {
    @Id
    @SequenceGenerator(
            name = "restaurant_sequence",
            sequenceName = "restaurant_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "restaurant_sequence"
    )
    private Long id;
    @NonNull
    private String name;
    @NonNull
    private String address;
    @NonNull
    private Double rating;
    @NonNull
    private String imageUrl;


    @Nullable
    private String description;
    @Nullable
    private String email;
    @Nullable
    private LocalTime open_at;
    @Nullable
    private LocalTime close_at;
    @Nullable
    private byte days_open;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.REMOVE)
    private List<RestaurantItem>restaurantItems = new ArrayList<>();
}
