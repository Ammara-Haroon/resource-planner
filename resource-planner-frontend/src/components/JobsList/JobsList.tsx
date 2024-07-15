import React from "react";
import ErrMsg from "../ErrMsg/ErrMsg";
import { Job } from "../../services/api-responses_interfaces";

const JobsList = ({ jobs }): { jobs: Job[] } => {
  return (
    <>
      {/* {error && <ErrMsg msg={error} closeMsg={() => setError(null)} />} */}
      <div className="w-full border border-rose-300 overflow-y-auto ">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            // handleEdit={handleEdit}
            // handleDelete={handleDelete}
            // handleOverwrite={handleOverwrite}
          />
        ))}
        {jobs.length === 0 && (
          <p className="m-2 text-slate-500 text-sm text-center">No more jobs</p>
        )}
      </div>
    </>
  );
};

export default JobsList;
