import React from "react";
import { Job } from "../../services/api-responses_interfaces";

const WeekView = ({ jobs }: { jobs: Partial<Job>[] | null }) => {
  const dayBoxStyle = "flex justify-center items-center p-1 h-5 w-5";
  const dayBoxGreyed = `${dayBoxStyle} bg-slate-300`;
  const dayBoxFilled = `${dayBoxStyle} bg-pink-300`;

  const dayLabelStyle = "text-xs text-slate-100";
  const weekDays = ["M", "T", "W", "Th", "F"];

  const today = new Date();
  // const dayIndex = today.getDay();
  // const weekDays = weekDaysReal
  //   .slice(dayIndex - 1)
  //  .concat(weekDaysReal.slice(0, dayIndex - 1));
  function getDate(dayNum: number) {
    const day = today.getDay();
    const diff = today.getDate() - day + (day == 0 ? -6 : 1) + dayNum; // adjust when day is sunday
    return new Date(today.setDate(diff));
  }

  const datesMap = weekDays.map((day, index) => getDate(index));
  //console.log(datesMap);

  const colorMap = datesMap.map((day) => {
    day.setHours(0, 0, 0, 0);
    return jobs?.some((job) => {
      job.startDate?.setHours(0, 0, 0, 0);
      job.endDate?.setHours(0, 0, 0, 0);
      return (
        job.startDate &&
        job.startDate <= day &&
        job.endDate &&
        job.endDate >= day
      );
    });
  });
  // console.log(colorMap);
  // datesMap.forEach((day) =>
  //   jobs?.forEach((job) =>
  //     console.log(job.startDate <= day, job.endDate >= day)
  //   )
  // );
  return (
    <div className="flex gap-1">
      {weekDays.map((day, index) => (
        <div
          key={index}
          className={colorMap[index] ? dayBoxFilled : dayBoxGreyed}
        >
          <span className={dayLabelStyle}>{day}</span>
        </div>
      ))}
    </div>
  );
};

export default WeekView;
