package com.conceiversolutions.hrsystem.organizationstructure.address;

import com.conceiversolutions.hrsystem.organizationstructure.outlet.Outlet;
import com.conceiversolutions.hrsystem.organizationstructure.outlet.OutletRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AddressService {
    private final AddressRepository addressRepository;
    private final OutletRepository outletRepository;

    public List<Address> getAllAddresses() {
        return addressRepository.findAll();
    }

    public Address getAddressByName(String addressName) {
        Optional<Address> a = addressRepository.findAddressByAddressName(addressName);

        if (a.isEmpty()) {
            throw new IllegalStateException("Address does not exist, please try again");
        }
        return a.get();
    }

    public Address getAddressById(Long addressId) {
        Optional<Address> a = addressRepository.findById(addressId);

        if (a.isEmpty()) {
            throw new IllegalStateException("Address does not exist, please try again");
        }
        return a.get();
    }

    public Long addAddress(String addressName, String line1, String line2, String postalCode, String city, String country) {
        Address a = new Address(addressName, line1, line2, postalCode, city, country);

        Address address = addressRepository.saveAndFlush(a);
        return address.getAddressId();
    }

    public String updateAddress(Long addressId, String addressName, String line1, String line2, String postalCode, String city, String country) {
        Address a = getAddressById(addressId);

        a.setAddressName(addressName);
        a.setCity(city);
        a.setCountry(country);
        a.setLine1(line1);
        a.setLine2(line2);
        a.setPostalCode(postalCode);
        a.setCountry(country);

        addressRepository.save(a);

        return "Address " + addressName + " has been updated.";
    }

    public Boolean deleteAddress(Long id) {
        Address a = getAddressById(id);

        List<Outlet> outlets = outletRepository.findAll();

        for (Outlet o : outlets) {
            if (o.getAddress().equals(a)) {
                throw new IllegalStateException("Address is still linked to something, cannot be deleted");
            }
        }

        // TODO: Check if any user has this address too

        addressRepository.deleteById(id);
        return true;
    }
}
