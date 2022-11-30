package com.conceiversolutions.hrsystem.user.docdata;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin(value = "*", exposedHeaders = { "Content-Disposition" })
@RestController
@RequestMapping(path = "api/docData")
@AllArgsConstructor
public class DocDataContoller {
    private final DocDataService docDataService;

    @PostMapping(path = "/uploadDocument")
    public ResponseEntity<?> uploadDocument(@RequestParam("document") MultipartFile file) throws IOException {
        DocData s = docDataService.uploadDoc(file);
        if (s != null) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(s);

        } else {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("unable to upload document");
        }

    }

    @GetMapping(path = "/getDocById")
    public ResponseEntity<?> downloadDocById(@RequestParam("id") Long id) {
        byte[] d = docDataService.downloadDocById(id);
        DocData doc = docDataService.getDocData(id);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf(doc.getType()))
                .body(d);
    }

    @DeleteMapping(path = "{docId}")
    public boolean deleteDocument(@PathVariable("docId") Long id) {
        return docDataService.deleteDocument(id);
    }

    @GetMapping(path = "/getDocByteArray")
    public byte[] downloadDocByteArray(@RequestParam("id") Long id) {
        return docDataService.getDocByteArray(id);
    }

    @GetMapping(path = "/downloadDocument")
    public ResponseEntity<byte[]> downloadDocument(@RequestParam("id") Long id) {
        System.out.println("DocDataContoller.downloadDocument");
        DocData doc = docDataService.getDocData(id);

        System.out.println(doc);
        HttpHeaders header = new HttpHeaders();
        header.setContentType(MediaType.valueOf(doc.getType()));
        header.setContentLength(doc.getDocData().length);
        header.set("Content-Disposition", "attachment; filename=" + doc.getName());

        // return new ResponseEntity<>(doc.getDocData(), header, HttpStatus.OK);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf(doc.getType()))
                .headers(header)
                .body(doc.getDocData());
    }

}
