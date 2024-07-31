import { Job } from "../../services/api-responses_interfaces";
import {
  getAllDatesBetween,
  getMaxDate,
  getMinDate,
  isBetween,
} from "../../services/utils";

const GanttChart = ({ jobs }: { jobs: Job[] | undefined }) => {
  const minDate = jobs ? getMinDate(jobs) : new Date();
  const maxDate = jobs ? getMaxDate(jobs) : new Date(minDate.getDate() + 30);
  const dates = getAllDatesBetween(minDate, maxDate);

  const sortedJobs = jobs?.sort(
    (job1, job2) => job1.startDate.getTime() - job2.startDate.getTime()
  );

  return (
    <div className="flex bg-slate-200 flex-col w-fit">
      <div className="flex">
        <span className="flex justify-center items-center font-semibold border border-black min-w-56 text-center w-56 p-1  bg-pink-300">
          <p>Jobs</p>
        </span>

        {dates.map((date: Date) => (
          <span className="border font-semibold border-black min-w-8 w-8 text-center p-1 bg-slate-300">
            <small>
              {date.toLocaleDateString("default", { month: "short" })}
            </small>
            <p>{date.getDate()}</p>
          </span>
        ))}
      </div>

      <div className="flex flex-col max-h-full">
        {sortedJobs?.map((job) => (
          <div className="flex">
            <span className=" bg-slate-300 border border-black min-w-56 text-center w-56 text-nowrap text-ellipsis overflow-hidden px-1">
              {job.name}
            </span>
            {dates.map((date: Date) => (
              <span
                className={`border border-black min-w-8 w-8 text-center p-1 ${
                  isBetween(date, job.startDate, job.endDate)
                    ? "bg-green-300"
                    : ""
                }`}
                title={`${job.name}:${
                  job.resource?.firstName || "Not Assigned"
                } ${job.resource?.lastName || ""}`}
              ></span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GanttChart;
