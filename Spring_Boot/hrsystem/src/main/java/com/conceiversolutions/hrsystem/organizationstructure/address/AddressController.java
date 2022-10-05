package com.conceiversolutions.hrsystem.organizationstructure.address;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping(path = "api/address")
@AllArgsConstructor
public class AddressController {
    private final AddressService addressService;

    // get all addresses
    @GetMapping(path = "/getAllAddresses")
    public List<Address> getAllAddresses() {
        return addressService.getAllAddresses();
    }

    // get address by name
    @GetMapping(path = "/getAddressByName")
    public Address getAddressByName(@RequestParam("addressName") String addressName) {
        return addressService.getAddressByName(addressName);
    }

    // get address by id
    @GetMapping(path = "/getAddressById")
    public Address getAddressByName(@RequestParam("addressId") Long addressId) {
        return addressService.getAddressById(addressId);
    }

    // add address
    @PostMapping(path = "/addAddress")
    public Long addAddress(@RequestParam("addressName") String addressName,
                           @RequestParam("line1") String line1,
                           @RequestParam("line2") String line2,
                           @RequestParam("postalCode") String postalCode,
                           @RequestParam("city") String city,
                           @RequestParam("country") String country) {
        return addressService.addAddress(addressName, line1, line2, postalCode, city, country);
    }

    // update address
    @PutMapping(path = "/updateAddress")
    public String updateAddress(@RequestParam("addressId") Long addressId,
                                @RequestParam("addressName") String addressName,
                                @RequestParam("line1") String line1,
                                @RequestParam("line2") String line2,
                                @RequestParam("postalCode") String postalCode,
                                @RequestParam("city") String city,
                                @RequestParam("country") String country) {
        return addressService.updateAddress(addressId, addressName, line1, line2, postalCode, city, country);
    }

    // delete address
    @DeleteMapping(path = "{addressId}")
    public Boolean deleteAddress(@PathVariable("addressId") Long id) {
        return addressService.deleteAddress(id);
    }

}
