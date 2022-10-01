package com.conceiversolutions.hrsystem.user.docdata;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

//import javax.swing.text.html.Option;
import java.io.IOException;
import java.util.Optional;

@Service
@AllArgsConstructor
public class DocDataService {
    private final DocDataRepository docDataRepository;

    public DocData uploadDoc(MultipartFile file) throws IOException {
        DocData d = new DocData(file.getOriginalFilename(), file.getContentType(),
                DocDataUtil.compressDoc(file.getBytes()));

        DocData doc = docDataRepository.save(d);
        return doc;
//        if (doc != null) {
//            return "Document uploaded successfully " + file.getOriginalFilename();
//        }
//        return "Document did not upload successfully";
    }

    public byte[] downloadDocById(Long id) {
        Optional<DocData> d = docDataRepository.findById(id);
        if (d.isEmpty()) {
            throw new IllegalStateException("Document does not exist");
        }
        DocData doc = d.get();

        return DocDataUtil.decompressDoc(doc.getDocData());
    }

    public DocData getDocData(Long id) {
        Optional<DocData> d = docDataRepository.findById(id);
        if (d.isEmpty()) {
            throw new IllegalStateException("Document does not exist");
        }
        return d.get();
    }

    public boolean deleteDocument(Long id) {
        DocData doc = getDocData(id);
        docDataRepository.deleteById(id);
        return true;
    }
}
