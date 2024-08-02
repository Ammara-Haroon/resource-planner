package com.projects.resource_planner_backend.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.projects.resource_planner_backend.job.CreateJobDTO;
import com.projects.resource_planner_backend.job.Job;
import com.projects.resource_planner_backend.job.UpdateJobDTO;
import com.projects.resource_planner_backend.resource.Resource;

@Configuration
public class ModelMapperConfig {
  @Bean
  public ModelMapper modelMapper() {
    ModelMapper mapper = new ModelMapper();
    mapper.getConfiguration().setSkipNullEnabled(true);
    mapper.typeMap(CreateJobDTO.class, Job.class);
    mapper.typeMap(UpdateJobDTO.class, Job.class);
    
    return mapper;
  }

}
