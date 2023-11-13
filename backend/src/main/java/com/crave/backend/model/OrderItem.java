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
public class OrderItem {
    @Id
    @SequenceGenerator(
            name = "orderItem_sequence",
            sequenceName = "orderItem_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "orderItem_sequence"
    )
    private Long id;
    @NonNull
    private Long order_id;
    @NonNull
    private String name;
    @NonNull
    private float price;

    @ManyToOne
    private UserOrder order;

}
