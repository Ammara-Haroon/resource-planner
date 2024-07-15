package com.projects.resource_planner_backend.resource;

import java.sql.Date;
import java.util.List;

import com.projects.resource_planner_backend.job.Job;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity()
@Table(name="resource")
public class Resource {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  @Column(nullable = false)
  private String firstName;
  
  @Column(nullable = false)
  private String lastName;

  @Column(nullable=true)
  private String imageUrl;

  public String getImageUrl() {
    return imageUrl;
  }


  public void setImageUrl(String imgUrl) {
    this.imageUrl = imgUrl;
  }


  public List<Job> getJobs() {
    return jobs;
  }


  public void setJobs(List<Job> jobs) {
    this.jobs = jobs;
  }

  @OneToMany(mappedBy = "resource")
  List<Job> jobs;

  public Long getId() {
    return id;
  }


  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }
  
  
}
