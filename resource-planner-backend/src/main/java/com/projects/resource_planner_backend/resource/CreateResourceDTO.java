package com.projects.resource_planner_backend.resource;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;

public class CreateResourceDTO {

  @NotBlank
  private String firstName;
  
  @NotBlank
  private String lastName;

  private MultipartFile imageFile;
  
  // private String imageUrl;

  
  // public String getImageUrl() {
  //   return imageUrl;
  // }

  public String getFirstName() {
    return firstName;
  }

  @Override
  public String toString() {
    String fName = "None";
    // if(imageFile == null){
    //   fName = "None";
    // } else {
    //   fName = imageFile.getOriginalFilename();
    // }
    return "CreateResourceDTO [firstName=" + firstName + ", lastName=" + lastName + ", imageFile=" +  fName + "]";
  }

  public String getLastName() {
    return lastName;
  }
}