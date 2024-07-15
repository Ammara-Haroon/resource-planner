package com.projects.resource_planner_backend.resource;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.projects.resource_planner_backend.job.JobService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/resources")
public class ResourceController {

  @Autowired 
  private ResourceService resourceService;

  @GetMapping()
  public ResponseEntity<List<Resource>> findAllResources() {
    List<Resource> resources = this.resourceService.findAllResources();
    return new ResponseEntity<>(resources,HttpStatus.OK);
  }

  
  @GetMapping("/options")
  public ResponseEntity<List<Resource>> findAvailableResourcesBetweenDates(@RequestParam String startDate,@RequestParam String endDate) {
    List<Resource> resources = this.resourceService.findAvailableResourcesBetweenDates(startDate,endDate);
    return new ResponseEntity<>(resources,HttpStatus.OK);
  }

  @PostMapping()
  public ResponseEntity<Resource> createResource(@Valid @RequestBody CreateResourceDTO data) {
      Resource newResource = this.resourceService.createResource(data);
      return new ResponseEntity<>(newResource,HttpStatus.OK);
  }
  
}
