import React from "react";
import { Job } from "../../services/api-responses_interfaces";
import { getMaxDate, getMinDate, isBetween } from "../../services/utils";

const GanttChart = ({ jobs }: { jobs: Job[] | undefined }) => {
  const getAllDates = (minDate: Date | null, maxDate: Date | null) => {
    let dates: Date[] = [];
    if (!minDate) minDate = new Date();
    if (!maxDate) maxDate = new Date(minDate.getDate() + 30);
    console.log(minDate, maxDate);
    let i = 0;
    maxDate.setHours(0, 0, 0, 0);
    minDate.setHours(0, 0, 0, 0);
    const mills = maxDate.getTime();

    while (minDate && minDate.getTime() <= mills) {
      console.log(minDate.getTime(), mills);
      dates.push(new Date(minDate));
      minDate.setDate(minDate.getDate() + 1);
    }

    return dates;
  };

  const maxDate = jobs ? getMaxDate(jobs) : null;
  const minDate = jobs ? getMinDate(jobs) : null;

  console.log(maxDate);
  const dates = getAllDates(minDate, maxDate);
  console.log(dates);
  const sortedJobs = jobs?.sort(
    (job1, job2) => job1.startDate.getTime() - job2.startDate.getTime()
  );

  return (
    <div className="flex bg-slate-200 flex-col overflow-x-scroll  w-full">
      <div className="flex">
        <span className="border border-black min-w-56 text-center w-56">
          Jobs
        </span>

        {dates.map((date) => (
          <span className="border border-black min-w-8 w-8 text-center p-1">
            {date.getDate()}
          </span>
        ))}
      </div>

      <div className="flex flex-col">
        {sortedJobs?.map((job, index) => (
          <div className="flex">
            <span className="border border-black min-w-56 text-center w-56">
              {job.name}
            </span>
            {dates.map((date) => (
              <span
                className={`border border-black min-w-8 w-8 text-center p-1 ${
                  isBetween(date, job.startDate, job.endDate)
                    ? "bg-green-300"
                    : ""
                }`}
              ></span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GanttChart;
