package com.projects.resource_planner_backend.resource;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.projects.resource_planner_backend.exceptions.ServiceValidationException;
import com.projects.resource_planner_backend.exceptions.ValidationErrors;
import com.projects.resource_planner_backend.job.Job;
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
            //System.out.println("Parsed date: " + date);
            return this.repo.findAvailableResourcesBetweenDates(dateFormat.parse(startDate), dateFormat.parse(endDate));

        } catch (ParseException e) {
            e.printStackTrace();
        }
        return new ArrayList<>();
  }

  public Optional<Resource> findResourceById(Long resId) {
    return this.repo.findById(resId);
  }

  public Optional<Resource> updateResource(Long id, UpdateResourceDTO data) {
    Optional<Resource> mayBeResource = this.repo.findById(id);
    if(mayBeResource.isEmpty()) {
      return Optional.empty();
    }
    Resource foundResource = mayBeResource.get();
    mapper.map(data,foundResource);
    Resource updatedResource = this.repo.save(foundResource);
    return Optional.of(updatedResource);
  }

  public boolean deleteResource(Long id) {
    Optional<Resource> mayBeResource = this.repo.findById(id);
    if(mayBeResource.isEmpty()) return false;
    List<Job> jobs = mayBeResource.get().getJobs();
    long len = jobs.size();
    for(int i = 0;i < len;++i){
      Job job = jobs.get(i);
      job.setResource(null);           
    };
    this.repo.deleteById(id);
    return true;
  }

  public Resource createResource(String firstName, String lastName, MultipartFile imageFile) {
    Resource newResource = new Resource();
    newResource.setFirstName(firstName);
    newResource.setLastName(lastName);
    System.out.println(imageFile);
    String imageURL = null;
    if(!imageFile.isEmpty()) {
      imageURL = uploadImage(imageFile);
    }
    newResource.setImageUrl(imageURL);
    return this.repo.save(newResource);
    
  }

  private String uploadImage(MultipartFile imageFile) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'uploadImage'");
  }

  
}
