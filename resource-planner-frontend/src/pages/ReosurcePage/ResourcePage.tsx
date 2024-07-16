import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Resource } from "../../services/api-responses_interfaces";
import ProfilePic from "../../assets/profile_placeholder.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
const ResourcePage = () => {
  const location = useLocation();
  const resource: Resource = location.state.resourceData;
  console.log(resource);
  return (
    <div>
      <Link to={"/resources"}>
        <FontAwesomeIcon icon={faBackward} />
        <span className="p-2">Back</span>
      </Link>
      <div className="flex justify-start items-center">
        <img
          className="w-40 h-40 rounded-full"
          src={resource.imageUrl || ProfilePic}
          alt={resource.firstName}
        />
        <h1 className="text-xl font-bold uppercase">
          {resource.firstName} {resource.lastName}
        </h1>
      </div>
      <table className="border w-full">
        <tr className="border border-black font-bold">
          <th>Job</th>
          <th>Start Date</th>
          <th>End Date</th>
        </tr>
        {resource.jobs &&
          resource.jobs.map((job) => (
            <tr key={resource.id}>
              <td>{job.name}</td>
              <td>{job.startDate?.toLocaleDateString()}</td>
              <td>{job.endDate?.toLocaleDateString()}</td>
            </tr>
          ))}
      </table>
    </div>
  );
};

export default ResourcePage;
