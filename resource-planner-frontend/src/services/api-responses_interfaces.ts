export interface Job {
  id: number;
  startDate: Date;
  endDate: Date;
  name: string;
  resource: Partial<Resource> | null;
}

export interface Resource {
  id: number;
  firstName: string;
  lastName: string;
  imageUrl: string | null;
  jobs: Partial<Job>[] | null;
}

export interface ResourceData {
  id: number;
  firstName: string;
  lastName: string;
  imageFile: File | null;
}

export interface JobData {
  id: number;
  startDate: Date;
  endDate: Date;
  name: string;
  resource: number | null;
}
