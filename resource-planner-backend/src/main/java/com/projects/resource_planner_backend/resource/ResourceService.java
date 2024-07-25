package com.projects.resource_planner_backend.resource;

import java.io.FileInputStream;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.auth.Credentials;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
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

  @Value("${GCP_CREDENTIALS}")
  private String GCP_CREDENTIALS;

  @Value("${BUCKET_NAME}")
  private String BUCKET_NAME;

  @Value("${AUTHENTICATED_URL}")
  private String AUTHENTICATED_URL;

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
    Resource resource = mayBeResource.get(); 
    List<Job> jobs = resource.getJobs();
    long len = jobs.size();
    for(int i = 0;i < len;++i){
      Job job = jobs.get(i);
      job.setResource(null);           
    };
    deleteImage(resource.getId().toString());
    this.repo.deleteById(id);
    return true;
  }

  private void deleteImage(String objName) {
    try {
      Credentials credentials = GoogleCredentials
             .fromStream(new FileInputStream(GCP_CREDENTIALS));
      Storage storage = StorageOptions.newBuilder().setCredentials(credentials).setProjectId("resource-planner").build().getService();
   
      BlobId blobId = BlobId.of(BUCKET_NAME, objName);
      storage.delete(blobId);
    } catch (Exception e) {
          e.printStackTrace();
        }

  }

  public Resource createResource(String firstName, String lastName, MultipartFile imageFile) {
    Resource newResource = new Resource();
    newResource.setFirstName(firstName);
    newResource.setLastName(lastName);
    newResource = this.repo.save(newResource);
    System.out.println(imageFile);
    String imageURL = null;
    if(!imageFile.isEmpty()) {
      imageURL = uploadImage(imageFile,newResource.getId().toString());
    }
    newResource.setImageUrl(imageURL);
    newResource = this.repo.save(newResource);
    return newResource;
    
  }

  //uploads image to cloud and returns URL 
  private String uploadImage(MultipartFile imageFile,String objName) {
    System.out.println("GCP FIle:"+GCP_CREDENTIALS);
    String url = null;
    try {
      Credentials credentials = GoogleCredentials
             .fromStream(new FileInputStream(GCP_CREDENTIALS));
      Storage storage = StorageOptions.newBuilder().setCredentials(credentials).setProjectId("resource-planner").build().getService();
   
      BlobId blobId = BlobId.of(BUCKET_NAME, objName);
      System.out.println(blobId);
      BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("image/png").build();
      byte[] content = imageFile.getBytes();

      // Set a generation-match precondition to enable automatic retries, avoid potential
      // race
      // conditions and data corruptions. The request returns a 412 error if the
      // preconditions are not met.
      Storage.BlobTargetOption precondition;
      if (storage.get(BUCKET_NAME, objName) == null) {
        // For a target object that does not yet exist, set the DoesNotExist precondition.
        // This will cause the request to fail if the object is created before the request runs.
        precondition = Storage.BlobTargetOption.doesNotExist();
     } else {
        // If the destination already exists in your bucket, instead set a generation-match
        // precondition. This will cause the request to fail if the existing object's generation
        // changes before the request runs.
        precondition =
          Storage.BlobTargetOption.generationMatch(
              storage.get(BUCKET_NAME, objName).getGeneration());
    }
    Blob newBlob = storage.create(blobInfo, content, precondition);
    url = String.format(AUTHENTICATED_URL,BUCKET_NAME,objName);
    System.out.println(newBlob.asBlobInfo());
    System.out.println(
        "Object "
            + objName
            + " uploaded to bucket "
            + BUCKET_NAME
            + " with contents "
            + imageFile);
        } catch (Exception e) {
          e.printStackTrace();
        }
    
    return url;
  }

  
}
