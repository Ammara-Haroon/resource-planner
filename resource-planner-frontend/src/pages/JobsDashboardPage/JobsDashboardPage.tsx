import {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
} from "../../services/job-services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import JobsCard from "../../components/JobsCard/JobsCard";
import JobForm from "../../components/JobForm/JobForm";
import {
  Job,
  JobData,
  Resource,
  ResourceBase,
} from "../../services/api-responses_interfaces";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import GanttChart from "../../components/GanttChart/GanttChart";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faFilterCircleXmark,
  faRightLeft,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import Datepicker from "react-tailwindcss-datepicker";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons/faCalendarPlus";
import { isBetween, ITimeBound } from "../../services/utils";
import ComboBox, { IComboBoxOption } from "../../components/ComboBox/ComboBox";

interface IFilterParams {
  resourceFilter: string;
  dateFilter: ITimeBound | null;
  sort: string;
}
const JobsDashboardPage = () => {
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
      fn: (job1: Job, job2: Job) =>
        job1.startDate.getTime() - job2.startDate.getTime(),
    },
    {
      value: "Team",
      label: "Team Members",
      fn: (job1: Job, job2: Job): number => {
        if (!job1.resource) return 1;
        if (!job2.resource) return -1;

        return (
          job1.resource &&
          job2.resource &&
          `${job1.resource.firstName + job1.resource.lastName}`.localeCompare(
            `${job2.resource.firstName + job2.resource.lastName}`
          )
        );
      },
    },
  ];
  const [defaultView, setDefaultView] = useState(true);
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

  let resources: Required<ResourceBase>[] = uniqueKeys
    .map(
      (key) =>
        jobsQuery.data?.filter((job) => key === job.resource?.id)[0].resource
    )
    .sort((res1: Resource, res2: Resource) =>
      `${res1.firstName} ${res1.lastName}`.localeCompare(
        `${res2.firstName} ${res2.lastName}`
      )
    );
  const initialParams: IFilterParams = {
    resourceFilter: "All",
    dateFilter: null,
    sort: "JobTime-ASC",
  };
  const [filterParams, setFilterParams] = useState(initialParams);

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

  const handleAdd = (newJob: JobData): void => {
    console.log(newJob);
    addMutation.mutate(newJob);
  };

  const handleEdit = (job: Required<JobData>): void => {
    updateMutation.mutate(job);
  };
  const labelStyleClass = "text-neutral-200 p-2 uppercase text-sm ";
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
        dateFilter: null,
      }));
    } else if (event.target.id === "team") {
      console.log(event.target.value);
      if (event.target.value === "None") {
        setFilterParams((params) => ({ ...params, resourceFilter: null }));
      } else if (event.target.value === "All") {
        setFilterParams((params) => ({
          ...params,
          resourceFilter: "All",
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
      } else if (filterParams.resourceFilter === "All") {
        ans = true;
      } else {
        ans = Boolean(
          job.resource && job.resource.id == filterParams.resourceFilter
        );
      }
      console.log(ans);
      if (filterParams.dateFilter === null) {
        //console.log("should be here");
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

  console.log(sortOptions.find((opt) => opt.value === filterParams.sort)?.fn);

  const options = new Array<IComboBoxOption>();
  options.push({ label: "All", icon: faFilterCircleXmark, value: "All" });
  resources.forEach((res) =>
    options.push({
      label: `${res.firstName} ${res.lastName}`,
      iconSrc: res.imageUrl,
      value: res.id,
    })
  );
  options.push({ label: "None", icon: faXmarkCircle, value: "None" });

  const getResourceName = (id: string) => {
    if (id === "All") return "All";

    if (id === null) return "None";

    const foundResource: Resource | undefined = resources.find(
      (res: Resource) => res.id === parseInt(id)
    );

    if (!foundResource) return "";

    return `${foundResource.firstName} ${foundResource.lastName}`;
  };
  return (
    <div>
      <PageTitle title={"Jobs Dashboard"} />
      <div className="border-0 border-b-2 flex w-full justify-end">
        <button
          className="text-neutral-200 m-2 border px-2 py-1 uppercase hover:text-pink-500 hover:border-pink-500 hover:shadow-pink-500 shadow-sm shadow-gray-500"
          onClick={() => setDefaultView(!defaultView)}
        >
          {defaultView ? "Gantt" : "Table"}
        </button>
      </div>
      {defaultView ? (
        <div>
          <div className="flex h-28 justify-around items-center">
            <div className="flex flex-col">
              <label className={labelStyleClass} htmlFor="team">
                <FontAwesomeIcon icon={faFilter} /> Team Members:{" "}
              </label>
              <ComboBox
                defaultValue={getResourceName(filterParams.resourceFilter)}
                name="team"
                id="team"
                onSelect={handleFilterChange}
                options={options}
                opensUp={false}
              />
            </div>
            <div className="flex flex-col min-w-60">
              <label className={labelStyleClass}>
                <FontAwesomeIcon icon={faCalendarPlus} /> Date Range :
              </label>

              <Datepicker
                onChange={handleFilterChange}
                value={filterParams.dateFilter}
              />
            </div>
            <div className="flex flex-col">
              <label className={labelStyleClass} htmlFor="sort">
                <FontAwesomeIcon className="rotate-90" icon={faRightLeft} />{" "}
                Sort By:
              </label>
              <select
                onChange={handleFilterChange}
                defaultValue={filterParams.sort}
                name="sort"
                id="sort"
                className="rounded-md w-full h-8 px-1"
              >
                {sortOptions.map((opt, index) => (
                  <option key={index} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="border-4 border-slate-900 bg-slate-50 m-2 min-h-[calc(65vh)]">
            <div
              className="p-2 border border-gray-100 grid grid-cols-4 gap-8 bg-slate-100 text-md font-semibold uppercase  text-center text-slate-800"
              style={{ gridTemplateColumns: "1fr 1fr 1fr 10px" }}
            >
              <p>Job</p>
              <p>Timeline</p>
              <p>Assigned To</p>
            </div>
            {jobsQuery.data &&
              filteredData.length > 0 &&
              filteredData.map((job) => (
                <JobsCard
                  key={job.id}
                  job={job}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
            <div className="w-full h-20 text-center text-slate-700 text-sm">
              {filteredData.length === 0 ? "0 Jobs Found" : ""}
            </div>
            <JobForm onSubmit={handleAdd} />
          </div>
        </div>
      ) : (
        <div className="max-w-full max-h-[calc(70vh)] overflow-scroll  border-4 border-slate-900">
          <GanttChart jobs={jobsQuery.data} />
        </div>
      )}
    </div>
  );
};

export default JobsDashboardPage;
