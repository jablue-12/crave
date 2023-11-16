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
    private Long order_id;
    private String name;
    private float price;
}
