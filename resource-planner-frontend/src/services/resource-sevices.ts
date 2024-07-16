import axios from "axios";
import { BACKEND_BASE_URL } from "./api-config";
import { Resource } from "./api-responses_interfaces";
import { cleanJobs } from "./job-services";

export const getAllResources = async (): Promise<Resource[]> => {
  const response = await axios.get(`${BACKEND_BASE_URL}/resources`);

  let data = response.data;
  data = data.map((entry: Resource) => ({
    ...entry,
    jobs: cleanJobs(entry.jobs),
  }));
  console.log(data);
  return data;
};

export const createResource = async (
  data: Partial<Resource>
): Promise<Resource> => {
  const response = await axios.post(
    `${BACKEND_BASE_URL}/resources`,
    (data = data)
  );
  return response.data;
};

export const deleteResource = async (id: number): Promise<void> => {
  const response = await axios.delete(`${BACKEND_BASE_URL}/resources/${id}`);
};
export const updateResource = async (resource: Resource): Promise<void> => {
  console.log(`${BACKEND_BASE_URL}/resources/${resource.id}`, resource);
  const response = await axios.put(
    `${BACKEND_BASE_URL}/resources/${resource.id}`,
    resource
  );
};

export const addResources = async () => {
  for (let i = 0; i < 5; ++i) {
    const response = await axios.get("https://randomuser.me/api/");
    const data = response.data.results[0];
    //console.log(data.picture.thumbnail);
    const newResource: Partial<Resource> = {
      firstName: data.name.first,
      lastName: data.name.last,
      imageUrl: data.picture.thumbnail,
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

  //console.log(startDateStr);
  const response = await axios.get(
    `${BACKEND_BASE_URL}/resources/options?startDate=${startDateStr}&endDate=${endDateStr}`
  );
  //console.log(response.data);
  return response.data;
};
