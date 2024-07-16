package com.projects.resource_planner_backend.resource;

import java.util.Date;
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

import com.projects.resource_planner_backend.exceptions.NotFoundException;
import com.projects.resource_planner_backend.exceptions.ServiceValidationException;
import com.projects.resource_planner_backend.job.JobService;
import com.projects.resource_planner_backend.job.UpdateJobDTO;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
  
  @PutMapping("/{id}")
  public ResponseEntity<Resource> updateResource(@PathVariable Long id, @Valid @RequestBody UpdateResourceDTO data) throws NotFoundException {
      Optional<Resource> mayBeResource = this.resourceService.updateResource(id,data);
      if(mayBeResource.isEmpty()){
        throw new NotFoundException(Resource.class, id);
      }
      Resource updatedResource = mayBeResource.get();
      return new ResponseEntity<>(updatedResource,HttpStatus.OK);
  }
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteJob(@PathVariable Long id) throws NotFoundException{
    boolean done = this.resourceService.deleteResource(id);
    if(!done) throw new NotFoundException(Resource.class,id);
    
    return new ResponseEntity<>(HttpStatus.OK);
  }
}
