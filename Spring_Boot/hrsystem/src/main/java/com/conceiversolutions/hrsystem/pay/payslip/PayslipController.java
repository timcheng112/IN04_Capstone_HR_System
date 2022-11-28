package com.conceiversolutions.hrsystem.pay.payslip;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(path = "api/pay/payslip")
public class PayslipController {
    private final PayslipService payslipService;

    @Autowired
    public PayslipController(PayslipService payslipService) {
        this.payslipService = payslipService;
    }

    // @GetMapping
    // public List<Payslip> getPayslips() {
    // return List.of(
    // new Payslip(
    // new Integer(5), new Integer(22), LocalDate.of(2022,5,13),
    // new BigDecimal(50),LocalDate.of(2022,8,30)
    // ));
    // }

    @GetMapping
    public List<Payslip> getPayslips() {
        return payslipService.getPayslips();
    }

    @GetMapping(path = "{payslipId}")
    public Payslip getPayslip(@PathVariable("payslipId") Long payslipId) {
        return payslipService.getPayslip(payslipId);
    }

    // taking client request and map it into our payslip
    @PostMapping
    public void addNewPayslip(@RequestBody Payslip payslip) {
        payslipService.addNewPayslip(payslip);
    }

    @PutMapping(path = "{payslipId}")
    public void updatePayslip(@RequestBody Payslip payslip, @PathVariable("payslipId") Long payslipId) {
        payslipService.updatePayslip(payslip, payslipId);
    }

    @DeleteMapping(path = "{payslipId}")
    public void deletePayslip(@PathVariable("payslipId") Long id) {
        payslipService.deletePayslip(id);
    }

    @DeleteMapping
    public void deleteAllPayslips() {
        payslipService.deleteAllPayslips();
    }

    // @PostMapping ( path = "/upload" )
    // public String uploadFile( @Request Param ( "file" ) MultipartFile file )
    // throws IOException {
    // String constr = "AccountName = cs110032000c8313ac5";
    // Account Key =
    // "z0s5n2BErUnfaNLNk8iqCpkr5h3kI2+Er5KNfOHfn33sQDqvP9rtrqUlKKJhCTIKYCQ0LCi8aCCJ+AStI0wRDQ==";
    // EndpointSuffix-core.windows.net ;
    // DefaultEndpointsProtocol = https ; " ;
    // https://cs110032000c8313ac5.blob.core.windows.net/fileupload
    // }
    // BlobContainerClient container = new BlobContainerClientBuilder ( )
    // .connectionString (constr)
    // .containerName("test-container" )
    // .buildClient () ;
    // BlobClient blob = container.getBlobClient (file.getoriginalFilename() ) ;
    // blob.upload( file.getInputStream() , file.getSize() , true ) ;
    // return "OK" ;
    // }

    // @Value ("azure-blob://test-container/test.json")
    // private Resource blobFile ;
    // @GetMapping ( " /readBlobFile " )
    // public String readBlobFile() throws IOException {
    // return StreamUtils.copyToString (
    // this.blobFile.getInputStream () ,
    // Charset.defaultCharset ());}

    // @Value ( "azure- blob://test-container/test.json " )
    // private Resource blobFile ;
    // @PostMapping ( "/writeBlobFile" )
    // public String writeBlobFile ( @RequestBody String data ) throws IOException {
    //
    // try ( OutputStream os = ( (WritableResource) this.blobFile).getOutputStream
    // ()){
    // os.write(data.getBytes ( ) ) ;
    // }
    // return " file was updated " ;

    // @GetMapping(path = "/getPayslipsByMonth")
    // public List<Payslip> getPayslipsByMonth(Integer monthIndex) {
    //     return payslipService.getPayslipsByMonth(monthIndex);
    // }

    @GetMapping(path = "/findUserPayslipByMonth")
    public Payslip findUserPayslipByMonth(@RequestParam("userId") Long userId, @RequestParam("dateString") String date){
        LocalDate localDate = LocalDate.parse(date);
        System.out.println("date for findUserPayslipByMonth: " + localDate);
        return payslipService.findUserPayslipByMonth(userId, localDate);
    }

    @GetMapping(path = "/findPayslipByMonth")
    public List<Payslip> findPayslipByMonth(@RequestParam("dateString") String date){
        LocalDate localDate = LocalDate.parse(date);
        System.out.println("date for findPayslipByMonth: " + localDate);
        return payslipService.findPayslipByMonth(localDate);
    }
}
