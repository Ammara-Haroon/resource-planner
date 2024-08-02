package com.projects.resource_planner_backend.resource;

import java.rmi.ServerException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.projects.resource_planner_backend.exceptions.NotFoundException;
import com.projects.resource_planner_backend.exceptions.ServiceValidationException;

import jakarta.validation.Valid;
import jakarta.validation.ValidationException;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import org.springframework.web.bind.annotation.PostMapping;


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

  @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<Resource> createResource(@Valid @NotBlank @Pattern(regexp = "[A-Z a-z]*[A-Za-z][A-Z a-z]*") @RequestPart String firstName,@Valid @NotBlank  @Pattern(regexp = "[A-Z a-z]*[A-Za-z][A-Z a-z]*") @RequestPart String lastName, @RequestPart(required=false) MultipartFile imageFile) throws ServerException 
  {
    if(firstName == null) throw new ValidationException("First name is missing");
    if(lastName == null) throw new ValidationException("Last name is missing");
    
    firstName = firstName.strip();
    lastName = lastName.strip();
    
    Resource newResource;
    try {
      newResource = this.resourceService.createResource(firstName,lastName,imageFile);
    } catch (ServiceValidationException e) {
      throw new ServerException(e.generateMessage());
    }
    return new ResponseEntity<>(newResource,HttpStatus.CREATED);
  }
  
  @PatchMapping(path = "/{id}",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<Resource> createResource(@PathVariable Long id, @Valid @NotBlank @Pattern(regexp = "[A-Z a-z]*[A-Za-z][A-Z a-z]*") @RequestPart String firstName,@Valid @NotBlank @Pattern(regexp = "[A-Z a-z]*[A-Za-z][A-Z a-z]*") @RequestPart String lastName, @RequestPart(required = false) MultipartFile imageFile) throws NotFoundException, ServerException
  {
    if(firstName == null) throw new ValidationException("First name is missing");
    if(lastName == null) throw new ValidationException("Last name is missing");
    
    firstName = firstName.strip();
    lastName = lastName.strip();
    
      Optional<Resource> mayBeResource;
      try {
        mayBeResource = this.resourceService.updateResource(id,firstName,lastName,imageFile);
      } catch (ServiceValidationException e) {
        throw new ServerException(e.generateMessage());
      }
      if(mayBeResource.isEmpty()){
        throw new NotFoundException(Resource.class, id);
      }
      Resource updatedResource = mayBeResource.get();
      return new ResponseEntity<>(updatedResource,HttpStatus.OK);
  }
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteJob(@PathVariable Long id) throws NotFoundException, ServerException{
    boolean done;
    try {
      done = this.resourceService.deleteResource(id);
    } catch (ServiceValidationException e) {
      throw new ServerException(e.generateMessage());
    }
    if(!done) throw new NotFoundException(Resource.class,id);
    
    return new ResponseEntity<>(HttpStatus.OK);
  }
}
