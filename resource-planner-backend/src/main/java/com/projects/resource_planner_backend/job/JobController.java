package com.projects.resource_planner_backend.job;

import java.util.List;
import java.util.Optional;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException.NotFound;

import com.projects.resource_planner_backend.exceptions.NotFoundException;
import com.projects.resource_planner_backend.exceptions.ServiceValidationException;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
      return new ResponseEntity<>(newJob,HttpStatus.CREATED);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Job> updateJob(@PathVariable Long id, @Valid @RequestBody UpdateJobDTO data) throws NotFoundException, BadRequestException {
    try {
      Optional<Job> mayBeJob = this.jobService.updateJob(id,data);
      if(mayBeJob.isEmpty()){
        throw new NotFoundException(Job.class, id);
      }
      Job updatedJob = mayBeJob.get();
      return new ResponseEntity<>(updatedJob,HttpStatus.OK);
    } catch (ServiceValidationException e) {
      throw new BadRequestException(e.getMessage());
    }
      
  }
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteJob(@PathVariable Long id){
    this.jobService.deleteJob(id);
    return new ResponseEntity<>(HttpStatus.OK);
  } 
}
