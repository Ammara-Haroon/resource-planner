import React from "react";
import {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
} from "../../services/job-services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import JobsCard from "../../components/JobsCard/JobsCard";
import JobForm from "../../components/JobForm/JobForm";
import { Job, Resource } from "../../services/api-responses_interfaces";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrMsg from "../../components/ErrMsg/ErrMsg";
import ErrorPage from "../ErrorPage/ErrorPage";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import {
  createResource,
  deleteResource,
  getAllResources,
  updateResource,
} from "../../services/resource-sevices";
import ResourceCard from "../../components/ResourceCard/ResourceCard";
import ResourceForm from "../../components/ResourceForm/ResourceForm";

const ResourcesDashboardPage = () => {
  const queryClient = useQueryClient();
  const resourcesQuery = useQuery({
    queryKey: ["resources"],
    queryFn: getAllResources,
  });
  const deleteMutation = useMutation({
    mutationFn: deleteResource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
  });
  const updateMutation = useMutation({
    mutationFn: updateResource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
  });
  const addMutation = useMutation({
    mutationFn: createResource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
  });

  const navigate = useNavigate();

  if (resourcesQuery.isLoading) return <LoadingSpinner />;
  if (resourcesQuery.isError)
    navigate(`/error/${resourcesQuery.error.message}`);

  const handleDelete = (id: number): void => {
    //console.log("deletetetetet");
    deleteMutation.mutate(id);
  };

  const handleAdd = (newResource: Partial<Resource>): void => {
    console.log(newResource);
    addMutation.mutate(newResource);
  };

  const handleEdit = (resource: Resource): void => {
    updateMutation.mutate(resource);
  };
  return (
    <div>
      <PageTitle title={"Team Dashboard"} />
      <div>
        <div
          className="p-2 border border-gray-100 grid grid-cols-4 gap-8 bg-slate-200 text-lg font-bold text-center"
          style={{ gridTemplateColumns: "1fr 1fr 1fr 10px" }}
        >
          <p>Team Memeber</p>
          <p>Assigned Jobs</p>
          <p>Availability</p>
        </div>{" "}
        {/*className="grid grid-cols-1 divide-y-2 gap-2"> */}
        {resourcesQuery.data &&
          resourcesQuery.data.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
      </div>
      <div className="w-full h-32"></div>
      <ResourceForm onSubmit={handleAdd} />
    </div>
  );
};

export default ResourcesDashboardPage;
