package com.crave.backend.model;

import com.crave.backend.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
    private Long user_id;
    private Long restaurant_id;
    @Enumerated(EnumType.STRING)
    private OrderStatus status;
}
