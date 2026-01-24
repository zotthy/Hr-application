package com.example.demo.Dtos.FiledbDtos;

public class FileResponse {
    private Long id;
    private String name;
    private String type;
    private long size;
    private String downloadUri;

    public FileResponse(Long id, String name, String type, long size, String downloadUri) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.size = size;
        this.downloadUri = downloadUri;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
    public long getSize() {
        return size;
    }
    public void setSize(long size) {
        this.size = size;
    }
    public String getDownloadUri() {
        return downloadUri;
    }
    public void setDownloadUri(String downloadUri) {
        this.downloadUri = downloadUri;
    }
    
}

