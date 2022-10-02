package com.conceiversolutions.hrsystem.organizationstructure.outlet;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/outlet")
@AllArgsConstructor
public class OutletController {
    private final OutletService outletService;

    // get all outlets
    @GetMapping(path = "/getAllOutlets")
    public List<Outlet> getOutlets() {
        return outletService.getAllOutlets();
    }

    // get outlet by name
    @GetMapping(path = "/getOutletByName")
    public Outlet getOutletByName(@RequestParam("outletName") String outletName) {
        return outletService.getOutletByName(outletName);
    }

    // get outlet by id
    @GetMapping(path = "/getOutletById")
    public Outlet getOutletByName(@RequestParam("outletId") Long outletId) {
        return outletService.getOutletById(outletId);
    }

    // add outlet
    @PostMapping(path = "/addOutlet")
    public Long addOutlet(@RequestParam("outletName") String outletName,
                          @RequestParam("contactNo") String contactNo,
                          @RequestParam("openingHour") Integer opening,
                          @RequestParam("closingHour") Integer closing,
                          @RequestParam("addressId") Long addressId) {
        return outletService.addOutlet(outletName, contactNo, opening, closing, addressId);
    }

    // update outlet
    @PutMapping(path = "/updateOutlet")
    public String updateOutlet(@RequestParam("outletId") Long outletId,
                               @RequestParam("outletName") String outletName,
                               @RequestParam("contactNo") String contactNo,
                               @RequestParam("openingHour") Integer opening,
                               @RequestParam("closingHour") Integer closing,
                               @RequestParam("addressId") Long addressId) {
        return outletService.updateOutlet(outletId, outletName, contactNo, opening, closing, addressId);
    }

    @PutMapping(path = "/changeOutletStatus")
    public String changeShopStatus(@RequestParam("outletId") Long outletId) {
        return outletService.changeOutletStatus(outletId);
    }
}
