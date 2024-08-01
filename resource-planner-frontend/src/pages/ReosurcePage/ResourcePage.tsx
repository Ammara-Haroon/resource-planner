import { ChangeEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Resource } from "../../services/api-responses_interfaces";
import ProfilePic from "../../assets/profile_placeholder.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faFilter } from "@fortawesome/free-solid-svg-icons";
import MonthView from "../../components/MonthView/MonthView";
import { colors, getMaxDate, getMinDate } from "../../services/utils";
const ResourcePage = () => {
  const location = useLocation();
  const resource: Resource = location.state?.resourceData;
  const navigate = useNavigate();
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
  const minYear: number =
    (resource.jobs && getMinDate(resource.jobs)?.getFullYear()) ||
    new Date().getFullYear();
  const maxYear: number =
    (resource.jobs && getMaxDate(resource.jobs)?.getFullYear()) ||
    new Date().getFullYear();

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const years = new Array();
  for (let i = minYear; i <= maxYear; ++i) {
    years.push(i);
  }

  const handleYearChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    setSelectedYear(parseInt(event.target.value));
  };

  const handleMonthChange = (event: ChangeEvent<HTMLSelectElement>): void => {
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
      <div className="py-5">
        <Link className="m-5  text-pink-500 uppercase" to={"/resources"}>
          <FontAwesomeIcon icon={faBackward} />
          <span className="p-2">Back</span>
        </Link>
      </div>
      <div className="border-2 border-pink-500 shadow-pink-200 shadow-sm rounded-md flex justify-start items-center gap-2 p-5 m-2 bg-slate-800">
        <img
          className="w-40 h-40 border-2 border-pink-500 border-double rounded-full"
          src={resource.imageUrl || ProfilePic}
          alt={resource.firstName}
        />
        <h1 className="text-xl text-neutral-200 font-semibold uppercase p-2">
          {resource.firstName} {resource.lastName}
        </h1>
      </div>
      <div className="border-2 shadow-lg  border-pink-500 min-h-[calc(100vh-300px)] m-2 p-2 rounded-lg">
        <div
          className="grid-cols-2 grid box-border rounded-md border-pink-500"
          style={{ gridTemplateColumns: "1fr 1fr" }}
        >
          <div
            className="grid-cols-2 grid  m-1 py-1 pb-4 border-4  border-dashed  box-border border-pink-500 shadow-lg bg-neutral-100"
            //style={{ gridTemplateColumns: "1fr 1fr" }}
          >
            <p className="border-b font-bold text-slate-700 p-1 uppercase text-center">
              Timeline
            </p>
            <p className="p-1 uppercase text-center w-full border-b font-bold text-slate-700">
              Job
            </p>
            {filteredJobs && filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => (
                <>
                  <span
                    className="w-fit text-wrap px-2 py-1 border-b border-gray-200"
                    style={{ color: colors[index % colors.length] }}
                  >
                    {job.startDate?.toLocaleDateString()}
                    {" - "}
                    {job.endDate?.toLocaleDateString()}
                  </span>
                  <p
                    className="w-full text-left p-1 text-pretty"
                    style={{ color: colors[index % colors.length] }}
                  >
                    {job.name}
                  </p>
                </>
              ))
            ) : (
              <small className="text-slate-700 p-1 ">No Jobs To Display</small>
            )}
          </div>
          <div className="m-1">
            <div className="p-1">
              <select
                className="text-slate-800"
                onChange={handleMonthChange}
                defaultValue={selectedMonth}
              >
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
              <FontAwesomeIcon
                className="text-slate-900 h-5 px-1"
                icon={faFilter}
              />
            </div>
            <MonthView
              month={selectedMonth}
              year={selectedYear}
              jobs={filteredJobs}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcePage;
