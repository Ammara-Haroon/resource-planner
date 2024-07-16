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

const JobsDashboardPage = () => {
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
  return (
    <div>
      <PageTitle title={"Jobs Dashboard"} />
      <div>
        <div
          className="p-2 border border-gray-100 grid grid-cols-4 gap-8 bg-slate-200 text-lg font-bold text-center"
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
      <JobForm onSubmit={handleAdd} />
    </div>
  );
};

export default JobsDashboardPage;
