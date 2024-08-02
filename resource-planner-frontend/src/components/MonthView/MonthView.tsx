import React from "react";
import { Job, JobBase } from "../../services/api-responses_interfaces";
import {
  colors,
  getBusyStatus,
  getDatesInMonthCalendar,
} from "../../services/utils";

const MonthView = ({
  month,
  year,
  jobs,
}: {
  month: number;
  year: number;
  jobs: Required<JobBase>[] | null | undefined;
}) => {
  const days: string[] = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const dates = getDatesInMonthCalendar(year, month);
  const busy = getBusyStatus(dates, jobs || []);
  const today = new Date();

  return (
    <div className="bg-neutral-100 w-[calc(280px)] pb-5 pt-1 border-2 border-slate-900">
      <div className="grid grid-cols-7 p-1 uppercase text-center w-full border-b font-semibold text-slate-700 text-sm">
        {days.map((day, index) => (
          <span key={index}>{day}</span>
        ))}
        {dates.map((date, index) => (
          <span
            key={index}
            className={`${
              date && date.getMonth() === month
                ? "text-slate-800"
                : "text-slate-400"
            }`}
          >
            <p
              title={jobs && busy[index] !== -1 ? jobs[busy[index]].name : ""}
              className={`${
                date &&
                date.getMonth() === today.getMonth() &&
                date.getDate() === today.getDate() &&
                date.getFullYear() === today.getFullYear()
                  ? "border-2 border-green-500 rounded-full"
                  : ""
              }`}
              style={{
                backgroundColor:
                  busy[index] !== -1 ? colors[busy[index] % colors.length] : "",
              }}
            >
              {date?.getDate() || ""}
            </p>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MonthView;
