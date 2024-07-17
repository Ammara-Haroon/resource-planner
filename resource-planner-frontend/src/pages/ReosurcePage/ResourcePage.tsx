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
      <div className="flex justify-start items-center gap-2 p-2">
        <img
          className="w-40 h-40 rounded-full"
          src={resource.imageUrl || ProfilePic}
          alt={resource.firstName}
        />
        <h1 className="text-xl font-bold uppercase">
          {resource.firstName} {resource.lastName}
        </h1>
      </div>
      <div className="flex flex-col items-center">
        <table className="border border-size p-2 m-1 box-border w-11/12">
          <thead className="border border-black font-bold">
            <tr>
              <th>Job</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {resource.jobs &&
              resource.jobs.map((job) => (
                <tr key={resource.id}>
                  <td className="p-2">{job.name}</td>
                  <td className="text-center">
                    {job.startDate?.toLocaleDateString()}
                  </td>
                  <td className="text-center">
                    {job.endDate?.toLocaleDateString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {resource.jobs && resource.jobs?.length === 0 && (
          <p className="text-center">No Jobs Assigned</p>
        )}
      </div>
    </div>
  );
};

export default ResourcePage;
