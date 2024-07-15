package com.projects.resource_planner_backend.resource;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ResourceRepository extends JpaRepository<Resource,Long>{
  @Query("SELECT r FROM Resource r WHERE r NOT IN (SELECT j.resource FROM Job j WHERE j.resource IS NOT NULL AND (j.startDate BETWEEN ?1 AND ?2 OR j.endDate BETWEEN ?1 AND ?2))")
  List<Resource> findAvailableResourcesBetweenDates(Date startDate,Date endDate);
}
