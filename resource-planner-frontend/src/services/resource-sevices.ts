import axios from "axios";
import { BACKEND_BASE_URL } from "./api-config";
import { Resource, ResourceData } from "./api-responses_interfaces";
import { cleanJobs } from "./job-services";

export const getAllResources = async (): Promise<Resource[]> => {
  const response = await axios.get(`${BACKEND_BASE_URL}/resources`);

  let data = response.data;
  data = data
    .map((entry: Resource) => ({
      ...entry,
      jobs: cleanJobs(entry.jobs),
    }))
    .sort((res1: Resource, res2: Resource) =>
      `${res1.firstName} ${res1.lastName}`.localeCompare(
        `${res2.firstName} ${res2.lastName}`
      )
    );
  return data;
};

export const createResource = async (data: ResourceData): Promise<Resource> => {
  const response = await axios.post(
    `${BACKEND_BASE_URL}/resources`,
    cleanResourceData(data),
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const deleteResource = async (id: number): Promise<void> => {
  return await axios.delete(`${BACKEND_BASE_URL}/resources/${id}`);
};
export const updateResource = async (
  resource: Required<ResourceData>
): Promise<Resource> => {
  const response = await axios.patch(
    `${BACKEND_BASE_URL}/resources/${resource.id}`,
    cleanResourceData(resource),
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const addResources = async () => {
  for (let i = 0; i < 5; ++i) {
    const response = await axios.get("https://randomuser.me/api/");
    const data = response.data.results[0];
    const newResource: ResourceData = {
      firstName: data.name.first,
      lastName: data.name.last,
      imageFile: null,
    };
    // console.log(newResource);
    createResource(newResource);
  }
};

export const getAvailableResources = async (
  startDate: Date,
  endDate: Date
): Promise<Resource[]> => {
  const startDateStr = `${startDate.getFullYear()}-${
    startDate.getMonth() < 9 ? "0" : ""
  }${startDate.getMonth() + 1}-${startDate.getDate()}`;

  const endDateStr = `${endDate.getFullYear()}-${
    startDate.getMonth() < 9 ? "0" : ""
  }${startDate.getMonth() + 1}-${endDate.getDate()}`;

  const response = await axios.get(
    `${BACKEND_BASE_URL}/resources/options?startDate=${startDateStr}&endDate=${endDateStr}`
  );

  // sort and clean data
  const data = response.data
    .map((entry: Resource) => ({
      ...entry,
      jobs: cleanJobs(entry.jobs),
    }))
    .sort((res1: Resource, res2: Resource) =>
      `${res1.firstName} ${res1.lastName}`.localeCompare(
        `${res2.firstName} ${res2.lastName}`
      )
    );
  return data;
};

const toTitleCase = (str: string): string => {
  if (str.length < 2) return str;
  return `${str.substring(0, 1).toUpperCase()}${str
    .substring(1)
    .toLowerCase()}`;
};
const cleanResourceData = (data: ResourceData): ResourceData => {
  return {
    ...data,
    firstName: toTitleCase(data.firstName.trim()),
    lastName: toTitleCase(data.lastName.trim()),
  };
};
