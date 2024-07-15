export interface Job {
  id: number;
  startDate: Date;
  endDate: Date;
  name: string;
  resource: Resource | null | number;
}

export interface Resource {
  id: number;
  firstName: string;
  lastName: string;
  imageUrl: string;
  jobs: Job[];
}
