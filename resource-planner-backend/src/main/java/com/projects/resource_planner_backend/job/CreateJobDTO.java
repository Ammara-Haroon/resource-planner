package com.projects.resource_planner_backend.job;

import java.util.Date;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

public class CreateJobDTO {

  @NotBlank
  private String name;
  
  private Date startDate;
  
  
  @Override
  public String toString() {
    return "CreateJobDTO [name=" + name + ", startDate=" + startDate + ", endDate=" + endDate + ", resource=" + resource
        + "]";
  }

  private Date endDate;
  
  private Long resource;

  
  public Long getResource() {
    return resource;
  }

  public String getName() {
    return name;
  }

  public Date getStartDate() {
    return startDate;
  }

  public Date getEndDate() {
    return endDate;
  }

  
  
}
