import axios from "axios";
import { BACKEND_BASE_URL } from "./api-config";
import { Resource } from "./api-responses_interfaces";

export const getAllResources = async (): Promise<Resource[]> => {
  const response = await axios.get(`${BACKEND_BASE_URL}/resources`);
  return response.data;
};

export const addResource = async (
  data: Partial<Resource>
): Promise<Resource> => {
  const response = await axios.post(
    `${BACKEND_BASE_URL}/resources`,
    (data = data)
  );
  return response.data;
};

export const addResources = async () => {
  for (let i = 0; i < 5; ++i) {
    const response = await axios.get("https://randomuser.me/api/");
    const data = response.data.results[0];
    console.log(data.picture.thumbnail);
    const newResource: Partial<Resource> = {
      firstName: data.name.first,
      lastName: data.name.last,
      imageUrl: data.picture.thumbnail,
    };
    console.log(newResource);
    addResource(newResource);
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

  console.log(startDateStr);
  const response = await axios.get(
    `${BACKEND_BASE_URL}/resources/options?startDate=${startDateStr}&endDate=${endDateStr}`
  );
  console.log(response.data);
  return response.data;
};
