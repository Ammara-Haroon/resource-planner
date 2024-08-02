package com.projects.resource_planner_backend.job;

import java.util.Date;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;

public class UpdateJobDTO {

  @Pattern(regexp = ".*[a-zA-Z].*")
  private String name;
  private Date startDate;
  private Date endDate;
  private Long resource;
    
  @Override
  public String toString() {
    return "UpdateJobDTO [name=" + name + ", startDate=" + startDate + ", endDate=" + endDate + ", resource="
        + resource + "]";
  }

  
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
