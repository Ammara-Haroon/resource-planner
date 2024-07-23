import React from "react";
import { Job } from "../../services/api-responses_interfaces";

const GanttChart = ({ jobs }: { jobs: Job[] | undefined }) => {
  const getAllDates = (minDate: Date | null, maxDate: Date | null) => {
    let dates: Date[] = [];
    if (!minDate) minDate = new Date();
    if (!maxDate) maxDate = new Date(minDate.getUTCDate() + 30);
    while (minDate.getUTCDate() <= maxDate.getUTCDate()) {
      dates.push(new Date(minDate));
      minDate.setDate(minDate.getUTCDate() + 1);
    }

    return dates;
  };
  const getMaxDate = (jobs: Job[]): Date => {
    let maxDate = new Date(jobs[0].endDate.getUTCDate());
    for (let i = 0; i < jobs.length; ++i) {
      if (jobs[i].endDate.getUTCDate() > maxDate.getUTCDate()) {
        maxDate.setDate(jobs[i].endDate.getUTCDate());
      }
    }
    return maxDate;
  };
  const maxDate = jobs ? getMaxDate(jobs) : null;
  console.log(maxDate);
  const dates = getAllDates(new Date(), maxDate);
  console.log(dates);
  return (
    <div className="grid grid-cols-12 bg-slate-200">
      <div>
        {jobs?.map((job) => (
          <p>{job.name}</p>
        ))}
      </div>
      <div>
        {/* {dates.map((date) => (
          <span>{date.getDate()}</span>
        ))} */}
      </div>
    </div>
  );
};

export default GanttChart;
