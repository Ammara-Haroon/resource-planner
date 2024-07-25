package com.projects.resource_planner_backend.resource;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.projects.resource_planner_backend.exceptions.NotFoundException;
import com.projects.resource_planner_backend.exceptions.ServiceValidationException;
import com.projects.resource_planner_backend.job.CreateJobDTO;
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

  class dto{
    String txt;
    @Override
    public String toString() {
      // TODO Auto-generated method stub
      return txt;
    }
  }
  @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)//consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<Resource> createResource(@RequestPart String firstName,@RequestParam String lastName, @RequestPart MultipartFile imageFile) 
  {
    System.out.println(firstName);
    System.out.println(lastName);
    System.out.println(imageFile.getOriginalFilename());
    
    System.out.println(imageFile.isEmpty());
    
    Resource newResource = this.resourceService.createResource(firstName,lastName,imageFile);
    return new ResponseEntity<>(newResource,HttpStatus.CREATED);
    //  return new ResponseEntity<>(null,HttpStatus.OK);
  }
  
  @PatchMapping(path = "/{id}",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)//consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<Resource> createResource(@PathVariable Long id, @RequestPart String firstName,@RequestParam String lastName, @RequestPart(required = false) MultipartFile imageFile) throws NotFoundException
  {
      System.out.println(imageFile);
      Optional<Resource> mayBeResource = this.resourceService.updateResource(id,firstName,lastName,imageFile);
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
