export interface JobBase {
  id?: number;
  startDate: Date;
  endDate: Date;
  name: string;
}
export interface Job extends Required<JobBase> {
  resource: Required<ResourceResponseBase> | null;
}

export interface JobData extends JobBase {
  resource: number | null;
}

export interface ResourceBase {
  id?: number;
  firstName: string;
  lastName: string;
}

export interface ResourceResponseBase extends Required<ResourceBase> {
  imageUrl: string | null;
}
export interface Resource extends Required<ResourceResponseBase> {
  jobs: Required<JobBase>[] | null;
}

export interface ResourceData extends ResourceBase {
  imageFile: File | null;
}
