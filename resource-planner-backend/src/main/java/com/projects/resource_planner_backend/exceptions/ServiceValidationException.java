package com.projects.resource_planner_backend.exceptions;

import java.util.ArrayList;
import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class ServiceValidationException extends Exception {
  private ValidationErrors errors;

  public ServiceValidationException(ValidationErrors errors) {
    super();
    this.errors = errors;
  }

  public String generateMessage() {
    Map<String, ArrayList<String>> readOnlyErrors = errors.getErrors();
    // TURN THIS MAP INTO JSON
    ObjectMapper objectMapper = new ObjectMapper();
    try {
      String json = objectMapper.writeValueAsString(readOnlyErrors);
      return json;
    } catch (JsonProcessingException e) {
      return "Invalid JSON";
    }
  }

  public boolean contains(String className) {
    return this.errors.contains(className);
  }

  public void addError(String field,String message){
    errors.addError(field,message);
  }

}
