package com.projects.resource_planner_backend.job;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.projects.resource_planner_backend.resource.Resource;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@Service
@Transactional
public class JobService {

  @Autowired
  private JobRepository repo;

  @Autowired
  private ModelMapper mapper;

  public List<Job> findAllJobs() {
    return this.repo.findAll();
  }

  public Job createJob(@Valid CreateJobDTO data) {
    Job newJob = mapper.map(data,Job.class);
    return this.repo.save(newJob);
  }

  
}
