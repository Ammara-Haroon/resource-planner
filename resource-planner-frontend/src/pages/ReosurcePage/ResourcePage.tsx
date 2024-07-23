import React, { ChangeEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Resource } from "../../services/api-responses_interfaces";
import ProfilePic from "../../assets/profile_placeholder.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import MonthView from "../../components/MonthView/MonthView";
import ErrorPage from "../ErrorPage/ErrorPage";
import { colors, getMaxDate, getMinDate } from "../../services/utils";
const ResourcePage = () => {
  const location = useLocation();
  const resource: Resource = location.state?.resourceData;
  const navigate = useNavigate();
  console.log(resource);
  if (!resource) navigate("/error/Could not find the requested page.");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const minYear = getMinDate(resource.jobs).getFullYear();
  const maxYear = getMaxDate(resource.jobs).getFullYear();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(minYear);
  const years = new Array();
  for (let i = minYear; i <= maxYear; ++i) {
    years.push(i);
  }
  console.log(minYear);

  const handleYearChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    console.log("year", event.target.value);
    setSelectedYear(parseInt(event.target.value));
  };

  const handleMonthChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    console.log("month", event.target.value);

    setSelectedMonth(parseInt(event.target.value));
  };

  const filteredJobs = resource.jobs?.filter(
    (job) =>
      (job.startDate?.getMonth() === selectedMonth &&
        job.startDate?.getFullYear() === selectedYear) ||
      (job.endDate?.getMonth() === selectedMonth &&
        job.endDate?.getFullYear() === selectedYear)
  );

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
              {filteredJobs && filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => (
                  <tr
                    key={resource.id}
                    style={{ color: colors[index % colors.length] }}
                  >
                    <td className="w-fit px-2 py-1 border border-white">
                      {job.startDate?.toLocaleDateString()}
                      {" - "}
                      {job.endDate?.toLocaleDateString()}
                    </td>
                    <td className="w-3/5">{job.name}</td>
                  </tr>
                ))
              ) : (
                <p>No Jobs To Display</p>
              )}
            </tbody>
          </table>
          <div>
            <select onChange={handleMonthChange} defaultValue={selectedMonth}>
              {months.map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>
            <select onChange={handleYearChange} defaultValue={selectedYear}>
              {years.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <MonthView
              month={selectedMonth}
              year={selectedYear}
              jobs={filteredJobs}
            />
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
