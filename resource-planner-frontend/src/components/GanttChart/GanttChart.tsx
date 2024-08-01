import { Job } from "../../services/api-responses_interfaces";
import {
  colors,
  getAllDatesBetween,
  getMaxDate,
  getMinDate,
  isBetween,
} from "../../services/utils";

const GanttChart = ({ jobs }: { jobs: Job[] | undefined }) => {
  const minDate = jobs ? getMinDate(jobs) : new Date();
  const maxDate = jobs ? getMaxDate(jobs) : new Date(minDate + 30);
  const dates = getAllDatesBetween(minDate, maxDate);

  const sortedJobs = jobs?.sort(
    (job1, job2) => job1.startDate.getTime() - job2.startDate.getTime()
  );

  return (
    <div className="flex bg-slate-200 flex-col w-fit min-h-full">
      <div className="flex">
        <span className="flex justify-center items-center border border-black min-w-56 text-center w-56 p-1  bg-slate-400 font-bold">
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
        {sortedJobs?.map((job, index) => (
          <div className="flex">
            <span
              className=" bg-neutral-200 font-semibold  min-w-56 text-center w-56 text-nowrap text-ellipsis overflow-hidden px-1 text-sm"
              style={{
                //backgroundColor: colors[index % colors.length],
                //opacity: "0.8",
                borderWidth: "6px",
                boxSizing: "border-box",
                borderColor: colors[index % colors.length],
              }}
            >
              {job.name}
            </span>
            {dates.map((date: Date) => (
              <span
                className={`border border-black min-w-8 w-8 text-center p-1`}
                style={{
                  backgroundColor: isBetween(date, job.startDate, job.endDate)
                    ? colors[index % colors.length] //"bg-green-300"
                    : "",
                }}
                title={`${job.name} : ${
                  job.resource?.firstName || "Not Assigned"
                } ${
                  job.resource?.lastName || ""
                }\n${job.startDate.toLocaleDateString()}-${job.endDate.toLocaleDateString()} `}
              ></span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GanttChart;
