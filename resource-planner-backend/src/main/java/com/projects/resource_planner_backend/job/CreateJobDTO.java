package com.projects.resource_planner_backend.job;

import java.util.Date;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

public class CreateJobDTO {

  @NotBlank
  private String name;
  
  private Date startDate;
  
  
  private Date endDate;
  
  private Long resourceId;

  
  public Long getResourceId() {
    return resourceId;
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
