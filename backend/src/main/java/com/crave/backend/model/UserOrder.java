package com.crave.backend.model;
import java.util.List;
import java.time.LocalDateTime;

import com.crave.backend.enums.OrderStatus;

import io.micrometer.common.lang.Nullable;
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
public class UserOrder {
    @Id
    @SequenceGenerator(
            name = "order_sequence",
            sequenceName = "order_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "order_sequence"
    )
    private Long id;
    @NonNull
    private Long accountId;
    @NonNull
    private Long restaurantId;
    
    @NonNull
    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @Nullable
    private String description;

    @Nullable
    private LocalDateTime placed_at;
}
