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
        (resource2.jobs?.length || 0) - (resource1.jobs?.length || 0),
    },
    {
      value: "jobs-DESC",
      label: "Least Jobs",
      fn: (resource1: Resource, resource2: Resource) =>
        (resource1.jobs?.length || 0) - (resource2.jobs?.length || 0),
    },
  ];
  const [filterParams, setFilterParams] = useState({
    search: "",
    sort: "team-ASC",
  });
  const labelStyleClass = "text-neutral-200 p-2 uppercase text-sm ";
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
    onError: () => {
      navigate("/error/Could not delete team member !");
    },
  });
  const updateMutation = useMutation({
    mutationFn: updateResource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
    onError: () => {
      navigate("/error/Could not update team member !");
    },
  });
  const addMutation = useMutation({
    mutationFn: createResource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
    onError: () => {
      navigate("/error/Could not add team member !");
    },
  });

  const navigate = useNavigate();

  if (resourcesQuery.isLoading) return <LoadingSpinner />;
  if (resourcesQuery.isError)
    navigate(`/error/${resourcesQuery.error.message}`);

  const handleDelete = (id: number): void => {
    deleteMutation.mutate(id);
  };

  const handleAdd = (newResource: ResourceData): void => {
    addMutation.mutate(newResource);
  };

  const handleEdit = (resource: Required<ResourceData>): void => {
    updateMutation.mutate(resource);
  };

  const filteredData =
    resourcesQuery.data
      ?.filter(
        (resource) =>
          resource.firstName
            .toLowerCase()
            .includes(filterParams.search.toLowerCase()) ||
          resource.lastName
            .toLowerCase()
            .includes(filterParams.search.toLowerCase())
      )
      .sort(sortOptions.find((opt) => opt.value === filterParams.sort)?.fn) ||
    [];

  const handleFilterChange = (event: any) => {
    switch (event.target.id) {
      case "sort":
        setFilterParams((params) => ({
          ...params,
          sort: event.target.value,
        }));
        break;
      case "search":
        setFilterParams((params) => ({
          ...params,
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
            <label className={labelStyleClass} htmlFor="search">
              <FontAwesomeIcon icon={faFilter} />
              <span> Filter: </span>
            </label>
            <input
              className="rounded-md h-8 px-1"
              onChange={handleFilterChange}
              name="search"
              id="search"
            />
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
              className="rounded-md  h-8 px-1"
            >
              {sortOptions.map((opt, index) => (
                <option key={index} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="border-4 bg-gray-100 border-slate-900 m-2">
          <div
            className="p-2 border border-gray-100 grid grid-cols-4 gap-8 bg-slate-100 text-md font-semibold uppercase text-center text-slate-800"
            style={{ gridTemplateColumns: "1fr 1fr 1fr 45px" }}
          >
            <p>Team Member</p>
            <p>Assigned Jobs</p>
            <p>Availability</p>
          </div>
          {resourcesQuery.data &&
            filteredData.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          <div className="w-full h-16 text-center text-slate-700 text-sm">
            {filteredData.length === 0 ? "0 Resources Found" : ""}
          </div>
          <ResourceForm onSubmit={handleAdd} />
        </div>
      </div>
    </div>
  );
};

export default ResourcesDashboardPage;
