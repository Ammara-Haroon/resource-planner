import React from "react";
import { Job } from "../../services/api-responses_interfaces";
import { colors } from "../../services/utils";

const MonthView = ({
  month,
  year,
  jobs,
}: {
  month: number;
  year: number;
  jobs: Partial<Job>[] | null | undefined;
}) => {
  console.log(month, year, jobs);
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
  const getBusyStatus = (dates: Date[], jobs: Job[]) => {
    const status = new Array(dates.length).fill(-1);
    if (!jobs) return status;

    for (let i = 0; i < jobs.length; ++i) {
      jobs[i].startDate.setHours(0, 0, 0, 0);
      jobs[i].endDate.setHours(0, 0, 0, 0);

      console.log(jobs[i].startDate, jobs[i].endDate);
      console.log(dates);

      let index = dates.findIndex((date: Date) => {
        return date.getTime() === jobs[i].startDate.getTime();
      });

      if (index === -1) continue;
      console.log(index, dates[index].getTime(), jobs[i].endDate.getTime());

      while (dates[index].getTime() <= jobs[i].endDate.getTime()) {
        status[index] = i;
        index++;
        if (index >= dates.length) break;
      }
    }
    return status;
  };
  const dates = getDatesInMonth(year, month);
  const busy = getBusyStatus(dates, jobs);
  console.log(busy);
  return (
    <div>
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
              <p
                title={busy[index] !== -1 ? jobs[busy[index]].name : ""}
                style={{
                  backgroundColor:
                    busy[index] !== -1
                      ? colors[busy[index] % colors.length]
                      : "",
                }}
              >
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
