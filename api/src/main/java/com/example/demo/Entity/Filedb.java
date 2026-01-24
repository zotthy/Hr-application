package com.example.demo.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "filedb")
public class Filedb {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;

    private String type;

    @Lob
    private byte[] data;

    public Filedb() {
    }

    public Filedb(String name, String type, byte[] data) {
        this.name = name;
        this.type = type;
        this.data = data;
    }


    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public byte[] getData() {
        return this.data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }


}
