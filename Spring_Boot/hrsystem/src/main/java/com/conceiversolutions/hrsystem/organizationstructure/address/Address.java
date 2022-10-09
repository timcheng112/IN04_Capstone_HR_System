package com.conceiversolutions.hrsystem.organizationstructure.address;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "addresses")
@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id", nullable = false)
    private Long addressId;
    @Column(name = "address_name", nullable = false)
    private String addressName;
    @Column(name = "line_1", nullable = false)
    private String line1;
    @Column(name = "line_2", nullable = false)
    private String line2;
    @Column(name = "postal_code", nullable = false)
    private String postalCode;
    @Column(name = "city", nullable = false)
    private String city;
    @Column(name = "country", nullable = false)
    private String country;

    public Address(String addressName, String line1, String line2, String postalCode, String city, String country) {
        this.addressName = addressName;
        this.line1 = line1;
        this.line2 = line2;
        this.postalCode = postalCode;
        this.city = city;
        this.country = country;
    }
}
