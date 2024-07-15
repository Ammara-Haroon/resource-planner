package com.projects.resource_planner_backend.resource;

import jakarta.validation.constraints.NotBlank;

public class CreateResourceDTO {

  @NotBlank
  private String firstName;
  
  @NotBlank
  private String lastName;

  
  private String imageUrl;

  
  public String getImageUrl() {
    return imageUrl;
  }

  public String getFirstName() {
    return firstName;
  }

  public String getLastName() {
    return lastName;
  }
}
