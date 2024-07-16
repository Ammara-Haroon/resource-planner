export interface Job {
  id: number;
  startDate: Date;
  endDate: Date;
  name: string;
  resource: Partial<Resource> | null | number;
}

export interface Resource {
  id: number;
  firstName: string;
  lastName: string;
  imageUrl: string | null;
  jobs: Partial<Job>[] | null;
}
