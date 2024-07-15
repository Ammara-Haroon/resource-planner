package com.projects.resource_planner_backend.job;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.projects.resource_planner_backend.resource.Resource;

public interface JobRepository extends JpaRepository<Job,Long>{

  
}
