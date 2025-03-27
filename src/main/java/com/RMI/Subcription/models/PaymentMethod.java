package com.RMI.Subcription.models;


import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.Embedded;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Table("payment_methods")
public class PaymentMethod {
    @Column("user_id")
    private UUID userId;

    @PrimaryKey
    @Id
    @Column("payment_method_id")
    private UUID paymentMethodId;
    @Column("method_type")
    private String methodType; //card,mobile,paypal

    //card
    @Embedded.Nullable
    @Column("card_number")
    private String cardNumber;

    @Embedded.Nullable
    @Column("expiration_date")
    private String expirationDate;

    @Embedded.Nullable
    private String cvc; 

    //mobile
    @Embedded.Nullable
    private String provider;

    @Embedded.Nullable
    @Column("phone_number")
    private String phoneNumber;
    
    //paypal
    @Embedded.Nullable
    @Column("paypal_email")
    private String paypalEmail;
}
