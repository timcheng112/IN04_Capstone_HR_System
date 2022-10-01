package com.conceiversolutions.hrsystem.organizationstructure.outlet;

import com.conceiversolutions.hrsystem.organizationstructure.address.Address;
import com.conceiversolutions.hrsystem.organizationstructure.address.AddressService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class OutletService {
    private final OutletRepository outletRepository;
    private final AddressService addressService;

    public List<Outlet> getAllOutlets() {
        return outletRepository.findAll();
    }

    public Outlet getOutletByName(String outletName) {
        Optional<Outlet> o = outletRepository.findOutletByName(outletName);

        if (o.isEmpty()) {
            throw new IllegalStateException("Outlet does not exist, please try again");
        }
        return o.get();
    }

    public Outlet getOutletById(Long outletId) {
        Optional<Outlet> o = outletRepository.findById(outletId);

        if (o.isEmpty()) {
            throw new IllegalStateException("Outlet does not exist, please try again");
        }
        return o.get();
    }

    public Long addOutlet(String outletName, String contactNo, Integer opening, Integer closing, Long addressId) {
        System.out.println("OutletService.addOutlet");
        if (closing < opening) {
            throw new IllegalStateException("Closing time cannot be before opening time");
        }

        Address a = addressService.getAddressById(addressId);

        Outlet o = new Outlet(outletName, contactNo, opening, closing, a);

        Outlet savedOutlet = outletRepository.saveAndFlush(o);
        return savedOutlet.getOutletId();
    }

    public String updateOutlet(Long outletId, String outletName, String contactNo, Integer opening, Integer closing, Long addressId) {
        Outlet o = getOutletById(outletId);

        if (o.getClosingHour() < o.getOpeningHour()) {
            throw new IllegalStateException("Closing time cannot be before opening time");
        }

        Address address = addressService.getAddressById(addressId);

        o.setAddress(address);
        o.setClosingHour(opening);
        o.setOpeningHour(closing);
        o.setOutletName(outletName);
        o.setContactNo(contactNo);

        outletRepository.save(o);

        return "Outlet " + o.getOutletName() + " has been updated.";
    }

    public String changeOutletStatus(Long outletId) {
        Outlet o = getOutletById(outletId);

        o.setIsClosed(!o.getIsClosed());

        Outlet outlet = outletRepository.saveAndFlush(o);

        return "Outlet " + outlet.getOutletName() + " is closed for business is " + outlet.getIsClosed();
    }
}
