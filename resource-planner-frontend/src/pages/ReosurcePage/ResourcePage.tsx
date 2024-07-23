import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Resource } from "../../services/api-responses_interfaces";
import ProfilePic from "../../assets/profile_placeholder.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import MonthView from "../../components/MonthView/MonthView";
const ResourcePage = () => {
  const location = useLocation();
  const resource: Resource = location.state.resourceData;
  console.log(resource);
  return (
    <div>
      <Link className="m-2 text-pink-500 uppercase " to={"/resources"}>
        <FontAwesomeIcon icon={faBackward} />
        <span className="p-2">Back</span>
      </Link>
      <div className="flex justify-start items-center gap-2 p-2 m-2 mx-5">
        <img
          className="w-40 h-40 rounded-full"
          src={resource.imageUrl || ProfilePic}
          alt={resource.firstName}
        />
        <h1 className="text-xl text-neutral-200 font-bold uppercase p-2">
          {resource.firstName} {resource.lastName}
        </h1>
      </div>
      <div>
        <div
          className="grid grid-cols-2"
          style={{ gridTemplateColumns: "1.5fr 2fr" }}
        >
          <table className="border border-size p-2 m-1 box-border">
            <thead className="border border-black font-bold">
              <tr className="w-fit">
                <th>Duration</th>
                <th>Job</th>
              </tr>
            </thead>
            <tbody>
              {resource.jobs &&
                resource.jobs.map((job) => (
                  <tr key={resource.id}>
                    <td className="w-fit px-2 py-1 border border-white">
                      {job.startDate?.toLocaleDateString()}
                      {" - "}
                      {job.endDate?.toLocaleDateString()}
                    </td>
                    <td className="w-3/5">{job.name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div>
            <MonthView month={6} year={2024} jobs={resource.jobs} />
          </div>
        </div>
        {resource.jobs && resource.jobs?.length === 0 && (
          <p className="text-center">No Jobs Assigned</p>
        )}
      </div>
    </div>
  );
};

export default ResourcePage;
