import React from "react";
import { Job } from "../../services/api-responses_interfaces";
import { isBetween } from "../../services/utils";

const WeekView = ({ jobs }: { jobs: Partial<Job>[] | null }) => {
  const dayBoxStyle = "flex justify-center items-center p-1 h-5 w-5";
  const dayBoxGreyed = `${dayBoxStyle} bg-slate-300`;
  const dayBoxFilled = `${dayBoxStyle} bg-pink-300`;
  const dayLabelStyle = "text-xs text-slate-100";

  const days = ["M", "T", "W", "Th", "F"];
  const today = new Date();
  let dayNum = today.getDay();
  dayNum = dayNum === 0 || dayNum === 6 ? 0 : dayNum - 1;
  const weekDays = days.map(
    (day, index) => days[(dayNum + index) % days.length]
  );

  const datesMap = weekDays.map((day, index) => {
    let offset = index;
    if (today.getDay() + offset === 0) offset = offset + 1;
    if (today.getDay() + offset === 6) offset = offset + 2;

    const diff = today.getDate() + offset;
    return new Date(new Date().setDate(diff));
  });

  const colorMap = datesMap.map((day) => {
    day.setHours(0, 0, 0, 0);
    return jobs?.some(
      (job) =>
        job.startDate &&
        job.endDate &&
        isBetween(day, job.startDate, job.endDate)
    );
  });

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
