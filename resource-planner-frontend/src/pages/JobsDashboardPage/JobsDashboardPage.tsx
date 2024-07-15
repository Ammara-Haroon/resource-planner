import React, { useEffect } from "react";
import { addJobs, getAllJobs } from "../../services/job-services";
import {
  addResources,
  getAvailableResources,
} from "../../services/resource-sevices";
import { useQuery } from "@tanstack/react-query";
import JobsCard from "../../components/JobsCard/JobsCard";
import TaskForm from "../../components/TaskForm/TaskForm";
import JobForm from "../../components/JobForm/JobForm";

const JobsDashboardPage = () => {
  const jobsQuery = useQuery({
    queryKey: ["jobs"],
    queryFn: getAllJobs,
  });
  if (jobsQuery.isLoading) return <h1>Loading....</h1>;
  if (jobsQuery.isError) return <h1>Error loading data!!!</h1>;

  return (
    <div>
      <h1 className="bg-slate-900 font-bold p-1 text-green-800 text-xl">
        Jobs Dashboard
      </h1>
      <div>
        {" "}
        {/*className="grid grid-cols-1 divide-y-2 gap-2"> */}
        {jobsQuery.data &&
          jobsQuery.data.map((job) => <JobsCard key={job.id} job={job} />)}
      </div>
      <JobForm />
    </div>
  );
};

export default JobsDashboardPage;
