package com.conceiversolutions.hrsystem.user.docdata;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/docData")
@AllArgsConstructor
public class DocDataContoller {
    private final DocDataService docDataService;

    @PostMapping(path = "/uploadDocument")
    public ResponseEntity<?> uploadDocument(@RequestParam("document") MultipartFile file) throws IOException {
        String s = docDataService.uploadDoc(file);

        return ResponseEntity.status(HttpStatus.OK)
                .body(s);
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

}