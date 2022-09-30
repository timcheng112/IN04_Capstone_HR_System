package com.conceiversolutions.hrsystem.organizationstructure.outlet;

import com.conceiversolutions.hrsystem.organizationstructure.address.Address;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "outlets")
@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class Outlet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "outlet_id", nullable = false)
    private Long outletId;
    @Column(name = "outlet_name", nullable = false, length = 64)
    private String outletName;
    @Column(name = "contact_no", nullable = true, length = 16)
    private String contactNo;
    @Column(name = "opening_hour", nullable = false)
    private Integer openingHour;
    @Column(name = "closing_hour", nullable = false)
    private Integer closingHour;
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "address_id")
    private Address address;
    @Column(name = "is_closed", nullable = false)
    private Boolean isClosed;

    public Outlet(String outletName, String contactNo, Integer openingHour, Integer closingHour, Address address) {
        this.outletName = outletName;
        this.contactNo = contactNo;
        this.openingHour = openingHour;
        this.closingHour = closingHour;
        this.address = address;
        this.isClosed = false;
    }
}
