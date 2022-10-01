package com.conceiversolutions.hrsystem.user.docdata;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "doc_datas")
@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class DocData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "doc_id")
    private Long docId;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String type;
    @Lob
    @Column(name = "doc_data", length = 500)
    private byte[] docData;

    public DocData(String name, String type, byte[] docData) {
        this.name = name;
        this.type = type;
        this.docData = docData;
    }
}
