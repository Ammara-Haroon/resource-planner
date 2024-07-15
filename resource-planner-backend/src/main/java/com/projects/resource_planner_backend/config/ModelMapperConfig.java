package com.projects.resource_planner_backend.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.projects.resource_planner_backend.job.CreateJobDTO;
import com.projects.resource_planner_backend.job.Job;
import com.projects.resource_planner_backend.resource.CreateResourceDTO;
import com.projects.resource_planner_backend.resource.Resource;

@Configuration
public class ModelMapperConfig {
  @Bean
  public ModelMapper modelMapper() {
    ModelMapper mapper = new ModelMapper();
    mapper.typeMap(CreateJobDTO.class, Job.class);
    mapper.typeMap(CreateResourceDTO.class, Resource.class);

    return mapper;
  }

}
