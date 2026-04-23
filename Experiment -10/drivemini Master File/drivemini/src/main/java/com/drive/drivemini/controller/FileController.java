package com.drive.drivemini.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.File;
import java.util.*;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import java.nio.file.*;

@CrossOrigin(origins = "*")
@RestController
public class FileController {

    private final String UPLOAD_DIR = "uploads/";

    @PostMapping("/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            Path path = Paths.get(UPLOAD_DIR + file.getOriginalFilename());
            Files.write(path, file.getBytes());
            return "File uploaded successfully!";
        } catch (Exception e) {
            return "Error uploading file";
        }
    }

    @GetMapping("/files")
    public List<String> getFiles() {
        File folder = new File("uploads/");
        String[] files = folder.list();
        return files != null ? Arrays.asList(files) : new ArrayList<>();
    }

    @GetMapping("/download/{filename}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String filename) {
        try {
            Path path = Paths.get("uploads/").resolve(filename);
            Resource resource = new UrlResource(path.toUri());

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                    .body(resource);

        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{filename}")
    public String deleteFile(@PathVariable String filename) {
        try {
            Path path = Paths.get("uploads/").resolve(filename);
            Files.delete(path);
            return "File deleted!";
        } catch (Exception e) {
            return "Error deleting file";
        }
    }
}