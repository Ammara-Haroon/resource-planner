import axios from "axios";
import { BACKEND_BASE_URL } from "./api-config";
import { Job, JobData } from "./api-responses_interfaces";

export const getAllJobs = async (): Promise<Job[]> => {
  const response = await axios.get(`${BACKEND_BASE_URL}/jobs`);
  const data = response.data;
  console.log(data);
  return cleanJobs(data);
};

export const createJob = async (data: JobData): Promise<Job> => {
  console.log(data);

  const response = await axios.post(`${BACKEND_BASE_URL}/jobs`, (data = data));
  return response.data;
};

export const deleteJob = async (id: number): Promise<void> => {
  return await axios.delete(`${BACKEND_BASE_URL}/jobs/${id}`);
};
export const updateJob = async (job: Required<JobData>): Promise<Job> => {
  console.log(`${BACKEND_BASE_URL}/jobs/${job.id}`, job);
  const response = await axios.put(`${BACKEND_BASE_URL}/jobs/${job.id}`, job);
  return response.data;
};

export const addJobs = () => {
  for (let i = 0; i < 20; ++i) {
    const currentDate = new Date();

    // Instantiate another date object to avoid mutating the current date
    const futureDate2 = new Date(currentDate);
    futureDate2.setDate(futureDate2.getDate() + i);

    const futureDate1 = new Date(currentDate);
    futureDate1.setDate(futureDate1.getDate() + 5 + i);

    const newJob: JobData = {
      startDate: futureDate2,
      endDate: futureDate1,
      name: "Job" + i,
      resource: null,
    };
    console.log(newJob);
    createJob(newJob);
  }
};

// convert date strings to date object
export const cleanJobs = (data: any): Job[] => {
  return data.map((entry: any) => ({
    ...entry,
    startDate: new Date(entry.startDate),
    endDate: new Date(entry.endDate),
  }));
};
