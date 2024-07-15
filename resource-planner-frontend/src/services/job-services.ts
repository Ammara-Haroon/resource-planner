import axios from "axios";
import { BACKEND_BASE_URL } from "./api-config";
import { Job } from "./api-responses_interfaces";

export const getAllJobs = async (): Promise<Job[]> => {
  const response = await axios.get(`${BACKEND_BASE_URL}/jobs`);
  const data = response.data;
  return cleanJobs(data);
};

export const createJob = async (data: Partial<Job>): Promise<Job> => {
  const response = await axios.post(`${BACKEND_BASE_URL}/jobs`, (data = data));
  console.log(response.data);
  return response.data;
};

export const deleteJob = async (id: number): Promise<void> => {
  const response = await axios.delete(`${BACKEND_BASE_URL}/jobs/${id}`);
};
export const updateJob = async (job: Job): Promise<void> => {
  console.log(`${BACKEND_BASE_URL}/jobs/${job.id}`, job);
  const response = await axios.put(`${BACKEND_BASE_URL}/jobs/${job.id}`, job);
};

export const addJobs = () => {
  for (let i = 0; i < 20; ++i) {
    const currentDate = new Date();

    // Instantiate another date object to avoid mutating the current date
    const futureDate2 = new Date(currentDate);
    futureDate2.setDate(futureDate2.getDate() + i);

    const futureDate1 = new Date(currentDate);
    futureDate1.setDate(futureDate1.getDate() + 5 + i);

    const newJob: Partial<Job> = {
      startDate: futureDate2,
      endDate: futureDate1,
      name: "Job" + i,
      resource: null,
    };
    console.log(newJob);
    createJob(newJob);
  }
};

const cleanJobs = (data: any): Job[] => {
  return data.map((entry: any) => ({
    ...entry,
    startDate: new Date(entry.startDate),
    endDate: new Date(entry.endDate),
  }));
};
