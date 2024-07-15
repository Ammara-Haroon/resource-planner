package com.projects.resource_planner_backend.job;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/jobs")
public class JobController {

  @Autowired 
  private JobService jobService;

  @GetMapping()
  public ResponseEntity<List<Job>> findAllJobs() {
    List<Job> jobs = this.jobService.findAllJobs();
    return new ResponseEntity<>(jobs,HttpStatus.OK);
  }

  @PostMapping()
  public ResponseEntity<Job> createJob(@Valid @RequestBody CreateJobDTO data) {
      Job newJob = this.jobService.createJob(data);
      return new ResponseEntity<>(newJob,HttpStatus.OK);
  }
  
}
