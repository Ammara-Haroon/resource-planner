import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Resource,
  ResourceData,
} from "../../services/api-responses_interfaces";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
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

  const handleAdd = (newResource: FormData): void => {
    console.log(newResource);
    addMutation.mutate(newResource);
  };

  const handleEdit = (resource: Resource): void => {
    updateMutation.mutate(resource);
  };
  const labelStyleClass = "text-neutral-200";

  return (
    <div className="w-full">
      <PageTitle title={"Team Dashboard"} />
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
            style={{ gridTemplateColumns: "1fr 1fr 1fr 45px" }}
          >
            <p>Team Member</p>
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
      </div>
      <ResourceForm onSubmit={handleAdd} />
    </div>
  );
};

export default ResourcesDashboardPage;
