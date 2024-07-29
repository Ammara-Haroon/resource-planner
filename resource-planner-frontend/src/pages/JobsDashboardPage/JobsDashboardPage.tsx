import {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
} from "../../services/job-services";
import Select from "react-select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import JobsCard from "../../components/JobsCard/JobsCard";
import JobForm from "../../components/JobForm/JobForm";
import { Job, Resource } from "../../services/api-responses_interfaces";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import GanttChart from "../../components/GanttChart/GanttChart";
import { SetStateAction, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faFilter,
  faRightLeft,
} from "@fortawesome/free-solid-svg-icons";
import Datepicker from "react-tailwindcss-datepicker";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons/faCalendarPlus";
import { getMaxDate, getMinDate, isBetween } from "../../services/utils";

const JobsDashboardPage = () => {
  const [defaultView, setDefaultView] = useState(true);
  const sortOptions = [
    {
      value: "JobName-ASC",
      label: "Job A-Z",
      fn: (job1: Job, job2: Job) => job1.name.localeCompare(job2.name),
    },
    {
      value: "JobName-DESC",
      label: "Job Z-A",
      fn: (job1: Job, job2: Job) => job2.name.localeCompare(job1.name),
    },
    {
      value: "JobTime-DESC",
      label: "Latest Jobs",
      fn: (job1: Job, job2: Job) =>
        job2.startDate.getTime() - job1.startDate.getTime(),
    },
    {
      value: "JobTime-ASC",
      label: "Oldest Jobs",
      fn: (job1: Job, job2: Job) => {
        console.log(
          job1.startDate,
          job2.startDate,
          job1.startDate.getTime() - job2.startDate.getTime()
        );
        return job1.startDate.getTime() - job2.startDate.getTime();
      },
    },
    {
      value: "Team",
      label: "Team Members",
      fn: (job1: Job, job2: Job) =>
        job1.resource &&
        job2.resource &&
        `${job1.resource.firstName + job1.resource.lastName}`.localeCompare(
          `${job2.resource.firstName + job2.resource.lastName}`
        ),
    },
  ];
  const queryClient = useQueryClient();
  const jobsQuery = useQuery({
    queryKey: ["jobs"],
    queryFn: getAllJobs,
  });
  let uniqueKeys = Array.from(
    new Set(
      jobsQuery.data
        ?.map((job) => job.resource)
        .filter((resource) => resource !== null)
        .map((resource, index) => resource.id)
    )
  );
  //console.log(uniqueKeys);

  let resources: Resource[] = uniqueKeys.map(
    (key) =>
      jobsQuery.data?.filter((job) => key === job.resource?.id)[0].resource
  );

  const [filterParams, setFilterParams] = useState({
    resourceFilter: "All",
    dateFilter: {
      startDate: null, //jobsQuery.data ? getMinDate(jobsQuery.data) : new Date(),
      endDate: null, //jobsQuery.data ? getMaxDate(jobsQuery.data) : new Date(),
    },
    sort: "Jobs A-Z",
  });

  const deleteMutation = useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
  const updateMutation = useMutation({
    mutationFn: updateJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
  const addMutation = useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });

  const navigate = useNavigate();
  if (jobsQuery.isLoading) return <LoadingSpinner />;
  if (jobsQuery.isError) navigate(`/error/${jobsQuery.error.message}`);

  const handleDelete = (id: number): void => {
    //console.log("deletetetetet");
    deleteMutation.mutate(id);
  };

  const handleAdd = (newJob: Partial<Job>): void => {
    console.log(newJob);
    addMutation.mutate(newJob);
  };

  const handleEdit = (job: Job): void => {
    updateMutation.mutate(job);
  };
  const labelStyleClass = "text-neutral-200 p-2 uppercase text-sm ";
  // const [dateFilter, setDateFilter] = useState({
  //   startDate: new Date(),
  //   endDate: new Date().setMonth(11),
  // });
  console.log(filterParams);
  const handleFilterChange = (event: any) => {
    console.log("eventtttttttttt", event);
    if (event.startDate && event.endDate) {
      setFilterParams((params) => ({
        ...params,
        dateFilter: {
          startDate: new Date(event.startDate),
          endDate: new Date(event.endDate),
        },
      }));
    } else if (event.startDate === null && event.endDate === null) {
      console.log("nulllllllllllllll");
      setFilterParams((params) => ({
        ...params,
        dateFilter: {
          startDate: null,
          endDate: null,
        },
      }));
    } else if (event.target.id === "team") {
      console.log(event.target.value);
      if (event.target.value === "None") {
        setFilterParams((params) => ({ ...params, resourceFilter: null }));
      } else if (event.target.value === "All") {
        setFilterParams((params) => ({
          ...params,
          resourceFilter: "",
        }));
      } else {
        setFilterParams((params) => ({
          ...params,
          resourceFilter: event.target.value,
        }));
      }
    } else if (event.target.id === "sort") {
      console.log(event.target.value);
      setFilterParams((params) => ({ ...params, sort: event.target.value }));
    }
  };
  const filteredData = jobsQuery.data
    .filter((job) => {
      let ans = true;
      if (filterParams.resourceFilter === null) {
        ans = job.resource === null;
      } else if (filterParams.resourceFilter !== "") {
        ans = Boolean(
          job.resource && job.resource.id == filterParams.resourceFilter
        );
      }
      console.log(ans);
      if (
        filterParams.dateFilter.startDate === null &&
        filterParams.dateFilter.endDate === null
      ) {
        return ans;
      }

      return (
        ans &&
        (isBetween(
          job.startDate,
          filterParams.dateFilter.startDate,
          filterParams.dateFilter.endDate
        ) ||
          isBetween(
            job.endDate,
            filterParams.dateFilter.startDate,
            filterParams.dateFilter.endDate
          ))
      );
    })
    .sort(sortOptions.find((opt) => opt.value === filterParams.sort)?.fn);

  filteredData
    .sort(sortOptions.find((opt) => opt.value === filterParams.sort)?.fn)
    .forEach((d) => console.log(d.startDate, d.startDate.getTime()));

  console.log(sortOptions.find((opt) => opt.value === filterParams.sort)?.fn);
  return (
    <div className="w-full">
      <PageTitle title={"Jobs Dashboard"} />
      <div className="border border-t-0 flex w-full justify-end">
        <button
          className="text-neutral-200 m-2 border px-2 py-1 uppercase hover:text-pink-500 hover:border-pink-500"
          onClick={() => setDefaultView(!defaultView)}
        >
          {defaultView ? "Gantt" : "Table"}
        </button>
      </div>
      {defaultView ? (
        <div>
          <div className="flex h-28 justify-around items-center">
            <div>
              <label className={labelStyleClass} htmlFor="team">
                <FontAwesomeIcon icon={faFilter} /> Team Members:{" "}
              </label>
              <select name="team" id="team" onChange={handleFilterChange}>
                <option value="All">All</option>
                {resources.map((resource, index) => (
                  <option key={index} value={resource.id}>
                    {resource.firstName} {resource.lastName}
                  </option>
                ))}
                <option value="None">None</option>
              </select>
            </div>
            <div>
              <label className={labelStyleClass} htmlFor="">
                <FontAwesomeIcon icon={faCalendarPlus} /> Date Range :
              </label>

              <Datepicker
                onChange={handleFilterChange}
                value={filterParams.dateFilter}
              />
            </div>
            <div>
              <label className={labelStyleClass} htmlFor="sort">
                <FontAwesomeIcon className="rotate-90" icon={faRightLeft} />{" "}
                Sort :
              </label>
              <select
                onChange={handleFilterChange}
                defaultValue={filterParams.sort}
                name="sort"
                id="sort"
              >
                {sortOptions.map((opt, index) => (
                  <option key={index} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="border-4 border-slate-900 m-2">
            <div
              className="p-2 border border-gray-100 grid grid-cols-4 gap-8 bg-slate-100 text-md font-semibold uppercase  text-center text-slate-800"
              style={{ gridTemplateColumns: "1fr 1fr 1fr 10px" }}
            >
              <p>Job</p>
              <p>Timeline</p>
              <p>Assigned To</p>
            </div>{" "}
            {/*className="grid grid-cols-1 divide-y-2 gap-2"> */}
            {
              //jobsQuery.data && jobsQuery.data
              filteredData.map((job) => (
                <JobsCard
                  key={job.id}
                  job={job}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))
            }
          </div>
          <div className="w-full h-32"></div>
        </div>
      ) : (
        <GanttChart jobs={jobsQuery.data} />
      )}
      {defaultView && <JobForm onSubmit={handleAdd} />}
    </div>
  );
};

export default JobsDashboardPage;
