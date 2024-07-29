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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const ResourcesDashboardPage = () => {
  const sortOptions = [
    {
      value: "team-ASC",
      label: "A-Z",
      fn: (resource1: Resource, resource2: Resource) =>
        `${resource1.firstName + resource1.lastName}`.localeCompare(
          `${resource2.firstName + resource2.lastName}`
        ),
    },
    {
      value: "team-DESC",
      label: "Z-A",
      fn: (resource1: Resource, resource2: Resource) =>
        `${resource2.firstName + resource2.lastName}`.localeCompare(
          `${resource1.firstName + resource1.lastName}`
        ),
    },
    {
      value: "jobs-ASC",
      label: "Most Jobs",
      fn: (resource1: Resource, resource2: Resource) =>
        resource2.jobs?.length - resource1.jobs?.length,
    },
    {
      value: "jobs-DESC",
      label: "Least Jobs",
      fn: (resource1: Resource, resource2: Resource) =>
        resource1.jobs?.length - resource2.jobs?.length,
    },
  ];
  const [filterParams, setFilterParams] = useState({
    search: null,
    sort: "team-ASC",
  });
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

  const handleEdit = (resource: ResourceData): void => {
    updateMutation.mutate(resource);
  };
  const labelStyleClass = "text-neutral-200 p-2 uppercase text-sm ";
  let filteredData = [...resourcesQuery.data];
  if (filterParams.search) {
    filteredData = resourcesQuery.data?.filter(
      (resource) =>
        resource.firstName.toLowerCase().includes(filterParams.search) ||
        resource.lastName.toLowerCase().includes(filterParams.search)
    );
  }
  filteredData = filteredData.sort(
    sortOptions.find((opt) => opt.value === filterParams.sort)?.fn
  );

  const handleFilterChange = (event: any) => {
    console.log(event.target.id);
    console.log(event.target.value);
    switch (event.target.id) {
      case "sort":
        setFilterParams((params) => ({
          ...filterParams,
          sort: event.target.value,
        }));
        break;
      case "search":
        setFilterParams((params) => ({
          ...filterParams,
          search: event.target.value.toLowerCase(),
        }));
        break;
    }
  };
  return (
    <div className="w-full">
      <PageTitle title={"Team Dashboard"} />
      <div>
        <div className="flex h-28 justify-around items-center">
          <div>
            <label className={labelStyleClass} htmlFor="">
              <FontAwesomeIcon icon={faFilter} />
            </label>

            <input onChange={handleFilterChange} name="search" id="search" />
          </div>

          <div>
            <label className={labelStyleClass} htmlFor="sort">
              <FontAwesomeIcon className="rotate-90" icon={faRightLeft} /> Sort
              :
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
            style={{ gridTemplateColumns: "1fr 1fr 1fr 45px" }}
          >
            <p>Team Member</p>
            <p>Assigned Jobs</p>
            <p>Availability</p>
          </div>{" "}
          {/*className="grid grid-cols-1 divide-y-2 gap-2"> */}
          {resourcesQuery.data &&
            filteredData.map((resource) => (
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
