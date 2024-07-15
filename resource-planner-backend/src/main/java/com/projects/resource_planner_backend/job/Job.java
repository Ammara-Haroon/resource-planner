package com.projects.resource_planner_backend.job;

import com.projects.resource_planner_backend.resource.Resource;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.util.Date;
@Entity()
@Table(name="job")
public class Job {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  @Column(nullable = false)
  private String name;
  
  @Column(nullable = false)
  @Temporal(TemporalType.DATE)
  private Date startDate;
  
  @Column(nullable = false)
  @Temporal(TemporalType.DATE)
  private Date endDate;
  
  @Override
  public String toString() {
    return "Job [id=" + id + ", name=" + name + ", startDate=" + startDate + ", endDate=" + endDate + ", resource="
        + resource + "]";
  }

  @ManyToOne(optional = true)
  @JoinColumn(name="resource_id",nullable = true)
  private Resource resource; 

  public Resource getResource() {
    return resource;
  }

  public void setResource(Resource resource) {
    this.resource = resource;
  }

  public String getName() {
    return name;
  }

  public Long getId() {
    return id;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Date getStartDate() {
    return startDate;
  }

  public void setStartDate(Date startDate) {
    this.startDate = startDate;
  }

  public Date getEndDate() {
    return endDate;
  }

  public void setEndDate(Date endDate) {
    this.endDate = endDate;
  }

}
