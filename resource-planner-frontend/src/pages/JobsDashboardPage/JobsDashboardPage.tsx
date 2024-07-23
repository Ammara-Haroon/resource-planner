import {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
} from "../../services/job-services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import JobsCard from "../../components/JobsCard/JobsCard";
import JobForm from "../../components/JobForm/JobForm";
import { Job } from "../../services/api-responses_interfaces";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import GanttChart from "../../components/GanttChart/GanttChart";
import { useState } from "react";

const JobsDashboardPage = () => {
  const [defaultView, setDefaultView] = useState(true);
  const queryClient = useQueryClient();
  const jobsQuery = useQuery({
    queryKey: ["jobs"],
    queryFn: getAllJobs,
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
  const labelStyleClass = "text-neutral-200";
  return (
    <div className="w-full">
      <PageTitle title={"Jobs Dashboard"} />
      <div className="flex w-full justify-end">
        <button
          className="text-neutral-200 m-2"
          onClick={() => setDefaultView(!defaultView)}
        >
          {defaultView ? "Gantt" : "Table"}
        </button>
      </div>
      {defaultView ? (
        <div>
          <div className="flex h-28 justify-around items-center">
            <div>
              <label className={labelStyleClass} htmlFor="">
                Month Filter:{" "}
              </label>
              <select name="sort" id="">
                <option value="">Jan</option>
                <option value="">Feb</option>
                <option value="">Mar</option>
                <option value="">Apr</option>
              </select>
            </div>
            <div>
              <label className={labelStyleClass} htmlFor="">
                Member Filter:{" "}
              </label>
              <select name="sort" id="">
                <option value="">Jan</option>
                <option value="">Feb</option>
                <option value="">Mar</option>
                <option value="">Apr</option>
              </select>
            </div>
            <div>
              <label className={labelStyleClass} htmlFor="">
                Sort by:{" "}
              </label>
              <select name="sort" id="">
                <option value="">Job A-Z</option>
                <option value="">Job Z-A</option>
                <option value="">Latest Jobs</option>
                <option value="">Oldest Jobs</option>
              </select>
            </div>
          </div>
          <div className="border-4 border-slate-900 m-2">
            <div
              className="p-2 border border-gray-100 grid grid-cols-4 gap-8 bg-slate-100 text-md font-semibold uppercase  text-center text-slate-800"
              style={{ gridTemplateColumns: "1fr 1fr 1fr 10px" }}
            >
              <p>Job</p>
              <p>Progress</p>
              <p>Assigned To</p>
            </div>{" "}
            {/*className="grid grid-cols-1 divide-y-2 gap-2"> */}
            {jobsQuery.data &&
              jobsQuery.data.map((job) => (
                <JobsCard
                  key={job.id}
                  job={job}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
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
