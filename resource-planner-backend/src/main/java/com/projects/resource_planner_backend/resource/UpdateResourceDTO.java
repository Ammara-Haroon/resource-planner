package com.projects.resource_planner_backend.resource;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;

public class UpdateResourceDTO {

  private String firstName;
  
  private String lastName;

  private MultipartFile imageFile;
  
  // private String imageUrl;

  
  // public String getImageUrl() {
  //   return imageUrl;
  // }

  public String getFirstName() {
    return firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public MultipartFile getImageFile() {
    return imageFile;
  }
}
