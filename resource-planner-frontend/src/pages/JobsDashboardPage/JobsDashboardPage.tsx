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

  if (jobsQuery.isLoading) return <h1>Loading....</h1>;
  if (jobsQuery.isError) return <h1>Error loading data!!!</h1>;

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
      <h1 className="bg-slate-900 font-bold p-1 text-green-800 text-xl">
        Jobs Dashboard
      </h1>
      <div>
        <div
          className="p-2 border border-gray-100 grid grid-cols-4 gap-8 hover:bg-slate-500 text-lg font-bold text-center"
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
