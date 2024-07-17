package com.projects.resource_planner_backend.job;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.swing.text.html.Option;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.projects.resource_planner_backend.exceptions.ServiceValidationException;
import com.projects.resource_planner_backend.exceptions.ValidationErrors;
import com.projects.resource_planner_backend.resource.Resource;
import com.projects.resource_planner_backend.resource.ResourceService;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@Service
@Transactional
public class JobService {

  @Autowired
  private JobRepository repo;

  @Autowired
  private ModelMapper mapper;

  @Autowired
  ResourceService resourceService;

  public List<Job> findAllJobs() {
    return this.repo.findAll();
  }

  public Job createJob(@Valid CreateJobDTO data) throws ServiceValidationException {
    Long resId = data.getResource();
    Optional<Resource> mayBeResource = this.resourceService.findResourceById(resId);
    if(mayBeResource.isEmpty()){
      ValidationErrors errors = new ValidationErrors();
      errors.addError("resourceId", "resourceId does not match any existing resource");
        throw new ServiceValidationException(errors);
      }
    
    Job newJob = mapper.map(data,Job.class);
    newJob.setResource(mayBeResource.get());
    return this.repo.save(newJob);
  }

  public void deleteJob(Long id) {
    this.repo.deleteById(id);
  }

  public Optional<Job> updateJob(Long id,UpdateJobDTO data) throws ServiceValidationException {
    
    Optional<Job> mayBeJob = this.repo.findById(id);
    if(mayBeJob.isEmpty()) {
      return Optional.empty();
    }
    Job foundJob = mayBeJob.get();
    Long resId = data.getResource();
    if(resId != null){
      Optional<Resource> mayBeResource = this.resourceService.findResourceById(resId);
      if(mayBeResource.isEmpty()){
        ValidationErrors errors = new ValidationErrors();
        errors.addError("resourceId", "resourceId does not match any existing resource");
        throw new ServiceValidationException(errors);
      }
    mapper.map(data,foundJob);
    foundJob.setResource(mayBeResource.get());
    }else {
    mapper.map(data,foundJob);
    foundJob.setResource(null);
    }
    Job updatedJob = this.repo.save(foundJob);
    return Optional.of(updatedJob);
  }

}
