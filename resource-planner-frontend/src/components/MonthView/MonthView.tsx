import React from "react";
import { Job } from "../../services/api-responses_interfaces";

const MonthView = ({
  month,
  year,
  jobs,
}: {
  month: number;
  year: number;
  jobs: Partial<Job>[] | null;
}) => {
  const days: string[] = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const getDatesInMonth = (year: number, month: number) => {
    let date = new Date(year, month, 1, 0, 0, 0);
    let dates = [];
    let prevMonthDays = date.getDay() === 0 ? 6 : date.getDay() - 1;
    date.setDate(date.getDate() - prevMonthDays);
    for (let i = 0; i < prevMonthDays; ++i) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    while (date.getMonth() === month) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };
  const getBusyStatus = (dates, jobs) => {
    const status = new Array<Boolean>(dates.length).fill(false);
    if (!jobs) return status;
    console.log(status);
    for (let i = 0; i < jobs.length; ++i) {
      console.log(jobs[i].startDate, jobs[i].endDate);
      console.log(dates);
      let index = dates.findIndex(
        (date) => date.getUTCDate() === jobs[i].startDate.getUTCDate()
      );
      if (index === -1) continue;
      console.log(index, dates[index].getDate() <= jobs[i].endDate.getDate());
      while (dates[index].getDate() <= jobs[i].endDate.getDate()) {
        status[index] = true;
        index++;
      }
    }
    return status;
  };
  const dates = getDatesInMonth(year, month);
  const busy = getBusyStatus(dates, jobs);
  console.log(busy);
  return (
    <div>
      <h2>MonthView</h2>
      <div className="bg-slate-200">
        <div className="grid grid-cols-7 text-center">
          {days.map((day, index) => (
            <span key={index}>{day}</span>
          ))}
          {dates.map((date, index) => (
            <span
              className={`${
                date && date.getMonth() === month
                  ? "text-slate-800"
                  : "text-slate-400"
              } ${
                date && date.getMonth() === month
                  ? "text-slate-800"
                  : "text-slate-400"
              }`}
            >
              <p className={`${busy[index] ? "bg-green-300" : ""}`}>
                {date?.getDate() || ""}
              </p>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonthView;
