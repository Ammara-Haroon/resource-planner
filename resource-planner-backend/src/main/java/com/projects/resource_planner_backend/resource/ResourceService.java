package com.projects.resource_planner_backend.resource;

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

import com.projects.resource_planner_backend.job.JobService;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@Service
@Transactional
public class ResourceService {

  @Autowired
  private ResourceRepository repo;

  @Autowired
  private ModelMapper mapper;

  @Autowired
  private JobService jobService;
  
  public List<Resource> findAllResources() {
    return this.repo.findAll();
  }

  public Resource createResource(@Valid CreateResourceDTO data) {
    Resource newResource = mapper.map(data,Resource.class);
    return this.repo.save(newResource);
  }

  public List<Resource> findAvailableResourcesBetweenDates(String startDate, String endDate) {

    DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date date = dateFormat.parse("2024-03-03");
            System.out.println("Parsed date: " + date);
            return this.repo.findAvailableResourcesBetweenDates(dateFormat.parse(startDate), dateFormat.parse(endDate));

        } catch (ParseException e) {
            e.printStackTrace();
        }
        return new ArrayList<>();
  }

  
}
